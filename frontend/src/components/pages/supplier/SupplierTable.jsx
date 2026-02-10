import CustomTable from '../../custom/CustomTable'

function SupplierTable({ data, handleEdit }) {
  const columns = [
    { key: 'CompanyName_Supplier', title: 'TEDARİKÇİ ADI' },
    { key: 'ContactPerson', title: 'MUHATAP' },
    { key: 'PhoneNumber', title: 'TELEFON' },
    { key: 'Email', title: 'E-POSTA' },
    { key: 'Location', title: 'BÖLGE' },
  ]

  return <CustomTable data={data} columns={columns} handleEdit={handleEdit} />
}
export default SupplierTable
