import '../../../../styles/Modal.css'
import { IoClose, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { updateSalesOffer } from '../../../../store/slices/salesOfferSlice'
import { situationCardValidation } from '../../../../utils/validationSchemas'
import CustomSelect from '../../../custom/CustomSelect'
import { offerSituationList } from '../../../../static/datas'

function ChangeStatusModal({ initialData, onClose }) {
  const dispatch = useDispatch()

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
            <RiFunctionAddLine /> Durum Değişimi
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Situation_Card: initialData?.Situation_Card || '',
          }}
          validationSchema={situationCardValidation}
          onSubmit={(values) => {
            dispatch(updateSalesOffer({ ...initialData, Situation_Card: values.Situation_Card }))
            onClose()
          }}
        >
          {() => (
            <Form>
              <div className='modal-body one-column'>
                <div className='field-group'>
                  <label className='field-title'>Durum</label>
                  <Field name='Situation_Card'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={offerSituationList}
                        field={field}
                        form={form}
                        placeholder='Durum seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Situation_Card' component='div' className='field-error-message' />
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
    </>,
    document.body
  )
}
export default ChangeStatusModal
