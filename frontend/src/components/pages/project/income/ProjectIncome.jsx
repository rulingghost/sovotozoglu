import Loader from '../../../custom/Loader'
import ProjectIncomeModal from './ProjectIncomeModal'
import ProjectIncomeTable from './ProjectIncomeTable'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatNumber } from '../../../../utils/valueFormatters'
import { fetchSingleProject, addProjectIncome, updateProjectIncome } from '../../../../store/slices/projectSlice'
import { IoMdAddCircle, IoMdArrowRoundBack, BiDollarCircle, TbCurrencyLira, IoMenu } from '../../../../styles/icons'

function ProjectIncome() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singleProject, loading, error } = useSelector((state) => state.project)
  const [mobileMenu, setMobileMenu] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  useEffect(() => {
    dispatch(fetchSingleProject(id)) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch, id])

  const openModalForAdd = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowModal(true)
  }

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (projectIncome) => {
    if (currentData) {
      dispatch(updateProjectIncome({ id: currentData.id, ...projectIncome }))
    } else {
      dispatch(addProjectIncome(projectIncome))
    }
  }

  // Sayfanın üstündeki bilgi alanları
  const [totalAmountTry, setTotalAmountTry] = useState(null)
  const [totalAmountUsd, setTotalAmountUsd] = useState(null)
  const [restOfAmount, setRestOfAmount] = useState(null)

  useEffect(() => {
    if (singleProject) {
      let tryTotal = 0
      let usdTotal = 0

      singleProject.project_incomes.forEach((item) => {
        tryTotal += Number(item.Amount_Incomes) || 0
        usdTotal += Number(item.Amount_Usd_Incomes) || 0
      })

      let restTotal = singleProject.Cost_NotIncludingKDV - usdTotal

      setTotalAmountTry(tryTotal)
      setTotalAmountUsd(usdTotal)
      setRestOfAmount(restTotal)
    }
  }, [singleProject])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className='text-lg' /> Proje Detay
          </button>
        </div>

        {/* desktop view */}
        <div className='hidden xl:flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <div className='flex items-center gap-3 rounded-full pl-5 pr-2 py-1 bg-soento-green text-soento-white'>
            <p>{singleProject?.ProjectName}</p>
            <span>|</span>
            <p>{singleProject?.client.CompanyName_Clients}</p>
            <span>|</span>
            <p>{singleProject?.CompanyUndertakingWork}</p>
          </div>

          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <IoMdAddCircle className='text-lg' /> Gelir Ekle
          </button>
        </div>

        {/* mobile view */}
        <div className='flex xl:hidden'>
          <button onClick={() => setMobileMenu(true)} className='px-2 text-soento-green'>
            <IoMenu className='text-3xl' />
          </button>
        </div>

        {/* menu */}
        {mobileMenu && (
          <div
            className='absolute top-0 left-0 z-10 w-full h-screen flex items-center justify-center bg-opacity-70 bg-black'
            onClick={() => setMobileMenu(false)}
          >
            <div className='rounded-xl p-4 w-4/5 max-w-sm bg-soento-white'>
              <div className='mobile-links flex flex-col gap-1.5'>
                <div className='flex flex-col gap-1 rounded-xl px-4 py-2 border border-gray-400 font-medium text-soento-green'>
                  <p>{singleProject?.ProjectName}</p>
                  <hr className='bg-soento-green' />
                  <p>{singleProject?.client.CompanyName_Clients}</p>
                  <hr className='bg-soento-green' />
                  <p>{singleProject?.CompanyUndertakingWork}</p>
                </div>

                <button
                  className='flex gap-2 items-center rounded-xl p-2 font-medium bg-soento-white text-soento-green'
                  onClick={openModalForAdd}
                >
                  <IoMdAddCircle className='text-lg' /> Gelir Ekle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4'>
        <InfoBox
          label='Hesaplanan İş Bedeli'
          data={singleProject ? formatNumber(singleProject.Cost_NotIncludingKDV) : '0,00'}
          icon={<BiDollarCircle />}
        />
        <InfoBox
          label='Gerçekleşen İş Bedeli'
          data={singleProject ? formatNumber(totalAmountUsd) : '0,00'}
          icon={<BiDollarCircle />}
        />
        <InfoBox
          label='Kalan İş Bedeli'
          data={singleProject ? formatNumber(restOfAmount) : '0,00'}
          icon={<BiDollarCircle />}
        />
        <InfoBox
          label='Gerçekleşen İş Bedeli'
          data={singleProject ? formatNumber(totalAmountTry) : '0,00'}
          icon={<TbCurrencyLira />}
        />
      </div>

      <ProjectIncomeTable data={singleProject ? singleProject.project_incomes : []} handleEdit={openModalForEdit} />

      {showModal && (
        <ProjectIncomeModal initialData={currentData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {loading && <Loader />}
    </>
  )
}

function InfoBox({ label, data, icon }) {
  return (
    <div className='flex items-center gap-4 py-3 ps-4 shadow border leading-none rounded-xl bg-white'>
      <div className='text-soento-green' style={{ fontSize: '40px' }}>
        {icon}
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-2xl text-stone-900'>{data}</span>
        <span className='text-sm font-semibold text-stone-900/70'>{label}</span>
      </div>
    </div>
  )
}

export default ProjectIncome
