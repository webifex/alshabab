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
