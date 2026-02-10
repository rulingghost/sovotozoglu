import Select from 'react-select'

function CustomSelect({ options, field, form, placeholder }) {
  const { setFieldValue, setFieldTouched } = form

  return (
    <Select
      options={options}
      onChange={(option) => setFieldValue(field.name, option ? option.value : '')}
      value={options.find((option) => option.value === field.value)}
      onBlur={() => setFieldTouched(field.name, true)}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (provided, state) => ({
          ...provided,
          padding: '0.15rem',
          borderColor: state.isFocused ? '#0a6865' : '#a9a9a9',
          boxShadow: state.isFocused ? '0 0 0 1px #0a6865' : provided.boxShadow,
          '&:hover': {
            borderColor: state.isFocused ? '#0a6865' : '#a9a9a9',
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'black',
          fontWeight: 400,
        }),
      }}
      menuPortalTarget={document.body}
    />
  )
}
export default CustomSelect
