import Logo from '/sarfea-logo.png'
import { jwtDecode } from 'jwt-decode'
import { NavLink } from 'react-router-dom'
import { links } from './MenuLinks'
import { AiOutlineUser, HiOutlineLogout, FiSearch } from '../../styles/icons'

function Sidebar() {
  const navLinks = links.map((item, index) => {
    return (
      <NavLink to={item.path} key={index} className='flex gap-3 items-center rounded-xl px-4 py-2 text-white'>
        {item.icon} {item.title}
      </NavLink>
    )
  })

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

  return (
    <div className='hidden md:block flex-none w-60 bg-soento-white'>
      <div className='flex flex-col size-full p-5 rounded-br-3xl bg-soento-green'>
        <div className='flex justify-center mt-6 mb-8'>
          <img src={Logo} alt='Sarfea Logo' className='w-48' />
        </div>

        <div className='relative w-full'>
          <input className='w-full rounded-xl px-4 py-2 outline-none text-sm' placeholder='Menülerde Arayın' />
          <FiSearch className='absolute right-3 top-1/2 transform -translate-y-1/2  text-soento-green' />
        </div>

        <div className='navlinks flex flex-1 flex-col w-full gap-2 my-5 overflow-auto'>{navLinks}</div>

        <div className='flex gap-0.5'>
          <div className='flex items-center min-w-0 w-full px-2.5 py-1.5 rounded-l-xl bg-soento-white text-soento-green'>
            <AiOutlineUser className='flex-none mr-2 text-2xl' />
            <div className='flex flex-col overflow-hidden'>
              <p className='truncate text-left font-bold'>
                {user.name} {user.surname}
              </p>
              <p className='truncate text-left -mt-2'>
                {user.is_admin ? 'Admin' : 'Kullanıcı'}
              </p>
            </div>
          </div>
          <button
            className='flex items-center px-2.5 py-1.5 rounded-r-xl bg-soento-white text-soento-green'
            onClick={handleLogout}
          >
            <HiOutlineLogout className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
