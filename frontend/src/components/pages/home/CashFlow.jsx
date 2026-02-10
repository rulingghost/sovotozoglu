import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

function CashFlow({ data }) {
  // Mevcut yılları depolamak ve seçili yılı takip etmek için state
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [monthlyTotals, setMonthlyTotals] = useState([])

  // Yılları hesapla ve en güncelini seçili yap
  useEffect(() => {
    const allYears = new Set()

    // Project incomes ve expenses içerisindeki tüm yılları topla
    data.forEach((project) => {
      project.project_incomes.forEach((income) => {
        const year = new Date(income.ChekDate_Incomes).getFullYear()
        allYears.add(year)
      })
      project.project_expenses.forEach((expense) => {
        const year = new Date(expense.Date_Expenses).getFullYear()
        allYears.add(year)
      })
    })

    // Yılları sırala ve en güncel yılı seçili yap
    const sortedYears = Array.from(allYears).sort((a, b) => b - a)
    setYears(sortedYears)
    if (sortedYears.length > 0) {
      setSelectedYear(sortedYears[0])
    }
  }, [data])

  // Seçilen yıl değiştiğinde aylık toplamları hesapla
  useEffect(() => {
    if (selectedYear !== null) {
      const totals = calculateMonthlyTotals(data, selectedYear)
      setMonthlyTotals(totals)
    }
  }, [selectedYear, data])

  // Yıl seçimi değiştiğinde çalışacak fonksiyon
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10))
  }

  // Aylık toplamları hesaplayan fonksiyon
  const calculateMonthlyTotals = (projects, year) => {
    const monthlyTotals = months.map((month) => ({
      month,
      totalIncomes: 0,
      totalExpenses: 0,
    }))

    projects.forEach((project) => {
      project.project_incomes.forEach((income) => {
        const incomeDate = new Date(income.ChekDate_Incomes)
        if (incomeDate.getFullYear() === year) {
          const monthIndex = incomeDate.getMonth()
          monthlyTotals[monthIndex].totalIncomes += parseFloat(income.Amount_Usd_Incomes)
        }
      })

      project.project_expenses.forEach((expense) => {
        const expenseDate = new Date(expense.Date_Expenses)
        if (expenseDate.getFullYear() === year) {
          const monthIndex = expenseDate.getMonth()
          monthlyTotals[monthIndex].totalExpenses += parseFloat(expense.Amount_USD_Expenses)
        }
      })
    })

    return monthlyTotals
  }

  // ------------------------------------------------------

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'GİRİŞ',
        data: monthlyTotals.map(({ totalIncomes }) => totalIncomes),
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'ÇIKIŞ',
        data: monthlyTotals.map(({ totalExpenses }) => totalExpenses),
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  }

  return (
    <>
      <div className='h-[10%] flex items-center justify-between text-soento-green'>
        <p className='text-sm font-bold'>NAKİT AKIŞI</p>
        <select className='font-semibold outline-none' value={selectedYear || ''} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className='h-[90%]'>
        <Line data={lineData} options={lineOptions} />
      </div>
    </>
  )
}
export default CashFlow
