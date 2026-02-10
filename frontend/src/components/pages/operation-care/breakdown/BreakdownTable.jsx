import CustomTable from '../../../custom/CustomTable'
import { formatDate } from '../../../../utils/valueFormatters'

function BreakdownTable({ data, handleEdit }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'Fail_Situation', title: 'ARIZA DURUMU' },
    { key: 'Fail_Central_Name', title: 'SANTRAL İSMİ' },
    { key: 'x_Fail_Detection_Date', title: 'ARIZA TESPİT TARİHİ' },
    { key: 'Fail_Detail', title: 'ARIZA' },
    { key: 'x_Fail_Team_Info_Date', title: 'EKİP BİLGİLENDİRME TARİHİ' },
    { key: 'Fail_Information_Person', title: 'BİLGİ VERİLEN KİŞİ' },
    { key: 'x_Fail_Repair_Date', title: 'ARIZA ONARIM TARİHİ' },
    { key: 'Fail_Guaranteed', title: 'GARANTİ KAPSAM DURUMU' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Fail_Detection_Date: formatDate(item.Fail_Detection_Date),
    x_Fail_Team_Info_Date: formatDate(item.Fail_Team_Info_Date),
    x_Fail_Repair_Date: formatDate(item.Fail_Repair_Date),
  }))

  return <CustomTable data={newData} columns={columns} handleEdit={handleEdit} />
}
export default BreakdownTable
