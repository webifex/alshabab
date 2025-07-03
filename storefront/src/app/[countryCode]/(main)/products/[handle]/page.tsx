import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title}`,
    description: `${product.description || product.title} - Quality ${product.title.toLowerCase()} from Al Shabaab Fabrics. Perfect for students with premium materials and excellent craftsmanship.`,
    keywords: [`${product.title}`, "school uniforms", "educational supplies", "quality products", "student supplies"],
          openGraph: {
        title: `${product.title} - Al Shabaab Fabrics`,
        description: `${product.description || product.title} - Quality products from Al Shabaab Fabrics.`,
        images: product.thumbnail ? [
          {
            url: product.thumbnail,
            width: 800,
            height: 600,
            alt: product.title,
          }
        ] : [],
        type: "website",
        siteName: "Al Shabaab Fabrics",
      },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Al Shabaab Fabrics`,
      description: `${product.description || product.title} - Quality products from Al Shabaab Fabrics.`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
