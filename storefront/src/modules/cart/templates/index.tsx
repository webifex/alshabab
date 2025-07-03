"use client"

import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"
import { FaShoppingBag, FaLock, FaShieldAlt } from "react-icons/fa"
import { motion } from "framer-motion"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="content-container py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full mb-4">
              <FaShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600 text-lg">
              {cart?.items?.length ? 
                `${cart.items.reduce((acc, item) => acc + item.quantity, 0)} ${cart.items.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'items'} in your cart` 
                : 'Your cart is empty'
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="content-container py-12">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Cart Items - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {!customer && (
                  <div className="p-6 border-b border-gray-200">
                    <SignInPrompt />
                  </div>
                )}
                <div className="p-6">
                  <ItemsTemplate items={cart?.items} />
                </div>
              </motion.div>
            </div>

            {/* Order Summary - Takes 1/3 of the space */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-8"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {cart && cart.region && (
                    <div className="p-6">
                      <Summary cart={cart as any} />
                    </div>
                  )}
                </div>

                {/* Security Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Secure Checkout</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaShieldAlt className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-700">Secure Payment</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <EmptyCartMessage />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
