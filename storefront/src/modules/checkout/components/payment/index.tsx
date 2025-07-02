"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, Tooltip, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { FaCreditCard, FaEdit, FaLock } from "react-icons/fa"

import Divider from "@modules/common/components/divider"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { initiatePaymentSession } from "@lib/data/cart"
import { useCheckoutStep, useSearchParamsSafe } from "@lib/hooks/use-search-params-safe"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const step = useCheckoutStep()
  const { get: getSearchParam } = useSearchParamsSafe()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = step === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#374151",
          fontSize: "16px",
          "::placeholder": {
            color: "#9CA3AF",
          },
        },
      },
      classes: {
        base: "p-3 block w-full border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams()
      // Get current search params safely
      if (typeof window !== 'undefined') {
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.forEach((value, key) => {
          params.set(key, value)
        })
      }
      params.set(name, value)

      return params.toString()
    },
    []
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      if (!activeSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white/50 rounded-xl border border-gray-200/50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/80 rounded-lg shadow-sm">
            <FaCreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <Heading
              level="h2"
              className="text-xl font-bold text-gray-900"
            >
              Payment Method
            </Heading>
            <p className="text-sm text-gray-600 mt-1">
              Choose how you'd like to pay for your order
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!isOpen && paymentReady && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-white/80 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              data-testid="edit-payment-button"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
          )}
          {!isOpen && paymentReady && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircleSolid className="w-4 h-4" />
              <span className="text-sm font-medium">Complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div className="space-y-6">
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaLock className="w-4 h-4 text-purple-600" />
                  Available Payment Methods
                </h3>
                
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(value: string) => setSelectedPaymentMethod(value)}
                  className="space-y-3"
                >
                  {availablePaymentMethods
                    .sort((a, b) => {
                      return a.provider_id > b.provider_id ? 1 : -1
                    })
                    .map((paymentMethod) => {
                      const isSelected = paymentMethod.id === selectedPaymentMethod
                      return (
                        <RadioGroup.Option
                          key={paymentMethod.id}
                          value={paymentMethod.id}
                          className={clx(
                            "relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md",
                            {
                              "border-purple-300 bg-purple-50/50 shadow-sm": isSelected,
                              "border-gray-200 bg-white hover:border-gray-300": !isSelected,
                            }
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={clx(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                              {
                                "border-purple-500 bg-purple-500": isSelected,
                                "border-gray-300": !isSelected,
                              }
                            )}>
                              {isSelected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {paymentInfoMap[paymentMethod.id]?.icon || <CreditCard className="w-5 h-5" />}
                              <span className="font-medium text-gray-900">
                                {paymentInfoMap[paymentMethod.id]?.title || paymentMethod.id}
                              </span>
                            </div>
                          </div>
                        </RadioGroup.Option>
                      )
                    })}
                </RadioGroup>
              </div>

              {isStripe && stripeReady && (
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaCreditCard className="w-4 h-4 text-blue-600" />
                    Card Details
                  </h3>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                  
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                    <FaLock className="w-3 h-3" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {paidByGiftcard && (
            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">🎁</span>
                </div>
                <Text className="font-semibold text-gray-900">
                  Payment Method
                </Text>
              </div>
              <Text className="text-gray-700" data-testid="payment-method-summary">
                Gift card
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <div className="flex justify-end pt-6">
            <Button
              size="large"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (isStripe && !cardComplete) ||
                (!selectedPaymentMethod && !paidByGiftcard)
              }
              data-testid="submit-payment-button"
            >
              {!activeSession && isStripeFunc(selectedPaymentMethod)
                ? "Enter Card Details"
                : "Continue to Review"}
            </Button>
          </div>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <FaCreditCard className="w-4 h-4 text-purple-600" />
                  <Text className="font-semibold text-gray-900">
                    Payment Method
                  </Text>
                </div>
                <Text className="text-gray-700" data-testid="payment-method-summary">
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </Text>
              </div>
              
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <FaLock className="w-4 h-4 text-blue-600" />
                  <Text className="font-semibold text-gray-900">
                    Payment Details
                  </Text>
                </div>
                <div className="flex gap-2 items-center" data-testid="payment-details-summary">
                  <Container className="flex items-center h-7 w-fit p-2 bg-white rounded border">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard className="w-4 h-4" />
                    )}
                  </Container>
                  <Text className="text-gray-700">
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Secure payment"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 text-lg">🎁</span>
                <Text className="font-semibold text-gray-900">
                  Payment Method
                </Text>
              </div>
              <Text className="text-gray-700" data-testid="payment-method-summary">
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
