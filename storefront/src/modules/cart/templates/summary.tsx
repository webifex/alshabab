"use client"

import { Button } from "@medusajs/ui"
import { motion } from "framer-motion"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { FaArrowRight, FaTag } from "react-icons/fa"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        <p className="text-gray-600 mt-1">
          Review your order details
        </p>
      </div>

      {/* Discount Code Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100"
      >
        <div className="flex items-center gap-2 mb-3">
          <FaTag className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-900">Promo Code</span>
        </div>
        <DiscountCode cart={cart} />
      </motion.div>

      {/* Cart Totals */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gray-50 rounded-xl p-4"
      >
        <CartTotals totals={cart} />
      </motion.div>

      {/* Checkout Button */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
          className="block"
        >
          <Button className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <span className="flex items-center justify-center gap-3">
              Proceed to Checkout
              <FaArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </LocalizedClientLink>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500">
          🔒 Your payment information is secure and encrypted
        </p>
      </motion.div>
    </div>
  )
}

export default Summary
