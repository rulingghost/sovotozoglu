import { IoMdArrowRoundBack, BiDollarCircle, TbCurrencyLira } from '../../../../styles/icons'
import Loader from '../../../custom/Loader'
import ProjectCostSummaryTable from './ProjectCostSummaryTable'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatNumber } from '../../../../utils/valueFormatters'
import { fetchSingleProject } from '../../../../store/slices/projectSlice'

const calculateTotals = (singleProject) => {
  const supplierTotals = {}

  singleProject.project_jobhistories.forEach((job) => {
    const supplierId = job.supplier_jobhistories.id
    const supplierName = job.supplier_jobhistories.CompanyName_Supplier

    if (!supplierTotals[supplierId]) {
      supplierTotals[supplierId] = {
        id: supplierId,
        supplierName: supplierName,
        totalJobAmount: 0,
        totalJobAmountUSD: 0,
        totalExpenseAmount: 0,
        totalExpenseAmountUSD: 0,
      }
    }

    supplierTotals[supplierId].totalJobAmount += parseFloat(job.Amount_JobHistory) || 0
    supplierTotals[supplierId].totalJobAmountUSD += parseFloat(job.Amount_USD_JobHistory) || 0
  })

  singleProject.project_expenses.forEach((expense) => {
    const supplierId = expense.supplier_expenses.id
    const supplierName = expense.supplier_expenses.CompanyName_Supplier

    if (!supplierTotals[supplierId]) {
      supplierTotals[supplierId] = {
        id: supplierId,
        supplierName: supplierName,
        totalJobAmount: 0,
        totalJobAmountUSD: 0,
        totalExpenseAmount: 0,
        totalExpenseAmountUSD: 0,
      }
    }

    supplierTotals[supplierId].totalExpenseAmount += parseFloat(expense.Amount_Expenses) || 0
    supplierTotals[supplierId].totalExpenseAmountUSD += parseFloat(expense.Amount_USD_Expenses) || 0
  })

  return Object.values(supplierTotals)
}

function ProjectCostSummary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singleProject, loading, error } = useSelector((state) => state.project)

  const [tableRecords, setTableRecords] = useState(null)

  const [totals, setTotals] = useState({
    totalJobAmount: 0,
    totalJobAmountUSD: 0,
    totalExpenseAmount: 0,
    totalExpenseAmountUSD: 0,
  })

  useEffect(() => {
    dispatch(fetchSingleProject(id)) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch, id])

  useEffect(() => {
    if (singleProject) {
      setTableRecords(calculateTotals(singleProject))
    }
  }, [singleProject])

  useEffect(() => {
    if (tableRecords) {
      const calculatedTotals = tableRecords.reduce(
        (acc, item) => {
          acc.totalJobAmount += item.totalJobAmount
          acc.totalJobAmountUSD += item.totalJobAmountUSD
          acc.totalExpenseAmount += item.totalExpenseAmount
          acc.totalExpenseAmountUSD += item.totalExpenseAmountUSD
          return acc
        },
        { totalJobAmount: 0, totalJobAmountUSD: 0, totalExpenseAmount: 0, totalExpenseAmountUSD: 0 }
      )

      setTotals(calculatedTotals)
    }
  }, [tableRecords])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className='text-lg' /> Proje Maliyet
          </button>
        </div>

        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <div className='flex items-center gap-3 rounded-full px-5 py-1 bg-soento-green text-soento-white'>
            <p>Proje : {singleProject?.ProjectName}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4'>
        <InfoBox
          label='Toplam İş Bedeli'
          data={totals ? formatNumber(totals.totalJobAmountUSD) : '0,00'}
          icon={<BiDollarCircle />}
        />
        <InfoBox
          label='Toplam İş Bedeli'
          data={totals ? formatNumber(totals.totalJobAmount) : '0,00'}
          icon={<TbCurrencyLira />}
        />

        <InfoBox
          label='Toplam Gider'
          data={totals ? formatNumber(totals.totalExpenseAmountUSD) : '0,00'}
          icon={<BiDollarCircle />}
        />
        <InfoBox
          label='Toplam Gider'
          data={totals ? formatNumber(totals.totalExpenseAmount) : '0,00'}
          icon={<TbCurrencyLira />}
        />
      </div>

      <ProjectCostSummaryTable data={tableRecords ? tableRecords : []} />

      <div className='flex flex-col items-center rounded-xl shadow-lg pt-3 pb-2 mt-4 text-white bg-soento-green'>
        <span className='font-semibold text-xs'>KALAN ÖDEME</span>
        <div className='flex gap-4'>
          <span className='font-semibold text-lg'>
            {totals ? formatNumber(totals.totalJobAmountUSD - totals.totalExpenseAmountUSD) : '0,00'}$
          </span>
          <span className='font-semibold text-lg'>
            {totals ? formatNumber(totals.totalJobAmount - totals.totalExpenseAmount) : '0,00'}₺
          </span>
        </div>
      </div>

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

export default ProjectCostSummary
