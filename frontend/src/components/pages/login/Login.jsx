import axios from 'axios'
import Logo from '/NewLogo.png'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FaEyeSlash, FaUser, FaLock, FaEye, CgSpinner } from '../../../styles/icons'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/token/', { username, password })
      const { access } = response.data
      localStorage.setItem('token', access)
      navigate('/')
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Ağ hatası: Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.')
      } else if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail
        if (
          errorMessage.toLowerCase().includes('no active account') ||
          errorMessage.toLowerCase().includes('verilen kimlik')
        ) {
          setError('Hatalı giriş: Kullanıcı adı veya parola yanlış.')
        }
      } else {
        setError('Hata: ', error)
      }
    } finally {
      setLoading(false)
    }
  }

  // Token varsa yönlendir
  const token = localStorage.getItem('token')
  if (token) return <Navigate to='/' replace={true} />

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0a6865] to-[#1abf9c]'>
      <div className='w-full max-w-md rounded-xl shadow-lg bg-opacity-70 p-7 m-5 bg-white'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-center my-10'>
              <img src={Logo} alt='logo' className='w-44 invert' />
            </div>

            <div className='relative'>
              <input
                type='text'
                className='w-full shadow rounded-lg outline-none py-4 px-14 text-lg text-gray-700'
                placeholder='Kullanıcı adı'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                spellCheck='false'
                autoComplete='new-password' // disable autocomplete
                required
              />
              <div className='flex items-center absolute px-5 top-0 bottom-0 left-0'>
                <FaUser className='text-lg text-gray-700' />
              </div>
            </div>

            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='w-full shadow rounded-lg outline-none py-4 px-14 text-lg text-gray-700'
                placeholder='Parola'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                spellCheck='false'
                autoComplete='new-password' // disable autocomplete
                required
              />
              <div className='flex items-center absolute px-5 top-0 bottom-0 left-0'>
                <FaLock className='text-lg text-gray-700' />
              </div>
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='flex items-center absolute px-5 top-0 bottom-0 right-0 text-lg text-gray-600'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='flex justify-center items-center shadow rounded-lg h-12 text-xl text-white bg-gray-700'
            >
              {loading ? <CgSpinner className='text-3xl animate-spin' /> : 'Giriş Yap'}
            </button>

            {error && <span className='text-center font-semibold text-red-500'>{error}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
