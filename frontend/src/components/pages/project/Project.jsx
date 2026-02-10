import { RiLightbulbFlashLine, PiFlagBannerFill } from '../../../styles/icons'
import Loader from '../../custom/Loader'
import ProjectModal from './ProjectModal'
import ProjectTable from './ProjectTable'
import ErrorOccurred from '../../custom/ErrorOccurred'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, addProject, updateProject } from '../../../store/slices/projectSlice'

function Project() {
  const dispatch = useDispatch()
  const { projects, loading, error } = useSelector((state) => state.project)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchProjects()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForAdd = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowModal(true)
  }

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (project) => {
    if (currentData) {
      dispatch(updateProject({ id: currentData.id, ...project }))
    } else {
      dispatch(addProject(project))
    }
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <RiLightbulbFlashLine className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Projeler</p>
        </div>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <PiFlagBannerFill className='text-lg' /> Proje Başlat
          </button>
        </div>
      </div>

      <ProjectTable data={projects} handleEdit={openModalForEdit} handleProjectDetail={true} />

      {showModal && (
        <ProjectModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}
export default Project
