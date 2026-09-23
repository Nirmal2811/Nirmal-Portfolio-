import { motion } from 'framer-motion'

import { easeOut } from '@/components/motion/Reveal'

export default function PageTransition({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
