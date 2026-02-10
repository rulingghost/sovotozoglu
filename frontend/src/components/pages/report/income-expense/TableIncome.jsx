import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

function TableIncome({ data }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'ProjectName', title: 'PROJE ADI' },
    { key: 'ClientName', title: 'ÖDEME YAPAN FİRMA' },
    { key: 'x_AmountTRY', title: 'TUTAR (TL)' },
    { key: 'x_DollarRate', title: 'KUR' },
    { key: 'x_AmountUSD', title: 'TUTAR (USD)' },
    { key: 'PaymentReceiver', title: 'ALICI FİRMA' },
    { key: 'PaymentType', title: 'ÖDEME TÜRÜ' },
    { key: 'x_Date', title: 'TARİH' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_AmountTRY: formatNumber(item.AmountTRY) + '₺',
    x_DollarRate: formatNumber(item.DollarRate) + '₺',
    x_AmountUSD: formatNumber(item.AmountUSD) + '$',
    x_Date: formatDate(item.Date),
  }))

  return <CustomTable data={newData} columns={columns} />
}
export default TableIncome
