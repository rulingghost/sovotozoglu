import '../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine, MdDelete } from '../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { calendarValidation } from '../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../custom/CustomSelect'
import CustomDateInput from '../../custom/CustomDateInput'
import CustomNumberInput from '../../custom/CustomNumberInput'
import CustomTimeInput from '../../custom/CustomTimeInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../../../store/slices/clientSlice'
import { fetchSuppliers } from '../../../store/slices/supplierSlice'
import { fetchPowerPlants } from '../../../store/slices/operationCareSlice'
import { calendarTypeList, calendarAppointmentTypeList } from '../../../static/datas'

function CalendarModal({ initialData, selectedDate, onSubmit, onDelete, onClose }) {
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.client)
  const { suppliers } = useSelector((state) => state.supplier)
  const { powerPlants } = useSelector((state) => state.operationCare)

  useEffect(() => {
    dispatch(fetchClients())
    dispatch(fetchSuppliers())
    dispatch(fetchPowerPlants())
  }, [dispatch])

  const clientList = clients.map((client) => {
    return { value: client.id, label: client.CompanyName_Clients }
  })

  const supplierList = suppliers.map((supplier) => {
    return { value: supplier.id, label: supplier.CompanyName_Supplier }
  })

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
            {initialData ? 'Etkinlik Güncelle' : 'Etkinlik Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Type: initialData?.Type || '',
            Date: initialData ? initialData.Date.split('T')[0] : selectedDate,

            Calendar_Supplier: initialData?.Calendar_Supplier || '',
            Amount: initialData?.Amount || '',
            Time: initialData ? initialData.Date.split('T')[1].substring(0, 5) : '',

            Calendar_Client: initialData?.Calendar_Client || '',
            AppointmentType: initialData?.AppointmentType || '',

            Calendar_PowerPlant: initialData?.Calendar_PowerPlant || '',
            Site: initialData?.Site || '',

            RelatedPerson: initialData?.RelatedPerson || '',
            Note: initialData?.Note || '',
          }}
          validationSchema={calendarValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )

            if (transformedValues.Type === 'payment') {
              transformedValues.Calendar_Client = null
              transformedValues.AppointmentType = null
              transformedValues.Calendar_PowerPlant = null
              transformedValues.Site = null
            } else if (transformedValues.Type === 'sales') {
              transformedValues.Calendar_Supplier = null
              transformedValues.Amount = null
              transformedValues.Calendar_PowerPlant = null
              transformedValues.Site = null
            } else {
              transformedValues.Calendar_Supplier = null
              transformedValues.Amount = null
              transformedValues.Calendar_Client = null
              transformedValues.AppointmentType = null
            }

            const { Time, ...exceptTimeValues } = transformedValues
            exceptTimeValues.Date = `${exceptTimeValues.Date}T${Time || '00:00'}`

            onSubmit(exceptTimeValues)
            onClose()
          }}
        >
          {({ values }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-2 xl:w-two'>
                <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>Etkinlik Türü</label>
                    <span
                      className='size-3.5 rounded-full'
                      style={{
                        backgroundColor:
                          values.Type === 'payment'
                            ? '#71c1ea'
                            : values.Type === 'sales'
                            ? '#75cc9e'
                            : values.Type === 'maintenance'
                            ? '#ff9251'
                            : 'transparent',
                      }}
                    ></span>
                  </div>
                  <Field name='Type'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={calendarTypeList}
                        field={field}
                        form={form}
                        placeholder='Etkinlik türü seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Type' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İlgili Tarih</label>
                  <Field name='Date'>{({ field, form }) => <CustomDateInput field={field} form={form} />}</Field>
                  <ErrorMessage name='Date' component='div' className='field-error-message' />
                </div>

                {values.Type === 'payment' && (
                  <>
                    <div className='field-group'>
                      <label className='field-title'>Saat</label>
                      <Field name='Time'>{({ field, form }) => <CustomTimeInput field={field} form={form} />}</Field>
                      <ErrorMessage name='Time' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Tedarikçi</label>
                      <Field name='Calendar_Supplier'>
                        {({ field, form }) => (
                          <CustomSelect
                            options={supplierList}
                            field={field}
                            form={form}
                            placeholder='Tedarikçi seçiniz'
                          />
                        )}
                      </Field>
                      <ErrorMessage name='Calendar_Supplier' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Miktar (₺)</label>
                      <Field name='Amount'>
                        {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                      </Field>
                      <ErrorMessage name='Amount' component='div' className='field-error-message' />
                    </div>
                  </>
                )}

                {/* ------------------------------------- */}

                {values.Type === 'sales' && (
                  <>
                    <div className='field-group'>
                      <label className='field-title'>Müşteri</label>
                      <Field name='Calendar_Client'>
                        {({ field, form }) => (
                          <CustomSelect options={clientList} field={field} form={form} placeholder='Müşteri seçiniz' />
                        )}
                      </Field>
                      <ErrorMessage name='Calendar_Client' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Randevu Şekli</label>
                      <Field name='AppointmentType'>
                        {({ field, form }) => (
                          <CustomSelect
                            options={calendarAppointmentTypeList}
                            field={field}
                            form={form}
                            placeholder='Randevu şekli seçiniz'
                          />
                        )}
                      </Field>
                      <ErrorMessage name='AppointmentType' component='div' className='field-error-message' />
                    </div>
                  </>
                )}

                {/* ------------------------------------- */}

                {values.Type === 'maintenance' && (
                  <>
                    <div className='field-group'>
                      <label className='field-title'>Firma</label>
                      <Field name='Calendar_PowerPlant'>
                        {({ field, form }) => (
                          <CustomSelect
                            options={powerPlantList}
                            field={field}
                            form={form}
                            placeholder='Firma seçiniz'
                          />
                        )}
                      </Field>
                      <ErrorMessage name='Calendar_PowerPlant' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Şantiye</label>
                      <Field name='Site' type='text' className='field-control' placeholder='Şantiye giriniz' />
                      <ErrorMessage name='Site' component='div' className='field-error-message' />
                    </div>
                  </>
                )}

                {/* ------------------------------------- */}

                {values.Type && (
                  <>
                    <div className='field-group'>
                      <label className='field-title'>İlgili Kişi</label>
                      <Field
                        name='RelatedPerson'
                        type='text'
                        className='field-control'
                        placeholder='İlgili kişi giriniz'
                      />
                      <ErrorMessage name='RelatedPerson' component='div' className='field-error-message' />
                    </div>

                    <div className='field-group'>
                      <label className='field-title'>Not</label>
                      <Field name='Note' type='text' className='field-control' placeholder='Not giriniz' />
                      <ErrorMessage name='Note' component='div' className='field-error-message' />
                    </div>
                  </>
                )}

                {/* ------------------------------------- */}
              </div>
              <div className='modal-footer'>
                <div className='flex gap-1'>
                  <button type='submit' className='submit-button'>
                    {initialData ? 'Güncelle' : 'Ekle'}
                  </button>
                  {initialData && (
                    <button
                      type='button'
                      className='submit-button flex justify-center items-center !w-14'
                      onClick={() => {
                        onDelete(initialData.id)
                        onClose()
                      }}
                    >
                      <MdDelete className='text-2xl' />
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>,
    document.body
  )
}
export default CalendarModal
