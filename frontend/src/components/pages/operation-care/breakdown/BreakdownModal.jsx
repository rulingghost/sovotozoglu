import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import { failValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOperationCares } from '../../../../store/slices/operationCareSlice'
import { failGuaranteeList, failSituationList } from '../../../../static/datas'
import InvoiceModal from './InvoiceModal'

function BreakdownModal({ initialData, onSubmit, onClose }) {
  const dispatch = useDispatch()
  const { operationCares } = useSelector((state) => state.operationCare)

  const [showModal, setShowModal] = useState(false) // Fatura modalı için
  const [counter, setCounter] = useState(null) // Fatura modalı için

  useEffect(() => {
    if (!operationCares || operationCares.length === 0) {
      dispatch(fetchOperationCares())
    }
  }, [dispatch, operationCares])

  const operationCareList = operationCares.map((operationCare) => {
    return { value: operationCare.id, label: operationCare.client.PowerPlantName }
  })

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
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />} {initialData ? 'Arıza Güncelle' : 'Arıza Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Fail_Operation_Care: initialData?.Fail_Operation_Care || '',
            Fail_Central_Name: initialData?.Fail_Central_Name || '',
            Fail_Information_Person: initialData?.Fail_Information_Person || '',
            Fail_Detection_Date: initialData?.Fail_Detection_Date || '',
            Fail_Team_Info_Date: initialData?.Fail_Team_Info_Date || '',
            Fail_Repair_Date: initialData?.Fail_Repair_Date || '',
            Fail_Guaranteed: initialData?.Fail_Guaranteed || 'Belirsiz',
            Fail_Situation: initialData?.Fail_Situation || 'Belirlendi',
            Fail_Detail: initialData?.Fail_Detail || '',

            Fail_Bill_Central_Name: '',
            Fail_Bill_Process: '',
            Fail_Bill_Date: '',
            Fail_Bill_Detail: '',
            Fail_Bill_File: '',
          }}
          validationSchema={failValidation}
          onSubmit={(values) => {
            let transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )

            if (transformedValues.Fail_Guaranteed === 'Belirsiz' || transformedValues.Fail_Guaranteed === 'Evet') {
              const newData = {
                ...transformedValues,
                Fail_Bill_Central_Name: null,
                Fail_Bill_Process: null,
                Fail_Bill_Date: null,
                Fail_Bill_Detail: null,
                Fail_Bill_File: null,
              }
              transformedValues = newData
            }

            if (initialData && counter === 1) {
              const {
                Fail_Bill_Central_Name,
                Fail_Bill_Process,
                Fail_Bill_Date,
                Fail_Bill_Detail,
                Fail_Bill_File,
                ...rest
              } = transformedValues
              transformedValues = rest
            }

            onSubmit(transformedValues)
            onClose()
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-2 xl:w-two'>
                <div className='field-group'>
                  <label className='field-title'>İşletme Bakım</label>
                  <Field name='Fail_Operation_Care'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={operationCareList}
                        field={field}
                        form={form}
                        placeholder='İşletme bakım seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Fail_Operation_Care' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Santral İsmi</label>
                  <Field
                    name='Fail_Central_Name'
                    type='text'
                    className='field-control'
                    placeholder='Santral ismi giriniz'
                  />
                  <ErrorMessage name='Fail_Central_Name' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Bilgi Verilen Kişi</label>
                  <Field
                    name='Fail_Information_Person'
                    type='text'
                    className='field-control'
                    placeholder='Bilgi verilen kişi giriniz'
                  />
                  <ErrorMessage name='Fail_Information_Person' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arıza Tespit Tarihi</label>
                  <Field name='Fail_Detection_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Fail_Detection_Date' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Ekip Bilgilendirme Tarihi</label>
                  <Field name='Fail_Team_Info_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Fail_Team_Info_Date' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arıza Onarım Tarihi</label>
                  <Field name='Fail_Repair_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Fail_Repair_Date' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Garanti Kapsam Durumu</label>
                  <Field name='Fail_Guaranteed'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={failGuaranteeList}
                        field={field}
                        form={form}
                        placeholder='Garanti kapsam durumu seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Fail_Guaranteed' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arıza Durumu</label>
                  <Field name='Fail_Situation'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={failSituationList}
                        field={field}
                        form={form}
                        placeholder='Arıza durumu seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Fail_Situation' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arıza Ayrıntısı</label>
                  <Field
                    name='Fail_Detail'
                    type='text'
                    className='field-control'
                    placeholder='Arıza ayrıntısı giriniz'
                  />
                  <ErrorMessage name='Fail_Detail' component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  {initialData ? 'Güncelle' : 'Ekle'}
                </button>
              </div>

              <FieldWatcher setShowModal={setShowModal} handleCounter={(value) => setCounter(value)} />

              {showModal && (
                <InvoiceModal
                  onSubmit={(values) => {
                    setFieldValue('Fail_Bill_Central_Name', values.Fail_Bill_Central_Name)
                    setFieldValue('Fail_Bill_Process', values.Fail_Bill_Process)
                    setFieldValue('Fail_Bill_Date', values.Fail_Bill_Date)
                    setFieldValue('Fail_Bill_Detail', values.Fail_Bill_Detail)
                    setFieldValue('Fail_Bill_File', values.Fail_Bill_File)
                  }}
                  onClose={(values) => {
                    setShowModal(false)
                    if (!values.Fail_Bill_File) {
                      setFieldValue('Fail_Guaranteed', 'Belirsiz')
                    }
                  }}
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>,
    document.body
  )
}

// values değişikliklerini izleyen bağımsız bir bileşen
const FieldWatcher = ({ setShowModal, handleCounter }) => {
  const { values } = useFormikContext()
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (values.Fail_Guaranteed === 'Hayır' && counter > 0) {
      setShowModal(true)
    }
    setCounter((prev) => prev + 1)
  }, [values.Fail_Guaranteed, setShowModal])

  useEffect(() => {
    handleCounter(counter)
  }, [counter, handleCounter])

  return null
}

export default BreakdownModal
