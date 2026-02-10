import Card from './Card'

function Overview() {
  const data = [
    { percentage: 25, title: 'Mono PERC Solar Panel', subtitle: '400W (Yüksek Verimlilik)' },
    { percentage: 32, title: 'Polycrystalline Solar Panel', subtitle: '250W (Ekonomik Seçenek)' },
    { percentage: 8, title: 'Bifacial Solar Panel', subtitle: '450W (Çift Taraflı Yüzey)' },
    { percentage: 21, title: 'Flexible Solar Panel', subtitle: '100W (Esnek ve Hafif)' },
    { percentage: 80, title: 'Glass-Glass Solar Panel', subtitle: '300W (Uzun Ömürlü Tasarım)' },
    { percentage: 25, title: 'High Efficiency Solar Panel', subtitle: '500W (Premium Seri)' },
    { percentage: 32, title: 'Half-Cut Cell Solar Panel', subtitle: '350W (Yüksek Güç Çıkışı)' },
    { percentage: 18, title: 'Thin Film Solar Panel', subtitle: '150W (Düşük Maliyetli Çözüm)' },
    { percentage: 25, title: 'Bifacial Glass-Glass Solar Panel', subtitle: '375W (Çift Taraflı Verim)' },
    { percentage: 32, title: 'Flexible Thin Film Solar Panel', subtitle: '200W (Esnek ve Hafif Tasarım)' },
    { percentage: 8, title: 'High Efficiency Solar Panel', subtitle: '450W (Gelişmiş Teknoloji)' },
    { percentage: 21, title: 'Mono PERC Solar Panel', subtitle: '380W (Süper Verimli)' },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {data.map((item, index) => (
        <Card key={index} percentage={item.percentage} title={item.title} subtitle={item.subtitle} />
      ))}
    </div>
  )
}
export default Overview
