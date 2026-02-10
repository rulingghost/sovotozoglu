import '../../../../styles/Modal.css'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { projectJobHistoryValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from '../../../../store/slices/supplierSlice'
import { useParams } from 'react-router-dom'
import { exchangeRateTimeList, typeOfJobList } from '../../../../static/datas'
import { getDollarRate } from '../../../../utils/functions'
import AddSupplierModal from './AddSupplierModal'
import {
  IoClose,
  BiSolidEdit,
  RiFunctionAddLine,
  BiSolidBadgeDollar,
  MdAddBox,
  RiExchange2Fill,
} from '../../../../styles/icons'

function ProjectJobHistoryModal({ initialData, onSubmit, onClose }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { suppliers } = useSelector((state) => state.supplier)
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)

  const [selectedTry, setSelectedTry] = useState(true)

  useEffect(() => {
    if (!suppliers || suppliers.length === 0) {
      dispatch(fetchSuppliers())
    }
  }, [dispatch, suppliers])

  const supplierList = suppliers.map((supplier) => {
    return { value: supplier.id, label: supplier.CompanyName_Supplier }
  })

  const calculatedAmounts = async (values) => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-CA')
    const response = await getDollarRate(formattedDate, 'before')

    if (response.status) {
      return {
        ...values,
        Date_JobHistory: formattedDate,
        Dollar_Rate_JobHistory: response.data,
        Amount_JobHistory: parseFloat((values.Amount_JobHistory * response.data).toFixed(4)),
      }
    } else {
      return {
        ...values,
        Date_JobHistory: null,
        Dollar_Rate_JobHistory: null,
        Amount_JobHistory: null,
      }
    }
  }

  return createPortal(
    <>
      <motion.div
        className='modal-backdrop'
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      ></motion.div>

      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />}{' '}
            {initialData ? 'Yapılan İş Güncelle' : 'Yapılan İş Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Project_JobHistory: id, // from url
            CompanyName_Job_JobHistory: initialData?.CompanyName_Job_JobHistory || '',
            ExpensDetails_JobHistory: initialData?.ExpensDetails_JobHistory || '',
            Amount_JobHistory: initialData?.Amount_JobHistory || '',
            Date_JobHistory: initialData?.Date_JobHistory || '',
            Dollar_Rate_JobHistory: initialData?.Dollar_Rate_JobHistory || '',
            Invoice_No_JobHistory: initialData?.Invoice_No_JobHistory || '',
          }}
          validationSchema={projectJobHistoryValidation}
          onSubmit={async (values) => {
            if (selectedTry) {
              const transformedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
              )
              onSubmit(transformedValues)
              onClose()
            } else {
              const newValues = await calculatedAmounts(values)

              const transformedValues = Object.fromEntries(
                Object.entries(newValues).map(([key, value]) => [key, value === '' ? null : value])
              )
              onSubmit(transformedValues)
              onClose()
            }
          }}
        >
          {({ values, errors, setFieldValue, setFieldError }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-2 xl:w-two'>
                <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>İş Yapılan Firma</label>
                    <button type='button' onClick={() => setShowAddSupplierModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>
                  <Field name='CompanyName_Job_JobHistory'>
                    {({ field, form }) => (
                      <CustomSelect options={supplierList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='CompanyName_Job_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Cinsi</label>
                  <Field name='ExpensDetails_JobHistory'>
                    {({ field, form }) => (
                      <CustomSelect options={typeOfJobList} field={field} form={form} placeholder='İş cinsi seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='ExpensDetails_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <div className='flex gap-3'>
                    <label className='field-title'>Tutar ({selectedTry ? '₺' : '$'})</label>
                    <button type='button' onClick={() => setSelectedTry((prev) => !prev)}>
                      <RiExchange2Fill className='font-bold text-lg text-soento-green' />
                    </button>
                  </div>
                  <Field name='Amount_JobHistory'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Amount_JobHistory' component='div' className='field-error-message' />
                </div>

                {selectedTry && (
                  <>
                    <div className='field-group'>
                      <label className='field-title'>Tarih</label>
                      <Field name='Date_JobHistory'>
                        {({ field, form }) => <CustomDateInput field={field} form={form} />}
                      </Field>
                      <ErrorMessage name='Date_JobHistory' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Kur Saati</label>
                      <Field name='chosen'>
                        {({ field, form }) => (
                          <CustomSelect
                            options={exchangeRateTimeList}
                            field={field}
                            form={form}
                            placeholder='Kur saati seçiniz'
                          />
                        )}
                      </Field>
                      <ErrorMessage name='chosen' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Dolar Kuru (₺)</label>
                      <div className='relative'>
                        <Field name='Dollar_Rate_JobHistory'>
                          {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={4} />}
                        </Field>
                        <button
                          type='button'
                          onClick={async () => {
                            const response = await getDollarRate(values.Date_JobHistory, values.chosen)

                            if (response.status) {
                              setFieldValue('Dollar_Rate_JobHistory', response.data)
                            } else {
                              setFieldError('Dollar_Rate_JobHistory', response.message)
                            }
                          }}
                          className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-2xl text-slate-500'
                        >
                          <BiSolidBadgeDollar />
                        </button>
                      </div>

                      {errors.Dollar_Rate_JobHistory && (
                        <div className='field-error-message'>{errors.Dollar_Rate_JobHistory}</div>
                      )}
                    </div>
                  </>
                )}

                <div className='field-group'>
                  <label className='field-title'>Fatura Numarası</label>
                  <Field
                    name='Invoice_No_JobHistory'
                    type='text'
                    className='field-control'
                    placeholder='Fatura numarası giriniz'
                  />
                  <ErrorMessage name='Invoice_No_JobHistory' component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  {initialData ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showAddSupplierModal && <AddSupplierModal onClose={() => setShowAddSupplierModal(false)} />}
    </>,
    document.body
  )
}
export default ProjectJobHistoryModal
