import { motion } from 'framer-motion'

import { easeOut } from '@/components/motion/Reveal'
import { useBootReady } from '@/hooks/useBootReady'

export default function PageTransition({ children, className }) {
  const ready = useBootReady()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
