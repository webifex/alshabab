"use client"
import { useFormState } from "react-dom"
import { motion } from "framer-motion"
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import DynamicButton from "@modules/common/components/dynamic-button"
import AnimateOnScroll from "@modules/layout/components/animate-on-scroll"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)

  return (
    <div className="w-full" data-testid="login-page">
      <AnimateOnScroll direction="up" className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
            <FaSignInAlt className="text-white text-xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to access your account and continue shopping
          </p>
        </motion.div>
      </AnimateOnScroll>

      <AnimateOnScroll direction="up" delay={0.1}>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              required
              data-testid="email-input"
              startContent={
                <FaEnvelope className="w-4 h-4 text-gray-400" />
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
              startContent={
                <FaLock className="w-4 h-4 text-gray-400" />
              }
            />
          </div>

          <ErrorMessage error={message} data-testid="login-error-message" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SubmitButton 
              data-testid="sign-in-button" 
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300"
            >
              <FaSignInAlt className="mr-2" />
              Sign In
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
              <span className="px-4 bg-white text-gray-500">New to Al Shabaab Fabrics?</span>
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
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              data-testid="register-button"
            >
              Create Account
            </DynamicButton>
          </motion.div>

          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
              Terms of Service
            </a>
          </p>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

export default Login
