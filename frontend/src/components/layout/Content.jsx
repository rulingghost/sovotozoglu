function Content({ children }) {
  return (
    <div className='flex-1 bg-soento-green overflow-auto relative z-10'>
      <div className='size-full rounded-tl-3xl bg-soento-white'>
        <div className='size-full flex flex-col px-5 py-4 overflow-auto'>{children}</div>
      </div>
    </div>
  )
}
export default Content
