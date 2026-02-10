import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSalesOffers } from '../../../../store/slices/salesOfferSlice'
import { IoMdArrowRoundBack } from '../../../../styles/icons'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import Loader from '../../../custom/Loader'
import { useEffect } from 'react'
import RevisesTable from './RevisesTable'

function Revises() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const { salesOffers, loading, error } = useSelector((state) => state.salesOffer)

  useEffect(() => {
    dispatch(fetchSalesOffers())
  }, [dispatch])

  const salesOfferDetails = salesOffers.find((salesOffer) => salesOffer.id == id)

  if (error) return <ErrorOccurred message={error} />

  if (!salesOfferDetails) return

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack className='text-lg' /> Teklif Listesi
          </button>
        </div>

        <div className='flex items-center gap-3 rounded-full px-5 py-1 bg-soento-green text-soento-white'>
          <p>Revizeler:</p>
          <p>{salesOfferDetails.client.CompanyName_Clients}</p>
        </div>
      </div>

      <RevisesTable data={salesOfferDetails} />

      {loading && <Loader />}
    </>
  )
}
export default Revises
