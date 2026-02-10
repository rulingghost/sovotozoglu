import axios from 'axios'

export const getDollarRate = async (date, timeOption) => {
  const inputDate = new Date(date)

  if (!timeOption) {
    return { status: false, message: 'Kur saati seçimi yapılmadı' }
  }

  if (isNaN(inputDate.getTime())) {
    return { status: false, message: 'Geçerli bir tarih girilmedi' }
  }

  // Tarihi işleme
  const day = inputDate.getDay() // Haftanın günü (0: Pazar, 1: Pazartesi, ..., 6: Cumartesi)
  let targetDate = new Date(inputDate)

  if (timeOption === 'before') {
    if (day === 0) {
      // Pazar → Cuma
      targetDate.setDate(targetDate.getDate() - 2) // Pazar → Cuma
    } else if (day === 6) {
      // Cumartesi → Cuma
      targetDate.setDate(targetDate.getDate() - 1) // Cumartesi → Cuma
    } else if (day === 1) {
      // Pazartesi → Cuma
      targetDate.setDate(targetDate.getDate() - 3) // Pazartesi → Cuma
    } else {
      targetDate.setDate(targetDate.getDate() - 1) // Diğer günler → Önceki gün
    }
  } else if (timeOption === 'after') {
    if (day === 0) {
      // Pazar → Pazartesi
      targetDate.setDate(targetDate.getDate() + 1) // Pazar → Pazartesi
    } else if (day === 6) {
      // Cumartesi → Pazartesi
      targetDate.setDate(targetDate.getDate() + 2) // Cumartesi → Pazartesi
    }
    // Haftaiçi ise tarih değişmez
  }

  // "YYYY-MM-DD" → "DD-MM-YYYY" formatına dönüştür
  const formattedDate = targetDate.toISOString().split('T')[0].split('-').reverse().join('-')

  // API çağrısı
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get_dollar_rate/${formattedDate}/`)

    // Yanıt kontrolü ve gösterimi
    if (response.data && response.data.rate) {
      return { status: true, data: response.data.rate }
    } else {
      return { status: true, data: 0 }
    }
  } catch {
    // Hata kontrolü
    return { status: false, message: 'Dolar kuru alınamadı, tekrar deneyin' }
  }
}

export const checkOperationCareFinishDate = (finishDate) => {
  const today = new Date()

  // Türkçe ayları İngilizceye çeviren bir harita
  const monthMap = {
    Ocak: 'January',
    Şubat: 'February',
    Mart: 'March',
    Nisan: 'April',
    Mayıs: 'May',
    Haziran: 'June',
    Temmuz: 'July',
    Ağustos: 'August',
    Eylül: 'September',
    Ekim: 'October',
    Kasım: 'November',
    Aralık: 'December',
  }

  // Gelen tarihi böl ve Türkçe ayı İngilizceye çevir
  const [day, month, year] = finishDate.split(' ')
  const englishMonth = monthMap[month]
  const targetDate = new Date(`${englishMonth} ${day}, ${year}`)

  // Tarih farkını hesapla
  const diffInTime = targetDate - today
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24))

  // Koşulları kontrol et
  if (diffInDays > 15) {
    return ''
  } else if (diffInDays <= 15 && diffInDays > 7) {
    return '#ebc474'
  } else if (diffInDays <= 7 && diffInDays > 0) {
    return '#6fcaea'
  } else {
    return '#d893a3'
  }
}

export const formatDateForCalendar = (date, includeTime = false) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0') // Aylar 0-indexlidir
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return includeTime ? `${year}-${month}-${day} ${hours}:${minutes}` : `${year}-${month}-${day}`
}
