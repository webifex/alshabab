import { listCategories, getCategoryByHandle } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export default async function DebugCategoriesPage() {
  // Get all categories
  const categories = await listCategories()
  
  // Get region for Australia (or first available)
  const region = await getRegion("au")
  
  // Get all products with detailed logging
  const allProducts = await getProductsList({
    pageParam: 1,
    queryParams: { limit: 100 },
    countryCode: "au"
  })

  // Test specific category
  let testCategory = null
  let testCategoryProducts = null
  if (categories && categories.length > 0) {
    try {
      const categoryHandle = categories[0].handle
      testCategory = await getCategoryByHandle([categoryHandle!])
      
      // Try to get products for this category
      testCategoryProducts = await getProductsList({
        pageParam: 1,
        queryParams: { 
          limit: 100,
          // @ts-ignore - category_id is a valid parameter but not in the type definition
          category_id: [categories[0].id!]
        },
        countryCode: "au"
      })
    } catch (error) {
      console.error("Error testing category:", error)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Categories & Products</h1>
      
      {/* Region Info */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Region Info</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(region, null, 2)}
        </pre>
      </div>

      {/* All Categories */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">All Categories ({categories?.length || 0})</h2>
        <pre className="text-sm overflow-auto max-h-96">
          {JSON.stringify(categories, null, 2)}
        </pre>
      </div>

      {/* Test Category */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Test Category (First Category)</h2>
        <pre className="text-sm overflow-auto max-h-96">
          {JSON.stringify(testCategory, null, 2)}
        </pre>
      </div>

      {/* All Products - Enhanced Debug */}
      <div className="mb-8 p-4 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">All Products ({allProducts?.response?.count || 0})</h2>
        <h3 className="text-lg font-semibold mb-2">Product Cards:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {allProducts?.response?.products?.map((product: any) => (
            <div key={product.id} className="p-3 bg-white rounded border">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">ID: {product.id}</p>
              <p className="text-sm text-gray-600">Handle: {product.handle}</p>
              <p className="text-sm text-gray-600">
                Categories: {product.categories?.map((c: any) => c.name).join(", ") || "None"}
              </p>
              <p className="text-sm text-gray-600">
                Collection: {product.collection?.title || "None"}
              </p>
              <p className="text-sm text-gray-600">
                Has categories field: {product.categories !== undefined ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                Categories length: {product.categories?.length || 0}
              </p>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Raw API Response:</h3>
        <pre className="text-sm overflow-auto max-h-96 bg-gray-100 p-2 rounded">
          {JSON.stringify(allProducts, null, 2)}
        </pre>
      </div>

      {/* Test Category Products */}
      <div className="mb-8 p-4 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Products in Test Category ({testCategoryProducts?.response?.count || 0})
        </h2>
        <h3 className="text-lg font-semibold mb-2">Product Cards:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {testCategoryProducts?.response?.products?.map((product: any) => (
            <div key={product.id} className="p-3 bg-white rounded border">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">ID: {product.id}</p>
              <p className="text-sm text-gray-600">Handle: {product.handle}</p>
              <p className="text-sm text-gray-600">
                Categories: {product.categories?.map((c: any) => c.name).join(", ") || "None"}
              </p>
              <p className="text-sm text-gray-600">
                Collection: {product.collection?.title || "None"}
              </p>
              <p className="text-sm text-gray-600">
                Has categories field: {product.categories !== undefined ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                Categories length: {product.categories?.length || 0}
              </p>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Raw API Response:</h3>
        <pre className="text-sm overflow-auto max-h-96 bg-gray-100 p-2 rounded">
          {JSON.stringify(testCategoryProducts, null, 2)}
        </pre>
      </div>

      {/* Navigation Menu Categories */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Navigation Menu Categories</h2>
        <p className="text-sm mb-2">These are the hardcoded categories in the navigation:</p>
        <ul className="list-disc list-inside">
          <li>/categories/school-uniforms</li>
          <li>/categories/sports-uniforms</li>
          <li>/categories/books</li>
          <li>/categories/educational-supplies</li>
        </ul>
      </div>

      {/* Database Issue Analysis */}
      <div className="mb-8 p-4 bg-orange-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Issue Analysis</h2>
        <p className="text-sm mb-2">Based on the data above:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Products exist</strong>: {allProducts?.response?.count || 0} products found</li>
          <li><strong>Categories exist</strong>: {categories?.length || 0} categories found</li>
          <li><strong>Collections exist</strong>: Products are in "Books" collection</li>
          <li><strong>Category filtering works</strong>: Finding products when filtering by category_id</li>
          <li><strong>Issue</strong>: Products don't have category data in general listing</li>
        </ul>
        <p className="text-sm mt-4 font-semibold">
          Likely cause: Products are linked to Collections but NOT to Categories in the database.
          Medusa might be doing smart matching between collection handles and category handles.
        </p>
      </div>
    </div>
  )
} 