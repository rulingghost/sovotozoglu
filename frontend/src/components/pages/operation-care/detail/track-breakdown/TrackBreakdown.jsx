import { useEffect, useState } from 'react'
import ErrorOccurred from '../../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../custom/Loader'
import TrackBreakdownTable from './TrackBreakdownTable'
import { fetchFails, updateFail } from '../../../../../store/slices/operationCareSlice'
import { useParams } from 'react-router-dom'
import BreakdownModal from '../../breakdown/BreakdownModal'

function TrackBreakdown() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { fails, loading, error } = useSelector((state) => state.operationCare)
  const [filteredFails, setFilteredFails] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchFails()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  useEffect(() => {
    if (fails && Array.isArray(fails)) {
      const filtered = fails.filter((poll) => poll.Fail_Operation_Care == id)
      setFilteredFails(filtered)
    }
  }, [fails, id])

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
      <TrackBreakdownTable data={filteredFails} handleEdit={openModalForEdit} />

      {showModal && (
        <BreakdownModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default TrackBreakdown
