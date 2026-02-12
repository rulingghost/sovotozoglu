import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Pie, Doughnut } from 'react-chartjs-2'


function SeperatedReportItem({ type }) {
  const [calculatedData] = useOutletContext()
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    if (type === 'genel') {
      const totals = calculatedData.reduce(
        (acc, project) => {
          acc.totalReceivedAmount += project.receivedAmount
          acc.totalDebtRemaining += project.debtRemaining
          return acc
        },
        { totalReceivedAmount: 0, totalDebtRemaining: 0 }
      )

      const genel = {
        labels: ['ALINAN ÖDEME', 'ÖDENMESİ GEREKEN'],
        datasets: [
          {
            label: 'Tutar',
            data: [totals.totalReceivedAmount, totals.totalDebtRemaining],
            backgroundColor: ['#09bb9f', '#1d81a2'],
            hoverBackgroundColor: ['#09bb9f', '#1d81a2'],
          },
        ],
      }

      setChartData(genel)
    } else if (type === 'detay') {
      const totals = calculatedData.reduce(
        (acc, project) => {
          acc.totalReceivedAmount += project.receivedAmount
          acc.totalPaidAmount += project.paidAmount
          acc.totalOther += project.agreedAmount - project.receivedAmount
          return acc
        },
        { totalReceivedAmount: 0, totalPaidAmount: 0, totalOther: 0 }
      )

      const detay = {
        labels: ['GELİR', 'GİDER', 'KALAN'],
        datasets: [
          {
            label: 'Tutar',
            data: [totals.totalReceivedAmount, totals.totalPaidAmount, totals.totalOther],
            backgroundColor: ['#3aaf0c', '#7acbf5', '#28b397'],
            hoverBackgroundColor: ['#3aaf0c', '#7acbf5', '#28b397'],
          },
        ],
      }

      setChartData(detay)
    } else if (type === 'kar') {
      const totals = calculatedData.reduce(
        (acc, project) => {
          acc.totalKdvExcludingProfit += project.kdvExcludingProfit
          acc.totalKdvIncludingProfit += project.kdvIncludingProfit
          return acc
        },
        { totalKdvExcludingProfit: 0, totalKdvIncludingProfit: 0 }
      )

      const kar = {
        labels: ['KDV İADESİ HARİÇ', 'KDV İADESİ DAHİL'],
        datasets: [
          {
            label: 'Tutar',
            data: [totals.totalKdvExcludingProfit, totals.totalKdvIncludingProfit],
            backgroundColor: ['#3aaf0c', '#2f87b4'],
            hoverBackgroundColor: ['#3aaf0c', '#2f87b4'],
          },
        ],
      }

      setChartData(kar)
    }
  }, [calculatedData, type])

  //   -------------------------------------------------------------------------------------

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 5 },
      },
    },
  }

  if (!calculatedData || !chartData) return

  return (
    <div className='flex flex-col gap-5 rounded-xl p-4 shadow-lg w-full bg-white'>
      <div className='flex justify-center'>
        <span className='font-bold text-soento-green'>
          {type === 'genel' ? 'TOPLAM GENEL' : type === 'detay' ? 'TOPLAM DETAY' : 'TOPLAM KAR'}
        </span>
      </div>

      <div className='flex justify-center h-[400px] overflow-hidden'>
        {type === 'genel' && <Pie data={chartData} options={options} />}
        {type === 'detay' && <Doughnut data={chartData} options={options} />}
        {type === 'kar' && <Pie data={chartData} options={options} />}
      </div>
    </div>
  )
}
export default SeperatedReportItem
