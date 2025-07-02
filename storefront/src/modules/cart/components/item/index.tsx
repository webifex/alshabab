"use client"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { FaShoppingBag, FaMinus, FaPlus } from "react-icons/fa"
import { motion } from "framer-motion"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  const unitPrice = item.unit_price || 0
  const totalPrice = unitPrice * item.quantity

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      changeQuantity(newQuantity)
    }
  }

  if (type === "preview") {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
          {item.variant?.product?.thumbnail || item.variant?.product?.images?.[0]?.url ? (
            <Thumbnail
              thumbnail={item.variant?.product?.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <FaShoppingBag className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {item.product_title}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{item.quantity}x</span>
            <span>
              {convertToLocale({
                amount: unitPrice,
                currency_code: "AUD",
              })}
            </span>
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {convertToLocale({
            amount: totalPrice,
            currency_code: "AUD",
          })}
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      data-testid="product-row"
    >
      <div className="flex gap-6">
        {/* Product Image */}
        <LocalizedClientLink
          href={`/products/${handle}`}
          className="flex-shrink-0"
        >
          <div className="w-24 h-24 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            {item.variant?.product?.thumbnail || item.variant?.product?.images?.[0]?.url ? (
              <Thumbnail
                thumbnail={item.variant?.product?.thumbnail}
                images={item.variant?.product?.images}
                size="square"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <FaShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </LocalizedClientLink>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0 pr-4">
              <LocalizedClientLink href={`/products/${handle}`}>
                <h3 
                  className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors cursor-pointer truncate"
                  data-testid="product-title"
                >
                  {item.product_title}
                </h3>
              </LocalizedClientLink>
              <div className="mt-1">
                <LineItemOptions variant={item.variant} data-testid="product-variant" />
              </div>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {convertToLocale({
                  amount: totalPrice,
                  currency_code: "AUD",
                })}
              </div>
              <div className="text-sm text-gray-600">
                {convertToLocale({
                  amount: unitPrice,
                  currency_code: "AUD",
                })} each
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1 || updating}
                  className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                >
                  <FaMinus className="w-3 h-3 text-gray-600" />
                </button>
                
                <span className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity || updating}
                  className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                >
                  <FaPlus className="w-3 h-3 text-gray-600" />
                </button>
              </div>

              {updating && (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-sm text-gray-600">Updating...</span>
                </div>
              )}
            </div>

            {/* Remove Button */}
            <DeleteButton 
              id={item.id} 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
              data-testid="product-delete-button"
            >
              Remove
            </DeleteButton>
          </div>

          {error && (
            <div className="mt-3">
              <ErrorMessage error={error} data-testid="product-error-message" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Item
