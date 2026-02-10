import OrdersTable from './OrdersTable'

function Orders() {
  const data = [
    {
      id: 1,
      ProductName: 'Mono PERC Solar Panel 400W',
      AmountOfReceive: '150',
      OrderDate: '2024-02-15',
      Store: 'Ana Depo',
      Position: 'Raf A3',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 2,
      ProductName: 'Polycrystalline Solar Panel 250W',
      AmountOfReceive: '300',
      OrderDate: '2024-03-12',
      Store: 'Yan Depo',
      Position: 'Raf B1',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 3,
      ProductName: 'Bifacial Solar Panel 450W',
      AmountOfReceive: '120',
      OrderDate: '2024-01-28',
      Store: 'Ana Depo',
      Position: 'Raf C2',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 4,
      ProductName: 'Flexible Solar Panel 100W',
      AmountOfReceive: '80',
      OrderDate: '2024-04-05',
      Store: 'Şube Depo 1',
      Position: 'Raf D4',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 5,
      ProductName: 'Thin Film Solar Panel 150W',
      AmountOfReceive: '200',
      OrderDate: '2024-02-10',
      Store: 'Ana Depo',
      Position: 'Raf E3',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 6,
      ProductName: 'High Efficiency Solar Panel 500W',
      AmountOfReceive: '50',
      OrderDate: '2024-05-15',
      Store: 'Şube Depo 2',
      Position: 'Raf F1',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 7,
      ProductName: 'Glass-Glass Solar Panel 300W',
      AmountOfReceive: '90',
      OrderDate: '2024-02-22',
      Store: 'Ana Depo',
      Position: 'Raf G5',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 8,
      ProductName: 'Half-Cut Cell Solar Panel 350W',
      AmountOfReceive: '180',
      OrderDate: '2024-03-01',
      Store: 'Yan Depo',
      Position: 'Raf H2',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 9,
      ProductName: 'Dual Glass Bifacial Panel 375W',
      AmountOfReceive: '60',
      OrderDate: '2024-04-10',
      Store: 'Ana Depo',
      Position: 'Raf I3',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 10,
      ProductName: 'Flexible Solar Panel 200W',
      AmountOfReceive: '75',
      OrderDate: '2024-03-25',
      Store: 'Şube Depo 1',
      Position: 'Raf J4',
      ProductGroup: 'Güneş Paneli',
    },
  ]

  return (
    <>
      <OrdersTable data={data} />
    </>
  )
}
export default Orders
