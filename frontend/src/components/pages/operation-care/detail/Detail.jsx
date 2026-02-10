import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMenu } from '../../../../styles/icons'
import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

function Detail() {
  const navigate = useNavigate()
  const [mobileMenu, setMobileMenu] = useState(false)

  const subLinks = [
    { path: 'track-list', label: 'Bakım Kontrol Listesi' },
    { path: 'track-breakdown', label: 'Arıza Takip' },
    { path: 'track-maintenance', label: 'Bakım Takip' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button
            className='flex gap-1.5 items-center rounded-full ps-2 pe-3 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => navigate('/operation-care')}
          >
            <IoMdArrowRoundBack className='text-lg' /> İşletme Bakım
          </button>
        </div>

        {/* desktop view */}
        <div className='hidden xl:flex gap-2 rounded-full px-5 bg-soento-green'>
          <div className='nav-links flex gap-2'>
            {subLinks.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </div>
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
              </div>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </>
  )
}
export default Detail
