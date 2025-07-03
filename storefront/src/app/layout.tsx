import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "../styles/globals.css"
import { Cabin } from "next/font/google"

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cabin",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Al Shabaab Fabrics - Premium School Uniforms & Educational Supplies",
    template: "%s | Al Shabaab Fabrics"
  },
  description: "Australia's trusted provider of premium school uniforms, sports uniforms, and educational supplies. Quality fabrics, custom sizing, and exceptional service.",
  keywords: ["school uniforms", "sports uniforms", "educational supplies", "custom uniforms", "school supplies", "Australia"],
  authors: [{ name: "Al Shabaab Fabrics" }],
  creator: "Al Shabaab Fabrics",
  publisher: "Al Shabaab Fabrics",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Al Shabaab Fabrics",
    title: "Al Shabaab Fabrics - Premium School Uniforms & Educational Supplies",
    description: "Australia's trusted provider of premium school uniforms, sports uniforms, and educational supplies. Quality fabrics, custom sizing, and exceptional service.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Shabaab Fabrics - Premium School Uniforms & Educational Supplies", 
    description: "Australia's trusted provider of premium school uniforms, sports uniforms, and educational supplies.",
    creator: "@alshabaabfabrics",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cabin.className} data-mode="light">
      <body className={cabin.className}>
        
          <main className="relative">{children}</main>
        
      </body>
    </html>
  )
}
