import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine, IoCalculator, MdAddBox } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { salesProcessValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../../../../store/slices/clientSlice'
import { fetchPersonRelateds } from '../../../../store/slices/salesOfferSlice'
import { cities, terrainRoofList, offerSituationList } from '../../../../static/datas'
import AddPersonDealModal from './AddPersonDealModal'
// import AddClientModal from '../../project/AddClientModal'

function SalesProcessModal({ initialData, isRevise, onSubmit, onClose }) {
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.client)
  const { personRelateds } = useSelector((state) => state.salesOffer)
  const [showAddPersonDealModal, setShowAddPersonDealModal] = useState(false)
  const [clientName, setClientName] = useState(null)
  // const [showAddClientModal, setShowAddClientModal] = useState(false)

  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])

  useEffect(() => {
    if (initialData?.Client_Card) {
      const client = clients.find((item) => item.id === initialData?.Client_Card)
      setClientName(client?.CompanyName_Clients)
    }
  }, [clients, initialData?.Client_Card])

  useEffect(() => {
    if (!personRelateds || personRelateds.length === 0) {
      dispatch(fetchPersonRelateds())
    }
  }, [dispatch, personRelateds])

  const personRelatedList = personRelateds.map((personRelated) => {
    return { value: personRelated.id, label: personRelated.PersonRelatedName }
  })

  if (!clientName && initialData) return

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
            {isRevise ? 'Satış Teklif Revize' : initialData ? 'Satış Teklifi Güncelle' : 'Satış Teklifi Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Client_Card: clientName || '',
            SalesPersonRelated: initialData?.SalesPersonRelated || '',
            Location_Card: initialData?.Location_Card || '',
            Offer_Cost_NotIncludingKDV_Card: initialData?.Offer_Cost_NotIncludingKDV_Card || '',
            UnitOffer_NotIncludingKDV: initialData?.UnitOffer_NotIncludingKDV || '',
            AC_Power_Card: initialData?.AC_Power_Card || '',
            Cost_NotIncludingKDV_Card: initialData?.Cost_NotIncludingKDV_Card || '',
            UnitCost_NotIncludingKDV: initialData?.UnitCost_NotIncludingKDV || '',
            DC_Power_Card: initialData?.DC_Power_Card || '',
            Situation_Card: initialData?.Situation_Card || '',
            Comment_Card_1: initialData?.Comment_Card_1 || '',
            Date_Card: initialData?.Date_Card || '',
            Person_Deal: initialData?.Person_Deal || '',
            Terrain_Roof_Card: initialData?.Terrain_Roof_Card || 'Arazi',
            Roof_Cost_Card: initialData?.Roof_Cost_Card || '',
          }}
          validationSchema={salesProcessValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose()
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className='modal-body grid-cols-1 w-one xl:grid-cols-3 xl:w-three'>
                {/* <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>Firma Adı</label>
                    <button type='button' onClick={() => setShowAddClientModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>

                  <Field name='Client_Card'>
                    {({ field, form }) => (
                      <CustomSelect options={clientList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Client_Card' component='div' className='field-error-message' />
                </div> */}

                <div className='field-group'>
                  <label className='field-title'>Firma adı</label>
                  <Field
                    name='Client_Card'
                    type='text'
                    className='field-control'
                    placeholder='Firma adı giriniz'
                    readOnly={initialData?.Client_Card}
                  />
                  <ErrorMessage name='Client_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <div className='flex gap-2 items-center'>
                    <label className='field-title'>İlgilenen Kişi</label>
                    <button type='button' onClick={() => setShowAddPersonDealModal(true)}>
                      <MdAddBox className='text-soento-green text-xl' />
                    </button>
                  </div>

                  <Field name='SalesPersonRelated'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={personRelatedList}
                        field={field}
                        form={form}
                        placeholder='İlgilenen kişi seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='SalesPersonRelated' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Konum</label>
                  <Field name='Location_Card'>
                    {({ field, form }) => (
                      <CustomSelect options={cities} field={field} form={form} placeholder='Konum seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Location_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Teklif Bedeli - KDV Hariç ($)</label>
                  <div className='relative'>
                    <Field name='Offer_Cost_NotIncludingKDV_Card'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                    </Field>
                    <button
                      type='button'
                      onClick={() => {
                        setFieldValue(
                          'Offer_Cost_NotIncludingKDV_Card',
                          Number(values.UnitOffer_NotIncludingKDV) * Number(values.DC_Power_Card)
                        )
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-xl text-slate-500'
                    >
                      <IoCalculator />
                    </button>
                  </div>
                  <ErrorMessage
                    name='Offer_Cost_NotIncludingKDV_Card'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Birim Teklif ($)</label>
                  <div className='relative'>
                    <Field name='UnitOffer_NotIncludingKDV'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                    </Field>
                    <button
                      type='button'
                      onClick={() => {
                        setFieldValue(
                          'UnitOffer_NotIncludingKDV',
                          Number(values.Offer_Cost_NotIncludingKDV_Card) / Number(values.DC_Power_Card)
                        )
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-xl text-slate-500'
                    >
                      <IoCalculator />
                    </button>
                  </div>
                  <ErrorMessage name='UnitOffer_NotIncludingKDV' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>AC Güç (kWe)</label>
                  <Field name='AC_Power_Card'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='AC_Power_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Toplam Maliyet ($)</label>
                  <div className='relative'>
                    <Field name='Cost_NotIncludingKDV_Card'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                    </Field>
                    <button
                      type='button'
                      onClick={() => {
                        setFieldValue(
                          'Cost_NotIncludingKDV_Card',
                          Number(values.UnitCost_NotIncludingKDV) * Number(values.DC_Power_Card)
                        )
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-xl text-slate-500'
                    >
                      <IoCalculator />
                    </button>
                  </div>
                  <ErrorMessage name='Cost_NotIncludingKDV_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Birim Maliyet - KDV Hariç ($)</label>
                  <div className='relative'>
                    <Field name='UnitCost_NotIncludingKDV'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                    </Field>
                    <button
                      type='button'
                      onClick={() => {
                        setFieldValue(
                          'UnitCost_NotIncludingKDV',
                          Number(values.Cost_NotIncludingKDV_Card) / Number(values.DC_Power_Card)
                        )
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-xl text-slate-500'
                    >
                      <IoCalculator />
                    </button>
                  </div>
                  <ErrorMessage name='UnitCost_NotIncludingKDV' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>DC Güç (kWp)</label>
                  <div className='relative'>
                    <Field name='DC_Power_Card'>
                      {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                    </Field>
                    <button
                      type='button'
                      onClick={() => {
                        setFieldValue(
                          'DC_Power_Card',
                          Number(values.Cost_NotIncludingKDV_Card) / Number(values.UnitCost_NotIncludingKDV)
                        )
                      }}
                      className='flex items-center absolute px-2 top-0 bottom-0 right-0 text-xl text-slate-500'
                    >
                      <IoCalculator />
                    </button>
                  </div>
                  <ErrorMessage name='DC_Power_Card' component='div' className='field-error-message' />
                </div>

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

                <div className='field-group'>
                  <label className='field-title'>Yorum</label>
                  <Field name='Comment_Card_1' type='text' className='field-control' placeholder='Yorum giriniz' />
                  <ErrorMessage name='Comment_Card_1' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name='Date_Card'>{({ field, form }) => <CustomDateInput field={field} form={form} />}</Field>
                  <ErrorMessage name='Date_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>İlgili Kişi</label>
                  <Field name='Person_Deal' type='text' className='field-control' placeholder='İlgili kişi giriniz' />
                  <ErrorMessage name='Person_Deal' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arazi/Çatı</label>
                  <Field name='Terrain_Roof_Card'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={terrainRoofList}
                        field={field}
                        form={form}
                        placeholder='Arazi veya çatı seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='Terrain_Roof_Card' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Arazi Bedeli($/MW)</label>
                  <Field name='Roof_Cost_Card'>
                    {({ field, form }) => (
                      <CustomNumberInput field={field} form={form} disabled={values.Terrain_Roof_Card === 'Çatı'} />
                    )}
                  </Field>
                  <ErrorMessage name='Roof_Cost_Card' component='div' className='field-error-message' />
                </div>

                {/* ------------------------------------------------------------------------------------- */}
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  {isRevise ? 'Revize Al' : initialData ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* {showAddClientModal && <AddClientModal onClose={() => setShowAddClientModal(false)} />} */}

      {showAddPersonDealModal && <AddPersonDealModal onClose={() => setShowAddPersonDealModal(false)} />}
    </>,
    document.body
  )
}
export default SalesProcessModal
