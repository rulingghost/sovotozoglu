import '../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine, MdAddBox } from '../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { projectValidation } from '../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../custom/CustomSelect'
import CustomDateInput from '../../custom/CustomDateInput'
import CustomNumberInput from '../../custom/CustomNumberInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../../../store/slices/clientSlice'

import {
  cities,
  companyUndertakingWorkList,
  terrainRoofList,
  incentiveList,
  situationList,
} from '../../../static/datas'
import AddClientModal from './AddClientModal'

function ProjectModal({ initialData, onSubmit, onClose }) {
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.client)
  const [showAddClientModal, setShowAddClientModal] = useState(false)

  useEffect(() => {
    if (!clients || clients.length === 0) {
      dispatch(fetchClients())
    }
  }, [dispatch, clients])

  const clientList = clients.map((client) => {
    return { value: client.id, label: client.CompanyName_Clients }
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
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />} {initialData ? 'Proje Güncelle' : 'Proje Başlat'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Company_id: initialData?.Company_id || '',
            ProjectName: initialData?.ProjectName || '',
            ProjectCode: initialData?.ProjectCode || '',
            CompanyUndertakingWork: initialData?.CompanyUndertakingWork || 'Tozoğlu',
            Location: initialData?.Location || '',
            Cost_NotIncludingKDV: initialData?.Cost_NotIncludingKDV || '',
            AC_Power: initialData?.AC_Power || '',
            DC_Power: initialData?.DC_Power || '',
            CalculatedCost_NotIncludingKDV: initialData?.CalculatedCost_NotIncludingKDV || '',
            StartDate: initialData?.StartDate || '',
            FinishDate: initialData?.FinishDate || '',
            KDV_Rate: initialData?.KDV_Rate || '%20',
            Terrain_Roof: initialData?.Terrain_Roof || 'Arazi',
            Incentive: initialData?.Incentive !== undefined ? initialData.Incentive : true,
            Situation: initialData?.Situation || 'Onay Bekliyor',
          }}
          validationSchema={projectValidation}
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
                    <label className='field-title'>Firma Adı</label>
                    <button type='button' onClick={() => setShowAddClientModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>

                  <Field name='Company_id'>
                    {({ field, form }) => (
                      <CustomSelect options={clientList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Company_id' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Proje Adı</label>
                  <Field name='ProjectName' type='text' className='field-control' placeholder='Proje adı giriniz' />
                  <ErrorMessage name='ProjectName' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Proje Kodu</label>
                  <Field name='ProjectCode' type='text' className='field-control' placeholder='Proje kodu giriniz' />
                  <ErrorMessage name='ProjectCode' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İşi Üstlenen Firma</label>
                  <Field name='CompanyUndertakingWork'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={companyUndertakingWorkList}
                        field={field}
                        form={form}
                        placeholder='Firma seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='CompanyUndertakingWork' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Konum</label>
                  <Field name='Location'>
                    {({ field, form }) => (
                      <CustomSelect options={cities} field={field} form={form} placeholder='Konum seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Location' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İş Bedeli - KDV Hariç ($)</label>
                  <Field name='Cost_NotIncludingKDV'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Cost_NotIncludingKDV' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>AC Güç (kWe)</label>
                  <Field name='AC_Power'>{({ field, form }) => <CustomNumberInput field={field} form={form} />}</Field>
                  <ErrorMessage name='AC_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>DC Güç (kWp)</label>
                  <Field name='DC_Power'>{({ field, form }) => <CustomNumberInput field={field} form={form} />}</Field>
                  <ErrorMessage name='DC_Power' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Hesaplanan Maliyet - KDV Hariç ($)</label>
                  <Field name='CalculatedCost_NotIncludingKDV'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='CalculatedCost_NotIncludingKDV' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İşin Başlama Tarihi</label>
                  <Field name='StartDate'>{({ field, form }) => <CustomDateInput field={field} form={form} />}</Field>
                  <ErrorMessage name='StartDate' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İşin Bitirme Tarihi</label>
                  <Field name='FinishDate'>{({ field, form }) => <CustomDateInput field={field} form={form} />}</Field>
                  <ErrorMessage name='FinishDate' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>KDV Oranı (%)</label>
                  <Field name='KDV_Rate' type='text' className='field-control' placeholder='%20' />
                  <ErrorMessage name='KDV_Rate' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arazi/Çatı</label>
                  <Field name='Terrain_Roof'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={terrainRoofList}
                        field={field}
                        form={form}
                        placeholder='Arazi veya çatı seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Terrain_Roof' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Teşvikli (Evet/Hayır)</label>
                  <Field name='Incentive'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={incentiveList}
                        field={field}
                        form={form}
                        placeholder='Teşvik durumu seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Incentive' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Durum</label>
                  <Field name='Situation'>
                    {({ field, form }) => (
                      <CustomSelect options={situationList} field={field} form={form} placeholder='Durum seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Situation' component='div' className='field-error-message' />
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

      {showAddClientModal && <AddClientModal onClose={() => setShowAddClientModal(false)} />}
    </>,
    document.body
  )
}
export default ProjectModal
