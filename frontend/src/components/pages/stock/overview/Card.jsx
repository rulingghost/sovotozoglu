function Card({ percentage, title, subtitle }) {
  return (
    <div className='bg-white h-full rounded-2xl flex flex-col shadow-md pt-4 relative overflow-hidden'>
      <div className='absolute top-0 left-0 bg-slate-200  rounded-br-full pr-3 pb-3 pl-2 pt-1 text-lg text-soento-green font-bold '>
        %
      </div>
      <div className='mt-8 flex mx-4 pb-6'>
        <h3 className='text-3xl font-semibold text-soento-green ml-2'>{percentage}</h3>
        <div className='mx-auto max-w-[60%]'>
          <p className='text-lg font-semibold text-soento-green'>{title}</p>
          <p className='text-sm text-gray-500 text-wrap'>{subtitle}</p>
        </div>
      </div>
      <div className='w-full mt-auto bg-gray-200 rounded-full h-2.5'>
        <div className='bg-soento-green h-2.5 rounded-full' style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
export default Card
