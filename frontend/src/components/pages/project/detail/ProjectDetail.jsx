import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchClients } from '../../../../store/slices/clientSlice'
import { fetchSingleProject } from '../../../../store/slices/projectSlice'
import { IoMdArrowRoundBack } from '../../../../styles/icons'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import Loader from '../../../custom/Loader'
import { useEffect } from 'react'
import InfoPanel from './InfoPanel'
import InfoField from './InfoField'

function ProjectDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const { singleProject, ...projectsProps } = useSelector((state) => state.project)
  const { clients, ...clientsProps } = useSelector((state) => state.client)

  useEffect(() => {
    dispatch(fetchSingleProject(id)) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch, id])

  useEffect(() => {
    if (!clients || clients.length === 0) {
      dispatch(fetchClients())
    }
  }, [dispatch, clients])

  const projectClient = singleProject ? clients.find((client) => client.id == singleProject.Company_id) : null

  if (projectsProps.error) return <ErrorOccurred message={projectsProps.error} />
  if (clientsProps.error) return <ErrorOccurred message={clientsProps.error} />

  if (!projectClient || projectsProps.loading) return

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className='text-lg' /> Projeler
          </button>
        </div>

        <div className='flex items-center gap-3 rounded-full px-5 py-1 bg-soento-green text-soento-white'>
          <p>{projectClient.CompanyName_Clients}</p>
          <span>|</span>
          <p>{singleProject.CompanyUndertakingWork}</p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-5'>
        <div className='order-2 md:order-1 size-full'>
          <InfoField details={singleProject} />
        </div>
        <div className='order-1 md:order-2 size-full md:min-h-[85vh] md:max-w-[300px]'>
          <InfoPanel details={singleProject} />
        </div>
      </div>

      {(projectsProps.loading || clientsProps.loading) && <Loader />}
    </>
  )
}
export default ProjectDetail
