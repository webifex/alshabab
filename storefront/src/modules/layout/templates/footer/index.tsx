import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/outline"
import DynamicButton from "@modules/common/components/dynamic-button"

const COMPANY_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Our Story", href: "/our-story" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
]

const PRODUCT_LINKS = [
  { name: "School Uniforms", href: "/categories/school-uniforms" },
  { name: "Sports Uniforms", href: "/categories/sports-uniforms" },
  { name: "Books", href: "/categories/books" },
  { name: "Educational Supplies", href: "/categories/educational-supplies" },
]

const SUPPORT_LINKS = [
  { name: "Contact Us", href: "/contact" },
  { name: "Size Guide", href: "/size-guide" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns", href: "/returns" },
  { name: "FAQ", href: "/faq" },
]

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <img 
                  src="/logo/logo.png" 
                  alt="Al-Shabaab Fabrics Logo" 
                  className="object-contain w-10 h-10 drop-shadow-sm"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">AL-SHABAAB</h3>
                <p className="text-sm text-gray-300">FABRICS</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium Islamic school uniforms and educational supplies across Australia. 
              Serving the community with quality and Islamic values since 2009.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <PhoneIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <EnvelopeIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">info@alshabaabfabrics.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPinIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">123 Main St, Sydney, NSW</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <ClockIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 mb-8">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.name}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            {/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest updates on new products and special offers.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <DynamicButton
                  variant="primary"
                  size="sm"
                  className="w-full text-sm"
                >
                  Subscribe
                </DynamicButton>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.74.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
                        </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Visa */}
                <div className="w-14 h-8 bg-white rounded-md flex items-center justify-center shadow-sm p-1">
                  <svg viewBox="0 0 47.834 15.334" className="w-full h-full">
                    <path fill="#1434CB" d="M18.266 0.667l-2.646 10.667h-3.156l2.646-10.667h3.156zm11.766 6.93c0-2.826-3.598-2.982-3.57-4.244 0.01-0.382 0.376-0.79 1.178-0.896 1.316-0.172 2.296 0.228 2.95 0.508l0.524-2.448c-0.718-0.264-1.642-0.534-2.79-0.534-2.946 0-5.024 1.566-5.04 3.81-0.018 1.658 1.482 2.584 2.612 3.134 1.16 0.564 1.55 0.926 1.546 1.43-0.008 0.77-0.924 1.118-1.778 1.13-1.492 0.020-2.36-0.402-3.048-0.724l-0.538 2.516c0.694 0.318 1.978 0.596 3.306 0.61 3.13 0.024 5.178-1.546 5.196-3.94 0.01-2.752-2.776-4.004-2.748-4.252zm9.594 3.618l1.244-3.438 0.696 3.438h-1.94zm3.708-6.796h-2.568c-0.794 0-1.388 0.23-1.736 1.068l-4.934 9.6h3.13l0.622-1.726h3.826l0.372 1.726h2.762l-2.404-10.668h-1.07zm-14.854 0l-2.896 7.284-0.31-1.568c-0.536-1.82-2.214-3.79-4.088-4.77l2.32 9.052h3.156l4.702-10h-2.884z"/>
                    <path fill="#FAA61A" d="M6.454 0.667h-5.454l-0.064 0.382c3.466 0.888 5.756 3.026 6.7 5.596l-0.968-5.092c-0.164-0.66-0.638-0.84-1.214-0.886z"/>
                  </svg>
                </div>

                {/* Mastercard */}
                <div className="w-14 h-8 bg-white rounded-md flex items-center justify-center shadow-sm p-1">
                  <svg viewBox="0 0 47.834 29.334" className="w-full h-full">
                    <circle cx="15" cy="14.667" r="11" fill="#EB001B"/>
                    <circle cx="32.834" cy="14.667" r="11" fill="#F79E1B"/>
                    <path fill="#FF5F00" d="M23.917 6.667c-2.2 1.8-3.6 4.55-3.6 7.65s1.4 5.85 3.6 7.65c2.2-1.8 3.6-4.55 3.6-7.65s-1.4-5.85-3.6-7.65z"/>
                  </svg>
                </div>

                {/* American Express */}
                <div className="w-14 h-8 bg-white rounded-md flex items-center justify-center shadow-sm p-1">
                  <svg viewBox="0 0 47.834 29.334" className="w-full h-full">
                    <rect width="47.834" height="29.334" fill="#006FCF" rx="3"/>
                    <path fill="white" d="M7.5 9.5h8v1.8h-6.2v1.2h5.8v1.8h-5.8v1.2h6.2v1.8h-8v-7.8zm10.5 0h2.2l1.8 2.6 1.8-2.6h2.2l-2.8 3.9 2.8 3.9h-2.2l-1.8-2.6-1.8 2.6h-2.2l2.8-3.9-2.8-3.9zm12 0h2.2l1.8 2.6 1.8-2.6h2.2l-2.8 3.9 2.8 3.9h-2.2l-1.8-2.6-1.8 2.6h-2.2l2.8-3.9-2.8-3.9z"/>
                  </svg>
                </div>

                {/* Afterpay */}
                <div className="w-20 h-8 bg-white rounded-md flex items-center justify-center shadow-sm p-1">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <rect width="100" height="30" fill="#b2fce4" rx="4"/>
                    <path fill="#00c58e" d="M8 7h3.5l1.5 4.5L14.5 7H18v16h-2.5V12l-1.2 3h-2.6l-1.2-3v11H8V7zm12 0h5.5c2.5 0 4 1.5 4 3.5s-1.5 3.5-4 3.5H22.5v6H20V7zm2.5 2v3h3c0.8 0 1.5-0.7 1.5-1.5S26.3 9 25.5 9h-3zm8 0h2.5v9h3.5v2.5H30.5V9zm6.5 0h5.5v2h-3v1.5h2.8v2H39v1.5h3v2h-5.5V9zm6.5 0h3l2.5 10 2.5-10h3l-4 16h-3l-4-16z"/>
                  </svg>
                </div>

                {/* Zip Pay */}
                <div className="w-20 h-8 bg-white rounded-md flex items-center justify-center shadow-sm p-1">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <rect width="100" height="30" fill="#ffe8f5" rx="4"/>
                    <g fill="#ff0080">
                      <path d="M15 7h8v3h-5l5 7v6h-8v-3h5l-5-7V7z"/>
                      <rect x="28" y="7" width="3" height="16"/>
                      <path d="M38 7h3l3 9V7h3v16h-3l-3-9v9h-3V7z"/>
                      <circle cx="57" cy="15" r="6" fill="none" stroke="#ff0080" stroke-width="1.5"/>
                      <path d="M53 15l3-3 3 3-3 3-3-3z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-xs text-center max-w-md">
                Shop with confidence using your preferred payment method. All transactions are secure and encrypted.
              </p>
            </div>
          </div>

        {/* Legal Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
              >
                {link.name}
              </LocalizedClientLink>
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Al-Shabaab Fabrics. All rights reserved.
          </div>
        </div>
      </div>
    </div>
    
    {/* Webifex Labs Credit */}
    <div className="border-t border-white/5 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-center">
          <div className="text-gray-500 text-xs">
            Designed & maintained by{' '}
            <a 
              href="https://webifex.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              Webifex Labs
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}
