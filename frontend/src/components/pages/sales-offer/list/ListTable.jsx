import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

// İlgilenen kişi adını getirmek için
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPersonRelateds } from '../../../../store/slices/salesOfferSlice'

function ListTable({ data, handleReviseDetail }) {
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
    { key: 'x_Situation_Card', title: 'DURUM' },
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
    { key: 'x_Date_Card', title: 'TARİH' },
    { key: 'Comment_Card_1', title: 'YORUM 1' },
    { key: 'Comment_Card_2', title: 'YORUM 2' },
    { key: 'Comment_Card_3', title: 'YORUM 3' },
    { key: 'Comment_Card_4', title: 'YORUM 4' },
    { key: 'Comment_Card_5', title: 'YORUM 5' },
    { key: 'Comment_Card_6', title: 'YORUM 6' },
    { key: 'Comment_Card_7', title: 'YORUM 7' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Situation_Card: item.Is_Gain
      ? 'Kazanılan İş'
      : item.Is_Lost
      ? 'Kaybedilen İş'
      : item.Is_late
      ? 'Bekleyen İş'
      : item.Situation_Card,
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
    x_Date_Card: formatDate(item.Date_Card),
  }))

  return <CustomTable data={newData} columns={columns} handleReviseDetail={handleReviseDetail} />
}

export default ListTable
