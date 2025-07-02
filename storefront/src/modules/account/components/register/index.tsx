"use client"

import { useFormState } from "react-dom"
import { motion } from "framer-motion"
import { FaEnvelope, FaLock, FaUser, FaPhone, FaUserPlus } from "react-icons/fa"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import DynamicButton from "@modules/common/components/dynamic-button"
import AnimateOnScroll from "@modules/layout/components/animate-on-scroll"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div className="w-full max-w-md mx-auto" data-testid="register-page">
      <AnimateOnScroll direction="up" className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
            <FaUserPlus className="text-white text-xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Al Shabaab Fabrics</h1>
          <p className="text-gray-600">
            Create your account to access exclusive deals and faster checkout
          </p>
        </motion.div>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.1}>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
                startContent={
                  <FaUser className="w-4 h-4 text-gray-400" />
                }
              />
              
              <Input
                label="Last Name"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
                startContent={
                  <FaUser className="w-4 h-4 text-gray-400" />
                }
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              required
              type="email"
              autoComplete="email"
              data-testid="email-input"
              startContent={
                <FaEnvelope className="w-4 h-4 text-gray-400" />
              }
            />

            <Input
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
              startContent={
                <FaPhone className="w-4 h-4 text-gray-400" />
              }
            />

            <Input
              label="Password"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
              startContent={
                <FaLock className="w-4 h-4 text-gray-400" />
              }
            />
          </div>

          <ErrorMessage error={message} data-testid="register-error" />

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            By creating an account, you agree to Al Shabaab Fabrics'{" "}
            <LocalizedClientLink
              href="/privacy"
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/terms"
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Terms of Service
            </LocalizedClientLink>
            .
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SubmitButton 
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300" 
              data-testid="register-button"
            >
              <FaUserPlus className="mr-2" />
              Create Account
            </SubmitButton>
          </motion.div>
        </form>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.2}>
        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>
          
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DynamicButton
              variant="outline"
              size="lg"
              className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            >
              Sign In Instead
            </DynamicButton>
          </motion.div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

export default Register
