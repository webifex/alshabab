"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * A safe wrapper around useSearchParams that prevents hydration errors
 * by ensuring the server and client render the same initial state
 */
export function useSearchParamsSafe() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return a safe version that only works after client-side hydration
  return {
    get: (key: string): string | null => {
      if (!mounted) return null
      return searchParams.get(key)
    },
    mounted
  }
}

/**
 * A hook specifically for the checkout step parameter
 * Returns null during server-side rendering to prevent hydration errors
 */
export function useCheckoutStep(): string | null {
  const { get, mounted } = useSearchParamsSafe()
  const [step, setStep] = useState<string | null>(null)

  useEffect(() => {
    if (mounted) {
      setStep(get("step"))
    }
  }, [mounted, get])

  return step
} 