'use client'
import { motion } from 'framer-motion'

const PageLoading = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Skeleton content loader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl px-6"
        >
          {/* Header skeleton */}
          <div className="space-y-4 mb-8">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"
            />
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="space-y-3"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 + 0.1 }}
                  className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 + 0.2 }}
                  className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center space-x-2 mt-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-500 rounded-full"
          />
          <span className="text-sm text-gray-600 font-medium">Loading content...</span>
        </motion.div>
      </div>
    </div>
  )
}

export default PageLoading 