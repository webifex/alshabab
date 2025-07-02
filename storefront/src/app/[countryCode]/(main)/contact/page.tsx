import { Metadata } from "next"
import ContactPage from "@modules/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact Us | Al Shabaab Fabrics",
  description: "Contact Al Shabaab Fabrics for school uniforms, custom orders, and support. Find FAQs, contact info, and a direct message form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Al Shabaab Fabrics",
    description: "Contact Al Shabaab Fabrics for school uniforms, custom orders, and support. Find FAQs, contact info, and a direct message form.",
    url: "/contact",
    siteName: "Al Shabaab Fabrics",
    type: "website",
  },
}

export default function Page() {
  return <ContactPage />
} 