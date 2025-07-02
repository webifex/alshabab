"use client"

import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { FaTruck, FaEdit, FaShippingFast, FaExclamationTriangle, FaMapMarkerAlt } from "react-icons/fa"

import Divider from "@modules/common/components/divider"
import Radio from "@modules/common/components/radio"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { useCheckoutStep } from "@lib/hooks/use-search-params-safe"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const step = useCheckoutStep()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = step === "delivery"

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  // Check if shipping address is required but not set
  const needsShippingAddress = !cart.shipping_address
  const hasShippingMethods = availableShippingMethods && availableShippingMethods.length > 0

  return (
    <div className="bg-white/50 rounded-xl border border-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg shadow-sm">
            <FaTruck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <Heading
              level="h2"
              className="text-xl font-bold text-gray-900"
            >
              Delivery Method
            </Heading>
            <p className="text-sm text-gray-600 mt-1">
              Choose how you'd like to receive your order
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 bg-white/80 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                data-testid="edit-delivery-button"
              >
                <FaEdit className="w-4 h-4" />
                Edit
              </button>
            )}
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
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
          <div data-testid="delivery-options-container" className="space-y-6">
            {needsShippingAddress ? (
              /* Show message when shipping address is required */
              <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Shipping Address Required
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Please complete Step 1 (Shipping Address) first to see available delivery options for your location.
                    </p>
                    <button
                      onClick={() => router.push(pathname + "?step=address", { scroll: false })}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      <FaMapMarkerAlt className="w-4 h-4" />
                      Go to Address Step
                    </button>
                  </div>
                </div>
              </div>
            ) : !hasShippingMethods ? (
              /* Show message when no shipping methods are available */
              <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg mt-1">
                    <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      No Delivery Options Available
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Unfortunately, we don't have any delivery options available for your location at the moment. Please contact our support team for assistance.
                    </p>
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <strong>Troubleshooting:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• Check if your address is correct</li>
                        <li>• Try a different address if available</li>
                        <li>• Contact support if the issue persists</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Show shipping methods when available */
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaShippingFast className="w-4 h-4 text-green-600" />
                  Available Delivery Options
                </h3>
                
                <RadioGroup value={selectedShippingMethod?.id} onChange={set} className="space-y-3">
                  {availableShippingMethods?.map((option) => {
                    const isSelected = option.id === selectedShippingMethod?.id
                    return (
                      <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        className={clx(
                          "relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md",
                          {
                            "border-emerald-300 bg-emerald-50/50 shadow-sm": isSelected,
                            "border-gray-200 bg-white hover:border-gray-300": !isSelected,
                          }
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={clx(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                            {
                              "border-emerald-500 bg-emerald-500": isSelected,
                              "border-gray-300": !isSelected,
                            }
                          )}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{option.name}</span>
                            <p className="text-sm text-gray-600 mt-1">
                              Standard delivery • 3-5 business days
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                          {option.amount === 0 && (
                            <p className="text-sm text-green-600 font-medium">Free</p>
                          )}
                        </div>
                      </RadioGroup.Option>
                    )
                  })}
                </RadioGroup>
              </div>
            )}

            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />

            {hasShippingMethods && (
              <div className="flex justify-end pt-4">
                <Button
                  size="large"
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={!cart.shipping_methods?.[0]}
                  data-testid="submit-delivery-option-button"
                >
                  Continue to Payment
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <FaTruck className="w-4 h-4 text-green-600" />
                  <Text className="font-semibold text-gray-900">
                    Selected Method
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium text-gray-900">
                      {selectedShippingMethod?.name}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Standard delivery • 3-5 business days
                    </Text>
                  </div>
                  <Text className="font-semibold text-gray-900">
                    {convertToLocale({
                      amount: selectedShippingMethod?.amount!,
                      currency_code: cart?.currency_code,
                    })}
                  </Text>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shipping
