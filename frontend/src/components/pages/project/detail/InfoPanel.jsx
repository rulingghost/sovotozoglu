import {
  MdLocationPin,
  TbArrowLeftRight,
  BsCurrencyDollar,
  BiSolidPurchaseTag,
  HiArrowSmRight,
  MdAccessTime,
} from '../../../../styles/icons'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

function InfoPanel({ details }) {
  return (
    <div className='flex flex-col gap-4 p-4 size-full rounded-xl bg-soento-green'>
      <div className='flex flex-col items-center mt-3 mb-2'>
        <span className='text-xl font-bold text-white'>{details.ProjectName}</span>
        <span className='text-xs font-semibold text-gray-300'>{formatDate(details.StartDate)}</span>
      </div>

      <span className='border-b border-b-gray-400'></span>

      <div className='grid grid-cols-2 gap-5 my-2'>
        <InfoBox label='Konum' data={details.Location ? details.Location : '(seçilmedi)'} icon={<MdLocationPin />} />
        <InfoBox label='Tip' data={details.Terrain_Roof} icon={<BiSolidPurchaseTag />} />
        <InfoBox label='AC Güç' data={formatNumber(details.AC_Power)} icon={<TbArrowLeftRight />} />
        <InfoBox label='DC Güç' data={formatNumber(details.DC_Power)} icon={<HiArrowSmRight />} />
        <InfoBox label='İş Bedeli' data={formatNumber(details.Cost_NotIncludingKDV)} icon={<BsCurrencyDollar />} />
        <InfoBox label='Durum' data={details.Situation} icon={<MdAccessTime />} />
      </div>

      <span className='border-b border-b-gray-400'></span>

      <div className='size-full rounded-xl overflow-hidden bg-slate-300'>
        <MapBox city={details.Location} />
      </div>
    </div>
  )
}

function InfoBox({ label, data, icon }) {
  return (
    <div className='flex gap-1 leading-none text-white'>
      <div className='text-xl'>{icon}</div>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-semibold text-gray-300'>{label}</span>
        <span className='text-sm font-semibold'>{data}</span>
      </div>
    </div>
  )
}

function MapBox({ city }) {
  const apiKey = 'AIzaSyDwNQi_yJog73xZMeolxgWjtUYIpIqutPg'
  const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${city},Turkey`
  return (
    <iframe
      title='Google Map'
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      src={googleMapSrc}
    ></iframe>
  )
}

export default InfoPanel
