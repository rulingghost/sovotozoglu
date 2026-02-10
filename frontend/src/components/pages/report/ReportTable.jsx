import CustomTable from '../../custom/CustomTable'
import { useOutletContext } from 'react-router-dom'
import { formatNumber } from '../../../utils/valueFormatters'

function ReportTable() {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const [calculatedData] = useOutletContext()

  const columns = [
    { key: 'projectName', title: 'PROJE ADI' },
    { key: 'x_agreedAmount', title: 'ANLAŞILAN' },
    { key: 'x_receivedAmount', title: 'ALINAN' },
    { key: 'x_paidAmount', title: 'ÖDENEN' },
    { key: 'x_debtRemaining', title: 'ÖDENMESİ GEREKEN BORÇ' },
    { key: 'x_totalRemaining', title: 'GENEL KALAN' },
    { key: 'x_financialBalance', title: 'HARCAMA CARİ DURUM' },
    { key: 'x_kdvReturn', title: 'KDV İADESİ' },
    { key: 'x_kdvExcludingProfit', title: 'KDV İADESİ HARİÇ KAR' },
    { key: 'x_kdvIncludingProfit', title: 'KDV İADESİ DAHİL KAR' },
  ]

  const newData = calculatedData.map((item, index) => ({
    id: index,
    projectName: item.projectName,
    x_agreedAmount: formatNumber(item.agreedAmount),
    x_receivedAmount: formatNumber(item.receivedAmount),
    x_paidAmount: formatNumber(item.paidAmount),
    x_debtRemaining: formatNumber(item.debtRemaining),
    x_totalRemaining: formatNumber(item.totalRemaining),
    x_financialBalance: formatNumber(item.financialBalance),
    x_kdvReturn: formatNumber(item.kdvReturn),
    x_kdvExcludingProfit: formatNumber(item.kdvExcludingProfit),
    x_kdvIncludingProfit: formatNumber(item.kdvIncludingProfit),
  }))

  return <CustomTable data={newData} columns={columns} />
}
export default ReportTable
