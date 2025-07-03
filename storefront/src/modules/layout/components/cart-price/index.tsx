"use client"

import { useEffect, useState } from "react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

const fetchCart = async (): Promise<HttpTypes.StoreCart | null> => {
  const cartId = typeof window !== "undefined" ? localStorage.getItem("_medusa_cart_id") : null
  if (!cartId) return null
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    const res = await fetch(`${backendUrl}/store/carts/${cartId}`, {
      headers
    })
    
    if (!res.ok) return null
    
    const data = await res.json()
    return data.cart as HttpTypes.StoreCart
  } catch (error) {
    return null
  }
}

export default function CartPrice() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [mounted, setMounted] = useState(false)

  const refreshCart = async () => {
    const newCart = await fetchCart()
    setCart(newCart)
  }

  useEffect(() => {
    setMounted(true)
    refreshCart()
    
    const interval = setInterval(() => {
      const cartId = localStorage.getItem("_medusa_cart_id")
      if (cartId) {
        refreshCart()
      }
    }, 10000)
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "_medusa_cart_id") {
        refreshCart()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <span className="text-sm font-semibold text-gray-700">$0.00</span>
  }

  const subtotal = cart?.subtotal ?? 0
  const currencyCode = cart?.currency_code ?? 'aud'

  return (
    <span className="text-sm font-semibold text-gray-700 group-hover/cart:text-emerald-600 transition-colors">
      {convertToLocale({
        amount: subtotal,
        currency_code: currencyCode,
      })}
    </span>
  )
} 