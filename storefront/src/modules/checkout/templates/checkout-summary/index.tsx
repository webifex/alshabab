import { Heading } from "@medusajs/ui"
import { FaShoppingBag, FaTag } from "react-icons/fa"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white shadow-lg">
          <FaShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <Heading
            level="h2"
            className="text-2xl font-bold text-gray-900"
          >
            Order Summary
          </Heading>
          <p className="text-sm text-gray-600 mt-1">
            Review your items and totals
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>Items in your order</span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
            {cart?.items?.length || 0}
          </span>
        </h3>
        <ItemsPreviewTemplate items={cart?.items} />
      </div>

      {/* Discount Section */}
      <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FaTag className="w-4 h-4 text-amber-600" />
          Discounts & Promotions
        </h3>
        <DiscountCode cart={cart} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Totals */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
        <h3 className="font-semibold text-gray-900 mb-4">Order Total</h3>
        <CartTotals totals={cart} />
      </div>

      {/* Security Badge */}
      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Secure payment guaranteed
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
