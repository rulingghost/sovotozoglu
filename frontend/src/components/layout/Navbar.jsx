import '../../styles/Modal.css'
import Logo from '/NewLogo.png'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileImage from '/Profile.png'
import { links } from './MenuLinks'
import { NavLink } from 'react-router-dom'
import { AiOutlineUser, HiOutlineLogout, CgMenuGridO, IoClose } from '../../styles/icons'

function Navbar() {
  const [showUserModal, setShowUserModal] = useState(false)
  const [showCollapsibleMenu, setShowCollapsibleMenu] = useState(false)

  return (
    <div className='block md:hidden flex-none h-12 bg-soento-white'>
      <div className='relative flex flex-row justify-between items-center px-1 size-full rounded-br-3xl bg-soento-green text-white'>
        <button className='flex justify-center items-center h-full w-12' onClick={() => setShowCollapsibleMenu(true)}>
          <CgMenuGridO className='text-2xl' />
        </button>

        <img src={Logo} alt='logo' className='h-8' />

        <button className='flex justify-center items-center h-full w-12' onClick={() => setShowUserModal(true)}>
          <AiOutlineUser className='text-2xl' />
        </button>

        <AnimatePresence>
          {showCollapsibleMenu && <CollapsibleMenu onClose={() => setShowCollapsibleMenu(false)} />}
        </AnimatePresence>

        {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
      </div>
    </div>
  )
}

function CollapsibleMenu({ onClose }) {
  const navLinks = links.map((item, index) => {
    return (
      <NavLink
        to={item.path}
        key={index}
        className='flex gap-3 !rounded-full items-center px-5 !py-2.5 shadow font-bold text-nowrap duration-1000 text-soento-green'
      >
        {item.icon} {item.title}
      </NavLink>
    )
  })

  return (
    <motion.div
      className='fixed inset-0 z-50 bg-soento-white'
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <div className='flex flex-col'>
        <div className='flex justify-between ps-1 pe-5 border-b'>
          <button className='flex justify-center items-center size-12 text-soento-green' onClick={onClose}>
            <IoClose className='text-3xl' />
          </button>
          <span className='flex justify-center items-center font-bold text-soento-green'>MENU</span>
        </div>

        <div className='mobile-links flex flex-col gap-2 p-5 size-full overflow-auto'>{navLinks}</div>
      </div>
    </motion.div>
  )
}

function UserModal({ onClose }) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login' // Redux state temizlemek için
  }

  const getUser = () => {
    try {
      const token = localStorage.getItem('token')
      return token ? jwtDecode(token) : {}
    } catch {
      return {}
    }
  }
  const user = getUser()

  return createPortal(
    <>
      <motion.div
        className='modal-backdrop'
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        style={{ zIndex: '1010' }}
      ></motion.div>

      <div className='modal-content'>
        <div className='flex flex-col items-center gap-4 p-5 min-w-60'>
          <div className='h-24'>
            <img src={ProfileImage} alt='profile' className='h-full' />
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-center font-semibold'>
              {user.name} {user.surname}
            </p>
            <p>{user.is_admin ? 'Admin' : 'Kullanıcı'}</p>
          </div>

          <button
            className='flex items-center justify-between gap-3 px-4 py-2 rounded-lg bg-soento-green text-white'
            onClick={handleLogout}
          >
            Oturumu Kapat <HiOutlineLogout className='text-xl' />
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}

export default Navbar
