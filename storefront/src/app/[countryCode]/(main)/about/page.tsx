import { Metadata } from "next"
import AboutPage from "../../../../modules/about/about-page"

export const metadata: Metadata = {
  title: "About Us | Al Shabaab Fabrics",
  description: "Learn about Al Shabaab Fabrics - your trusted partner for premium school uniforms, sportswear, and educational essentials across Australia.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Al Shabaab Fabrics",
    description: "Learn about Al Shabaab Fabrics - your trusted partner for premium school uniforms, sportswear, and educational essentials across Australia.",
    url: "/about",
    siteName: "Al Shabaab Fabrics",
    type: "website",
  },
}

export default function Page() {
  return <AboutPage />
} 