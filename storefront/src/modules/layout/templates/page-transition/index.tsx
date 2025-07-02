'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

// Animation variants for different transition types - made more subtle
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.99
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -4,
    scale: 1.01
  }
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.25
}

// Stagger animation for child elements - more subtle
const containerVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
}

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`min-h-screen ${className}`}
      >
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Alternative slide transition for specific pages - more subtle
export const SlidePageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname()

  const slideVariants = {
    initial: {
      opacity: 0,
      x: 12
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: -8
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={{ type: 'spring', stiffness: 400, damping: 25, duration: 0.3 }}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Fade transition for simple pages - more subtle
export const FadePageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname()

  const fadeVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeVariants}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition 