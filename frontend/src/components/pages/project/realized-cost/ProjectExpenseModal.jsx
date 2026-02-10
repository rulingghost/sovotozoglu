import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine, BiSolidBadgeDollar, MdAddBox } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { projectExpenseValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from '../../../../store/slices/supplierSlice'
import { useParams } from 'react-router-dom'
import { exchangeRateTimeList, typeOfJobList, companyUndertakingWorkList, bankList } from '../../../../static/datas'
import { getDollarRate } from '../../../../utils/functions'
import AddSupplierModal from './AddSupplierModal'

function ProjectExpenseModal({ initialData, onSubmit, onClose }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { suppliers } = useSelector((state) => state.supplier)
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)

  useEffect(() => {
    if (!suppliers || suppliers.length === 0) {
      dispatch(fetchSuppliers())
    }
  }, [dispatch, suppliers])

  const supplierList = suppliers.map((supplier) => {
    return { value: supplier.id, label: supplier.CompanyName_Supplier }
  })

  // const fetchExchangeRate = async () => {
  //--------------------------
  // }

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
            {initialData ? 'Yapılan Ödeme Güncelle' : 'Yapılan Ödeme Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Project_Expenses: id, // from url
            CompanyName_Paying_Expenses: initialData?.CompanyName_Paying_Expenses || '',
            CompanyName_FromPaymentMade_Expenses: initialData?.CompanyName_FromPaymentMade_Expenses || 'Sovo',
            ExpensDetails_Expenses: initialData?.ExpensDetails_Expenses || '',
            Amount_Expenses: initialData?.Amount_Expenses || '',
            Date_Expenses: initialData?.Date_Expenses || '',
            Dollar_Rate_Expenses: initialData?.Dollar_Rate_Expenses || '',
            Bank_Expenses: initialData?.Bank_Expenses || '',
          }}
          validationSchema={projectExpenseValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose()
          }}
        >
          {({ values, errors, setFieldValue, setFieldError }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-2 xl:w-two'>
                <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>Ödeme Yapılan Firma</label>
                    <button type='button' onClick={() => setShowAddSupplierModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>
                  <Field name='CompanyName_Paying_Expenses'>
                    {({ field, form }) => (
                      <CustomSelect options={supplierList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='CompanyName_Paying_Expenses' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Ödeme Yapan Firma</label>
                  <Field name='CompanyName_FromPaymentMade_Expenses'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={companyUndertakingWorkList}
                        field={field}
                        form={form}
                        placeholder='Ödeme yapan firma seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name='CompanyName_FromPaymentMade_Expenses'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Gider Detayı</label>
                  <Field name='ExpensDetails_Expenses'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={typeOfJobList}
                        field={field}
                        form={form}
                        placeholder='Gider detayı seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='ExpensDetails_Expenses' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tutar (₺)</label>
                  <Field name='Amount_Expenses'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Amount_Expenses' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name='Date_Expenses'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Date_Expenses' component='div' className='field-error-message' />
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
                    <Field name='Dollar_Rate_Expenses'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={4} />}
                    </Field>
                    <button
                      type='button'
                      onClick={async () => {
                        const response = await getDollarRate(values.Date_Expenses, values.chosen)

                        if (response.status) {
                          setFieldValue('Dollar_Rate_Expenses', response.data)
                        } else {
                          setFieldError('Dollar_Rate_Expenses', response.message)
                        }
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-2xl text-slate-500'
                    >
                      <BiSolidBadgeDollar />
                    </button>
                  </div>

                  {errors.Dollar_Rate_Expenses && (
                    <div className='field-error-message'>{errors.Dollar_Rate_Expenses}</div>
                  )}
                </div>

                <div className='field-group'>
                  <label className='field-title'>Banka</label>
                  <Field name='Bank_Expenses'>
                    {({ field, form }) => (
                      <CustomSelect options={bankList} field={field} form={form} placeholder='Banka seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Bank_Expenses' component='div' className='field-error-message' />
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
export default ProjectExpenseModal
