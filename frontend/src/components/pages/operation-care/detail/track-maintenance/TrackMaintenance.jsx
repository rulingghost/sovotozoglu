import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleOperationCare, updateString } from '../../../../../store/slices/operationCareSlice'
import ErrorOccurred from '../../../../custom/ErrorOccurred'
import Loader from '../../../../custom/Loader'

function TrackMaintenance() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { singleOperationCare, loading, error } = useSelector((store) => store.operationCare)

  const [selectedDate, setSelectedDate] = useState(null)
  const [filteredDates, setFilteredDates] = useState([])
  const [filteredInventorStrings, setFilteredInventorStrings] = useState([])

  useEffect(() => {
    dispatch(fetchSingleOperationCare(id))
  }, [dispatch, id])

  useEffect(() => {
    const dateList = [
      ...new Set(singleOperationCare?.operation_inventors[0].inventor_strings.map((item) => item.String_Date)),
    ]
    setFilteredDates(dateList)

    if (!selectedDate && dateList.length > 0) {
      setSelectedDate(dateList[dateList.length - 1])
    }
  }, [singleOperationCare, selectedDate])

  useEffect(() => {
    const filteredStrings = singleOperationCare?.operation_inventors
      .map((inventor) => ({
        ...inventor,
        inventor_strings: inventor.inventor_strings.filter((string) => string.String_Date === selectedDate),
      }))
      .filter((inventor) => inventor.inventor_strings.length > 0)

    setFilteredInventorStrings(filteredStrings)
  }, [selectedDate, singleOperationCare?.operation_inventors])

  const handleChangeTableData = (data) => {
    dispatch(updateString(data))
  }

  // ---------------------------------------------------------------

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div id='scrollable-div' className='custom-table-scroll rounded-xl shadow-xl overflow-auto bg-white'>
        <table className='list-table table-auto w-full'>
          <thead className='sticky top-0 bg-[#0d8e8a] text-white'>
            <tr className='bg-soento-green'>
              <th colSpan={12}>
                <div className='flex justify-between items-center px-2 py-3 text-lg text-white'>
                  <div className='flex gap-2'>
                    <span>{singleOperationCare?.client.PowerPlantName}</span>
                    <span>/</span>
                    <span>{singleOperationCare?.Operation_Care_Location}</span>
                    <span>/</span>
                    <span>AC: {singleOperationCare?.Operation_Care_AC_Power}</span>
                    <span>-</span>
                    <span>DC: {singleOperationCare?.Operation_Care_DC_Power}</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span>BAKIM TARİHİ</span>
                    <select
                      className='rounded p-1 outline-none bg-gray-100 text-black'
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate ?? ''}
                    >
                      <option value='' hidden>
                        Tarih Seçin
                      </option>
                      {filteredDates.map((item, index) => (
                        <option key={index} value={item}>
                          {new Date(item).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th>NO</th>
              <th>YÖN</th>
              <th>STRG NO</th>
              <th>PNL GÜCÜ</th>
              <th>VOC</th>
              <th>PNL MRK</th>
              <th>PNL SY</th>
              <th>İZOLASYON</th>
              <th>+</th>
              <th>-</th>
              <th>TOPLAM V</th>
              <th>%</th>
            </tr>
          </thead>

          <tbody>
            {filteredInventorStrings?.map((inventor) =>
              inventor.inventor_strings.map((string, index) => (
                <tr key={string.id} className='bg-white even:bg-gray-100'>
                  {index === 0 && (
                    <td
                      rowSpan={inventor.inventor_strings.length}
                      className='border-b font-semibold hover:cursor-pointer text-white bg-[#227774]'
                      onClick={() => console.log(inventor)}
                    >
                      <p className='text-center text-nowrap'>İNV {inventor.Inventor_Number}</p>
                    </td>
                  )}

                  {/* ------------------------------------------------------------------------ */}
                  <SelectableCell
                    value={string.String_Direction}
                    options={['Kuzey', 'Güney', 'Doğu', 'Batı']}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Direction: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Number}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Number: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Panel_Power}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Panel_Power: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_VOC}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_VOC: newValue })}
                  />
                  <EditableCell
                    type='text'
                    value={string.String_Panel_Brand}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Panel_Brand: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Panel_SY}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Panel_SY: newValue })}
                  />
                  <SelectableCell
                    value={string.String_Izolasion}
                    options={['OK', 'FAULT']}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Izolasion: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Pluse}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Pluse: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Minus}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Minus: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Capacity}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Capacity: newValue })}
                  />
                  <EditableCell
                    type='number'
                    value={string.String_Percent}
                    onChange={(newValue) => handleChangeTableData({ ...string, String_Percent: newValue })}
                  />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {loading && <Loader />}
    </>
  )
}
export default TrackMaintenance

const EditableCell = ({ type, value, onChange }) => {
  const handleBlur = (e) => {
    if (e.target.value !== String(value)) {
      onChange(e.target.value)
    }
  }

  return (
    <td>
      <input type={type} defaultValue={value} className='w-full min-w-20 rounded-lg border p-2' onBlur={handleBlur} />
    </td>
  )
}

const SelectableCell = ({ value, options, onChange }) => {
  return (
    <td>
      <select
        defaultValue={value}
        className='min-w-20 rounded-lg border p-2'
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </td>
  )
}
