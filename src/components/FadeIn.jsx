import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  style = {},
  once = true,
  threshold = 0.15,
}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold })

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    none: { y: 0, x: 0 },
  }

  const { x, y } = offsets[direction] || offsets.up

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, willChange: inView ? 'auto' : 'transform' }}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
