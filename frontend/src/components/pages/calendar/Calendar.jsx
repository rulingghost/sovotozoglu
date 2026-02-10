import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid,
} from '@schedule-x/calendar'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import '../../../styles/Calendar.css'
import Loader from '../../custom/Loader'
import ErrorOccurred from '../../custom/ErrorOccurred'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CalendarModal from './CalendarModal'
import { formatDateForCalendar } from '../../../utils/functions'
import { IoMdAddCircle, IoCalendarNumberOutline } from '../../../styles/icons'
import { fetchCalendars, addCalendar, updateCalendar, deleteCalendar } from '../../../store/slices/calendarSlice'

function Calendar() {
  const dispatch = useDispatch()
  const { calendars, loading, error } = useSelector((state) => state.calendar)

  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için
  const [selectedDate, setSelectedDate] = useState(null) // Seçili saati almak için

  const eventsService = useState(() => createEventsServicePlugin())[0]
  const calendarsRef = useRef(calendars) // Bu olmadan calendars'a erişilemiyor

  useEffect(() => {
    dispatch(fetchCalendars()) // Sayfa yüklenirken tüm veriyi getir
  }, [dispatch])

  useEffect(() => {
    const transformedCalendars = calendars.map((calendar) => {
      if (calendar.Type === 'payment') {
        const startDate = new Date(calendar.Date)
        const endDate = new Date(calendar.Date)
        endDate.setHours(endDate.getHours() + 1) // Bir saat ileriye taşı (görünüm için)

        return {
          id: calendar.id,
          title: 'Ödeme',
          start: formatDateForCalendar(startDate, true),
          end: formatDateForCalendar(endDate, true),
          calendarId: calendar.Type,
          _options: {
            supplier: calendar.Calendar_Supplier || 0,
            Amount: calendar.Amount || 0,
            relatedPerson: calendar.RelatedPerson || '',
            note: calendar.Note || '',
          },
        }
      }

      if (calendar.Type === 'sales') {
        return {
          id: calendar.id,
          title: 'Satış Randevusu',
          start: formatDateForCalendar(calendar.Date),
          end: formatDateForCalendar(calendar.Date),
          calendarId: calendar.Type,
          _options: {
            client: calendar.Calendar_Client || 0,
            appointmentType: calendar.AppointmentType || '',
            relatedPerson: calendar.RelatedPerson || '',
            note: calendar.Note || '',
          },
        }
      }

      if (calendar.Type === 'maintenance') {
        return {
          id: calendar.id,
          title: 'İşletme Bakım',
          start: formatDateForCalendar(calendar.Date),
          end: formatDateForCalendar(calendar.Date),
          calendarId: calendar.Type,
          _options: {
            powerPlant: calendar.Calendar_PowerPlant || 0,
            site: calendar.Site || '',
            relatedPerson: calendar.RelatedPerson || '',
            note: calendar.Note || '',
          },
        }
      }

      return null
    })

    calendarsRef.current = calendars
    eventsService.set(transformedCalendars)
  }, [calendars, eventsService])

  const openModalForAdd = (selected = '') => {
    setSelectedDate(selected)
    setCurrentData(null) // Yeni ekleme için mevcut veriyi temizle
    setShowModal(true)
  }

  const openModalForEdit = (event) => {
    const item = calendarsRef.current.find((calendar) => calendar.id === event.id)
    setCurrentData(item) // Güncelleme için mevcut veriyi ayarla
    setShowModal(true)
  }

  const handleSubmit = (calendar) => {
    if (currentData) {
      dispatch(updateCalendar({ id: currentData.id, ...calendar }))
    } else {
      dispatch(addCalendar(calendar))
    }
  }

  const handleDelete = (calendarId) => {
    dispatch(deleteCalendar(calendarId))
  }

  const calendar = useCalendarApp({
    locale: 'tr-TR',
    defaultView: viewMonthGrid.name,
    plugins: [eventsService],
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [],
    monthGridOptions: {
      nEventsPerDay: 3,
    },
    calendars: {
      payment: {
        colorName: 'payment',
        lightColors: {
          main: '#00699e',
          container: '#71c1ea',
          onContainer: '#000',
        },
      },
      sales: {
        colorName: 'sales',
        lightColors: {
          main: '#077239',
          container: '#75cc9e',
          onContainer: '#000',
        },
      },
      maintenance: {
        colorName: 'maintenance',
        lightColors: {
          main: '#ff6408',
          container: '#ff9251',
          onContainer: '#000',
        },
      },
    },
    skipValidation: true,
    callbacks: {
      onClickDate(date) {
        openModalForAdd(date)
      },
      onEventClick(event) {
        openModalForEdit(event)
      },
    },
  })

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <IoCalendarNumberOutline className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Takvim</p>
        </div>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => openModalForAdd()}
          >
            <IoMdAddCircle className='text-lg' /> Yeni Etkinlik
          </button>
        </div>
      </div>

      <ScheduleXCalendar calendarApp={calendar} />

      {showModal && (
        <CalendarModal
          initialData={currentData}
          selectedDate={selectedDate}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}

      {loading && <Loader />}
    </>
  )
}

export default Calendar
