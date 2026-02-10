import Image from '/ErrorOccurred.svg'

function ErrorOccurred({ message }) {
  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <img className='w-2/3 md:w-2/5' src={Image} alt='Error Occured' />
      <p className='max-w-[50%] text-justify'>Hata: {message}</p>
      <button onClick={() => window.location.reload()} className='rounded-lg py-2 px-3 mt-5 bg-soento-green text-white'>
        Sayfayı Yenile
      </button>
    </div>
  )
}
export default ErrorOccurred
