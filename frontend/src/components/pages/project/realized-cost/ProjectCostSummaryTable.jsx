import CustomTable from '../../../custom/CustomTable'
import { formatNumber } from '../../../../utils/valueFormatters'

function ProjectCostSummaryTable({ data }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'supplierName', title: 'FİRMA ADI' },
    { key: 'x_totalJobAmountUSD', title: 'TOPLAM İŞ MİKTARI (USD)' },
    { key: 'x_totalJobAmount', title: 'TOPLAM İŞ MİKTARI (TL)' },
    { key: 'x_totalExpenseAmountUSD', title: 'TOPLAM GİDER (USD)' },
    { key: 'x_totalExpenseAmount', title: 'TOPLAM GİDER (TL)' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_totalJobAmount: formatNumber(item.totalJobAmount) + '₺',
    x_totalJobAmountUSD: formatNumber(item.totalJobAmountUSD) + '$',
    x_totalExpenseAmount: formatNumber(item.totalExpenseAmount) + '₺',
    x_totalExpenseAmountUSD: formatNumber(item.totalExpenseAmountUSD) + '$',
  }))

  return <CustomTable data={newData} columns={columns} />
}
export default ProjectCostSummaryTable
