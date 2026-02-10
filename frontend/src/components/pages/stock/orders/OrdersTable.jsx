import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

function OrdersTable({ data, handleEdit, handleProjectDetail }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'ProductName', title: 'ÜRÜN ADI' },
    { key: 'AmountOfReceive', title: 'ALINAN ADET/MİKTAR' },
    { key: 'OrderDate', title: 'TARİH' },
    { key: 'Store', title: 'DEPO' },
    { key: 'Position', title: 'POZİSYON' },
    { key: 'ProductGroup', title: 'ÜRÜN GRUBU' },
  ]

  const newData = data.map((item) => ({
    ...item,
    // x_AC_Power: formatNumber(item.AC_Power),
    // x_DC_Power: formatNumber(item.DC_Power),
    // x_Cost_NotIncludingKDV: formatNumber(item.Cost_NotIncludingKDV) + '$',
    // x_StartDate: formatDate(item.StartDate),
  }))

  return (
    <CustomTable data={newData} columns={columns} />
    // <CustomTable data={newData} columns={columns} handleEdit={handleEdit} handleProjectDetail={handleProjectDetail} />
  )
}
export default OrdersTable
