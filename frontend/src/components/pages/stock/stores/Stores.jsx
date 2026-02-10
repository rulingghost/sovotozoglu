import StoresTable from './StoresTable'

function Stores() {
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

  const depolar = [
    { id: 1, name: 'DEPO 1' },
    { id: 2, name: 'DEPO 2' },
    { id: 3, name: 'DEPO 3' },
    { id: 4, name: 'DEPO 4' },
    { id: 5, name: 'DEPO 5' },
    { id: 6, name: 'DEPO 6' },
    { id: 7, name: 'DEPO 7' },
    { id: 8, name: 'DEPO 8' },
  ]

  return (
    <div className='flex gap-5'>
      <div className='rounded-xl w-52 p-5 text-white bg-soento-green'>
        <div className='flex flex-col items-center gap-4'>
          <span className='text-xl'>DEPOLAR</span>

          <hr className='w-full' />

          <div className='flex flex-col gap-3 size-full'>
            {depolar.map((depo, index) => (
              <button key={index} className='w-full p-3 rounded-xl border border-slate-400'>
                {depo.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='w-[calc(100%-13rem)]'>
        <StoresTable data={data} />
      </div>
    </div>
  )
}
export default Stores
