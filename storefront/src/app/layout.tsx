import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "../styles/globals.css"
import { Cabin, Poppins } from "next/font/google"

const poppins = Cabin({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className} data-mode="light">
      <body>
        
          <main className="relative">{children}</main>
        
      </body>
    </html>
  )
}
