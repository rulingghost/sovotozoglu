import '../../../styles/OperationCare.css'
import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IoMdAddCircle, GrVmMaintenance, IoWarning, IoMenu } from '../../../styles/icons'
import MaintenanceModal from './maintenance/MaintenanceModal'
import BreakdownModal from './breakdown/BreakdownModal'
import { addOperationCare, addFail } from '../../../store/slices/operationCareSlice'

function OperationCare() {
  const dispatch = useDispatch()

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [showBreakdownModal, setShowBreakdownModal] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleSubmitMaintenance = (maintenance) => {
    dispatch(addOperationCare(maintenance))
  }

  const handleSubmitBreakdown = (fail) => {
    dispatch(addFail(fail))
  }

  const subLinks = [
    { path: 'maintenance', label: 'İşletme Bakım' },
    { path: 'breakdown', label: 'Arıza Takip' },
    { path: 'invoices', label: 'Faturalar' },
  ]

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <GrVmMaintenance className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>İşletme Bakım</p>
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
            onClick={() => setShowBreakdownModal(true)}
          >
            <IoWarning className='text-lg' /> Arıza Bildir
          </button>
          <button
            className='flex gap-1.5 items-center rounded-full px-2 py-1 my-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'
            onClick={() => setShowMaintenanceModal(true)}
          >
            <IoMdAddCircle className='text-lg' /> Bakım Başlat
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
                  onClick={() => setShowBreakdownModal(true)}
                >
                  <IoWarning className='text-lg' /> Arıza Bildir
                </button>
                <button
                  className='flex gap-2 items-center rounded-xl px-4 py-2 font-medium bg-soento-white text-soento-green'
                  onClick={() => setShowMaintenanceModal(true)}
                >
                  <IoMdAddCircle className='text-lg' /> Bakım Başlat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showMaintenanceModal && (
        <MaintenanceModal onSubmit={handleSubmitMaintenance} onClose={() => setShowMaintenanceModal(false)} />
      )}

      {showBreakdownModal && (
        <BreakdownModal onSubmit={handleSubmitBreakdown} onClose={() => setShowBreakdownModal(false)} />
      )}

      <Outlet />
    </>
  )
}
export default OperationCare
