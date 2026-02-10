import ProductsTable from './ProductsTable'

function Products() {
  const data = [
    {
      id: 1,
      ProductName: 'Mono PERC Solar Panel 400W',
      AmountOfStock: '150',
      ExpireDate: '2027-09-15',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 2,
      ProductName: 'Polycrystalline Solar Panel 250W',
      AmountOfStock: '300',
      ExpireDate: '2028-01-25',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 3,
      ProductName: 'Bifacial Solar Panel 450W',
      AmountOfStock: '120',
      ExpireDate: '2029-05-12',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 4,
      ProductName: 'Flexible Solar Panel 100W',
      AmountOfStock: '80',
      ExpireDate: '2026-12-10',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 5,
      ProductName: 'Thin Film Solar Panel 150W',
      AmountOfStock: '200',
      ExpireDate: '2027-08-22',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 6,
      ProductName: 'Glass-Glass Solar Panel 300W',
      AmountOfStock: '90',
      ExpireDate: '2028-03-18',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 7,
      ProductName: 'Flexible Solar Panel 200W',
      AmountOfStock: '75',
      ExpireDate: '2026-11-01',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 8,
      ProductName: 'High Efficiency Solar Panel 500W',
      AmountOfStock: '50',
      ExpireDate: '2030-06-30',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 9,
      ProductName: 'Half-Cut Cell Solar Panel 350W',
      AmountOfStock: '180',
      ExpireDate: '2027-10-05',
      ProductGroup: 'Güneş Paneli',
    },
    {
      id: 10,
      ProductName: 'Dual Glass Bifacial Panel 375W',
      AmountOfStock: '60',
      ExpireDate: '2029-02-20',
      ProductGroup: 'Güneş Paneli',
    },
  ]

  return (
    <>
      <ProductsTable data={data} />
    </>
  )
}
export default Products
