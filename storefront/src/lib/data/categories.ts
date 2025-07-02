import { sdk } from "@lib/config"
import { cache } from "react"

export const listCategories = cache(async function () {
  try {
    return sdk.store.category
      .list({ fields: "+category_children" }, { next: { tags: ["categories"] } })
      .then(({ product_categories }) => product_categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
) {
  try {
    return sdk.store.category.list(
      // TODO: Look into fixing the type
      // @ts-ignore
      { limit, offset },
      { next: { tags: ["categories"] } }
    )
  } catch (error) {
    console.error("Error fetching categories list:", error)
    return { product_categories: [], count: 0 }
  }
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {
  try {
    // Join the category handle array to create the full path
    const handle = categoryHandle.join("/")
    
    console.log("🔍 Looking for category with handle:", handle)
    console.log("🔍 Original categoryHandle array:", categoryHandle)
    
    const result = sdk.store.category.list(
      // TODO: Look into fixing the type
      // @ts-ignore
      { handle: categoryHandle },
      { next: { tags: ["categories"] } }
    )
    
    console.log("🔍 Category search result:", await result)
    
    return result
  } catch (error) {
    console.error("Error fetching category by handle:", error, "Handle:", categoryHandle)
    return { product_categories: [] }
  }
})
