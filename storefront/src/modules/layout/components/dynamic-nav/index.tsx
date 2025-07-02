import { listCategories } from "@lib/data/categories"
import { Suspense } from "react"

async function CategoryLinks() {
  try {
    const categories = await listCategories()
    
    if (!categories || categories.length === 0) {
      // Fallback to hardcoded categories if none exist
      return [
        { name: "School Uniforms", href: "/categories/school-uniforms" },
        { name: "Sports Uniforms", href: "/categories/sports-uniforms" },
        { name: "Books", href: "/categories/books" },
        { name: "Educational Supplies", href: "/categories/educational-supplies" },
      ]
    }

    // Convert actual categories to menu items
    return categories.map(category => ({
      name: category.name,
      href: `/categories/${category.handle}`
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Fallback to hardcoded categories on error
    return [
      { name: "School Uniforms", href: "/categories/school-uniforms" },
      { name: "Sports Uniforms", href: "/categories/sports-uniforms" },
      { name: "Books", href: "/categories/books" },
      { name: "Educational Supplies", href: "/categories/educational-supplies" },
    ]
  }
}

function CategoryLinksSkeleton() {
  return [
    { name: "Loading...", href: "#" },
    { name: "Loading...", href: "#" },
    { name: "Loading...", href: "#" },
  ]
}

export async function getDynamicProductsMenu() {
  return await CategoryLinks()
}

export function getDynamicProductsMenuFallback() {
  return CategoryLinksSkeleton()
} 