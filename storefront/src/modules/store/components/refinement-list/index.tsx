"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { FaFilter, FaSort } from "react-icons/fa"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="space-y-5">
      {/* Filters Header */}
      <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
        <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
          <FaFilter className="w-3 h-3 text-emerald-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">Filters & Sort</h3>
      </div>

      {/* Sort Products */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FaSort className="w-3 h-3 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Sort Options</span>
        </div>
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>

      {/* Additional Filters Section - Future Enhancement */}
      <div className="space-y-3">
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <h4 className="text-sm font-medium text-emerald-800 mb-1">Need Help Finding Products?</h4>
          <p className="text-xs text-emerald-700">
            Contact us for custom orders or specific requirements for your school or organization.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
