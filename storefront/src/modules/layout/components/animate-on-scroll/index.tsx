'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  delay?: number
  duration?: number
  once?: boolean
}

const AnimateOnScroll = ({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.4,
  once = true
}: AnimateOnScrollProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: "-50px 0px -50px 0px" 
  })

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 16 }),
      ...(direction === 'down' && { y: -16 }),
      ...(direction === 'left' && { x: 16 }),
      ...(direction === 'right' && { x: -16 }),
      ...(direction === 'scale' && { scale: 0.95 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation - more subtle
export const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.05 
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

// Floating animation for hero elements - more subtle
export const FloatingElement = ({ 
  children, 
  className = '',
  intensity = 3,
  duration = 4 
}: { 
  children: ReactNode
  className?: string
  intensity?: number
  duration?: number
}) => {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-0.5, 0.5, -0.5]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimateOnScroll 