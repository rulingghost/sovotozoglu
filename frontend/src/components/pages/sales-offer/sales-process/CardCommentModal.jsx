import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { salesProcessCommentValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomPhoneInput from '../../../custom/CustomPhoneInput'
import CustomDateInput from '../../../custom/CustomDateInput'
import Loader from '../../../custom/Loader'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import { updateSalesOffer } from '../../../../store/slices/salesOfferSlice'

function CardCommentModal({ initialData, orderNumber, onClose }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.salesOffer)

  if (error) return <ErrorOccurred message={error} />

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
            <BiSolidEdit /> {'Yorum ' + orderNumber}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            [`Comment_Person_Card_${orderNumber}`]: initialData?.[`Comment_Person_Card_${orderNumber}`] || '',
            [`Comment_Telno_Card_${orderNumber}`]: initialData?.[`Comment_Telno_Card_${orderNumber}`] || '',
            [`Comment_Date_Card_${orderNumber}`]: initialData?.[`Comment_Date_Card_${orderNumber}`] || '',
            [`Comment_Card_${orderNumber}`]: initialData?.[`Comment_Card_${orderNumber}`] || '',
          }}
          validationSchema={salesProcessCommentValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            dispatch(updateSalesOffer({ ...initialData, ...transformedValues }))
            onClose()
          }}
        >
          {() => (
            <Form>
              <div className='modal-body one-column'>
                <div className='field-group'>
                  <label className='field-title'>Muhatap</label>
                  <Field
                    name={`Comment_Person_Card_${orderNumber}`}
                    type='text'
                    className='field-control'
                    placeholder='Muhatap giriniz'
                  />
                  <ErrorMessage
                    name={`Comment_Person_Card_${orderNumber}`}
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Telefon</label>
                  <Field name={`Comment_Telno_Card_${orderNumber}`}>
                    {({ field, form }) => <CustomPhoneInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage
                    name={`Comment_Telno_Card_${orderNumber}`}
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name={`Comment_Date_Card_${orderNumber}`}>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage
                    name={`Comment_Date_Card_${orderNumber}`}
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Yorum</label>
                  <Field
                    name={`Comment_Card_${orderNumber}`}
                    as='textarea'
                    rows='4'
                    className='field-control'
                    placeholder='Yorum giriniz'
                  />
                  <ErrorMessage name={`Comment_Card_${orderNumber}`} component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {loading && <Loader />}
    </>,
    document.body
  )
}
export default CardCommentModal
