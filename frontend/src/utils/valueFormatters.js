export const formatNumber = (value) => {
  // Eğer value null ise geriye sıfır döndür
  if (value === null) {
    return '0,00'
  }

  // Eğer value zaten bir sayıysa direkt olarak işlem yap
  let number
  if (typeof value === 'string') {
    // String ise, önce ondalık ayracını kontrol edip sayıya çevir
    number = parseFloat(value.replace(',', '.'))
  } else if (typeof value === 'number') {
    // Eğer zaten bir sayıysa, direkt kullan
    number = value
  }

  // NaN kontrolü yap
  if (isNaN(number)) {
    return 'Geçersiz sayı'
  }

  // Sayıyı formatla
  return new Intl.NumberFormat('tr-TR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
}

//----------------------------------------------------------------------------------

export const formatNumberFourFractionDigit = (value) => {
  // Eğer value null ise geriye sıfır döndür
  if (value === null) {
    return '0,0000'
  }

  // Eğer value zaten bir sayıysa direkt olarak işlem yap
  let number
  if (typeof value === 'string') {
    // String ise, önce ondalık ayracını kontrol edip sayıya çevir
    number = parseFloat(value.replace(',', '.'))
  } else if (typeof value === 'number') {
    // Eğer zaten bir sayıysa, direkt kullan
    number = value
  }

  // NaN kontrolü yap
  if (isNaN(number)) {
    return 'Geçersiz sayı'
  }

  // Sayıyı formatla
  return new Intl.NumberFormat('tr-TR', {
    style: 'decimal',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(number)
}

//----------------------------------------------------------------------------------

export const formatDate = (dateString) => {
  // Eğer dateString null ise geriye mesaj döndür
  if (!dateString) {
    return '(tarih eklenmedi)'
  }

  // Farklı ayraçları normalize et: Nokta, slash veya tire (-) ile ayrılmış olabilir
  const normalizedDateString = dateString.replace(/[./]/g, '-')

  // Yıl mı başta yoksa gün mü? Bunu kontrol et
  let parts = normalizedDateString.split('-')
  let yearFirst = parts[0].length === 4

  let date
  if (yearFirst) {
    // Yıl önde ise: YYYY-MM-DD
    date = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`)
  } else {
    // Gün önde ise: DD-MM-YYYY
    date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
  }

  // Date objesini kontrol et (geçersiz tarih olup olmadığını anlamak için)
  if (isNaN(date.getTime())) {
    return 'Geçersiz tarih'
  }

  // Türkçe dilinde tarihi formatla
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

//----------------------------------------------------------------------------------

export const formatDateTime = (isoString) => {
  // Eğer isoString null veya boş ise geriye mesaj döndür
  if (!isoString) {
    return '(tarih eklenmedi)'
  }

  // ISO 8601 formatındaki tarih için Date objesi oluştur
  const date = new Date(isoString)

  // Geçerli bir tarih olup olmadığını kontrol et
  if (isNaN(date.getTime())) {
    return 'Geçersiz tarih'
  }

  // Türkçe dilinde tarihi formatla: 8 Ekim 2024
  const formattedDate = date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Türkçe dilinde saati formatla: 01:54
  const formattedTime = date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${formattedDate} - ${formattedTime}`
}
