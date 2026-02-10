import { PatternFormat } from 'react-number-format'
import { useEffect } from 'react'

// GG.AA.YYYY -> YYYY-AA-GG formatına dönüştürme
const convertToApiFormat = (date) => {
  const [day, month, year] = date.split('.')
  return `${year}-${month}-${day}`
}

// YYYY-AA-GG -> GG.AA.YYYY formatına dönüştürme
const convertToDisplayFormat = (date) => {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

function CustomDateInput({ field, form, disabled }) {
  const { setFieldValue, setFieldTouched } = form

  useEffect(() => {
    if (disabled) {
      setFieldValue(field.name, '') // disabled olduğunda değeri temizle
    }
  }, [disabled, setFieldValue, field.name])

  // Gelen veriyi GG.AA.YYYY formatında göstermek
  const displayValue = field.value ? convertToDisplayFormat(field.value) : ''

  const handleChange = (e) => {
    const inputValue = e.target.value

    // Kullanıcı girdisi tamamlanmışsa API formatına dönüştür
    if (inputValue.length === 10) {
      setFieldValue(field.name, convertToApiFormat(inputValue))
    } else {
      setFieldValue(field.name, inputValue)
    }
  }

  return (
    <PatternFormat
      className='field-control'
      onChange={handleChange}
      value={displayValue}
      mask='_'
      format='##.##.####'
      placeholder='GG.AA.YYYY'
      onBlur={() => setFieldTouched(field.name, true)}
      disabled={disabled}
    />
  )
}

export default CustomDateInput

// ----------- Aşağıdaki yöntem api tarafında kabul görmedi -----------

// import { PatternFormat } from 'react-number-format'

// function CustomDateInput({ field, form }) {
//   const { setFieldValue, setFieldTouched } = form

//   return (
//     <PatternFormat
//       className='field-control'
//       onChange={(e) => setFieldValue(field.name, e.target.value)}
//       value={field.value}
//       mask='_'
//       format='##/##/####'
//       placeholder='GG/AA/YYYY'
//       onBlur={() => setFieldTouched(field.name, true)}
//     />
//   )
// }

// export default CustomDateInput
