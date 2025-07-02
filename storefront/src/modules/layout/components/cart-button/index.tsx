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
    
    const res = await fetch(`/store/carts/${cartId}`, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    
    if (!res.ok) return null
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
    
    // Temporarily disable polling during database issues
    // const interval = setInterval(refreshCart, 5000) // Check every 5 seconds
    
    // Also listen for storage events (cart updates from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "_medusa_cart_id") {
        refreshCart()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      // clearInterval(interval) // Commented out since interval is disabled
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return <CartDrawer cart={cart} onOpen={refreshCart} />
}
