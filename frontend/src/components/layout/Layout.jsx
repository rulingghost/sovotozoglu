import { Outlet, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './/Navbar'
import Content from './Content'
import TopBarProgress from '../custom/TopBarProgress'

const PageTransition = ({ children }) => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function Layout() {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar /> {/* Sidebar for web view */}
      <Navbar /> {/* Navbar for mobile view */}
      <Content>
        <TopBarProgress />
        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-soento-green border-t-transparent rounded-full animate-spin"></div></div>}>
          <PageTransition>
            <Outlet /> 
          </PageTransition>
        </Suspense>
      </Content>
    </div>
  )
}
export default Layout
