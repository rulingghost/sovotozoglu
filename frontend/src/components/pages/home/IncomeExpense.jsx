import { formatNumber } from '../../../utils/valueFormatters'

const getLatestProjectIncomes = (projects) => {
  // Tüm project_incomes'ları birleştir
  const allIncomes = []

  projects.forEach((project) => {
    project.project_incomes.forEach((income) => {
      allIncomes.push({
        Amount_Usd_Incomes: parseFloat(income.Amount_Usd_Incomes),
        CompanyName_Clients: project.client.CompanyName_Clients,
        id: income.id, // Eğer income id'si varsa, income ID'sini de ekleyebilirsiniz
      })
    })
  })

  // ID'ye göre azalan şekilde sıralama yap
  allIncomes.sort((a, b) => b.id - a.id)

  // Son 10 kaydı almak
  const last10Incomes = allIncomes.slice(0, 10)

  // Sadece gerekli alanları döndür
  return last10Incomes.map((income) => ({
    Amount_Usd_Incomes: income.Amount_Usd_Incomes,
    CompanyName_Clients: income.CompanyName_Clients,
  }))
}

const getLatestProjectExpenses = (projects) => {
  // Tüm project_expenses'ları birleştir
  const allExpenses = []

  projects.forEach((project) => {
    project.project_expenses.forEach((expense) => {
      allExpenses.push({
        Amount_USD_Expenses: parseFloat(expense.Amount_USD_Expenses),
        CompanyName_Supplier: expense.supplier_expenses.CompanyName_Supplier,
        id: expense.id, // Eğer expense id'si varsa, expense ID'sini de ekleyebilirsiniz
      })
    })
  })

  // ID'ye göre azalan şekilde sıralama yap
  allExpenses.sort((a, b) => b.id - a.id)

  // Son 10 kaydı almak
  const last10Expenses = allExpenses.slice(0, 10)

  // Sadece gerekli alanları döndür
  return last10Expenses.map((expense) => ({
    Amount_USD_Expenses: expense.Amount_USD_Expenses,
    CompanyName_Supplier: expense.CompanyName_Supplier,
  }))
}

const calculateProjectTotals = (projects) => {
  let totalCostNotIncludingKDV = 0
  let totalIncome = 0
  let totalDifference = 0

  projects.forEach((project) => {
    // Projenin Cost_NotIncludingKDV değerini ekle
    totalCostNotIncludingKDV += parseFloat(project.Cost_NotIncludingKDV)

    // Projedeki project_incomes içerisindeki Amount_Usd_Incomes değerlerini topla
    const projectIncomeTotal = project.project_incomes.reduce((sum, income) => {
      return sum + parseFloat(income.Amount_Usd_Incomes)
    }, 0)

    // Projenin toplam gelirini ekle
    totalIncome += projectIncomeTotal

    // Cost_NotIncludingKDV - Toplam Gelir farkını hesapla
    const difference = parseFloat(project.Cost_NotIncludingKDV) - projectIncomeTotal
    totalDifference += difference
  })

  return {
    totalCostNotIncludingKDV,
    totalIncome,
    totalDifference,
  }
}

const calculateJobHistoryAndExpensesTotals = (projects) => {
  let totalJobHistory = 0
  let totalExpenses = 0

  projects.forEach((project) => {
    // JobHistory toplamı
    project.project_jobhistories.forEach((jobHistory) => {
      totalJobHistory += parseFloat(jobHistory.Amount_USD_JobHistory || 0)
    })

    // Expenses toplamı
    project.project_expenses.forEach((expense) => {
      totalExpenses += parseFloat(expense.Amount_USD_Expenses || 0)
    })
  })

  return {
    totalJobHistory,
    totalExpenses,
  }
}

function IncomeExpense({ data }) {
  const latestProjectIncomes = getLatestProjectIncomes(data)
  const latestProjectExpenses = getLatestProjectExpenses(data)
  const projectTotals = calculateProjectTotals(data)
  const jobAndExpenseTotals = calculateJobHistoryAndExpensesTotals(data)

  return (
    <div className='flex flex-col h-full'>
      <div className='grid grid-cols-2 rounded-xl p-3 h-[80%] bg-white'>
        <div className='flex flex-col p-2 overflow-auto custom-table-scroll'>
          <span className='text-sm font-bold text-soento-green'>GELİR KAYITLARI</span>
          <span className='text-xs font-semibold text-soento-green'>Son 10 Kayıt</span>

          <div className='flex flex-col mt-3'>
            {latestProjectIncomes.map((income, index) => (
              <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                <div className='flex flex-col overflow-hidden'>
                  <p className='truncate text-left text-xs'>{income.CompanyName_Clients}</p>
                </div>
                <span className='text-xs font-bold text-nowrap text-green-800'>
                  {formatNumber(income.Amount_Usd_Incomes)} $
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col p-2 overflow-auto custom-table-scroll'>
          <span className='text-sm font-bold text-soento-green'>GİDER KAYITLARI</span>
          <span className='text-xs font-semibold text-soento-green'>Son 10 Kayıt</span>

          <div className='flex flex-col mt-3'>
            {latestProjectExpenses.map((expense, index) => (
              <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                <div className='flex flex-col overflow-hidden'>
                  <p className='truncate text-left text-xs'>{expense.CompanyName_Supplier}</p>
                </div>
                <span className='text-xs font-bold text-nowrap text-red-800'>
                  {formatNumber(expense.Amount_USD_Expenses)} $
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 items-center h-[20%]'>
        <div className='flex flex-col gap-2 px-3 text-white'>
          <div className='flex justify-between'>
            <span className='text-sm font-semibold'>ÖDENEN</span>
            <span className='text-sm font-semibold'>{formatNumber(projectTotals.totalIncome)} $</span>
          </div>
          <div className='w-full rounded-3xl h-4 p-1 bg-gray-100'>
            <div
              className='h-2 rounded-3xl bg-green-700'
              style={{ width: `${(projectTotals.totalIncome / projectTotals.totalCostNotIncludingKDV) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className='flex flex-col gap-2 px-3 text-white'>
          <div className='flex justify-between'>
            <span className='text-sm font-semibold'>KALAN</span>
            <span className='text-sm font-semibold'>
              {formatNumber(jobAndExpenseTotals.totalJobHistory - jobAndExpenseTotals.totalExpenses)} $
            </span>
          </div>
          <div className='w-full rounded-3xl h-4 p-1 bg-gray-100'>
            <div
              className='h-2 rounded-3xl bg-green-700'
              style={{
                width: `${100 - (jobAndExpenseTotals.totalExpenses / jobAndExpenseTotals.totalJobHistory) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IncomeExpense
