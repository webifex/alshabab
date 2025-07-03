'use client'
import { Suspense, useState, useRef } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import CartPrice from "@modules/layout/components/cart-price"
import { FaHeart, FaSearch, FaTimes, FaUser } from "react-icons/fa"
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
]

const MORE_MENU = [
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "How it Works", href: "/how-it-works" },
]

// Updated PRODUCTS dropdown to use category system
const PRODUCTS_MENU = [
  { name: "School Uniforms", href: "/categories/school-uniforms" },
  { name: "Sports Uniforms", href: "/categories/sports-uniforms" },
  { name: "Books", href: "/categories/books" },
  { name: "Educational Supplies", href: "/categories/educational-supplies" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileShowMore, setMobileShowMore] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  // Helper to render nav links with icons (for mobile menu)
  const renderNavLink = (item: { name: string; href: string }) => {
    let icon = null
    if (item.name.toLowerCase().includes("wishlist")) icon = <FaHeart className="mr-3" />
    if (item.name.toLowerCase().includes("compare")) icon = <FaHeart className="mr-3" />
    if (item.name.toLowerCase().includes("login") || item.name.toLowerCase().includes("account")) icon = <FaHeart className="mr-3" />
    return (
      <LocalizedClientLink
        key={item.name}
        href={item.href}
        className="flex items-center w-full px-6 py-5 text-sm font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        {icon}
        {item.name}
      </LocalizedClientLink>
    )
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Glass morphism navbar background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"></div>
      
      <header className="relative mx-auto duration-200">
        <nav className="flex items-center justify-between w-full h-20 px-6 md:px-12 relative" aria-label="Main Navigation">
          {/* Desktop Nav */}
          <div className="flex flex-1 justify-start items-center gap-x-8 hidden md:flex">
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <LocalizedClientLink
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 hover:text-emerald-600 transition-all duration-300 group/link"
                  aria-label={link.name}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover/link:w-full transition-all duration-300"></span>
                </LocalizedClientLink>
              </motion.div>
            ))}
            
            {/* PRODUCTS Dropdown with enhanced design */}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <motion.button
                ref={menuButtonRef}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative inline-flex items-center justify-center gap-x-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-all duration-300 group/products"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
              >
                PRODUCTS
                <motion.span
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center"
                >
                  <ChevronDownIcon aria-hidden="true" className="size-4 text-current transition-colors" />
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover/products:w-full transition-all duration-300"></span>
              </motion.button>
              
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 z-50 mt-3 w-64 origin-top-left"
                    style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
                  >
                    {/* Glass morphism dropdown */}
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-white/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50"></div>
                      <div className="relative py-2">
                        {PRODUCTS_MENU.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <LocalizedClientLink
                              href={item.href}
                              className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white/60 transition-all duration-200 group/item"
                            >
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mr-3 opacity-70 group-hover/item:opacity-100 transition-opacity"></span>
                              {item.name}
                            </LocalizedClientLink>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Enhanced Logo and Brand (desktop only) */}
          <motion.div 
            className="flex flex-col items-center justify-center h-full min-w-[140px] hidden md:flex"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <LocalizedClientLink href="/" className="flex flex-col items-center group/logo" aria-label="Home">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-lg opacity-20 group-hover/logo:opacity-40 transition-opacity duration-300"></div>
                <Image 
                  src="/logo/logo.png" 
                  alt="Al Shabaab Fabrics Logo" 
                  width={56} 
                  height={56} 
                  className="relative object-contain h-14 w-14 drop-shadow-sm" 
                />
              </div>
              <span className="mt-2 text-xs tracking-[0.2em] font-bold text-gray-700 group-hover/logo:text-emerald-600 transition-colors duration-300">
                AL-SHABAAB FABRICS
              </span>
            </LocalizedClientLink>
          </motion.div>

          {/* Right: Enhanced Actions (desktop only) */}
          <div className="flex flex-1 justify-end items-center gap-x-6 min-w-[240px] hidden md:flex">
            {/* Sign In Button */}
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <LocalizedClientLink 
                href="/account" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white/60 rounded-xl transition-all duration-300 group/signin"
                aria-label="Sign in to your account"
              >
                <FaUser className="text-xs opacity-70 group-hover/signin:opacity-100 transition-opacity" />
                Sign in
              </LocalizedClientLink>
            </motion.div>

            {/* Search Button */}
            <motion.button 
              className="p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-white/60 rounded-xl transition-all duration-300 group/search" 
              aria-label="Search products"
              onClick={() => router.push('/search')}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaSearch className="text-sm group-hover/search:scale-110 transition-transform duration-300" />
            </motion.button>

            {/* Wishlist Button */}
            <motion.button 
              className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-white/60 rounded-xl transition-all duration-300 group/wishlist" 
              aria-label="View wishlist"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaHeart className="text-sm group-hover/wishlist:scale-110 transition-transform duration-300" />
            </motion.button>

            {/* Enhanced Cart Section */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-300 group/cart border border-white/30">
              <Suspense fallback={<span className="text-lg">🛒</span>}>
                <CartButton />
              </Suspense>
              <Suspense fallback={<span className="text-sm font-semibold text-gray-700">$0.00</span>}>
                <CartPrice />
              </Suspense>
            </div>
          </div>

          {/* Mobile Layout: Cart (left), Logo (center), Menu (right) */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left: Cart */}
            <div className="flex items-center">
              <div className="p-2 hover:bg-white/60 rounded-xl transition-colors">
                <Suspense fallback={<span className="text-lg">🛒</span>}>
                  <CartButton />
                </Suspense>
              </div>
            </div>
            
            {/* Center: Logo */}
            <div className="flex flex-col items-center justify-center">
              <LocalizedClientLink href="/" className="flex flex-col items-center group" aria-label="Home">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">AS</span>
                  </div>
                </div>
                <span className="mt-1 text-xs tracking-widest font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">
                  AL-SHABAAB FABRICS
                </span>
              </LocalizedClientLink>
            </div>
            
            {/* Right: Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="md:hidden flex items-center justify-center h-10 w-10 p-2 hover:bg-white/60 rounded-xl transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                type="button"
              >
                <motion.svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  initial={false}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16"
                    animate={{
                      opacity: mobileMenuOpen ? 0 : 1,
                      y: mobileMenuOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12h16"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 18h16"
                    animate={{
                      opacity: mobileMenuOpen ? 0 : 1,
                      y: mobileMenuOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.svg>
              </button>
            </div>
            
            {/* Mobile Drawer Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  {/* Blurred overlay for background */}
                  <motion.div
                    key="mobile-menu-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ width: '100vw', height: '100vh' }}
                  />
                  
                  {/* Drawer itself */}
                  <motion.div
                    key="mobile-menu"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 z-50 bg-white border-l border-gray-200 shadow-2xl h-full flex flex-col"
                    style={{ width: '75vw', maxWidth: 420 }}
                  >
                    {/* Header */}
                    <div className="flex w-full items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                      <LocalizedClientLink href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">AS</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">AL-SHABAAB</h3>
                          <p className="text-xs text-gray-600">FABRICS</p>
                        </div>
                      </LocalizedClientLink>
                      <button
                        className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full shadow-sm border border-gray-200"
                        aria-label="Close menu"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileShowMore(false)
                        }}
                        type="button"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Search Button */}
                    <div className="p-6 border-b border-gray-100">
                      <button
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-sm"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          router.push('/search')
                        }}
                        type="button"
                      >
                        <FaSearch className="w-4 h-4" />
                        <span className="font-medium">Search</span>
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto">
                      <nav className="py-2">
                        {/* Main nav links */}
                        {NAV_LINKS.map((link) => (
                          <LocalizedClientLink
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 border-b border-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                              {link.name === "HOME" && <span className="text-sm text-emerald-600">🏠</span>}
                              {link.name === "ABOUT US" && <span className="text-sm text-emerald-600">ℹ️</span>}
                              {link.name === "CONTACT US" && <span className="text-sm text-emerald-600">📞</span>}
                            </div>
                            <span className="font-medium">{link.name}</span>
                          </LocalizedClientLink>
                        ))}
                        
                        {/* PRODUCTS Expandable Section */}
                        <div>
                          <button
                            className="flex w-full items-center gap-4 px-6 py-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 border-b border-gray-50"
                            onClick={() => setMobileShowMore((v) => !v)}
                            aria-expanded={mobileShowMore}
                            type="button"
                          >
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-emerald-600">📦</span>
                            </div>
                            <span className="flex-1 text-left font-medium">PRODUCTS</span>
                            <motion.div
                              animate={{ rotate: mobileShowMore ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDownIcon className="w-5 h-5" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {mobileShowMore && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-b border-gray-50"
                              >
                                {PRODUCTS_MENU.map((item, index) => (
                                  <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.2 }}
                                  >
                                    <LocalizedClientLink
                                      href={item.href}
                                      className="flex items-center gap-4 px-12 py-3 text-gray-600 hover:text-emerald-600 hover:bg-white/60 transition-all duration-200"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                                      <span className="text-sm font-medium">{item.name}</span>
                                    </LocalizedClientLink>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* My Account Link */}
                        <LocalizedClientLink
                          href="/account"
                          className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 border-b border-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FaUser className="text-sm text-emerald-600" />
                          </div>
                          <span className="font-medium">MY ACCOUNT</span>
                        </LocalizedClientLink>
                      </nav>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>
    </div>
  )
}

