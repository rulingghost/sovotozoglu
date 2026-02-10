import '../../../styles/SalesOffer.css'
import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoMdAddCircle, HiOutlineTicket, IoMenu } from '../../../styles/icons'

function SalesOffer() {
  const [showModal, setShowModal] = useState(false)
  const [currentData, setCurrentData] = useState(null) // Güncellenecek veri için
  const [isRevise, setIsRevise] = useState(false) // Revize alınacak veri için
  const [mobileMenu, setMobileMenu] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const isButtonActive = location.pathname === '/sales-offer/sales-process'

  const openModalForAdd = () => {
    setCurrentData(null)
    setIsRevise(false)
    setShowModal(true)

    if (!isButtonActive) {
      navigate('/sales-offer/sales-process')
    }
  }

  const subLinks = [
    { path: 'list', label: 'Liste' },
    { path: 'pending-jobs', label: 'Bekleyen İşler' },
    { path: 'sales-process', label: 'Satış Süreci' },
    { path: 'won-jobs', label: 'Kazanılan İşler' },
    { path: 'lost-jobs', label: 'Kaybedilen İşler' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <HiOutlineTicket className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Satış Teklif</p>
        </div>

        {/* desktop view */}
        <div className='hidden xl:flex gap-2 rounded-full pl-5 pr-1.5 bg-soento-green'>
          <div className='nav-links flex gap-2'>
            {subLinks.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 my-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={openModalForAdd}
          >
            <IoMdAddCircle className='text-lg' /> Yeni Satış
          </button>
        </div>

        {/* mobile view */}
        <div className='flex xl:hidden'>
          <button onClick={() => setMobileMenu(true)} className='px-2 text-soento-green'>
            <IoMenu className='text-3xl' />
          </button>
        </div>

        {/* menu */}
        {mobileMenu && (
          <div
            className='absolute top-0 left-0 z-10 w-full h-screen flex items-center justify-center bg-opacity-70 bg-black'
            onClick={() => setMobileMenu(false)}
          >
            <div className='rounded-xl p-4 w-4/5 max-w-sm bg-soento-white'>
              <div className='mobile-links flex flex-col gap-1.5'>
                {subLinks.map((item, index) => (
                  <NavLink key={index} to={item.path}>
                    {item.label}
                  </NavLink>
                ))}

                <hr className='h-0.5 bg-gray-300' />

                <button
                  className='flex gap-2 items-center rounded-xl px-4 py-2 font-medium bg-soento-white text-soento-green'
                  onClick={openModalForAdd}
                >
                  <IoMdAddCircle className='text-lg' /> Yeni Satış
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Outlet context={[showModal, setShowModal, currentData, setCurrentData, isRevise, setIsRevise]} />
    </>
  )
}
export default SalesOffer
