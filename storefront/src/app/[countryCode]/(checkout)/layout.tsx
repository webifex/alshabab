import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Image from "next/image"
import { FaLock, FaShieldAlt } from "react-icons/fa"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Glass morphism header */}
      <div className="sticky top-0 z-50">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"></div>
        <header className="relative h-20 border-b border-emerald-100/50">
          <nav className="flex h-full items-center content-container justify-between">
            <LocalizedClientLink
              href="/cart"
              className="flex items-center gap-x-3 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-all duration-300 group"
              data-testid="back-to-cart-link"
            >
              <div className="p-2 rounded-xl bg-white/60 group-hover:bg-emerald-50 transition-colors duration-300">
                <ChevronDown className="rotate-90" size={16} />
              </div>
              <span className="hidden small:block">
                Back to Cart
              </span>
              <span className="block small:hidden">
                Back
              </span>
            </LocalizedClientLink>
            
            {/* Enhanced Logo Section */}
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 group"
              data-testid="store-link"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image 
                  src="/logo/logo.png" 
                  alt="Al Shabaab Fabrics Logo" 
                  width={48} 
                  height={48} 
                  className="relative object-contain drop-shadow-sm" 
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  Al-Shabab Fabrics
                </span>
                <span className="text-xs text-gray-500 tracking-wider">
                  Secure Checkout
                </span>
              </div>
            </LocalizedClientLink>
            
            {/* Security indicators */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl">
                <FaLock className="text-green-600 text-sm" />
                <span className="text-xs font-medium text-green-700">Secure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                <FaShieldAlt className="text-blue-600 text-sm" />
                <span className="text-xs font-medium text-blue-700 hidden sm:block">SSL Protected</span>
              </div>
            </div>
          </nav>
        </header>
      </div>
      
      {/* Main content with enhanced styling */}
      <main className="relative" data-testid="checkout-container">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-transparent to-teal-50/20 pointer-events-none"></div>
        <div className="relative">
          {children}
        </div>
      </main>
      
      {/* Enhanced footer */}
      <footer className="mt-16 py-8 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="content-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <FaLock className="text-green-600" />
                256-bit SSL encryption
              </span>
              <span className="hidden md:block">•</span>
              <span>Secure payment processing</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 Al-Shabab Fabrics. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
