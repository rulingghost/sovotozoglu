import { links } from './MenuLinks'
import { NavLink } from 'react-router-dom'

function Navigation() {
  const navLinks = links.map((item, index) => {
    return (
      <NavLink
        to={item.path}
        key={index}
        className='flex gap-3 items-center rounded-full px-4 py-2 text-nowrap text-white'
      >
        {item.icon} {item.title}
      </NavLink>
    )
  })

  return (
    <div className='fixed md:hidden bottom-3 left-3 right-3'>
      <div className='navlinks-parent flex justify-between items-center p-1 h-12 rounded-full overflow-auto bg-soento-green text-white'>
        <div className='navlinks flex h-full gap-2'>{navLinks}</div>
      </div>
    </div>
  )
}
export default Navigation
