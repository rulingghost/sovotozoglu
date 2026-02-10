import '../../../../styles/Modal.css'
import { IoClose, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addPowerPlant } from '../../../../store/slices/operationCareSlice'
import { powerPlantValidation } from '../../../../utils/validationSchemas'

function PowerPlantModal({ onClose }) {
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
            <RiFunctionAddLine /> Santral Ekle
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            PowerPlantName: '',
          }}
          validationSchema={powerPlantValidation}
          onSubmit={(values) => {
            dispatch(addPowerPlant(values))
            onClose()
          }}
        >
          {() => (
            <Form>
              <div className='modal-body one-column'>
                <div className='field-group'>
                  <label className='field-title'>Santral Adı</label>
                  <Field
                    name='PowerPlantName'
                    type='text'
                    className='field-control'
                    placeholder='Santral adı giriniz'
                  />
                  <ErrorMessage name='PowerPlantName' component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  Ekle
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
export default PowerPlantModal
