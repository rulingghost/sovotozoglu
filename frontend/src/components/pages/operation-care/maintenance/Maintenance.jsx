import { fetchOperationCares, fetchFails, updateOperationCare } from '../../../../store/slices/operationCareSlice'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import { useEffect, useState } from 'react'
import MaintenanceTable from './MaintenanceTable'
import MaintenanceModal from './MaintenanceModal'

function Maintenance() {
  const dispatch = useDispatch()
  const { operationCares, fails, loading, error } = useSelector((state) => state.operationCare)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchOperationCares()) // Sayfa yüklenirken tüm veriyi getir
    dispatch(fetchFails()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (maintenance) => {
    dispatch(updateOperationCare({ id: currentData.id, ...maintenance }))
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <MaintenanceTable
        data={operationCares}
        fails={fails}
        handleEdit={openModalForEdit}
        handleMaintenanceDetail={true}
      />

      {showModal && (
        <MaintenanceModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default Maintenance
