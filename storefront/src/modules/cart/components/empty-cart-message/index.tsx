import { motion } from "framer-motion"
import { FaShoppingBag, FaArrowRight } from "react-icons/fa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DynamicButton from "@modules/common/components/dynamic-button"

const EmptyCartMessage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center" 
      data-testid="empty-cart-message"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <FaShoppingBag className="w-10 h-10 text-gray-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. 
          Discover our amazing products and start shopping!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        <LocalizedClientLink href="/store">
          <DynamicButton 
            variant="primary" 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Start Shopping
              <FaArrowRight className="w-5 h-5" />
            </span>
          </DynamicButton>
        </LocalizedClientLink>

        <div className="flex items-center justify-center gap-8 pt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Easy Returns</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default EmptyCartMessage
