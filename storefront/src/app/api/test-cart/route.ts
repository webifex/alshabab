import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing cart API...')
    console.log('🧪 SDK config:', {
      baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
      publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'not set'
    })

    // Test 1: List regions
    console.log('🧪 Testing regions...')
    const regions = await sdk.store.region.list()
    console.log('🧪 Regions result:', regions)

    // Test 2: Create a cart
    console.log('🧪 Testing cart creation...')
    const cartResult = await sdk.store.cart.create({ 
      region_id: regions.regions[0]?.id 
    })
    console.log('🧪 Cart creation result:', cartResult)

    return NextResponse.json({
      success: true,
      regions: regions.regions?.length || 0,
      cart: cartResult.cart?.id || 'failed',
      message: 'Cart API test successful'
    })
  } catch (error) {
    console.error('🧪 Cart API test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    }, { status: 500 })
  }
} 