"use client"

import { FaClock, FaSortAmountDown, FaSortAmountUp, FaStar } from "react-icons/fa"

export type SortOptions = "price_asc" | "price_desc" | "created_at" | "popularity"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at" as SortOptions,
    label: "Latest Arrivals",
    icon: FaClock,
    description: "Newest products first"
  },
  {
    value: "popularity" as SortOptions,
    label: "Most Popular",
    icon: FaStar,
    description: "Bestselling items"
  },
  {
    value: "price_asc" as SortOptions,
    label: "Price: Low to High",
    icon: FaSortAmountUp,
    description: "Lowest price first"
  },
  {
    value: "price_desc" as SortOptions,
    label: "Price: High to Low",
    icon: FaSortAmountDown,
    description: "Highest price first"
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="space-y-2" data-testid={dataTestId}>
      {sortOptions.map((option) => {
        const Icon = option.icon
        const isSelected = sortBy === option.value
        
        return (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={`w-full text-left p-2 rounded-lg border transition-all duration-200 ${
              isSelected
                ? 'border-emerald-300 bg-emerald-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-25'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-emerald-100'
                  : 'bg-gray-100'
              }`}>
                <Icon className={`w-3 h-3 ${
                  isSelected ? 'text-emerald-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  isSelected ? 'text-emerald-900' : 'text-gray-900'
                }`}>
                  {option.label}
                </div>
                <div className={`text-xs ${
                  isSelected ? 'text-emerald-700' : 'text-gray-600'
                }`}>
                  {option.description}
                </div>
              </div>
              {isSelected && (
                <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default SortProducts
