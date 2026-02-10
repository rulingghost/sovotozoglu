import { NumericFormat } from 'react-number-format'

function CustomNumberInput({ field, form, decimalScale, disabled }) {
  const { setFieldValue, setFieldTouched } = form

  return (
    <NumericFormat
      className='field-control'
      onValueChange={(e) => setFieldValue(field.name, e.floatValue)}
      value={disabled ? '' : field.value}
      placeholder={decimalScale === 0 ? '0' : '0,00'}
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={decimalScale ? decimalScale : 2}
      fixedDecimalScale={decimalScale === 0 ? false : true}
      onBlur={() => setFieldTouched(field.name, true)}
      disabled={disabled}
    />
  )
}

export default CustomNumberInput
