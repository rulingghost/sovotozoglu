import { useEffect, useState } from 'react'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import BreakdownTable from './BreakdownTable'
import BreakdownModal from './BreakdownModal'
import { fetchFails, updateFail } from '../../../../store/slices/operationCareSlice'

function Breakdown() {
  const dispatch = useDispatch()
  const { fails, loading, error } = useSelector((state) => state.operationCare)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchFails()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (fail) => {
    dispatch(updateFail({ id: currentData.id, ...fail }))
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <BreakdownTable data={fails} handleEdit={openModalForEdit} />

      {showModal && (
        <BreakdownModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default Breakdown
