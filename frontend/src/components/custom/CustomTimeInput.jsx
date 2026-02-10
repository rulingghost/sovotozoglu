import { PatternFormat } from 'react-number-format'

function CustomTimeInput({ field, form }) {
  const { setFieldValue, setFieldTouched } = form

  return (
    <PatternFormat
      className='field-control'
      onChange={(e) => setFieldValue(field.name, e.target.value)}
      value={field.value}
      mask='_'
      format='##:##'
      placeholder='__:__'
      onBlur={() => setFieldTouched(field.name, true)}
    />
  )
}

export default CustomTimeInput
