import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import QuoteForm from "@modules/common/components/quote-form"
import Testimonials from "@modules/common/components/testimonials"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Quote Request Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Get Your Custom Quote
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Outfit Your School?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a personalized quote for your school's uniform and supply needs. 
              Our team will work with you to create the perfect solution.
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
