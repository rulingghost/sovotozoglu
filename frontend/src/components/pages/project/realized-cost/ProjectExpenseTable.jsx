import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber, formatNumberFourFractionDigit } from '../../../../utils/valueFormatters'

function ProjectExpenseTable({ data, handleEdit }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'x_Supplier', title: 'FİRMA' },
    { key: 'x_Amount_Expenses', title: 'TUTAR(TL)' },
    { key: 'x_Dollar_Rate_Expenses', title: 'KUR' },
    { key: 'x_Amount_USD_Expenses', title: 'TUTAR(USD)' },
    { key: 'Bank_Expenses', title: 'BANKA' },
    { key: 'ExpensDetails_Expenses', title: 'AÇIKLAMA' },
    { key: 'x_Date_Expenses', title: 'TARİH' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Supplier: item.supplier_expenses.CompanyName_Supplier,
    x_Date_Expenses: formatDate(item.Date_Expenses),
    x_Amount_Expenses: formatNumber(item.Amount_Expenses) + '₺',
    x_Dollar_Rate_Expenses: formatNumberFourFractionDigit(item.Dollar_Rate_Expenses) + '₺',
    x_Amount_USD_Expenses: formatNumber(item.Amount_USD_Expenses) + '$',
  }))

  return <CustomTable data={newData} columns={columns} handleEdit={handleEdit} />
}
export default ProjectExpenseTable
