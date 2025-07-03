'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Logo with pulse animation - more subtle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-24 h-24 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <Image 
              src="/logo/logo.png" 
              alt="Al Shabaab Fabrics" 
              width={96} 
              height={96} 
              className="object-contain h-20 w-20 drop-shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Brand name - more subtle entrance */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold text-gray-800 tracking-[0.2em]">
            AL-SHABAAB FABRICS
          </h2>
          <p className="text-sm text-gray-600 mt-1">Loading...</p>
        </motion.div>

        {/* Loading spinner - more subtle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-500 rounded-full"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute top-1.5 left-1.5 w-7 h-7 border-2 border-teal-200 border-b-teal-500 rounded-full"
          />
        </motion.div>

        {/* Loading dots - more subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-2, 2, -2],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* Progress bar - more subtle */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-24 h-0.5 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="h-full w-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingSpinner 