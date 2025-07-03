"use client"
import { notFound } from "next/navigation"
import { Suspense, useState } from "react"
import { FaLayerGroup, FaChevronRight, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {/* Breadcrumb */}
            {parents && parents.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                {parents.map((parent, index) => (
                  <div key={parent.id} className="flex items-center">
                    <LocalizedClientLink
                      className="hover:text-emerald-600 transition-colors duration-200"
                      href={`/categories/${parent.handle}`}
                      data-testid="breadcrumb-link"
                    >
                      {parent.name}
                    </LocalizedClientLink>
                    <FaChevronRight className="w-3 h-3 mx-2 text-gray-400" />
                  </div>
                ))}
              </nav>
            )}
            
            {/* Category Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <FaLayerGroup className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="category-page-title">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-lg text-gray-600 max-w-2xl">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            {/* Subcategories */}
            {category.category_children && category.category_children.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Subcategories</h3>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                   {category.category_children.map((c) => (
                     <LocalizedClientLink 
                       key={c.id} 
                       href={`/categories/${c.handle}`}
                       className="group"
                     >
                       <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200 group-hover:bg-emerald-50">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                             <FaLayerGroup className="w-4 h-4 text-emerald-600" />
                           </div>
                           <span className="font-medium text-gray-900 group-hover:text-emerald-700">
                             {c.name}
                           </span>
                         </div>
                       </div>
                     </LocalizedClientLink>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8" data-testid="category-container">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FaFilter className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-gray-900">Filters & Sort</span>
              </div>
              {isFilterOpen ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters & Sort</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <FaTimes className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <RefinementList sortBy={sort} data-testid="sort-by-container" />
              </div>
            )}
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
              <RefinementList sortBy={sort} data-testid="sort-by-container" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
