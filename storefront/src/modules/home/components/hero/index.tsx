"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import DynamicButton from "@modules/common/components/dynamic-button"
import { useRouter } from "next/navigation"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

const Hero = () => {
  const router = useRouter()

  const handleQuoteRequest = () => {
    router.push('/contact')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-emerald-200/40 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-lg rotate-45"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            className="text-left space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Australia's Premier Islamic Uniform Supplier
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Modest.</span>
                <span className="block text-gray-900">Professional.</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  School-Ready
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Premium Islamic School Uniforms & Essentials – 
              <br className="hidden md:block" />
              Designed for Australia's Faith-Based Schools
            </motion.p>

            {/* Features */}
            <motion.div 
              className="flex flex-wrap gap-6 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                "✓ Premium Quality Fabrics",
                "✓ Custom Design Solutions", 
                "✓ Trusted by 500+ Schools",
                "✓ Australia-Wide Delivery"
              ].map((feature, index) => (
                <motion.span 
                  key={index}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <DynamicButton
                onClick={handleQuoteRequest}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
              >
                Request a Custom Quote
              </DynamicButton>
            </motion.div>
          </motion.div>

          {/* Right Side - Students Image */}
          <motion.div 
            className="relative flex justify-center items-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Gradient Ball Behind Students */}
            <motion.div 
              className="absolute inset-0 flex justify-center items-center"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 via-teal-300/30 to-blue-300/20 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Students Image */}
            <motion.div 
              className="relative z-10 w-full max-w-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/hero2.png"
                alt="Students wearing Al Shabaab Fabrics Islamic school uniforms"
                width={600}
                height={800}
                className="w-full h-auto drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute top-20 -right-10 w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20"
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-32 -left-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg opacity-20 rotate-45"
              animate={{
                y: [10, -10, 10],
                rotate: [45, 90, 45]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

export default Hero
