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

  if (allowedGroups.includes('All')) {
    return children
  }

  const userGroups = decodedToken.groups

  // Kullanıcının grupları ile izin verilen gruplar kesişiyor mu kontrol ediliyor
  const hasAccess = allowedGroups.some((group) => userGroups.includes(group))

  return hasAccess ? children : <Navigate to='/not-authorized' replace={true} />
}
export default PrivateRoute
