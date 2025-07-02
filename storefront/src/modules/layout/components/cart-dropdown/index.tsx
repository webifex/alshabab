"use client"

import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { FaShoppingBag, FaTimes } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import DynamicButton from "@modules/common/components/dynamic-button"

const CartDrawer = ({
  cart: cartState,
  onOpen,
}: {
  cart?: HttpTypes.StoreCart | null
  onOpen?: () => void
}) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(480)

  const open = () => {
    setCartDrawerOpen(true)
    // Manually refresh cart when opening drawer (since polling is disabled)
    if (onOpen) onOpen()
  }
  const close = () => setCartDrawerOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0

  const pathname = usePathname()

  // Set drawer width and detect mobile/desktop
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const updateDrawerSettings = () => {
      if (typeof window !== 'undefined') {
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        const width = mobile ? Math.min(window.innerWidth * 0.9, 480) : 480
        setDrawerWidth(width)
      }
    }
    
    updateDrawerSettings()
    window.addEventListener('resize', updateDrawerSettings)
    
    return () => window.removeEventListener('resize', updateDrawerSettings)
  }, [])

  // No automatic opening - only manual clicks

  return (
    <>
      {/* Cart Button */}
      <button
        className="h-full flex items-center relative p-2 hover:bg-white/60 rounded-xl transition-colors"
        onClick={open}
        aria-label="Open shopping cart"
      >
        <FaShoppingBag size={24} className="text-gray-700" />
        {/* Cart count badge - always visible */}
        <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center font-semibold transition-all duration-300 ${
          totalItems > 0 
            ? 'bg-red-500 scale-100' 
            : 'bg-gray-400 scale-90 opacity-70'
        }`}>
          {totalItems}
        </span>
      </button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              initial={{ 
                x: isMobile ? -drawerWidth : drawerWidth
              }}
              animate={{ 
                x: 0
              }}
              exit={{ 
                x: isMobile ? -drawerWidth : drawerWidth
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 z-50 h-screen flex flex-col ${
                isMobile ? 'left-0' : 'right-0'
              }`}
              style={{
                width: drawerWidth
              }}
              data-testid="cart-drawer"
            >
              {/* Glass background for desktop, solid white for mobile */}
              <div className="absolute inset-0 md:bg-white/80 md:backdrop-blur-xl bg-white shadow-2xl md:border-l md:border-white/20"></div>
              
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50 md:bg-transparent md:backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <FaShoppingBag className="text-white text-sm" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    <p className="text-sm text-gray-600">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full shadow-sm border border-gray-200"
                  aria-label="Close cart"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Content */}
                              {cartState && cartState.items?.length ? (
                <>
                  {/* Items List */}
                  <div className="relative flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {cartState.items
                        .sort((a, b) => {
                          return (a.created_at ?? "") > (b.created_at ?? "")
                            ? -1
                            : 1
                        })
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            data-testid="cart-item"
                          >
                            <LocalizedClientLink
                              href={`/products/${item.variant?.product?.handle}`}
                              className="flex-shrink-0"
                              onClick={close}
                            >
                              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm flex items-center justify-center border-2 border-gray-100">
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
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 truncate pr-2">
                                  <LocalizedClientLink
                                    href={`/products/${item.variant?.product?.handle}`}
                                    data-testid="product-link"
                                    onClick={close}
                                    className="hover:text-emerald-600 transition-colors"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <div className="text-right">
                                  <span className="font-semibold text-gray-900">
                                    {item.unit_price && cartState?.currency_code ? (
                                      convertToLocale({
                                        amount: (item.unit_price || 0) * item.quantity,
                                        currency_code: cartState.currency_code,
                                      })
                                    ) : (
                                      'Price unavailable'
                                    )}
                                  </span>
                                </div>
                              </div>
                              
                              <LineItemOptions
                                variant={item.variant}
                                data-testid="cart-item-variant"
                                data-value={item.variant}
                              />
                              
                              <div className="flex justify-between items-center mt-3">
                                <span
                                  className="text-sm text-gray-600"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Qty: {item.quantity}
                                </span>
                                <DeleteButton
                                  id={item.id}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                  data-testid="cart-item-remove-button"
                                >
                                  Remove
                                </DeleteButton>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="relative border-t border-gray-200 p-6 bg-white md:bg-transparent md:backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold text-gray-900">
                          Subtotal <span className="font-normal text-sm">(excl. taxes)</span>
                        </span>
                        <span
                          className="font-bold text-emerald-600"
                          data-testid="cart-subtotal"
                          data-value={subtotal}
                        >
                          {convertToLocale({
                            amount: subtotal,
                            currency_code: cartState.currency_code,
                          })}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <LocalizedClientLink href="/cart" passHref>
                          <DynamicButton
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={close}
                            data-testid="go-to-cart-button"
                          >
                            View Cart
                          </DynamicButton>
                        </LocalizedClientLink>
                        
                        <LocalizedClientLink href="/checkout" passHref>
                          <DynamicButton
                            variant="primary"
                            size="lg"
                            className="w-full"
                            onClick={close}
                          >
                            Checkout
                          </DynamicButton>
                        </LocalizedClientLink>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty Cart */
                <div className="relative flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FaShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some products to get started</p>
                  <LocalizedClientLink href="/store">
                    <DynamicButton
                      variant="primary"
                      size="lg"
                      onClick={close}
                    >
                      Explore Products
                    </DynamicButton>
                  </LocalizedClientLink>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default CartDrawer
