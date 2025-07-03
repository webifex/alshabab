import { Text } from "@medusajs/ui"
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 h-full flex flex-col">
      <LocalizedClientLink href={`/products/${product.handle}`} className="block flex-1 flex flex-col">
        <div data-testid="product-wrapper" className="relative flex-1 flex flex-col">
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-50 aspect-[4/3] flex-shrink-0">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-50 transition-colors">
                <FaEye className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors">
                <FaShoppingCart className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4 flex-1 flex flex-col">
            {/* Product Title */}
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2" data-testid="product-title">
              {product.title}
            </h3>

            {/* Product Categories or Description */}
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.slice(0, 2).map((category: any) => (
                  <span key={category.id} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Price and Rating */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-x-2">
                {cheapestPrice && (
                  <div className="font-bold text-emerald-600 text-xl">
                    <PreviewPrice price={cheapestPrice} />
                  </div>
                )}
              </div>
              
              {/* Rating Stars - Placeholder */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1 font-medium">(5.0)</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button className="w-full mt-4 py-3 px-4 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors duration-200 font-medium border border-gray-200 hover:border-emerald-300">
              View Details
            </button>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
