import { useOutletContext } from 'react-router-dom'
import ReportItem from './ReportItem'

function ReportChart() {
  const [calculatedData] = useOutletContext()

  return (
    <div className='flex flex-wrap justify-center gap-10'>
      {calculatedData.map((data, index) => (
        <ReportItem key={index} data={data} />
      ))}
    </div>
  )
}
export default ReportChart
