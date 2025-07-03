"use client"

import { updateLineItem } from "@lib/data/cart"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { Spinner } from "@medusajs/icons"

type QuantitySelectorProps = {
  lineId: string
  quantity: number
  className?: string
  variant?: "default" | "compact"
}

const QuantitySelector = ({ 
  lineId, 
  quantity, 
  className = "",
  variant = "default" 
}: QuantitySelectorProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentQuantity, setCurrentQuantity] = useState(quantity)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity === currentQuantity) return
    
    setIsUpdating(true)
    setCurrentQuantity(newQuantity)
    
    try {
      await updateLineItem({
        lineId,
        quantity: newQuantity,
      })
    } catch (error) {
      // Revert on error
      setCurrentQuantity(quantity)
      console.error("Error updating quantity:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const increment = () => updateQuantity(currentQuantity + 1)
  const decrement = () => updateQuantity(currentQuantity - 1)

  const buttonSize = variant === "compact" ? "w-7 h-7" : "w-8 h-8"
  const iconSize = variant === "compact" ? "w-3 h-3" : "w-3.5 h-3.5"
  const textSize = variant === "compact" ? "text-sm" : "text-base"

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={decrement}
        disabled={currentQuantity <= 1 || isUpdating}
        className={`${buttonSize} flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 text-gray-600 rounded-l-lg transition-colors duration-200 border border-r-0 border-gray-300`}
        aria-label="Decrease quantity"
      >
        <FaMinus className={iconSize} />
      </button>
      
      <div className={`${buttonSize} flex items-center justify-center bg-white border-t border-b border-gray-300 ${textSize} font-medium text-gray-900 min-w-[2.5rem]`}>
        {isUpdating ? (
          <Spinner className="animate-spin w-4 h-4" />
        ) : (
          currentQuantity
        )}
      </div>
      
      <button
        onClick={increment}
        disabled={isUpdating}
        className={`${buttonSize} flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-600 rounded-r-lg transition-colors duration-200 border border-l-0 border-gray-300`}
        aria-label="Increase quantity"
      >
        <FaPlus className={iconSize} />
      </button>
    </div>
  )
}

export default QuantitySelector