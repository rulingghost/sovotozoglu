import {
  TbArrowLeftRight,
  HiArrowSmRight,
  FaMoneyBillTransfer,
  TiLocation,
  BiDollarCircle,
  TbCalendarClock,
  PiPercentBold,
  HiOutlineArrowNarrowRight,
} from '../../../../styles/icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

function InfoField({ details }) {
  const [totalAmountIncome, setTotalAmountIncome] = useState(0)
  const [totalAmountExpense, setTotalAmountExpense] = useState(0)

  useEffect(() => {
    if (details) {
      if (details.project_incomes.length !== 0) {
        let usdTotal = 0
        details.project_incomes.forEach((item) => {
          usdTotal += Number(item.Amount_Usd_Incomes) || 0
        })
        setTotalAmountIncome(usdTotal)
      }
      if (details.project_expenses.length !== 0) {
        let usdTotal = 0
        details.project_expenses.forEach((item) => {
          usdTotal += Number(item.Amount_USD_Expenses) || 0
        })
        setTotalAmountExpense(usdTotal)
      }
    }
  }, [details])

  const calculatePercentage = (num1, num2) => {
    if (num2 === 0) return 0
    if (num1 == null || num2 == null) return 0
    return ((num1 - num2) / num2) * 100
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
      <InfoBox label='AC Güç' data={formatNumber(details.AC_Power) + ' kWe'} icon={<TbArrowLeftRight />} />
      <InfoBox label='DC Güç' data={formatNumber(details.DC_Power) + ' kWp'} icon={<HiArrowSmRight />} />
      <InfoBox
        label='Teşvik Durumu'
        data={details.Incentive ? 'Teşvikli' : 'Teşviksiz'}
        icon={<FaMoneyBillTransfer />}
      />
      <InfoBox label='Arazi/Çatı' data={details.Terrain_Roof} icon={<TiLocation />} />

      {/* --------------------------------------------------------------- */}
      <InfoBox
        label='Gerçekleşen İş Bedeli'
        data={formatNumber(totalAmountIncome)}
        link={`/project/details/income/${details.id}`}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Gerçekleşen Maliyet'
        data={formatNumber(totalAmountExpense)}
        link={`/project/details/realized-cost/${details.id}`}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Gerçekleşen Kar/Zarar'
        data={formatNumber(totalAmountIncome - totalAmountExpense)}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Gerçekleşen Kar Oranı'
        data={formatNumber(calculatePercentage(totalAmountIncome, totalAmountExpense))}
        icon={<PiPercentBold />}
      />

      {/* --------------------------------------------------------------- */}

      <InfoBox
        label='Hesaplanan İş Bedeli'
        data={formatNumber(details.Cost_NotIncludingKDV)}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Hesaplanan Maliyet'
        data={formatNumber(details.CalculatedCost_NotIncludingKDV)}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Hesaplanan Kar/Zarar'
        data={formatNumber(details.Cost_NotIncludingKDV - details.CalculatedCost_NotIncludingKDV)}
        icon={<BiDollarCircle />}
      />
      <InfoBox
        label='Hesaplanan Kar Oranı'
        data={formatNumber(calculatePercentage(details.Cost_NotIncludingKDV, details.CalculatedCost_NotIncludingKDV))}
        icon={<PiPercentBold />}
      />
      <InfoBox label='Başlama Tarihi' data={formatDate(details.StartDate)} icon={<TbCalendarClock />} />
      <InfoBox label='Bitirme Tarihi' data={formatDate(details.FinishDate)} icon={<TbCalendarClock />} />
    </div>
  )
}

function InfoBox({ label, data, link, icon }) {
  return (
    <div className='relative flex items-center gap-4 py-8 ps-5 shadow border leading-none rounded-xl bg-white'>
      <div className='text-soento-green' style={{ fontSize: '40px' }}>
        {icon}
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-2xl text-stone-900'>{data}</span>
        <span className='text-sm font-semibold text-stone-900/70'>{label}</span>
      </div>
      {link && (
        <Link to={link}>
          <div className='absolute top-0 right-0 px-3 flex justify-center rounded rounded-tr-xl bg-soento-green'>
            <HiOutlineArrowNarrowRight className='text-2xl text-white' />
          </div>
        </Link>
      )}
    </div>
  )
}

export default InfoField
