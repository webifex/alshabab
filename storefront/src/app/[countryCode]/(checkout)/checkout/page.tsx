import { Metadata } from "next"
import { notFound } from "next/navigation"

import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Checkout - Al-Shabab Fabrics",
  description: "Complete your purchase securely with Al-Shabab Fabrics",
}

const fetchCart = async () => {
  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  return (
    <div className="py-8 md:py-12">
      <div className="content-container">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order securely and safely
          </p>
        </div>

        {/* Main Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-12">
          {/* Left Column - Checkout Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden">
              <div className="p-6 md:p-8">
                <Wrapper cart={cart}>
                  <CheckoutForm cart={cart} customer={customer} />
                </Wrapper>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/20 overflow-hidden">
                <div className="p-6 md:p-8">
                  <CheckoutSummary cart={cart} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">
              Your payment information is secured with 256-bit SSL encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
