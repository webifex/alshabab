import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of school uniforms, sports uniforms, books, and educational supplies. Quality products for students across Australia.",
  keywords: ["school products", "uniform shop", "educational supplies store", "student uniforms", "school books"],
  openGraph: {
    title: "Shop All Products - Al Shabaab Fabrics",
    description: "Browse our complete collection of school uniforms, sports uniforms, books, and educational supplies. Quality products for students across Australia.",
    url: "/store",
    siteName: "Al Shabaab Fabrics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Products - Al Shabaab Fabrics",
    description: "Browse our complete collection of school uniforms, sports uniforms, books, and educational supplies.",
  },
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
