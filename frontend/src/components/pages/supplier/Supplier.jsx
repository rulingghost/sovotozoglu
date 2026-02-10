import { IoGitNetworkOutline, IoMdAddCircle } from '../../../styles/icons'
import Loader from '../../custom/Loader'
import SupplierModal from './SupplierModal'
import SupplierTable from './SupplierTable'
import ErrorOccurred from '../../custom/ErrorOccurred'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers, addSupplier, updateSupplier } from '../../../store/slices/supplierSlice'

function Supplier() {
  const dispatch = useDispatch()
  const { suppliers, loading, error } = useSelector((state) => state.supplier)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchSuppliers()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForAdd = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowModal(true)
  }

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (supplier) => {
    if (currentData) {
      dispatch(updateSupplier({ id: currentData.id, ...supplier }))
    } else {
      dispatch(addSupplier(supplier))
    }
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <IoGitNetworkOutline className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Tedarikçiler</p>
        </div>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <IoMdAddCircle className='text-lg' /> Tedarikçi Ekle
          </button>
        </div>
      </div>

      <SupplierTable data={suppliers} handleEdit={openModalForEdit} />

      {showModal && (
        <SupplierModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default Supplier
