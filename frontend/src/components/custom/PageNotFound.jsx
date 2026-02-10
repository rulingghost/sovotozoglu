import Image from '/PageNotFound.svg'

function PageNotFound() {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <img className='w-2/3 md:w-1/3' src={Image} alt='Page Not Found' />
    </div>
  )
}
export default PageNotFound
