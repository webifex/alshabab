'use client'
import { motion } from 'framer-motion'

const PageLoading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Brand Logo with Glow Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          {/* Animated glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-2xl"
          />
          
          {/* Logo container */}
          <div className="relative w-24 h-24 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500">
            <img 
              src="/logo/logo.png" 
              alt="Al Shabaab Fabrics Logo" 
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h2 className="text-2xl font-bold text-gray-900 tracking-[0.2em]">
            AL-SHABAAB FABRICS
          </h2>
          <p className="text-sm text-gray-600">
            Premium School Uniforms & Educational Supplies
          </p>
        </motion.div>

        {/* Elegant Loading Spinner */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="w-12 h-12 border-3 border-gray-200 border-t-emerald-500 rounded-full"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute top-2 left-2 w-8 h-8 border-2 border-gray-100 border-b-teal-500 rounded-full"
          />
        </motion.div>

        {/* Loading Text with Dots Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center space-x-1"
        >
          <span className="text-sm font-medium text-gray-700">Loading</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  y: [-2, 0, -2]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
                className="w-1 h-1 bg-emerald-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Subtle Progress Indicator */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="h-full w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default PageLoading 