import { formatNumber } from '../../../../utils/valueFormatters'
import { HiMiniChevronDown } from '../../../../styles/icons'
import { useDroppable } from '@dnd-kit/core'
import '../../../../styles/SalesOffer.css'
import { Card } from './Card'

export function Column({
  category,
  items,
  handleChangeStatus,
  handleEdit,
  handleRevise,
  handleJobWon,
  handleJobLost,
  handleJobPending,
}) {
  const { isOver, setNodeRef } = useDroppable({ id: category })

  const getColorByColumn = (title) => {
    const colorMap = {
      'Potansiyel Müşteri': '#1a9a9b',
      'Maliyet Hesaplama': '#1a9b69',
      'Fiyat Belirleme': '#1a699b',
      'Teklif Hazırlama': '#661a9b',
      'Teklif Hazır': '#9b1a41',
      'Teklif Sunuldu': '#59bb79',
      'Sunum Sonrası Görüşme': '#8d1a9b',
    }

    return colorMap[title] || '#000000'
  }

  const getTotalUnitOffer = () => {
    if (items.length === 0) return 0

    let totalUnitOffer = 0

    items.forEach((item) => {
      if (item.UnitOffer_NotIncludingKDV) {
        totalUnitOffer += parseFloat(item.UnitOffer_NotIncludingKDV)
      }
    })

    return totalUnitOffer
  }

  const style = { borderColor: isOver ? '#0a6865' : undefined }

  return (
    <div
      className='flex flex-col items-center border shadow-lg rounded-2xl bg-soento-green size-full overflow-hidden'
      ref={setNodeRef}
    >
      <span className='pt-5 pb-3 text-sm font-medium text-soento-white text-center'>{category}</span>

      <div className='flex flex-col rounded-xl size-full overflow-hidden bg-white border' style={style}>
        <div
          className='flex justify-between items-center px-4 py-1 mx-2 mt-2 mb-1 rounded-full'
          style={{ backgroundColor: getColorByColumn(category) }}
        >
          <p className='font-medium text-sm text-white'>$ {formatNumber(getTotalUnitOffer())}</p>
          <p className='font-medium text-sm text-white tracking-wide'>({items.length})</p>
        </div>

        <div className='card-list flex flex-col items-center gap-2 p-1 size-full overflow-auto'>
          {items.length > 0 ? (
            items.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                item={item}
                handleChangeStatus={handleChangeStatus}
                handleEdit={handleEdit}
                handleRevise={handleRevise}
                handleJobWon={handleJobWon}
                handleJobLost={handleJobLost}
                handleJobPending={handleJobPending}
              />
            ))
          ) : (
            <HiMiniChevronDown className='text-gray-700' />
          )}
        </div>
      </div>
    </div>
  )
}

export default Column
