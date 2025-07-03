import { Metadata } from "next"
import SearchModal from "@modules/search/templates/search-modal"

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search our extensive catalog of school uniforms, sports uniforms, books, and educational supplies. Find exactly what you need for your school.",
  keywords: ["search uniforms", "find school supplies", "uniform search", "product search"],
  openGraph: {
    title: "Search Products - Al Shabaab Fabrics",
    description: "Search our extensive catalog of school uniforms, sports uniforms, books, and educational supplies.",
    url: "/search",
    siteName: "Al Shabaab Fabrics",
    type: "website",
  },
  robots: {
    index: false, // Search pages typically shouldn't be indexed
    follow: true,
  },
}

export default function SearchModalRoute() {
  return <SearchModal />
}
