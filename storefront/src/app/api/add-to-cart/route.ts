import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sdk } from '@lib/config'
import { getRegion } from '@lib/data/regions'

const getAuthHeaders = (): { authorization: string } | {} => {
  const token = cookies().get("_medusa_jwt")?.value

  if (token) {
    return { authorization: `Bearer ${token}` }
  }

  return {}
}

const getCartId = () => {
  return cookies().get("_medusa_cart_id")?.value
}

const setCartId = (cartId: string) => {
  cookies().set("_medusa_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

async function retrieveCart() {
  const cartId = getCartId()

  if (!cartId) {
    return null
  }

  return await sdk.store.cart
    .retrieve(cartId, {}, getAuthHeaders())
    .then(({ cart }) => cart)
    .catch(() => {
      return null
    })
}

async function getOrSetCart(countryCode: string) {
  console.log("🛒 API: getOrSetCart called with countryCode:", countryCode)
  
  let cart = await retrieveCart()
  console.log("🛒 API: Retrieved cart:", cart ? cart.id : 'null')
  
  const region = await getRegion(countryCode)
  console.log("🛒 API: Region found:", region ? region.id : 'null')

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (!cart) {
    console.log("🛒 API: Creating new cart with region:", region.id)
    const cartResp = await sdk.store.cart.create({ region_id: region.id })
    cart = cartResp.cart
    console.log("🛒 API: New cart created:", cart.id)
    setCartId(cart.id)
  }

  if (cart && cart?.region_id !== region.id) {
    console.log("🛒 API: Updating cart region")
    await sdk.store.cart.update(
      cart.id,
      { region_id: region.id },
      {},
      getAuthHeaders()
    )
  }

  return cart
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { variantId, quantity, countryCode } = body

    console.log("🛒 API: Add to cart called with:", { variantId, quantity, countryCode })

    if (!variantId) {
      return NextResponse.json({ error: "Missing variant ID" }, { status: 400 })
    }

    const cart = await getOrSetCart(countryCode)
    if (!cart) {
      return NextResponse.json({ error: "Could not create cart" }, { status: 500 })
    }

    console.log("🛒 API: Adding item to cart:", cart.id)
    const result = await sdk.store.cart.createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      getAuthHeaders()
    )

    console.log("🛒 API: Item added successfully")
    
    return NextResponse.json({
      success: true,
      cart: result.cart,
      message: "Item added to cart successfully"
    })
  } catch (error) {
    console.error("🛒 API: Error adding to cart:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 