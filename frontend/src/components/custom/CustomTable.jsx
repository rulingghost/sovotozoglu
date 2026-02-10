import {
  FaBook,
  FaSort,
  FaCircle,
  FaSortUp,
  FaFileAlt,
  FaSortDown,
  BiSolidEdit,
  MdManageSearch,
  RiDeleteBin6Line,
  LuArrowUpLeftSquare,
  LuArrowUpRightSquare,
} from '../../styles/icons.js'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkOperationCareFinishDate } from '../../utils/functions.js'

const CustomTable = ({
  data,
  title,
  columns,
  handleEdit,
  handleDelete,
  handleProjectDetail,
  handleReviseDetail,
  handleJobStatus,
  handleMaintenanceDetail,
}) => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  // For sales offer list table
  const colorMap = {
    'Potansiyel Müşteri': '#1a9a9b',
    'Maliyet Hesaplama': '#1a9b69',
    'Fiyat Belirleme': '#1a699b',
    'Teklif Hazırlama': '#661a9b',
    'Teklif Hazır': '#9b1a41',
    'Teklif Sunuldu': '#59bb79',
    'Sunum Sonrası Görüşme': '#8d1a9b',

    'Kazanılan İş': '#04eb22',
    'Kaybedilen İş': '#ca0828',
    'Bekleyen İş': '#5d88ec',
  }

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? (
        <FaSortUp className='text-xs' />
      ) : (
        <FaSortDown className='text-xs' />
      )
    }
    return <FaSort className='text-xs' />
  }

  const sortedData = useMemo(() => {
    let sortableData = [...data]
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [data, sortConfig])

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'))
    )
  )

  return (
    <div className='px-6 py-8 shadow-lg rounded-xl bg-white'>
      {title && <p className='ps-1 pb-5 font-bold text-lg text-soento-green'>{title}</p>}

      {/* Search Input */}
      <div className='relative w-full mb-4'>
        <input
          className='py-1.5 ps-11 pe-2 rounded-xl w-full border border-gray-200 outline-soento-green bg-gray-100'
          placeholder='Tabloda ara...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MdManageSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl' />
      </div>

      {/* Table */}
      <div className='custom-table-scroll overflow-x-auto pb-1'>
        <table className='table-auto w-full border-collapse'>
          <thead>
            <tr className='border-b'>
              <th className='w-[1%]'></th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className='cursor-pointer select-none text-nowrap font-medium text-sm p-4'
                  onClick={() => handleSort(col.key)}
                >
                  <span className='flex items-center gap-1 leading-none text-gray-700'>
                    {col.title} {getSortIcon(col.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className='p-4 text-center text-gray-500'>
                  Sonuç bulunamadı
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className='bg-white even:bg-gray-100'>
                  <td className='flex text-2xl'>
                    {/* For edit button on table */}
                    {handleEdit && (
                      <button className='m-3 me-0' onClick={() => handleEdit(item)}>
                        <BiSolidEdit className='text-soento-green' />
                      </button>
                    )}

                    {/* For delete button on table */}
                    {handleDelete && (
                      <button className='m-3 me-0' onClick={() => handleDelete(item.id)}>
                        <RiDeleteBin6Line className='text-red-500' />
                      </button>
                    )}

                    {/* For project detail button on table */}
                    {handleProjectDetail && (
                      <button className='m-3 me-0' onClick={() => navigate(`details/${item.id}`)}>
                        <LuArrowUpRightSquare className='text-soento-green' />
                      </button>
                    )}

                    {/* For maintenance detail button on table */}
                    {handleMaintenanceDetail && (
                      <button className='m-3 me-0' onClick={() => navigate(`/operation-care/details/${item.id}`)}>
                        <LuArrowUpRightSquare className='text-soento-green' />
                      </button>
                    )}

                    {/* For return sales offer button on table */}
                    {handleJobStatus && (
                      <button className='m-3 me-0' onClick={() => handleJobStatus(item.id)}>
                        <LuArrowUpLeftSquare className='text-soento-green' />
                      </button>
                    )}

                    {/* For revise detail button on table */}
                    {handleReviseDetail && (
                      <button className='m-3 me-0' onClick={() => navigate(`/sales-offer/revises/${item.id}`)}>
                        <FaBook className='text-soento-green' />
                      </button>
                    )}
                  </td>

                  {/* For sales offer list colored and others */}
                  {columns.map((col) => (
                    <td key={col.key} className='leading-none text-nowrap p-4 text-gray-800'>
                      {item[col.key] === null || item[col.key] === '' ? (
                        '-'
                      ) : handleReviseDetail && col.key === 'x_Situation_Card' ? (
                        <div className='flex items-center gap-2'>
                          <FaCircle style={{ color: colorMap[item[col.key]] || '#000' }} />
                          {item[col.key]}
                        </div>
                      ) : col.key === 'Fail_Situation' ? (
                        <div
                          className='rounded-full text-center font-semibold p-2 -my-2'
                          style={{
                            backgroundColor:
                              item[col.key] == 'Belirlendi'
                                ? '#d893a3'
                                : item[col.key] == 'Onarımda'
                                ? '#ebc474'
                                : '#7ad068',
                          }}
                        >
                          {item[col.key]}
                        </div>
                      ) : col.key === 'Fail_Bill_File' ? (
                        <a href={`${item[col.key]}`} target='_blank' download>
                          <button
                            type='button'
                            className='flex gap-2 px-4 py-2 -my-2 font-semibold rounded-full text-gray-800 bg-slate-300'
                          >
                            <FaFileAlt /> Dosyayı Görüntüle
                          </button>
                        </a>
                      ) : col.key === 'x_Operation_Care_Finish_Date' ? (
                        <div
                          className='px-4 py-2 -my-2 font-semibold rounded-full text-center'
                          style={{ backgroundColor: checkOperationCareFinishDate(item[col.key]) }}
                        >
                          {item[col.key]}
                        </div>
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}

                  {/* {columns.map((col) => (
                    <td key={col.key} className='p-3 text-nowrap text-gray-800'>
                      {item[col.key] === null || item[col.key] === '' ? '-' : item[col.key]}
                    </td>
                  ))} */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomTable
