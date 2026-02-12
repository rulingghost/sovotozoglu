import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Sidebar from './Sidebar'
import Navbar from './/Navbar'
import Content from './Content'

function Layout() {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar /> {/* Sidebar for web view */}
      <Navbar /> {/* Navbar for mobile view */}
      <Content>
        <Suspense fallback={null}>
          <Outlet /> {/* Content for both view */}
        </Suspense>
      </Content>
    </div>
  )
}
export default Layout
