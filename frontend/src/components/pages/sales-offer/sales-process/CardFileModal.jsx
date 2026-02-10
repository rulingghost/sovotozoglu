import '../../../../styles/Modal.css'
import { IoClose, FaRegFileAlt, CgSpinner, RxOpenInNewWindow } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, ErrorMessage } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import Loader from '../../../custom/Loader'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateSalesOfferWithFile } from '../../../../store/slices/salesOfferSlice'

function CardFileModal({ initialData, fileColumn, onClose }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.salesOffer)

  const [protocol, setProtocol] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const currentProtocol = window.location.protocol // http: veya https: döner
    setProtocol(currentProtocol)
  }, [])

  const handleDownload = async (fileUrl) => {
    // İndirme işlemine başlandığında loading'i true yapıyoruz
    setDownloading(true)

    try {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error('Dosya indirilemedi.')
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = fileUrl.split('/').pop()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Hata:', error)
    } finally {
      setDownloading(false)
      onClose()
    }
  }

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
            <FaRegFileAlt /> {fileColumn.includes('Offer_File') ? 'Teklif Dosyası' : 'Maliyet Dosyası'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {initialData[fileColumn] ? (
          <>
            <div className='modal-body one-column'>
              <div className='field-group'>
                <input
                  className='field-control'
                  value={decodeURIComponent(initialData[fileColumn].split('/').pop())}
                  disabled
                />
              </div>
            </div>
            <div className='modal-footer'>
              <div className='flex gap-1'>
                <button
                  type='button'
                  className='submit-button flex justify-center items-center'
                  disabled={downloading}
                  onClick={() => handleDownload(initialData[fileColumn].replace('http:', protocol))}
                >
                  {downloading ? <CgSpinner className='text-3xl animate-spin' /> : 'İndir'}
                </button>

                <a href={`${initialData[fileColumn].replace('http:', protocol)}`} target='_blank' download>
                  <button type='button' className='submit-button h-full' onClick={onClose}>
                    <RxOpenInNewWindow className='text-2xl' />
                  </button>
                </a>
              </div>
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              [fileColumn]: initialData?.[fileColumn] || null,
            }}
            validationSchema={Yup.object().shape({
              [fileColumn]: Yup.mixed()
                .required('Lütfen yüklemek istediğiniz dosyayı seçiniz!')
                .test('fileSize', 'Dosya boyutu 0’dan büyük olmalıdır.', (value) => {
                  return value && value.size > 0
                }),
            })}
            onSubmit={(values) => {
              // Objeden dosya alanları kaldırıldı, yoksa api hata veriyor
              const cleanedSituationCard = Object.keys(initialData)
                .filter((key) => !key.includes('File'))
                .reduce((acc, key) => ({ ...acc, [key]: initialData[key] }), {})

              // Güncellenen veriyi kaydet
              dispatch(updateSalesOfferWithFile({ ...cleanedSituationCard, ...values }))
              onClose()
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className='modal-body one-column'>
                  <div className='field-group'>
                    <input
                      type='file'
                      onChange={(e) => setFieldValue(fileColumn, e.target.files[0])}
                      className='rounded text-md border border-slate-300 file:mr-4 file:py-2 file:px-4 file:border-0 text-gray-400 file:font-semibold file:bg-gray-200 hover:file:bg-gray-300'
                    />

                    <ErrorMessage name={fileColumn} component='div' className='field-error-message' />
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='submit' className='submit-button '>
                    Yükle
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {loading && <Loader />}
    </>,
    document.body
  )
}
export default CardFileModal
