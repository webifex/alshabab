import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  // Debug logging
  console.log("🚚 CheckoutForm - Cart info:", {
    cartId: cart.id,
    hasShippingAddress: !!cart.shipping_address,
    regionId: cart.region?.id,
    shippingAddress: cart.shipping_address
  })

  // Fetch shipping and payment methods
  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  // Debug logging for methods
  console.log("🚚 Shipping methods result:", shippingMethods)
  console.log("💳 Payment methods result:", paymentMethods)

  // Only require payment methods to be available (shipping methods might not be available until address is set)
  if (!paymentMethods) {
    console.error("💳 No payment methods available for region:", cart.region?.id)
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Payment Methods Not Available
          </h3>
          <p className="text-red-600">
            No payment methods are configured for this region. Please contact support.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Addresses */}
      <div className="relative">
        <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
          1
        </div>
        <div className="pl-8">
          <Addresses cart={cart} customer={customer} />
        </div>
      </div>

      {/* Step 2: Shipping */}
      <div className="relative">
        <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
          2
        </div>
        <div className="pl-8">
          {/* Show shipping component even if methods are null - it will handle the empty state */}
          <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        </div>
      </div>

      {/* Step 3: Payment */}
      <div className="relative">
        <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
          3
        </div>
        <div className="pl-8">
          <Payment cart={cart} availablePaymentMethods={paymentMethods} />
        </div>
      </div>

      {/* Step 4: Review */}
      <div className="relative">
        <div className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
          4
        </div>
        <div className="pl-8">
          <Review cart={cart} />
        </div>
      </div>
    </div>
  )
}
