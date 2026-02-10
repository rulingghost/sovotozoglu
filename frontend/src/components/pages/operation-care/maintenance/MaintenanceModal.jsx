import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine, MdAddBox } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { operationCareValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPowerPlants } from '../../../../store/slices/operationCareSlice'
import { cities, terrainRoofList, directionList } from '../../../../static/datas'
import PowerPlantModal from './PowerPlantModal'

function MaintenanceModal({ initialData, onSubmit, onClose }) {
  const dispatch = useDispatch()
  const { powerPlants } = useSelector((state) => state.operationCare)
  const [showPowerPlantModal, setShowPowerPlantModal] = useState(false)

  useEffect(() => {
    if (!powerPlants || powerPlants.length === 0) {
      dispatch(fetchPowerPlants())
    }
  }, [dispatch, powerPlants])

  const powerPlantList = powerPlants.map((powerPlant) => {
    return { value: powerPlant.id, label: powerPlant.PowerPlantName }
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
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />}{' '}
            {initialData ? 'İşletme Bakım Güncelle' : 'İşletme Bakım Başlat'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Operation_Care_Company: initialData?.Operation_Care_Company || '',
            Operation_Care_Inventor_Brand: initialData?.Operation_Care_Inventor_Brand || '',
            Operation_Care_Panel_Brand: initialData?.Operation_Care_Panel_Brand || '',

            Operation_Care_Location: initialData?.Operation_Care_Location || '',
            Operation_Care_Inventor_Power: initialData?.Operation_Care_Inventor_Power || '',
            Operation_Care_Panel_Power: initialData?.Operation_Care_Panel_Power || '',

            Operation_Care_Address: initialData?.Operation_Care_Address || '',
            Operation_Care_Inventor_Number: initialData?.Operation_Care_Inventor_Number || '',
            Operation_Care_VOC: initialData?.Operation_Care_VOC || '',

            Operation_Care_Terrain_Roof: initialData?.Operation_Care_Terrain_Roof || 'Arazi',
            Operation_Care_AC_Power: initialData?.Operation_Care_AC_Power || '',
            Operation_Care_Number_Str: initialData?.Operation_Care_Number_Str || '',

            Operation_Care_Switchgear_Material: initialData?.Operation_Care_Switchgear_Material || '',
            Operation_Care_DC_Power: initialData?.Operation_Care_DC_Power || '',
            Operation_Care_Panel_Number_Str: initialData?.Operation_Care_Panel_Number_Str || '',

            Operation_Care_Start_Date: initialData?.Operation_Care_Start_Date || '',
            Operation_Care_endContract_Date: initialData?.Operation_Care_endContract_Date || '',
            Operation_Care_Direction: initialData?.Operation_Care_Direction || 'Kuzey',
          }}
          validationSchema={operationCareValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose()
          }}
        >
          {() => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-3 xl:w-three'>
                <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>Santral Adı</label>
                    <button type='button' onClick={() => setShowPowerPlantModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>

                  <Field name='Operation_Care_Company'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={powerPlantList}
                        field={field}
                        form={form}
                        placeholder='Santral adı seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Operation_Care_Company' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İnventör Markası</label>
                  <Field
                    name='Operation_Care_Inventor_Brand'
                    type='text'
                    className='field-control'
                    placeholder='İnventör markası giriniz'
                  />
                  <ErrorMessage name='Operation_Care_Inventor_Brand' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Panel Markası</label>
                  <Field
                    name='Operation_Care_Panel_Brand'
                    type='text'
                    className='field-control'
                    placeholder='Panel markası giriniz'
                  />
                  <ErrorMessage name='Operation_Care_Panel_Brand' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Konum</label>
                  <Field name='Operation_Care_Location'>
                    {({ field, form }) => (
                      <CustomSelect options={cities} field={field} form={form} placeholder='Konum seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Operation_Care_Location' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İnventör Güç (kW)</label>
                  <Field name='Operation_Care_Inventor_Power'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_Inventor_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Panel Gücü (W)</label>
                  <Field name='Operation_Care_Panel_Power'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_Panel_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Adres</label>
                  <Field
                    name='Operation_Care_Address'
                    type='text'
                    className='field-control'
                    placeholder='Adres giriniz'
                  />
                  <ErrorMessage name='Operation_Care_Address' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İnventör Adet</label>
                  <Field name='Operation_Care_Inventor_Number'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={0} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_Inventor_Number' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Panel VOC</label>
                  <Field name='Operation_Care_VOC'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_VOC' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arazi/Çatı</label>
                  <Field name='Operation_Care_Terrain_Roof'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={terrainRoofList}
                        field={field}
                        form={form}
                        placeholder='Arazi veya çatı seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Operation_Care_Terrain_Roof' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>AC Güç (kWe)</label>
                  <Field name='Operation_Care_AC_Power'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_AC_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>1 İnventördeki String Sayısı</label>
                  <Field name='Operation_Care_Number_Str'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={0} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_Number_Str' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Şalt Malzemesi</label>
                  <Field
                    name='Operation_Care_Switchgear_Material'
                    type='text'
                    className='field-control'
                    placeholder='Şalt malzemesi giriniz'
                  />
                  <ErrorMessage
                    name='Operation_Care_Switchgear_Material'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>DC Güç (kWp)</label>
                  <Field name='Operation_Care_DC_Power'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_DC_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>1 Stringdeki Panel Sayısı</label>
                  <Field name='Operation_Care_Panel_Number_Str'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={0} />}
                  </Field>
                  <ErrorMessage
                    name='Operation_Care_Panel_Number_Str'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Devreye Alınma Tarihi</label>
                  <Field name='Operation_Care_Start_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Operation_Care_Start_Date' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Bakım Sözleşmesi Bitiş Tarihi</label>
                  <Field name='Operation_Care_endContract_Date'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage
                    name='Operation_Care_endContract_Date'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Yön</label>
                  <Field name='Operation_Care_Direction'>
                    {({ field, form }) => (
                      <CustomSelect options={directionList} field={field} form={form} placeholder='Yön seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Operation_Care_Direction' component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  {initialData ? 'Güncelle' : 'Başlat'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showPowerPlantModal && <PowerPlantModal onClose={() => setShowPowerPlantModal(false)} />}
    </>,
    document.body
  )
}
export default MaintenanceModal
