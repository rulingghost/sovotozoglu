import { fetchSalesOffers, updateSalesOffer } from '../../../../store/slices/salesOfferSlice'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../custom/Loader'
import { useState, useEffect } from 'react'
import PendingJobsTable from './PendingJobsTable'

function PendingJobs() {
  const dispatch = useDispatch()
  const { salesOffers, loading, error } = useSelector((state) => state.salesOffer)
  const [filteredSalesOffers, setFilteredSalesOffers] = useState([])

  useEffect(() => {
    dispatch(fetchSalesOffers()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  useEffect(() => {
    const filteredDataList = salesOffers.filter((offer) => offer.Is_late === true)
    setFilteredSalesOffers(filteredDataList)
  }, [salesOffers])

  const handleJobStatus = (salesOfferId) => {
    const findSalesOffer = salesOffers.find((offer) => offer.id === salesOfferId)
    dispatch(updateSalesOffer({ ...findSalesOffer, Is_late: false }))
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <PendingJobsTable data={filteredSalesOffers} handleJobStatus={handleJobStatus} />

      {loading && <Loader />}
    </>
  )
}
export default PendingJobs
