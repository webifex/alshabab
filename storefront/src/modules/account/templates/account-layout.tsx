"use client"
import React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import AnimateOnScroll from "@modules/layout/components/animate-on-scroll"
import DynamicButton from "@modules/common/components/dynamic-button"
import { FaQuestionCircle, FaHeadset } from "react-icons/fa"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  const router = useRouter()

  const handleContactSupport = () => {
    router.push('/contact')
  }

  const handleViewFAQs = () => {
    router.push('/contact')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30" data-testid="account-page">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <AnimateOnScroll direction="up" className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {customer ? `Welcome back, ${customer.first_name}!` : 'My Account'}
              </h1>
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                Manage your profile, orders, and preferences in one convenient place
              </p>
            </motion.div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {customer ? (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <AnimateOnScroll direction="left" className="lg:sticky lg:top-8 lg:self-start">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/20 p-6">
                <AccountNav customer={customer} />
              </div>
            </AnimateOnScroll>
            
            {/* Main Content Area */}
            <AnimateOnScroll direction="up" delay={0.1} className="min-h-[600px]">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/20 p-8">
                {children}
              </div>
            </AnimateOnScroll>
          </div>
        ) : (
          /* Login/Register Content - Full Width Centered */
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              {children}
            </div>
          </div>
        )}

        {/* Help Section */}
        <AnimateOnScroll direction="up" delay={0.2} className="mt-16">
          <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FaQuestionCircle className="text-emerald-400 text-2xl" />
                  <h3 className="text-2xl font-bold">Got questions?</h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  You can find frequently asked questions and answers on our
                  customer service page, or reach out to our support team directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <DynamicButton
                    variant="success"
                    size="lg"
                    className="!bg-gradient-to-r !from-emerald-600 !to-teal-600 hover:!from-emerald-500 hover:!to-teal-500 !border-0 !text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={handleContactSupport}
                    leftIcon={<FaHeadset />}
                  >
                    Contact Support
                  </DynamicButton>
                  <DynamicButton
                    variant="outline"
                    size="lg"
                    className="!border-2 !border-white/30 !text-white hover:!bg-white/10 hover:!border-white/50 !bg-transparent transition-all duration-300"
                    onClick={handleViewFAQs}
                  >
                    View FAQs
                  </DynamicButton>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center"
                >
                  <FaHeadset className="text-6xl text-emerald-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

export default AccountLayout
