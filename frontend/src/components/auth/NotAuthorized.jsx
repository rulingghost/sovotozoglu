import Image from '/NotAuthorized.svg'

function NotAuthorized() {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <img className='w-2/3 md:w-1/3' src={Image} alt='Not Authorized' />
    </div>
  )
}
export default NotAuthorized
