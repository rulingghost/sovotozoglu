import CustomTable from '../../../custom/CustomTable'
import { formatDateTime, formatNumber } from '../../../../utils/valueFormatters'

// İlgilenen kişi adını getirmek için
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPersonRelateds } from '../../../../store/slices/salesOfferSlice'

function RevisesTable({ data, handleReviseDetail }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  // ---- İlgilenen kişi adını getirmek için ----
  const dispatch = useDispatch()
  const { personRelateds } = useSelector((state) => state.salesOffer)
  useEffect(() => {
    if (!personRelateds || personRelateds.length === 0) {
      dispatch(fetchPersonRelateds())
    }
  }, [dispatch, personRelateds])
  // --------------------------------------------

  const columns = [
    { key: 'Situation_Card', title: 'DURUM' },
    { key: 'x_Client_Name', title: 'MÜŞTERİ ADI' },
    { key: 'Location_Card', title: 'KONUM' },
    { key: 'x_SalesPersonRelated', title: 'İLGİLENEN KİŞİ' },
    { key: 'x_AC_Power_Card', title: 'AC GÜÇ' },
    { key: 'x_DC_Power_Card', title: 'DC GÜÇ' },
    { key: 'x_UnitCost_NotIncludingKDV', title: 'BİRİM MALİYET' },
    { key: 'x_Cost_NotIncludingKDV_Card', title: 'TOPLAM MALİYET' },
    { key: 'x_UnitOffer_NotIncludingKDV', title: 'BİRİM TEKLİF' },
    { key: 'x_Offer_Cost_NotIncludingKDV_Card', title: 'TOPLAM TEKLİF' },
    { key: 'Terrain_Roof_Card', title: 'ARAZİ/ÇATI' },
    { key: 'x_Roof_Cost_Card', title: 'ARAZİ MALİYETİ' },
    { key: 'x_Unit_Cost_with_Roof_Cost', title: 'ARAZİ DAHİL BİRİM MALİYET' },
    { key: 'x_Unit_Offer_with_Roof_Cost', title: 'ARAZİ DAHİL TOPLAM TEKLİF' },
    { key: 'x_Profit_Rate_Card', title: 'ARAZİ MALİYETİ' },
    { key: 'x_Revize_created_at', title: 'REVİZE ALMA TARİHİ' },
  ]

  const sortedData = [...data.salesoffer_revises].sort((a, b) => b.id - a.id)

  const newData = sortedData.map((item) => ({
    ...item,
    x_Client_Name: item.client.CompanyName_Clients,
    x_SalesPersonRelated: personRelateds.find((sales) => sales.id == item.SalesPersonRelated)?.PersonRelatedName,
    x_AC_Power_Card: formatNumber(item.AC_Power_Card) + ' kWe',
    x_DC_Power_Card: formatNumber(item.DC_Power_Card) + ' kWp',
    x_UnitCost_NotIncludingKDV: formatNumber(item.UnitCost_NotIncludingKDV) + '$',
    x_Cost_NotIncludingKDV_Card: formatNumber(item.Cost_NotIncludingKDV_Card) + '$',
    x_UnitOffer_NotIncludingKDV: formatNumber(item.UnitOffer_NotIncludingKDV) + '$',
    x_Offer_Cost_NotIncludingKDV_Card: formatNumber(item.Offer_Cost_NotIncludingKDV_Card) + '$',
    x_Roof_Cost_Card: formatNumber(item.Roof_Cost_Card) + '$',
    x_Unit_Cost_with_Roof_Cost: formatNumber(item.Unit_Cost_with_Roof_Cost) + '$',
    x_Unit_Offer_with_Roof_Cost: formatNumber(item.Unit_Offer_with_Roof_Cost) + '$',
    x_Profit_Rate_Card: formatNumber(item.Profit_Rate_Card) + '$',
    x_Revize_created_at: formatDateTime(item.Revize_created_at),
  }))

  // Mevcut durumu eklemek için
  const lastData = [
    {
      ...data,
      id: -1,
      x_Client_Name: data.client.CompanyName_Clients,
      x_SalesPersonRelated: personRelateds.find((sales) => sales.id == data.SalesPersonRelated)?.PersonRelatedName,
      x_AC_Power_Card: formatNumber(data.AC_Power_Card) + ' kWe',
      x_DC_Power_Card: formatNumber(data.DC_Power_Card) + ' kWp',
      x_UnitCost_NotIncludingKDV: formatNumber(data.UnitCost_NotIncludingKDV) + '$',
      x_Cost_NotIncludingKDV_Card: formatNumber(data.Cost_NotIncludingKDV_Card) + '$',
      x_UnitOffer_NotIncludingKDV: formatNumber(data.UnitOffer_NotIncludingKDV) + '$',
      x_Offer_Cost_NotIncludingKDV_Card: formatNumber(data.Offer_Cost_NotIncludingKDV_Card) + '$',
      x_Roof_Cost_Card: formatNumber(data.Roof_Cost_Card) + '$',
      x_Unit_Cost_with_Roof_Cost: formatNumber(data.Unit_Cost_with_Roof_Cost) + '$',
      x_Unit_Offer_with_Roof_Cost: formatNumber(data.Unit_Offer_with_Roof_Cost) + '$',
      x_Profit_Rate_Card: formatNumber(data.Profit_Rate_Card) + '$',
      x_Revize_created_at: 'Mevcut Durum',
    },
    ...newData,
  ]

  return (
    <CustomTable
      data={data.salesoffer_revises.length === 0 ? [] : lastData}
      columns={columns}
      handleReviseDetail={handleReviseDetail}
    />
  )
}
export default RevisesTable
