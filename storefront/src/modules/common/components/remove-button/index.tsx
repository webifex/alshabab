"use client"

import { deleteLineItem } from "@lib/data/cart"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { Spinner } from "@medusajs/icons"

type RemoveButtonProps = {
  lineId: string
  className?: string
  variant?: "default" | "minimal"
}

const RemoveButton = ({ 
  lineId, 
  className = "",
  variant = "default" 
}: RemoveButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteLineItem(lineId)
    } catch (error) {
      console.error("Error removing item:", error)
      setIsDeleting(false)
    }
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors duration-200 disabled:opacity-50 ${className}`}
        aria-label="Remove item from cart"
      >
        {isDeleting ? (
          <Spinner className="animate-spin w-3 h-3" />
        ) : (
          <FaTrash className="w-3 h-3" />
        )}
        <span>Remove</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 hover:border-red-300 ${className}`}
      aria-label="Remove item from cart"
    >
      {isDeleting ? (
        <Spinner className="animate-spin w-3 h-3" />
      ) : (
        <FaTrash className="w-3 h-3" />
      )}
      <span>Remove</span>
    </button>
  )
}

export default RemoveButton