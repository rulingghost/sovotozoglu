import Loader from '../../../custom/Loader'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../../../store/slices/projectSlice'
import { BiDollarCircle, TbCurrencyLira } from '../../../../styles/icons'
import { formatNumber } from '../../../../utils/valueFormatters'
import TableIncome from './TableIncome'
import TableExpense from './TableExpense'
import TableJobHistory from './TableJobHistory'
import SeperatedReportItem from './SeperatedReportItem'

const processDataIncome = (projects) => {
  const resultIncome = []
  let totalTRYIncome = 0
  let totalUSDIncome = 0

  projects.forEach((project) => {
    const { ProjectName, project_incomes } = project

    project_incomes.forEach((income) => {
      const {
        id,
        client_incomes: { CompanyName_Clients },
        Amount_Incomes,
        Dollar_Rate_Incomes,
        Amount_Usd_Incomes,
        CompanyName_ReceivePayment_Incomes,
        PaymentType_Incomes,
        ChekDate_Incomes,
      } = income

      const amountTRY = parseFloat(Amount_Incomes)
      const amountUSD = parseFloat(Amount_Usd_Incomes)

      resultIncome.push({
        id,
        ProjectName,
        ClientName: CompanyName_Clients,
        AmountTRY: amountTRY,
        DollarRate: Dollar_Rate_Incomes,
        AmountUSD: amountUSD,
        PaymentReceiver: CompanyName_ReceivePayment_Incomes,
        PaymentType: PaymentType_Incomes,
        Date: ChekDate_Incomes,
      })

      totalTRYIncome += amountTRY
      totalUSDIncome += amountUSD
    })
  })

  return { resultIncome, totalTRYIncome, totalUSDIncome }
}

const processDataExpense = (projects) => {
  const resultExpense = []
  let totalTRYExpense = 0
  let totalUSDExpense = 0

  projects.forEach((project) => {
    const { ProjectName, project_expenses } = project

    project_expenses.forEach((expense) => {
      const {
        id,
        supplier_expenses: { CompanyName_Supplier },
        Amount_Expenses,
        Dollar_Rate_Expenses,
        Amount_USD_Expenses,
        Bank_Expenses,
        ExpensDetails_Expenses,
        Date_Expenses,
      } = expense

      const amountTRY = parseFloat(Amount_Expenses)
      const amountUSD = parseFloat(Amount_USD_Expenses)

      resultExpense.push({
        id,
        ProjectName,
        SupplierName: CompanyName_Supplier,
        AmountTRY: amountTRY,
        DollarRate: Dollar_Rate_Expenses,
        AmountUSD: amountUSD,
        BankName: Bank_Expenses,
        Description: ExpensDetails_Expenses,
        Date: Date_Expenses,
      })

      totalTRYExpense += amountTRY
      totalUSDExpense += amountUSD
    })
  })

  return { resultExpense, totalTRYExpense, totalUSDExpense }
}

const processDataJobHistory = (projects) => {
  const resultJobHistory = []
  let totalTRYJobHistory = 0
  let totalUSDJobHistory = 0

  projects.forEach((project) => {
    const { ProjectName, project_jobhistories } = project

    project_jobhistories.forEach((expense) => {
      const {
        id,
        supplier_jobhistories: { CompanyName_Supplier },
        Amount_JobHistory,
        Dollar_Rate_JobHistory,
        Amount_USD_JobHistory,
        ExpensDetails_JobHistory,
        Invoice_No_JobHistory,
        Date_JobHistory,
      } = expense

      const amountTRY = parseFloat(Amount_JobHistory)
      const amountUSD = parseFloat(Amount_USD_JobHistory)

      resultJobHistory.push({
        id,
        ProjectName,
        SupplierName: CompanyName_Supplier,
        AmountTRY: amountTRY,
        DollarRate: Dollar_Rate_JobHistory,
        AmountUSD: amountUSD,
        Detail: ExpensDetails_JobHistory,
        InvoiceNo: Invoice_No_JobHistory,
        Date: Date_JobHistory,
      })

      totalTRYJobHistory += amountTRY
      totalUSDJobHistory += amountUSD
    })
  })

  return { resultJobHistory, totalTRYJobHistory, totalUSDJobHistory }
}

function IncomeExpense() {
  const dispatch = useDispatch()
  const { projects, loading, error } = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(fetchProjects()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const { resultIncome, totalTRYIncome, totalUSDIncome } = processDataIncome(projects)

  const { resultExpense, totalTRYExpense, totalUSDExpense } = processDataExpense(projects)

  const { resultJobHistory, totalTRYJobHistory, totalUSDJobHistory } = processDataJobHistory(projects)

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
        <div className='flex flex-col gap-2'>
          <InfoBox
            label='Toplam Gelir'
            data={resultIncome ? formatNumber(totalUSDIncome) : '0,00'}
            icon={<BiDollarCircle />}
          />
          <InfoBox
            label='Toplam Gelir'
            data={resultIncome ? formatNumber(totalTRYIncome) : '0,00'}
            icon={<TbCurrencyLira />}
          />

          <SeperatedReportItem type='genel' />

          <TableIncome data={resultIncome ?? []} />
        </div>

        <div className='flex flex-col gap-2'>
          <InfoBox
            label='Toplam İş'
            data={resultJobHistory ? formatNumber(totalUSDJobHistory) : '0,00'}
            icon={<BiDollarCircle />}
          />
          <InfoBox
            label='Toplam İş'
            data={resultJobHistory ? formatNumber(totalTRYJobHistory) : '0,00'}
            icon={<TbCurrencyLira />}
          />

          <SeperatedReportItem type='detay' />

          <TableJobHistory data={resultJobHistory ?? []} />
        </div>

        <div className='flex flex-col gap-2'>
          <InfoBox
            label='Toplam Gider'
            data={resultExpense ? formatNumber(totalUSDExpense) : '0,00'}
            icon={<BiDollarCircle />}
          />
          <InfoBox
            label='Toplam Gider'
            data={resultExpense ? formatNumber(totalTRYExpense) : '0,00'}
            icon={<TbCurrencyLira />}
          />

          <SeperatedReportItem type='kar' />

          <TableExpense data={resultExpense ?? []} />
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

export default IncomeExpense
