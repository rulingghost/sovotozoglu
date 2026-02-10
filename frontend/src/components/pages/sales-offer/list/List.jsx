import { fetchSalesOffers } from '../../../../store/slices/salesOfferSlice'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import { useEffect } from 'react'
import ListTable from './ListTable'

function List() {
  const dispatch = useDispatch()
  const { salesOffers, loading, error } = useSelector((state) => state.salesOffer)

  useEffect(() => {
    dispatch(fetchSalesOffers()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <ListTable data={salesOffers} handleReviseDetail={true} />

      {loading && <Loader />}
    </>
  )
}
export default List
