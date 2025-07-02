'use client'
import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image
} from "@heroui/react"
import { 
  ShieldCheckIcon, 
  HeartIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  SparklesIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline"
import DynamicButton from "../common/components/dynamic-button"

const whatWeOffer = [
  { name: "Blazers", icon: "👔", category: "Formal Wear" },
  { name: "School Shirts", icon: "👕", category: "Daily Wear" },
  { name: "School Pants", icon: "👖", category: "Daily Wear" },
  { name: "Sports Polo Shirts", icon: "🏃", category: "Sports Wear" },
  { name: "Sports Polo Pants", icon: "🏃", category: "Sports Wear" },
  { name: "Sunnah Caps", icon: "🧢", category: "Islamic Wear" },
  { name: "Girl Skirts", icon: "👗", category: "Daily Wear" },
  { name: "Hijabs", icon: "🧕", category: "Islamic Wear" },
  { name: "Sunnah Hoodies", icon: "🧥", category: "Islamic Wear" },
  { name: "School Desks", icon: "🪑", category: "Furniture" },
  { name: "School Chairs", icon: "🪑", category: "Furniture" },
  { name: "Students Books", icon: "📚", category: "Educational" },
]

const whyChooseUs = [
  {
    icon: ShieldCheckIcon,
    title: "Premium Quality",
    description: "We use the finest fabrics and materials to ensure comfort, durability, and a professional appearance that lasts.",
    color: "from-emerald-400 to-green-500"
  },
  {
    icon: UserGroupIcon,
    title: "Bulk Orders & Customization",
    description: "Custom manufacturing to match your exact needs, ensuring quality, durability, and precision in every order.",
    color: "from-green-400 to-teal-500"
  },
  {
    icon: TruckIcon,
    title: "Reliable & Efficient Service",
    description: "Streamlined manufacturing process with timely delivery and excellent customer support throughout.",
    color: "from-teal-400 to-cyan-500"
  },
  {
    icon: CurrencyDollarIcon,
    title: "Affordable Pricing",
    description: "Competitive rates without compromising on quality. Best value for schools and educational institutions.",
    color: "from-cyan-400 to-blue-500"
  }
]

const stats = [
  { label: "Years of Experience", value: "15+", icon: CheckBadgeIcon },
  { label: "Schools Served", value: "500+", icon: GlobeAltIcon },
  { label: "Happy Students", value: "50K+", icon: HeartIcon },
  { label: "Products Delivered", value: "1M+", icon: TruckIcon },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Your Trusted Partner for Premium School Uniforms
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
              At Al Shabaab Fabrics, we specialize in providing high-quality school uniforms, sportswear, 
              and educational essentials tailored to meet the needs of institutions across Australia.
            </p>
            <div className="flex justify-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Premium Quality
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Custom Solutions
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Trusted by 500+ Schools
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Stats Section */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl text-center">
                <CardBody className="p-6">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${
                      index % 4 === 0 ? 'from-emerald-400 to-green-500' :
                      index % 4 === 1 ? 'from-green-400 to-teal-500' :
                      index % 4 === 2 ? 'from-teal-400 to-cyan-500' :
                      'from-cyan-400 to-blue-500'
                    } shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Offer Section */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Our Products & Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything Your School Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional uniforms to modern sportswear, we provide comprehensive solutions for educational institutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {whatWeOffer.map((item, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <Chip 
                    size="sm" 
                    variant="flat" 
                    color="success"
                    className="rounded-full"
                  >
                    {item.category}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every Thread
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why hundreds of schools trust us for their uniform and educational supply needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <CardBody className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section>
          <Card className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-800 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardBody className="p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Partner With Us?
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Join hundreds of satisfied schools and educational institutions. 
                  Let's create the perfect uniform solution for your students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <DynamicButton 
                    variant="primary" 
                    size="lg"
                  >
                    View Our Catalog
                  </DynamicButton>
                  <DynamicButton 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-700"
                  >
                    Get Custom Quote
                  </DynamicButton>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  )
} 