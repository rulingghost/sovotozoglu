import '../../styles/Loader.css'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

function Loader() {
  return createPortal(
    <motion.div
      className='loader-overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className='custom-loader'></div>
    </motion.div>,
    document.body
  )
}
export default Loader
