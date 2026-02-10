import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { failInvoiceValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomDateInput from '../../../custom/CustomDateInput'

function InvoiceModal({ initialData, onSubmit, onClose }) {
  return createPortal(
    <>
      <motion.div
        className='modal-backdrop'
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        style={{ zIndex: '1010' }}
      ></motion.div>

      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />}{' '}
            {initialData ? 'Arıza Bakım Faturası Güncelle' : 'Arıza Bakım Faturası Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Fail_Bill_Central_Name: initialData?.Fail_Bill_Central_Name || '',
            Fail_Bill_Process: initialData?.Fail_Bill_Process || '',
            Fail_Bill_Date: initialData?.Fail_Bill_Date || '',
            Fail_Bill_Detail: initialData?.Fail_Bill_Detail || '',
            Fail_Bill_File: initialData?.Fail_Bill_File || '',
          }}
          validationSchema={failInvoiceValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose(transformedValues)
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-2 xl:w-two'>
                <div className='field-group'>
                  <label className='field-title'>Santral İsmi</label>
                  <Field
                    name='Fail_Bill_Central_Name'
                    type='text'
                    className='field-control'
                    placeholder='Santral ismi giriniz'
                  />
                  <ErrorMessage name='Fail_Bill_Central_Name' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Yapılan İşlem</label>
                  <Field
                    name='Fail_Bill_Process'
                    type='text'
                    className='field-control'
                    placeholder='Yapılan işlem giriniz'
                  />
                  <ErrorMessage name='Fail_Bill_Process' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name='Fail_Bill_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Fail_Bill_Date' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Açıklama</label>
                  <Field name='Fail_Bill_Detail' type='text' className='field-control' placeholder='Açıklama giriniz' />
                  <ErrorMessage name='Fail_Bill_Detail' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Fatura Belgesi</label>
                  <input
                    type='file'
                    onChange={(e) => setFieldValue('Fail_Bill_File', e.target.files[0])}
                    className='rounded text-md border border-slate-300 file:mr-4 file:py-2 file:px-4 file:border-0 text-gray-400 file:font-semibold file:bg-gray-200 hover:file:bg-gray-300'
                  />
                  <ErrorMessage name='Fail_Bill_File' component='div' className='field-error-message' />
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
    </>,
    document.body
  )
}

export default InvoiceModal
