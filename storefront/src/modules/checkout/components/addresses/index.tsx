"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import { usePathname, useRouter } from "next/navigation"
import { FaHome, FaEdit, FaMapMarkerAlt } from "react-icons/fa"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useFormState } from "react-dom"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"
import { useCheckoutStep } from "@lib/hooks/use-search-params-safe"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const step = useCheckoutStep()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = step === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  return (
    <div className="bg-white/50 rounded-xl border border-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg shadow-sm">
            <FaHome className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <Heading
              level="h2"
              className="text-xl font-bold text-gray-900"
            >
              Shipping Address
            </Heading>
            <p className="text-sm text-gray-600 mt-1">
              Where should we deliver your order?
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!isOpen && cart?.shipping_address && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-white/80 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              data-testid="edit-address-button"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
          )}
          {!isOpen && cart?.shipping_address && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircleSolid className="w-4 h-4" />
              <span className="text-sm font-medium">Complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isOpen ? (
          <form action={formAction} className="space-y-6">
            <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
              <ShippingAddress
                customer={customer}
                checked={sameAsBilling}
                onChange={toggleSameAsBilling}
                cart={cart}
              />
            </div>

            {!sameAsBilling && (
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-600" />
                  <Heading
                    level="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    Billing Address
                  </Heading>
                </div>
                <BillingAddress cart={cart} />
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <SubmitButton 
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                data-testid="submit-address-button"
              >
                Continue to Delivery
              </SubmitButton>
            </div>
            
            <ErrorMessage error={message} data-testid="address-error-message" />
          </form>
        ) : (
          <div>
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shipping Address */}
                <div
                  className="bg-blue-50/50 rounded-xl p-4 border border-blue-100"
                  data-testid="shipping-address-summary"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FaHome className="w-4 h-4 text-blue-600" />
                    <Text className="font-semibold text-gray-900">
                      Shipping Address
                    </Text>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <Text>
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text>
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text>
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text>
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>
                </div>

                {/* Contact Information */}
                <div
                  className="bg-green-50/50 rounded-xl p-4 border border-green-100"
                  data-testid="shipping-contact-summary"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 text-green-600">📞</div>
                    <Text className="font-semibold text-gray-900">
                      Contact
                    </Text>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <Text>{cart.shipping_address.phone}</Text>
                    <Text>{cart.email}</Text>
                  </div>
                </div>

                {/* Billing Address */}
                <div
                  className="bg-purple-50/50 rounded-xl p-4 border border-purple-100"
                  data-testid="billing-address-summary"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-purple-600" />
                    <Text className="font-semibold text-gray-900">
                      Billing Address
                    </Text>
                  </div>

                  {sameAsBilling ? (
                    <Text className="text-sm text-gray-700">
                      Same as shipping address
                    </Text>
                  ) : (
                    <div className="space-y-1 text-sm text-gray-700">
                      <Text>
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text>
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text>
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text>
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Addresses
