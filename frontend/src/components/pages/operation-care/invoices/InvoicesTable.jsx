import CustomTable from '../../../custom/CustomTable'
import { formatDate } from '../../../../utils/valueFormatters'
import { useState, useEffect } from 'react'

function InvoicesTable({ data }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const [protocol, setProtocol] = useState('')

  useEffect(() => {
    const currentProtocol = window.location.protocol // http: veya https: döner
    setProtocol(currentProtocol)
  }, [])

  const columns = [
    { key: 'Fail_Bill_Central_Name', title: 'SANTRAL İSMİ' },
    { key: 'Fail_Bill_Process', title: 'YAPILAN İŞLEM' },
    { key: 'Fail_Bill_Detail', title: 'AÇIKLAMA' },
    { key: 'x_Fail_Bill_Date', title: 'TARİH' },
    { key: 'Fail_Bill_File', title: 'DOSYA' },
  ]

  const newData = data.map((item) => ({
    ...item,
    x_Fail_Bill_Date: formatDate(item.Fail_Bill_Date),
    Fail_Bill_File: item.Fail_Bill_File.replace('http:', protocol),
  }))

  return <CustomTable data={newData} columns={columns} />
}
export default InvoicesTable
