import Loader from '../../../custom/Loader'
import ProjectExpenseTable from './ProjectExpenseTable'
import ProjectExpenseModal from './ProjectExpenseModal'
import ProjectJobHistoryTable from './ProjectJobHistoryTable'
import ProjectJobHistoryModal from './ProjectJobHistoryModal'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatNumber } from '../../../../utils/valueFormatters'
import {
  IoMenu,
  IoMdAddCircle,
  IoMdArrowRoundBack,
  BiDollarCircle,
  TbCurrencyLira,
  MdPriceChange,
  IoChevronForward,
  IoChevronBackOutline,
  FaFilterCircleXmark,
} from '../../../../styles/icons'
import {
  fetchSingleProject,
  addProjectExpense,
  updateProjectExpense,
  addProjectJobHistory,
  updateProjectJobHistory,
} from '../../../../store/slices/projectSlice'

function ProjectRealizedCost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { singleProject, loading, error } = useSelector((state) => state.project)

  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showJobHistoryModal, setShowJobHistoryModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için

  const [mobileMenu, setMobileMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(true) // Açılır menü
  const menuRef = useRef(null) // Açılır menü referansı

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuRef])

  useEffect(() => {
    dispatch(fetchSingleProject(id)) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch, id])

  const openModalForAddExpense = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowExpenseModal(true)
  }

  const openModalForEditExpense = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowExpenseModal(true)
  }

  const openModalForAddJobHistory = () => {
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowJobHistoryModal(true)
  }

  const openModalForEditJobHistory = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowJobHistoryModal(true)
  }

  const handleSubmitExpense = (projectExpense) => {
    if (currentData) {
      dispatch(updateProjectExpense({ id: currentData.id, ...projectExpense }))
    } else {
      dispatch(addProjectExpense(projectExpense))
    }
  }

  const handleSubmitJobHistory = (projectJobHistory) => {
    if (currentData) {
      dispatch(updateProjectJobHistory({ id: currentData.id, ...projectJobHistory }))
    } else {
      dispatch(addProjectJobHistory(projectJobHistory))
    }
  }

  //---------------------------------------------------------------------------------------------

  const [suppliers, setSuppliers] = useState([])
  const [selectedSupplierId, setSelectedSupplierId] = useState(null)
  const [totals, setTotals] = useState({
    amountExpenses: 0,
    amountUsdExpenses: 0,
    amountJobHistory: 0,
    amountUsdJobHistory: 0,
  })

  // Tekil tedarikçileri listeye aktarma
  useEffect(() => {
    if (singleProject) {
      const uniqueSuppliers = new Map()

      singleProject.project_expenses.forEach(({ supplier_expenses }) => {
        uniqueSuppliers.set(supplier_expenses.id, supplier_expenses.CompanyName_Supplier)
      })

      singleProject.project_jobhistories.forEach(({ supplier_jobhistories }) => {
        uniqueSuppliers.set(supplier_jobhistories.id, supplier_jobhistories.CompanyName_Supplier)
      })

      setSuppliers(Array.from(uniqueSuppliers, ([id, name]) => ({ id, name })))
    }
  }, [singleProject])

  // Seçili tedarikçinin tutarlarını toplama
  useEffect(() => {
    if (selectedSupplierId) {
      const totalExpenses = singleProject.project_expenses.reduce(
        (acc, expense) => {
          if (expense.supplier_expenses.id === selectedSupplierId) {
            acc.amountExpenses += parseFloat(expense.Amount_Expenses)
            acc.amountUsdExpenses += parseFloat(expense.Amount_USD_Expenses)
          }
          return acc
        },
        { amountExpenses: 0, amountUsdExpenses: 0 }
      )

      const totalJobHistory = singleProject.project_jobhistories.reduce(
        (acc, jobHistory) => {
          if (jobHistory.supplier_jobhistories.id === selectedSupplierId) {
            acc.amountJobHistory += parseFloat(jobHistory.Amount_JobHistory)
            acc.amountUsdJobHistory += parseFloat(jobHistory.Amount_USD_JobHistory)
          }
          return acc
        },
        { amountJobHistory: 0, amountUsdJobHistory: 0 }
      )

      setTotals({
        amountExpenses: totalExpenses.amountExpenses,
        amountUsdExpenses: totalExpenses.amountUsdExpenses,
        amountJobHistory: totalJobHistory.amountJobHistory,
        amountUsdJobHistory: totalJobHistory.amountUsdJobHistory,
      })
    } else {
      // -------------------------------------------------------------------
      if (singleProject) {
        const totalExpenses = singleProject.project_expenses.reduce(
          (acc, expense) => {
            acc.amountExpenses += parseFloat(expense.Amount_Expenses)
            acc.amountUsdExpenses += parseFloat(expense.Amount_USD_Expenses)
            return acc
          },
          { amountExpenses: 0, amountUsdExpenses: 0 }
        )

        const totalJobHistory = singleProject.project_jobhistories.reduce(
          (acc, jobHistory) => {
            acc.amountJobHistory += parseFloat(jobHistory.Amount_JobHistory)
            acc.amountUsdJobHistory += parseFloat(jobHistory.Amount_USD_JobHistory)
            return acc
          },
          { amountJobHistory: 0, amountUsdJobHistory: 0 }
        )

        setTotals({
          amountExpenses: totalExpenses.amountExpenses,
          amountUsdExpenses: totalExpenses.amountUsdExpenses,
          amountJobHistory: totalJobHistory.amountJobHistory,
          amountUsdJobHistory: totalJobHistory.amountUsdJobHistory,
        })
      }
      // -------------------------------------------------------------------
    }
  }, [selectedSupplierId, singleProject])

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
            onClick={openModalForAddJobHistory}
          >
            <IoMdAddCircle className='text-xl' /> İş Ekle
          </button>

          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAddExpense}
          >
            <IoMdAddCircle className='text-xl' /> Ödeme Ekle
          </button>

          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-gray-200 text-soento-green hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate(`/project/details/realized-cost-summary/${id}`)}
          >
            <MdPriceChange className='text-xl' /> Toplam Maliyet
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
                  onClick={openModalForAddJobHistory}
                >
                  <IoMdAddCircle className='text-xl' /> İş Ekle
                </button>
                <button
                  className='flex gap-2 items-center rounded-xl p-2 font-medium bg-soento-white text-soento-green'
                  onClick={openModalForAddExpense}
                >
                  <IoMdAddCircle className='text-xl' /> Ödeme Ekle
                </button>
                <button
                  className='flex gap-2 items-center rounded-xl p-2 font-medium bg-soento-white text-soento-green'
                  onClick={() => navigate(`/project/details/realized-cost-summary/${id}`)}
                >
                  <MdPriceChange className='text-xl' /> Toplam Maliyet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col xl:flex-row gap-2'>
        <div className='flex flex-col xl:w-[49%]'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4'>
            <InfoBox
              label='Gerçekleşen İş'
              data={formatNumber(totals?.amountUsdJobHistory || 0)}
              icon={<BiDollarCircle />}
            />
            <InfoBox
              label='Gerçekleşen İş'
              data={formatNumber(totals?.amountJobHistory || 0)}
              icon={<TbCurrencyLira />}
            />
          </div>

          <ProjectJobHistoryTable
            data={
              selectedSupplierId
                ? singleProject.project_jobhistories.filter(
                    (jobHistory) => jobHistory.supplier_jobhistories.id === selectedSupplierId
                  )
                : singleProject?.project_jobhistories || []
            }
            handleEdit={openModalForEditJobHistory}
          />
        </div>

        <div className='hidden xl:block w-[2px] h-full rounded-full bg-soento-green'></div>

        <div className='flex flex-col xl:w-[49%]'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4'>
            <InfoBox
              label='Gerçekleşen Ödeme'
              data={formatNumber(totals?.amountUsdExpenses || 0)}
              icon={<BiDollarCircle />}
            />
            <InfoBox
              label='Gerçekleşen Ödeme'
              data={formatNumber(totals?.amountExpenses || 0)}
              icon={<TbCurrencyLira />}
            />
          </div>

          <ProjectExpenseTable
            data={
              selectedSupplierId
                ? singleProject.project_expenses.filter(
                    (expense) => expense.supplier_expenses.id === selectedSupplierId
                  )
                : singleProject?.project_expenses || []
            }
            handleEdit={openModalForEditExpense}
          />
        </div>
      </div>

      <div className='flex flex-col items-center rounded-xl shadow-lg py-2 mt-4 text-white bg-soento-green'>
        <span className='font-semibold text-xs'>KALAN ÖDEME</span>
        <div className='grid grid-cols-2 mt-1 size-full'>
          <span className='font-semibold text-lg border-r px-3 ms-auto'>
            {totals ? formatNumber(totals.amountJobHistory - totals.amountExpenses) : '0,00'} ₺
          </span>
          <span className='font-semibold text-lg border-l px-3'>
            {totals ? formatNumber(totals.amountUsdJobHistory - totals.amountUsdExpenses) : '0,00'} $
          </span>
        </div>
      </div>

      {/* Açılır menü */}
      <div className='fixed top-1/2 transform -translate-y-1/2 flex items-center -ms-5'>
        {showMenu && (
          <div
            className='flex flex-col gap-4 rounded-r-xl w-52 h-80 p-6 shadow-lg  overflow-y-scroll no-scrollbar bg-gradient-to-r from-[#085653] via-[#085653] to-[#0b7a76]'
            ref={menuRef}
          >
            <div className='flex justify-between items-center'>
              <span className='text-white font-semibold text-sm tracking-wider'>Tedarikçi Listesi</span>
              {selectedSupplierId && (
                <button className='text-white' onClick={() => setSelectedSupplierId(null)}>
                  <FaFilterCircleXmark className='text-xl' />
                </button>
              )}
            </div>

            <ul className='relative border-l mt-1 border-[#07908b]'>
              {suppliers.map((supplier) => (
                <li key={supplier.id} className='mb-3 ml-4 relative'>
                  <span className='absolute w-4 h-4 bg-[#07908b] rounded-full -left-6 top-1/2 transform -translate-y-1/2'></span>
                  <button
                    className={`rounded-lg py-1 px-2 w-full text-left hover:bg-[#07908b] hover:text-white ${
                      selectedSupplierId === supplier.id ? 'bg-[#07908b] text-white' : 'text-white'
                    }`}
                    onClick={() => setSelectedSupplierId(supplier.id)}
                  >
                    <div className='flex overflow-hidden'>
                      <p className='truncate text-left font-semibold pl-1'>{supplier.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Açılır menü kenarları */}
            <div
              className='absolute -top-10 left-0 size-10 bg-transparent rounded-bl-[50%] -z-10'
              style={{ boxShadow: '0 20px 0 0 #085653' }}
            ></div>
            <div
              className='absolute -bottom-10 left-0 size-10 bg-transparent rounded-tl-[50%] -z-10'
              style={{ boxShadow: '0 -20px 0 0 #085653' }}
            ></div>
          </div>
        )}

        <button
          className='py-10 rounded-r-lg bg-[#0b7a76] text-white text-2xl'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <IoChevronBackOutline /> : <IoChevronForward />}
        </button>
      </div>

      {showExpenseModal && (
        <ProjectExpenseModal
          initialData={currentData}
          onSubmit={handleSubmitExpense}
          onClose={() => setShowExpenseModal(false)}
        />
      )}

      {showJobHistoryModal && (
        <ProjectJobHistoryModal
          initialData={currentData}
          onSubmit={handleSubmitJobHistory}
          onClose={() => setShowJobHistoryModal(false)}
        />
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

export default ProjectRealizedCost
