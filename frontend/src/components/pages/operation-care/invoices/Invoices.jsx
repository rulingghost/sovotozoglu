import { useEffect } from 'react'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import InvoicesTable from './InvoicesTable'
import { fetchFails } from '../../../../store/slices/operationCareSlice'

function Invoices() {
  const dispatch = useDispatch()
  const { fails, loading, error } = useSelector((state) => state.operationCare)

  useEffect(() => {
    dispatch(fetchFails()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <InvoicesTable data={fails.filter((fail) => fail.Fail_Bill_File !== null)} />

      {loading && <Loader />}
    </>
  )
}
export default Invoices
