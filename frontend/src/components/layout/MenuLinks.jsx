import {
  LuUsers2,
  HiOutlineTicket,
  TbReportAnalytics,
  BiHomeAlt2,
  BiSave,
  RiLightbulbFlashLine,
  IoGitNetworkOutline,
  IoCalendarNumberOutline,
  GrVmMaintenance,
} from '../../styles/icons'

export const links = [
  { path: '/', title: 'Anasayfa', icon: <BiHomeAlt2 /> },
  { path: '/project', title: 'Projeler', icon: <RiLightbulbFlashLine /> },
  { path: '/client', title: 'Müşteriler', icon: <LuUsers2 /> },
  { path: '/supplier', title: 'Tedarikçiler', icon: <IoGitNetworkOutline /> },
  { path: '/sales-offer', title: 'Satış Teklif', icon: <HiOutlineTicket /> },
  { path: '/stock', title: 'Stok Durum', icon: <BiSave /> },
  { path: '/operation-care', title: 'İşletme Bakım', icon: <GrVmMaintenance /> },
  { path: '/report', title: 'Raporlama', icon: <TbReportAnalytics /> },
  { path: '/calendar', title: 'Takvim', icon: <IoCalendarNumberOutline /> },
]
