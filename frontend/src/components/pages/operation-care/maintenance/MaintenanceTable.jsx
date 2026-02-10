import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'
import { useEffect, useState } from 'react'

function MaintenanceTable({ data, fails, handleEdit, handleMaintenanceDetail }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const [operationCareCounts, setOperationCareCounts] = useState({})

  useEffect(() => {
    // Fail_Operation_Care sayılarını hesapla
    const counts = fails.reduce((acc, curr) => {
      acc[curr.Fail_Operation_Care] = (acc[curr.Fail_Operation_Care] || 0) + 1
      return acc
    }, {})
    setOperationCareCounts(counts) // State'e ata
  }, [fails])

  // Belirli bir Fail_Operation_Care numarasını al
  const getCount = (operationCareNumber) => {
    return operationCareCounts[operationCareNumber] || 0
  }

  const columns = [
    { key: 'x_Operation_Care_Company', title: 'FİRMA ADI' },
    { key: 'x_Operation_Care_AC_Power', title: 'TESİS KURULU GÜCÜ' },
    { key: 'Operation_Care_Location', title: 'KONUM' },
    { key: 'x_Operation_Care_Price', title: 'BAKIM ÜCRETİ' },
    { key: 'x_Operation_Care_Fail_Number', title: 'ARIZA DURUMU' },
    { key: 'x_Operation_Care_Finish_Date', title: 'SONRAKİ BAKIM TARİHİ' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Operation_Care_Company: item.client.PowerPlantName,
    x_Operation_Care_AC_Power: formatNumber(item.Operation_Care_AC_Power),
    x_Operation_Care_Price: formatNumber(item.Operation_Care_Price) + '₺',
    x_Operation_Care_Fail_Number: getCount(item.id), // Operation_Care_Fail_Number kullanımda değil
    x_Operation_Care_Finish_Date: formatDate(item.Operation_Care_Finish_Date),
  }))

  return (
    <CustomTable
      data={newData}
      columns={columns}
      handleEdit={handleEdit}
      handleMaintenanceDetail={handleMaintenanceDetail}
    />
  )
}
export default MaintenanceTable
