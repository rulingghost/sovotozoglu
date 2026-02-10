import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber, formatNumberFourFractionDigit } from '../../../../utils/valueFormatters'

function ProjectIncomeTable({ data, handleEdit }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'x_CompanyName_Pay_Incomes', title: 'ÖDEME YAPAN FİRMA' },
    { key: 'x_Amount_Incomes', title: 'TUTAR (TL)' },
    { key: 'x_Dollar_Rate_Incomes', title: 'KUR' },
    { key: 'x_Amount_Usd_Incomes', title: 'TUTAR (USD)' },
    { key: 'CompanyName_ReceivePayment_Incomes', title: 'ALICI FİRMA' },
    { key: 'PaymentType_Incomes', title: 'ÖDEME TÜRÜ' },
    { key: 'x_ChekDate_Incomes', title: 'TARİH' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_CompanyName_Pay_Incomes: item.client_incomes.CompanyName_Clients,
    x_Amount_Incomes: formatNumber(item.Amount_Incomes) + '₺',
    x_Dollar_Rate_Incomes: formatNumberFourFractionDigit(item.Dollar_Rate_Incomes) + '₺',
    x_Amount_Usd_Incomes: formatNumber(item.Amount_Usd_Incomes) + '$',
    x_ChekDate_Incomes: formatDate(item.ChekDate_Incomes),
  }))

  return <CustomTable data={newData} columns={columns} handleEdit={handleEdit} />
}
export default ProjectIncomeTable
