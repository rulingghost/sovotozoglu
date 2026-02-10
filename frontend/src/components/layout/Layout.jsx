import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './/Navbar'
import Content from './Content'

function Layout() {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <Sidebar /> {/* Sidebar for web view */}
      <Navbar /> {/* Navbar for mobile view */}
      <Content>
        <Outlet /> {/* Content for both view */}
      </Content>
    </div>
  )
}
export default Layout
