import { PatternFormat } from 'react-number-format'

function CustomPhoneInput({ field, form }) {
  const { setFieldValue, setFieldTouched } = form

  return (
    <PatternFormat
      className='field-control'
      onChange={(e) => setFieldValue(field.name, e.target.value)}
      value={field.value}
      mask='_'
      format='(###) ### ## ##'
      placeholder='(___) ___ __ __'
      onBlur={() => setFieldTouched(field.name, true)}
    />
  )
}

export default CustomPhoneInput
