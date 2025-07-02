'use client'
import { motion } from 'framer-motion'
import { FaLock, FaShieldAlt } from 'react-icons/fa'

const CheckoutLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Security badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 border-4 border-white/30 border-t-white rounded-full"
              />
              <FaShieldAlt className="text-white text-2xl relative z-10" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-600"
            >
              <FaLock className="text-emerald-500" />
              <span>Secure Checkout</span>
            </motion.div>
          </motion.div>

          {/* Loading message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Preparing Your Checkout
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we secure your session...
            </p>
          </motion.div>

          {/* Progress steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            {[
              'Validating cart items',
              'Calculating shipping',
              'Preparing payment gateway'
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: index * 0.3 
                  }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                {step}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutLoading 