import { Bar } from 'react-chartjs-2'
import StatisticMostUsedTable from './StatisticMostUsedTable'
import StatisticStockAlertTable from './StatisticStockAlertTable'

function Statistic() {
  const mostUsedData = [
    {
      id: 1,
      ProductName: 'Mono PERC Solar Panel 400W',
      AmountOfStock: '120',
      UseRate: '80%',
    },
    {
      id: 2,
      ProductName: 'Polycrystalline Solar Panel 250W',
      AmountOfStock: '250',
      UseRate: '75%',
    },
    {
      id: 3,
      ProductName: 'Bifacial Solar Panel 450W',
      AmountOfStock: '90',
      UseRate: '85%',
    },
    {
      id: 4,
      ProductName: 'Flexible Solar Panel 100W',
      AmountOfStock: '50',
      UseRate: '60%',
    },
    {
      id: 5,
      ProductName: 'High Efficiency Solar Panel 500W',
      AmountOfStock: '30',
      UseRate: '90%',
    },
    {
      id: 6,
      ProductName: 'Glass-Glass Solar Panel 300W',
      AmountOfStock: '70',
      UseRate: '78%',
    },
  ]

  const stockAlertData = [
    {
      id: 1,
      ProductName: 'Mono PERC Solar Panel 400W',
      AmountOfStock: '20',
      LastPurchase: '2024-02-15',
      AvailableStock: '15',
      StockPercentage: '75%',
    },
    {
      id: 2,
      ProductName: 'Polycrystalline Solar Panel 250W',
      AmountOfStock: '10',
      LastPurchase: '2024-03-12',
      AvailableStock: '5',
      StockPercentage: '50%',
    },
    {
      id: 3,
      ProductName: 'Bifacial Solar Panel 450W',
      AmountOfStock: '15',
      LastPurchase: '2024-01-28',
      AvailableStock: '10',
      StockPercentage: '67%',
    },
    {
      id: 4,
      ProductName: 'Flexible Solar Panel 100W',
      AmountOfStock: '5',
      LastPurchase: '2024-04-05',
      AvailableStock: '2',
      StockPercentage: '40%',
    },
    {
      id: 5,
      ProductName: 'Thin Film Solar Panel 150W',
      AmountOfStock: '30',
      LastPurchase: '2024-02-10',
      AvailableStock: '25',
      StockPercentage: '83%',
    },
    {
      id: 6,
      ProductName: 'Glass-Glass Solar Panel 300W',
      AmountOfStock: '8',
      LastPurchase: '2024-02-22',
      AvailableStock: '3',
      StockPercentage: '38%',
    },
  ]

  const barData = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Kar/Zarar (%)',
        data: [10, -5, 15, 8, -10, 12, -3, 7, -8, 20, -2, 18], // Aylık kar ve zarar oranları
        backgroundColor: (context) => {
          const index = context.dataIndex
          return context.dataset.data[index] > 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        },
        borderColor: (context) => {
          const index = context.dataIndex
          return context.dataset.data[index] > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        },
        borderWidth: 1,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Yüzde formatında gösterim
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Legend'ı gizler
      },
    },
  }

  return (
    <>
      <div className='flex flex-col gap-8 mt-5'>
        <div className='p-5 2-full h-[45vh] rounded-xl shadow-xl bg-white'>
          <p className='h-[10%] text-sm font-bold text-soento-green'>AYIN KAR/ZARAR ANALİZİ</p>
          <div className='h-[90%]'>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <StatisticMostUsedTable data={mostUsedData} />

        <StatisticStockAlertTable data={stockAlertData} />
      </div>
    </>
  )
}
export default Statistic
