import { formatNumber, formatDate } from '../../../../utils/valueFormatters'
import { BiSolidEdit, AiFillEdit, MdOutlineKeyboardDoubleArrowRight, BiRevision } from '../../../../styles/icons'
import { useDraggable } from '@dnd-kit/core'
import { useState, useEffect, useRef } from 'react'
import CardCommentModal from './CardCommentModal'
import CardFileModal from './CardFileModal'
import { BiMoveHorizontal } from 'react-icons/bi'

export function Card({
  id,
  item,
  handleChangeStatus,
  handleEdit,
  handleRevise,
  handleJobWon,
  handleJobLost,
  handleJobPending,
}) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({ id })

  const menuRef = useRef(null) // Açılır menü referansı
  const [showMenu, setShowMenu] = useState(false)

  // For show comment modal
  const [order, setOrder] = useState(null)
  const [showCommentModal, setShowCommentModal] = useState(false)

  // For show file modal
  const [fileColumn, setFileColumn] = useState(null)
  const [showFileModal, setShowFileModal] = useState(false)

  // Menü dışına tıklanma kontrolü
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuRef])

  // For show comment and file modals
  const handleShowModal = (button) => {
    const parts = button.split('_')
    if (button.includes('Comment')) {
      setOrder(parts[2])
      setShowCommentModal(true)
    } else {
      setFileColumn(button)
      setShowFileModal(true)
    }
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='w-full'>
        <div className='flex flex-col p-1.5 rounded-xl border bg-white'>
          <div className='flex justify-between items-center text-soento-green'>
            <span className='font-bold uppercase tracking-wide'>{item.client.CompanyName_Clients}</span>
            <button className='text-xl' onClick={() => setShowMenu((prev) => !prev)}>
              <BiSolidEdit />
            </button>
          </div>
          <div className='flex flex-col gap-1 mt-2 relative'>
            {showMenu && (
              <div className='absolute flex flex-col justify-center gap-1 size-full text-white bg-white' ref={menuRef}>
                <button
                  className='flex xl:hidden items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleChangeStatus(item)}
                >
                  <BiMoveHorizontal className='text-xl' />
                  <span className='leading-none'>Durum Değişimi</span>
                </button>
                <button
                  className='flex items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleEdit(item)}
                >
                  <AiFillEdit className='text-xl' />
                  <span className='leading-none'>Güncelle</span>
                </button>
                <button
                  className='flex items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleJobWon(item)}
                >
                  <MdOutlineKeyboardDoubleArrowRight className='text-xl' />
                  <span className='leading-none'>Kazanıldı</span>
                </button>
                <button
                  className='flex items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleJobLost(item)}
                >
                  <MdOutlineKeyboardDoubleArrowRight className='text-xl' />
                  <span className='leading-none'>Kaybedildi</span>
                </button>
                <button
                  className='flex items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleJobPending(item)}
                >
                  <MdOutlineKeyboardDoubleArrowRight className='text-xl' />
                  <span className='leading-none'>Bekleyen</span>
                </button>
                <button
                  className='flex items-center gap-2 rounded p-1.5 bg-soento-green'
                  onClick={() => handleRevise(item)}
                >
                  <BiRevision className='text-xl' />
                  <span className='leading-none'>Revize</span>
                </button>
              </div>
            )}

            <span className='text-xs font-bold text-slate-500'>{formatDate(item.Date_Card)}</span>
            <span className='text-xs font-bold text-slate-500'>
              $ {formatNumber(item.Offer_Cost_NotIncludingKDV_Card)}
            </span>
            <span className='text-xs font-bold text-slate-500'>
              $ {formatNumber(item.UnitOffer_NotIncludingKDV)} USD/KWP
            </span>
            <div className='flex justify-between'>
              <span className='text-xs font-bold text-slate-500'>$ {formatNumber(item.Cost_NotIncludingKDV_Card)}</span>
              <span className='text-xs font-bold text-slate-500'>$ {formatNumber(item.UnitCost_NotIncludingKDV)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-xs font-bold text-slate-500'>{formatNumber(item.DC_Power_Card)} KWP</span>
              <span className='text-xs font-bold text-slate-500'>{item.Terrain_Roof_Card}</span>
            </div>

            <div className='grid grid-cols-3 xl:grid-cols-5 gap-1 text-xs mt-2'>
              {Array.from({ length: 3 }, (_, i) => `M${i + 1}`).map((button, index) => (
                <button
                  key={index}
                  className='p-0.5 rounded bg-gray-200'
                  onClick={() => handleShowModal(`M_File_Card${index === 0 ? '' : '_' + (index + 1)}`)}
                  style={{ backgroundColor: item[`M_File_Card${index === 0 ? '' : '_' + (index + 1)}`] && '#999999' }}
                >
                  {button}
                </button>
              ))}

              {Array.from({ length: 5 }, (_, i) => `T${i + 1}`).map((button, index) => (
                <button
                  key={index}
                  className='p-0.5 rounded bg-gray-200'
                  onClick={() => handleShowModal(`Offer_File_Card${index === 0 ? '' : '_' + (index + 1)}`)}
                  style={{
                    backgroundColor: item[`Offer_File_Card${index === 0 ? '' : '_' + (index + 1)}`] && '#999999',
                  }}
                >
                  {button}
                </button>
              ))}

              {Array.from({ length: 7 }, (_, i) => `Y${i + 1}`).map((button, index) => (
                <button
                  key={index}
                  className='p-0.5 rounded bg-gray-200'
                  onClick={() => handleShowModal(`Comment_Card_${index + 1}`)}
                  style={{ backgroundColor: item[`Comment_Card_${index + 1}`] && '#999999' }}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCommentModal && (
        <CardCommentModal initialData={item} orderNumber={order} onClose={() => setShowCommentModal(false)} />
      )}

      {showFileModal && (
        <CardFileModal initialData={item} fileColumn={fileColumn} onClose={() => setShowFileModal(false)} />
      )}
    </>
  )
}
export default Card
