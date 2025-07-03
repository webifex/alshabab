import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Al Shabaab Fabrics account to track orders, manage addresses, and access exclusive offers on school uniforms and supplies.",
  robots: {
    index: false, // Login pages shouldn't be indexed
    follow: false,
  },
}

export default function Login() {
  return <LoginTemplate />
}
