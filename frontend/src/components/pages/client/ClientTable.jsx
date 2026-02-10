import CustomTable from '../../custom/CustomTable'

function ClientTable({ data, handleEdit }) {
  const columns = [
    { key: 'CompanyName_Clients', title: 'MÜŞTERİ ADI' },
    { key: 'ContactPerson', title: 'MUHATAP' },
    { key: 'PhoneNumber', title: 'TELEFON' },
    { key: 'Email', title: 'E-POSTA' },
    { key: 'Location', title: 'BÖLGE' },
  ]

  return <CustomTable data={data} columns={columns} handleEdit={handleEdit} />
  // return <CustomTable data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
}
export default ClientTable
