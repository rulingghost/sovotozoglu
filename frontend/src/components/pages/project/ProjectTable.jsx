import CustomTable from '../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../utils/valueFormatters'

function ProjectTable({ data, handleEdit, handleProjectDetail }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'ProjectName', title: 'PROJE ADI' },
    { key: 'Location', title: 'KONUM' },
    { key: 'x_AC_Power', title: 'AC GÜÇ' },
    { key: 'x_DC_Power', title: 'DC GÜÇ' },
    { key: 'x_Cost_NotIncludingKDV', title: 'İŞ BEDELİ' },
    { key: 'Terrain_Roof', title: 'ARAZİ/ÇATI' },
    { key: 'x_StartDate', title: 'TARİH' },
    { key: 'Situation', title: 'DURUM' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_AC_Power: formatNumber(item.AC_Power),
    x_DC_Power: formatNumber(item.DC_Power),
    x_Cost_NotIncludingKDV: formatNumber(item.Cost_NotIncludingKDV) + '$',
    x_StartDate: formatDate(item.StartDate),
  }))

  return (
    <CustomTable data={newData} columns={columns} handleEdit={handleEdit} handleProjectDetail={handleProjectDetail} />
  )
}
export default ProjectTable
