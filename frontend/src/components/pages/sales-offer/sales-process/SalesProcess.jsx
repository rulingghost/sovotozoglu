import { Card } from './Card'
import { Column } from './Column'
import Loader from '../../../custom/Loader'
import { useState, useEffect } from 'react'
import SalesProcessModal from './SalesProcessModal'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  fetchSalesOffers,
  addSalesOffer,
  updateSalesOffer,
  addSalesOfferRevise,
} from '../../../../store/slices/salesOfferSlice'

import { addClient } from '../../../../store/slices/clientSlice'
import ChangeStatusModal from './ChangeStatusModal'

const categories = [
  'Potansiyel Müşteri',
  'Maliyet Hesaplama',
  'Fiyat Belirleme',
  'Teklif Hazırlama',
  'Teklif Hazır',
  'Teklif Sunuldu',
  'Sunum Sonrası Görüşme',
]

function SalesProcess() {
  const dispatch = useDispatch()
  const { salesOffers, loading, error } = useSelector((state) => state.salesOffer)

  // Güncellenecek ve revize alınacak veri için
  const [showModal, setShowModal, currentData, setCurrentData, isRevise, setIsRevise] = useOutletContext()

  // Durum değişim modalı için
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)

  const [containers, setContainers] = useState({}) // Sütunlar ve kartlar için
  const [activeId, setActiveId] = useState(null) // Sürüklenen öğeyi takip etmek için

  useEffect(() => {
    dispatch(fetchSalesOffers()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  const openModalForEdit = (item) => {
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setIsRevise(false)
    setShowModal(true)
  }

  const openModalForRevise = (item) => {
    setCurrentData(item) // Revizyon için mevcut veriyi ayarla
    setIsRevise(true)
    setShowModal(true)
  }

  const openModalForChangeStatus = (item) => {
    setCurrentData(item) // Durum değişimi için mevcut veriyi ayarla
    setIsRevise(false)
    setShowChangeStatusModal(true)
  }

  // For add, update, revise modals
  const handleSubmit = async (salesOffer) => {
    if (isRevise) {
      dispatch(
        addSalesOfferRevise({ Revise_Owner: currentData.id, ...currentData, Client_Card: currentData.Client_Card })
      )
    }

    if (currentData) {
      dispatch(updateSalesOffer({ id: currentData.id, ...salesOffer, Client_Card: currentData.Client_Card }))
    } else {
      var newClient = await dispatch(addClient({ CompanyName_Clients: salesOffer.Client_Card }))
      dispatch(addSalesOffer({ ...salesOffer, Client_Card: newClient.payload.id }))
    }
  }

  const handleJobWon = (salesOffer) => {
    dispatch(updateSalesOffer({ ...salesOffer, Is_Gain: true }))
  }

  const handleJobLost = (salesOffer) => {
    dispatch(updateSalesOffer({ ...salesOffer, Is_Lost: true }))
  }

  const handleJobPending = (salesOffer) => {
    dispatch(updateSalesOffer({ ...salesOffer, Is_late: true }))
  }

  useEffect(() => {
    // Initialize containers state with empty arrays for all categories
    const groupedCards = categories.reduce((acc, category) => {
      acc[category] = [] // Initialize each category with an empty array
      return acc
    }, {})

    // Filter salesOffers to only include items where Is_Gain, Is_Lost, and Is_Late are false
    const filteredSalesOffers = salesOffers.filter((offer) => !offer.Is_Gain && !offer.Is_Lost && !offer.Is_late)

    // Sort filtered salesOffers by id in descending order
    const sortedSalesOffers = filteredSalesOffers.sort((a, b) => b.id - a.id)

    // Group sorted salesOffers into the appropriate categories
    sortedSalesOffers.forEach((item) => {
      if (groupedCards[item.Situation_Card]) {
        groupedCards[item.Situation_Card].push(item)
      }
    })

    setContainers(groupedCards)
  }, [salesOffers])

  function handleDragStart(event) {
    setActiveId(event.active.id) // Sürükleme başladığında activeId'yi güncelle
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (over) {
      const fromContainer = Object.keys(containers).find((container) =>
        containers[container].some((card) => card.id === active.id)
      )
      const toContainer = over.id

      // If the card is dropped in the same container, do nothing
      if (fromContainer === toContainer) return

      // Remove the card from the original container
      if (fromContainer) {
        const cardToMove = containers[fromContainer].find((card) => card.id === active.id)

        // Yeri değiştirlen kartın durumunu güncelle
        const updatedSituationCard = { ...cardToMove, Situation_Card: toContainer }

        // Güncellenen veriyi kaydet
        dispatch(updateSalesOffer(updatedSituationCard))

        setContainers((prev) => ({
          ...prev,
          [fromContainer]: prev[fromContainer].filter((card) => card.id !== active.id),
          [toContainer]: [{ ...cardToMove, Situation_Card: toContainer }, ...prev[toContainer]],
        }))
      }
    }

    setActiveId(null) // Sürükleme bittiğinde activeId'yi sıfırla
  }

  const activeItem = activeId
    ? Object.values(containers)
        .flat()
        .find((item) => item.id === activeId)
    : null // Sürüklenen kartı bul

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Tolerance of 5px of movement
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // Press delay of 250ms
        tolerance: 5, // Tolerance of 5px of movement
      },
    })
  )

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <div className='overflow-x-auto h-full rounded-xl'>
          <div className='grid grid-cols-7 gap-2 h-full w-full min-w-[1400px]'>
            {Object.keys(containers).map((category) => (
              <Column
                key={category}
                category={category}
                items={containers[category]}
                handleChangeStatus={openModalForChangeStatus}
                handleEdit={openModalForEdit}
                handleRevise={openModalForRevise}
                handleJobWon={handleJobWon}
                handleJobLost={handleJobLost}
                handleJobPending={handleJobPending}
              />
            ))}
          </div>
        </div>

        <DragOverlay>{activeItem ? <Card id={activeItem.id} item={activeItem} /> : null}</DragOverlay>
      </DndContext>

      {showModal && (
        <SalesProcessModal
          initialData={currentData}
          isRevise={isRevise}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {showChangeStatusModal && (
        <ChangeStatusModal
          initialData={currentData}
          isRevise={isRevise}
          onClose={() => setShowChangeStatusModal(false)}
        />
      )}

      {loading && <Loader />}
    </>
  )
}

export default SalesProcess
