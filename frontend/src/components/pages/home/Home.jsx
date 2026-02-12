import CashFlow from './CashFlow'
import IncomeExpense from './IncomeExpense'
import TotalExpenses from './TotalExpenses'
import ProfitLoss from './ProfitLoss'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../../store/slices/projectSlice'
import { useEffect } from 'react'
import Loader from '../../custom/Loader'
import ErrorOccurred from '../../custom/ErrorOccurred'


function Home() {
  const dispatch = useDispatch()
  const { projects, loading, error } = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(fetchProjects()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-10 xl:h-[100vh] gap-5'>
        <div className='xl:col-span-6 h-[400px] xl:h-[calc(50vh-28px)] rounded-xl shadow-xl p-5 bg-white'>
          <CashFlow data={projects} />
        </div>
        <div className='xl:col-span-4 h-[400px] xl:h-[calc(50vh-28px)] rounded-xl shadow-xl bg-[#2f9590]'>
          <IncomeExpense data={projects} />
        </div>
        <div className='xl:col-span-3 h-[400px] xl:h-[calc(50vh-28px)] rounded-xl shadow-xl p-5 bg-white'>
          <TotalExpenses data={projects} />
        </div>
        <div className='xl:col-span-7 h-[400px] xl:h-[calc(50vh-28px)] rounded-xl shadow-xl p-5 bg-white'>
          <ProfitLoss data={projects} />
        </div>
      </div>

      {loading && <Loader />}
    </>
  )
}
export default Home
