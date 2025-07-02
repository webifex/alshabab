'use client'
import React, { useState } from "react"
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Divider,
  Chip,
  Link
} from "@heroui/react"
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import DynamicButton from "../common/components/dynamic-button"

interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  qas: FAQ[]
}

const faqs: FAQCategory[] = [
  {
    category: "Orders & Purchasing",
    qas: [
      {
        question: "How do I place an order?",
        answer:
          "You can place orders online through our website, by phone, or by visiting our showroom. For bulk school orders, please contact our sales team directly for personalized service and volume discounts.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards, PayPal, bank transfers, and for institutional orders, we offer payment terms with approved credit applications.",
      },
      {
        question: "Do you offer bulk discounts for schools?",
        answer:
          "Yes, we provide competitive volume pricing for schools and madrasas. Contact us with your requirements for a customized quote.",
      },
      {
        question: "What is your minimum order quantity?",
        answer:
          "For individual orders, there's no minimum. For custom embroidery or school-specific items, minimum quantities may apply depending on the customization required.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    qas: [
      {
        question: "How do I determine the correct size?",
        answer:
          "Please refer to our detailed size charts available on each product page. We also offer virtual sizing consultations and accept returns for size exchanges within 30 days.",
      },
      {
        question: "Do you offer different fits for different body types?",
        answer:
          "Yes, we understand the importance of modest, comfortable fit. We offer regular, slim, and relaxed fits for most garments, as well as adjustable options for growing children.",
      },
      {
        question: "Can I get items tailored or altered?",
        answer:
          "We offer basic alterations for hem adjustments and minor sizing modifications. Custom tailoring is available for special requests with additional lead time.",
      },
    ],
  },
  {
    category: "Islamic Compliance & Modesty",
    qas: [
      {
        question: "Are all your uniforms designed to meet Islamic modesty requirements?",
        answer:
          "Absolutely. All our garments are designed with Islamic principles in mind, ensuring appropriate coverage, loose-fitting designs, and high-quality, non-transparent fabrics.",
      },
      {
        question: "Do you offer hijab-friendly uniform options?",
        answer:
          "Yes, we specialize in hijab-compatible designs including appropriate necklines, longer sleeve options, and coordinating hijab accessories in school colors.",
      },
      {
        question: "Are your uniforms suitable for prayer times during school?",
        answer:
          "Our uniforms are designed to be prayer-friendly with appropriate coverage and easy-to-maintain cleanliness standards required for salah.",
      },
    ],
  },
  {
    category: "Products & Customization",
    qas: [
      {
        question: "What uniform items do you offer?",
        answer:
          "We provide complete uniform solutions including shirts, blouses, trousers, skirts, dresses, hijabs, cardigans, blazers, PE kits, shoes, and accessories.",
      },
      {
        question: "Can you add school logos or embroidery?",
        answer:
          "Yes, we offer embroidery, screen printing, and heat transfer services for school logos, names, and house badges. We can match any school's branding requirements.",
      },
      {
        question: "Do you have seasonal options?",
        answer:
          "We offer both summer and winter uniform collections, including lightweight breathable fabrics for warmer months and warmer options for colder seasons.",
      },
      {
        question: "Can you create custom colors for our school?",
        answer:
          "Yes, we can manufacture uniforms in custom colors to match your school's specific requirements, subject to minimum order quantities.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    qas: [
      {
        question: "What are your shipping options and costs?",
        answer:
          "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery. Shipping costs vary by location and order size. Free shipping available on orders over $75.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to many countries worldwide. International shipping rates and delivery times vary by destination.",
      },
      {
        question: "When will my order be ready?",
        answer:
          "Stock items typically ship within 24-48 hours. Custom embroidery adds 3-5 business days. Large institutional orders may require 2-3 weeks depending on quantity and customization.",
      },
    ],
  },
  {
    category: "Quality & Care",
    qas: [
      {
        question: "What materials do you use?",
        answer:
          "We use high-quality, durable fabrics including cotton blends, polyester, and specialized performance fabrics that are comfortable, long-lasting, and easy to care for.",
      },
      {
        question: "Are your uniforms machine washable?",
        answer:
          "Yes, all our uniforms are designed for easy home care with machine washing. Detailed care instructions are provided with each item.",
      },
      {
        question: "Do you offer stain-resistant options?",
        answer:
          "Many of our items feature stain-resistant treatments, perfect for active students and easy maintenance.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    qas: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of purchase for unworn, unwashed items with original tags. Custom embroidered items may have different return conditions.",
      },
      {
        question: "How do I exchange items for different sizes?",
        answer:
          "Contact our customer service team to arrange size exchanges. We'll provide a prepaid return label and ship the correct size once we receive the return.",
      },
      {
        question: "What if I'm not satisfied with my order?",
        answer:
          "Your satisfaction is our priority. Contact us within 30 days if you're not completely happy, and we'll work to resolve any issues.",
      },
    ],
  },
  {
    category: "School Partnerships",
    qas: [
      {
        question: "Do you work directly with schools?",
        answer:
          "Yes, we partner with Islamic schools and madrasas to provide comprehensive uniform programs, including online ordering systems for parents and school fitting services.",
      },
      {
        question: "Can you set up a school uniform shop?",
        answer:
          "We offer pop-up uniform shops at schools during enrollment periods and can establish permanent on-site uniform services for larger institutions.",
      },
      {
        question: "Do you provide samples for schools to review?",
        answer:
          "Yes, we provide sample uniforms for schools to evaluate quality, fit, and styling before making large orders.",
      },
    ],
  },
  {
    category: "Customer Support",
    qas: [
      {
        question: "How can I contact customer service?",
        answer:
          "You can reach us by phone at [phone number], email at [email address], or through our website's live chat feature. Our customer service hours are Monday-Friday, 8 AM-6 PM.",
      },
      {
        question: "Do you have a physical store I can visit?",
        answer:
          "Yes, our showroom is located at [address]. We welcome appointments for fittings and uniform consultations.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes, you'll receive tracking information via email once your order ships. You can also check your order status by logging into your account on our website.",
      },
    ],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Let's Connect
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your trusted partner for premium school uniforms and custom garments. 
              Reach out to us for personalized service and bulk orders.
            </p>
            <div className="mt-6 flex justify-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Fast Response
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Expert Support
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                Custom Solutions
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* FAQ Section */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find comprehensive answers to common questions about our uniforms, services, and ordering process
            </p>
          </div>
          
          <Card className="w-full bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardBody className="p-8">
              <Accordion variant="light" className="w-full">
                {faqs.map((category: FAQCategory, categoryIndex: number) => (
                  <AccordionItem
                    key={category.category}
                    aria-label={category.category}
                    title={
                      <div className="flex items-center justify-between w-full py-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                            categoryIndex % 3 === 0 ? 'bg-gradient-to-br from-emerald-400 to-green-500' :
                            categoryIndex % 3 === 1 ? 'bg-gradient-to-br from-green-400 to-teal-500' :
                            'bg-gradient-to-br from-teal-400 to-cyan-500'
                          }`}>
                            {categoryIndex + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{category.category}</h3>
                            <p className="text-sm text-gray-500">{category.qas.length} questions</p>
                          </div>
                        </div>
                        <Chip 
                          color="success" 
                          variant="flat" 
                          size="sm"
                          className="rounded-full"
                        >
                          {category.qas.length}
                        </Chip>
                      </div>
                    }
                    className="text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="space-y-6 pb-6">
                      {category.qas.map((faq: FAQ, index: number) => (
                        <div key={`${faq.question}-${index}`} className="group">
                          <div className="bg-gradient-to-r from-gray-50 to-green-50/30 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300">
                            <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                              {faq.question}
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardBody>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Order?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact our expert team for personalized assistance with your uniform needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {[
                {
                  icon: PhoneIcon,
                  title: "Phone Support",
                  primary: "+1 (555) 123-4567",
                  secondary: "Mon-Fri, 8 AM - 6 PM",
                  color: "from-emerald-400 to-green-500"
                },
                {
                  icon: EnvelopeIcon,
                  title: "Email Us",
                  primary: "info@alshabaabfabrics.com",
                  secondary: "We'll respond within 24 hours",
                  color: "from-green-400 to-teal-500"
                },
                {
                  icon: MapPinIcon,
                  title: "Visit Our Showroom",
                  primary: "123 Main St, Sydney, NSW",
                  secondary: "Book an appointment for fittings",
                  color: "from-teal-400 to-cyan-500"
                },
                {
                  icon: ClockIcon,
                  title: "Business Hours",
                  primary: "Mon-Fri: 8:00 AM - 6:00 PM",
                  secondary: "Sat: 9:00 AM - 4:00 PM",
                  color: "from-cyan-400 to-blue-500"
                }
              ].map((contact, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group">
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${contact.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{contact.title}</h3>
                        {contact.title === "Email Us" ? (
                          <Link href={`mailto:${contact.primary}`} className="text-green-600 hover:text-green-700 font-medium">
                            {contact.primary}
                          </Link>
                        ) : (
                          <p className="text-gray-900 font-medium">{contact.primary}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">{contact.secondary}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Send us a Message</h3>
                    <p className="text-green-100">Fill out the form below and we'll get back to you within 24 hours</p>
                  </div>
                </CardHeader>
                <CardBody className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        isRequired
                        variant="bordered"
                        color="success"
                        size="lg"
                        className="rounded-xl"
                        classNames={{
                          input: "text-gray-900",
                          inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
                        }}
                      />
                      
                      <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        isRequired
                        variant="bordered"
                        color="success"
                        size="lg"
                        className="rounded-xl"
                        classNames={{
                          input: "text-gray-900",
                          inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
                        }}
                      />
                    </div>
                    
                    <Textarea
                      label="Message"
                      placeholder="Tell us about your uniform needs, quantity requirements, or any questions you have..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      isRequired
                      variant="bordered"
                      color="success"
                      size="lg"
                      minRows={6}
                      maxRows={10}
                      className="rounded-xl"
                      classNames={{
                        input: "text-gray-900",
                        inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
                      }}
                    />
                    
                    <DynamicButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      rightIcon={<PaperAirplaneIcon className="w-5 h-5" />}
                    >
                      Send Message
                    </DynamicButton>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 