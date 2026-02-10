import { LuUsers2, IoMdAddCircle } from '../../../styles/icons'
import Loader from '../../custom/Loader'
import ClientModal from './ClientModal'
import ClientTable from './ClientTable'
import ErrorOccurred from '../../custom/ErrorOccurred'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients, addClient, updateClient } from '../../../store/slices/clientSlice'

function Client() {
  const dispatch = useDispatch()
  const { clients, loading, error } = useSelector((state) => state.client)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchClients()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForAdd = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowModal(true)
  }

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (client) => {
    if (currentData) {
      dispatch(updateClient({ id: currentData.id, ...client }))
    } else {
      dispatch(addClient(client))
    }
  }

  // const handleDelete = (clientId) => {
  //   if (window.confirm('Kaydı silmek istediğinizden emin misiniz?')) {
  //     dispatch(deleteClient(clientId))
  //   }
  // }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <LuUsers2 className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Müşteriler</p>
        </div>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <IoMdAddCircle className='text-lg' /> Müşteri Ekle
          </button>
        </div>
      </div>

      <ClientTable data={clients} handleEdit={openModalForEdit} />
      {/* <ClientTable data={clients} handleEdit={openModalForEdit} handleDelete={handleDelete} /> */}

      {showModal && (
        <ClientModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default Client
