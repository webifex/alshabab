"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { FaCheck, FaShieldAlt } from "react-icons/fa"

import PaymentButton from "../payment-button"
import { useCheckoutStep } from "@lib/hooks/use-search-params-safe"

const Review = ({ cart }: { cart: any }) => {
  const step = useCheckoutStep()

  const isOpen = step === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white/50 rounded-xl border border-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg shadow-sm">
            <FaCheck className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <Heading
              level="h2"
              className="text-xl font-bold text-gray-900"
            >
              Review & Place Order
            </Heading>
            <p className="text-sm text-gray-600 mt-1">
              Review your order details and complete your purchase
            </p>
          </div>
        </div>
        
        {isOpen && previousStepsCompleted && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg">
            <FaShieldAlt className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to Order</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {isOpen && previousStepsCompleted ? (
          <div className="space-y-6">
            {/* Terms and Conditions */}
            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-amber-100 rounded-lg mt-1">
                  <FaShieldAlt className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Terms & Conditions
                  </h3>
                  <Text className="text-sm text-gray-700 leading-relaxed">
                    By placing this order, you confirm that you have read, understand and accept our{" "}
                    <button className="text-emerald-600 hover:text-emerald-700 underline">
                      Terms of Use
                    </button>
                    ,{" "}
                    <button className="text-emerald-600 hover:text-emerald-700 underline">
                      Terms of Sale
                    </button>
                    {" "}and{" "}
                    <button className="text-emerald-600 hover:text-emerald-700 underline">
                      Returns Policy
                    </button>
                    . You also acknowledge that you have read Al-Shabab Fabrics'{" "}
                    <button className="text-emerald-600 hover:text-emerald-700 underline">
                      Privacy Policy
                    </button>
                    .
                  </Text>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1 bg-blue-100 rounded-lg">
                  <FaShieldAlt className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Secure Payment Guarantee
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fraud protection</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ready to complete your order?
                </h3>
                <p className="text-sm text-gray-600">
                  Click the button below to finalize your purchase
                </p>
              </div>
              
              <div className="flex justify-center">
                <PaymentButton cart={cart} data-testid="submit-order-button" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FaCheck className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Complete Previous Steps
            </h3>
            <p className="text-gray-600 text-sm">
              Please complete the previous checkout steps to review your order
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Review
