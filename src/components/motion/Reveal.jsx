import { motion } from 'framer-motion'

export const easeOut = [0.22, 1, 0.36, 1]

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export default function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...props }) {
  const Comp = motion[as]

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}
