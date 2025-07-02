"use client"

import { useEffect, useState } from "react"
import CartDrawer from "../cart-dropdown"
import { HttpTypes } from "@medusajs/types"

const fetchCart = async (): Promise<HttpTypes.StoreCart | null> => {
  // Try to get the cart id from localStorage (as in Medusa)
  const cartId = typeof window !== "undefined" ? localStorage.getItem("_medusa_cart_id") : null
  if (!cartId) return null
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    // Use the correct backend URL
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add publishable key if available
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    const res = await fetch(`${backendUrl}/store/carts/${cartId}`, {
      signal: controller.signal,
      headers
    })
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      console.log(`Cart fetch failed: ${res.status} ${res.statusText}`)
      // If cart is not found or invalid (400/404), clear the stored cart ID
      if (res.status === 400 || res.status === 404) {
        localStorage.removeItem("_medusa_cart_id")
        console.log("🗑️ Cleared invalid cart ID from localStorage")
      }
      return null
    }
    const data = await res.json()
    return data.cart as HttpTypes.StoreCart
  } catch (error) {
    console.error("Failed to fetch cart:", error)
    return null
  }
}

export default function CartButton() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)

  const refreshCart = async () => {
    const newCart = await fetchCart()
    setCart(newCart)
  }

  useEffect(() => {
    refreshCart()
    
    // Only poll if we have a cart ID, and less frequently to reduce spam
    const interval = setInterval(() => {
      const cartId = localStorage.getItem("_medusa_cart_id")
      if (cartId) {
        refreshCart()
      }
    }, 10000) // Check every 10 seconds only if cart ID exists
    
    // Also listen for storage events (cart updates from other tabs)
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

  return <CartDrawer cart={cart} onOpen={refreshCart} />
}
