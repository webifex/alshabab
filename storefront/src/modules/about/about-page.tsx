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
  GlobeAltIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"
import DynamicButton from "../common/components/dynamic-button"

const productCategories = [
  {
    title: "School Uniforms",
    icon: AcademicCapIcon,
    description: "Premium quality school uniforms designed for comfort and durability",
    products: ["Blazers", "School Shirts", "School Pants", "Girl Skirts"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Islamic Wear",
    icon: HeartIcon,
    description: "Modest and comfortable Islamic clothing for educational institutions",
    products: ["Hijabs", "Sunnah Caps", "Sunnah Hoodies", "Prayer Uniforms"],
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Sports & PE",
    icon: ChartBarIcon,
    description: "High-performance sportswear for active learning environments",
    products: ["Sports Polo Shirts", "Sports Polo Pants", "PE Kits", "Athletic Wear"],
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Educational Supplies",
    icon: BookOpenIcon,
    description: "Essential learning materials and educational resources",
    products: ["Student Books", "Notebooks", "Stationery", "Learning Materials"],
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "School Furniture",
    icon: BuildingOfficeIcon,
    description: "Durable and ergonomic furniture for modern learning spaces",
    products: ["School Desks", "School Chairs", "Storage Solutions", "Classroom Furniture"],
    color: "from-gray-600 to-slate-700"
  },
  {
    title: "Custom Solutions",
    icon: SparklesIcon,
    description: "Tailored uniform and supply solutions for your specific needs",
    products: ["Custom Embroidery", "Logo Design", "Bulk Orders", "Special Requirements"],
    color: "from-cyan-500 to-blue-600"
  }
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

        {/* Product Categories Section */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Our Products & Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Solutions for Educational Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From premium uniforms to essential educational supplies, we provide complete solutions 
              tailored to meet the diverse needs of modern educational institutions across Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card 
                  key={index} 
                  className="group bg-white border-0 shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                >
                  <CardBody className="p-8 relative">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Product List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Featured Products:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.products.map((product, productIndex) => (
                            <span 
                              key={productIndex}
                              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className={`text-sm font-medium bg-gradient-to-r ${category.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 flex items-center gap-2 group/btn`}>
                          Explore Collection
                          <svg className="w-4 h-4 opacity-70 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )
            })}
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