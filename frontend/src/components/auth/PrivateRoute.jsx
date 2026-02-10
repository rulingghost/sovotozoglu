import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children, allowedGroups }) {
  const token = localStorage.getItem('token')

  // Token yoksa login sayfasına yönlendir
  if (!token) {
    window.location.href = '/login'
    return
  }

  // Tokeni decode et
  let decodedToken
  try {
    decodedToken = jwtDecode(token)
  } catch (error) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  // Token süresi bittiyse login sayfasına yönlendir
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  if (allowedGroups.includes('All') || decodedToken.is_admin) {
    return children
  }

  const userGroups = decodedToken.groups || []
  
  // DEBUG: Token içeriğini konsola yazdır
  console.log('Decoded Token Groups:', userGroups)
  console.log('Allowed Groups for this Route:', allowedGroups)

  // Kullanıcının grupları ile izin verilen gruplar kesişiyor mu kontrol ediliyor
  const hasAccess = allowedGroups.some((group) => userGroups.includes(group))

  if (!hasAccess) {
    console.warn('Access Denied: User groups do not match required groups.')
  }

  return hasAccess ? children : <Navigate to='/not-authorized' replace={true} />
}
export default PrivateRoute
