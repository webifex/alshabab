import { Metadata } from "next"

import SearchResultsTemplate from "@modules/search/templates/search-results-template"

import { search } from "@modules/search/actions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search results for products in our school uniforms, sports uniforms, books, and educational supplies catalog.",
  robots: {
    index: false, // Search result pages typically shouldn't be indexed
    follow: true,
  },
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { query } = params
  const { sortBy, page } = searchParams

  const hits = await search(query).then((data) => data)

  const ids = hits
    .map((h) => h.objectID || h.id)
    .filter((id): id is string => {
      return typeof id === "string"
    })

  return (
    <SearchResultsTemplate
      query={query}
      ids={ids}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
