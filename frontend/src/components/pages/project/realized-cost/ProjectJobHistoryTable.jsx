import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber, formatNumberFourFractionDigit } from '../../../../utils/valueFormatters'

function ProjectJobHistoryTable({ data, handleEdit }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'x_Supplier', title: 'FİRMA' },
    { key: 'x_Amount_JobHistory', title: 'TUTAR(TL)' },
    { key: 'x_Dollar_Rate_JobHistory', title: 'KUR' },
    { key: 'x_Amount_USD_JobHistory', title: 'TUTAR(USD)' },
    { key: 'ExpensDetails_JobHistory', title: 'CİNSİ' },
    { key: 'Invoice_No_JobHistory', title: 'FATURA NO' },
    { key: 'x_Date_JobHistory', title: 'TARİH' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Supplier: item.supplier_jobhistories.CompanyName_Supplier,
    x_Date_JobHistory: formatDate(item.Date_JobHistory),
    x_Amount_JobHistory: formatNumber(item.Amount_JobHistory) + '₺',
    x_Dollar_Rate_JobHistory: formatNumberFourFractionDigit(item.Dollar_Rate_JobHistory) + '₺',
    x_Amount_USD_JobHistory: formatNumber(item.Amount_USD_JobHistory) + '$',
  }))

  return <CustomTable data={newData} columns={columns} handleEdit={handleEdit} />
}
export default ProjectJobHistoryTable
