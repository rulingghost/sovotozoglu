import { Doughnut } from 'react-chartjs-2'

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

function TotalExpenses({ data }) {
  const calculated = calculateProjectTotals(data)

  const doughnutData = {
    labels: ['ANLAŞILAN', 'GELEN', 'KALAN'],
    datasets: [
      {
        label: 'Tutar',
        data: [calculated.totalCostNotIncludingKDV, calculated.totalIncome, calculated.totalDifference],
        backgroundColor: ['#3aaf0c', '#1a9a9b', '#0a6865'],
        hoverBackgroundColor: ['#3aaf0c', '#1a9a9b', '#0a6865'],
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 5 },
      },
    },
  }

  return (
    <>
      <p className='h-[10%] text-sm font-bold text-soento-green'>GENEL TOPLAM</p>
      <div className='h-[90%]'>
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </>
  )
}
export default TotalExpenses
