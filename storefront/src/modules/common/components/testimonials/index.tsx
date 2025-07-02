'use client'
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Avatar,
  Button
} from '@heroui/react'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

interface Testimonial {
  id: string
  schoolName: string
  principalName: string
  position: string
  quote: string
  rating: number
  logo?: string
  location: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    schoolName: 'New Madinah College',
    principalName: 'Dr. Ahmed Hassan',
    position: 'Principal',
    quote: 'The best supplier for Islamic school uniforms and furniture in Australia. Al Shabaab Fabrics has consistently delivered high-quality products that meet our Islamic values and educational standards.',
    rating: 5,
    location: 'Sydney, NSW'
  },
  {
    id: '2',
    schoolName: 'Islamic College of Brisbane',
    principalName: 'Sister Fatima Al-Zahra',
    position: 'Head of Operations',
    quote: 'Outstanding service and exceptional quality. Their understanding of Islamic dress requirements and attention to detail has made them our preferred uniform supplier for over 5 years.',
    rating: 5,
    location: 'Brisbane, QLD'
  },
  {
    id: '3',
    schoolName: 'Al-Taqwa College',
    principalName: 'Br. Omar Abdul Rahman',
    position: 'Principal',
    quote: 'Professional, reliable, and committed to excellence. Al Shabaab Fabrics has helped us maintain our high standards while keeping costs reasonable for our families.',
    rating: 5,
    location: 'Melbourne, VIC'
  },
  {
    id: '4',
    schoolName: 'Crescent Islamic School',
    principalName: 'Mrs. Aisha Mahmood',
    position: 'Administration Director',
    quote: 'Their custom embroidery work is exceptional, and the hijab-friendly designs perfectly align with our Islamic values. Highly recommended for any Islamic educational institution.',
    rating: 5,
    location: 'Perth, WA'
  },
  {
    id: '5',
    schoolName: 'Masjid An-Nur Academy',
    principalName: 'Imam Abdullah Al-Mansouri',
    position: 'Director',
    quote: 'From Sunnah caps to prayer-friendly uniforms, Al Shabaab Fabrics understands our needs perfectly. Their products support our students\' Islamic identity with pride.',
    rating: 5,
    location: 'Adelaide, SA'
  },
  {
    id: '6',
    schoolName: 'Islamic Foundation School',
    principalName: 'Dr. Khadija Al-Bukhari',
    position: 'Principal',
    quote: 'Excellent customer service, timely delivery, and products that exceed expectations. They have made uniform procurement simple and stress-free for our school.',
    rating: 5,
    location: 'Gold Coast, QLD'
  }
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300">
      <CardBody className="p-8 flex flex-col h-full">
        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 text-center italic leading-relaxed mb-8 flex-grow">
          "{testimonial.quote}"
        </blockquote>

        {/* School Info */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {testimonial.schoolName.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-1">
            {testimonial.schoolName}
          </h4>
          <p className="text-gray-600 font-medium mb-1">
            {testimonial.principalName}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {testimonial.position}
          </p>
          <p className="text-xs text-gray-400">
            {testimonial.location}
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage] = useState(3)

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Customer Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Schools Across Australia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why hundreds of Islamic schools and educational institutions choose 
            Al Shabaab Fabrics for their uniform and supply needs.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Happy Schools', value: '500+' },
            { label: 'Students Served', value: '50K+' },
            { label: 'Average Rating', value: '4.9★' },
            { label: 'Years Experience', value: '15+' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <Button
              isIconOnly
              variant="bordered"
              onPress={goToPrevious}
              className="rounded-full border-gray-300 hover:border-green-500 hover:bg-green-50"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-green-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              isIconOnly
              variant="bordered"
              onPress={goToNext}
              className="rounded-full border-gray-300 hover:border-green-500 hover:bg-green-50"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Join these satisfied schools and experience the Al Shabaab Fabrics difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="solid"
              color="success"
              size="lg"
              className="font-semibold"
            >
              Request Your Quote
            </Button>
            <Button 
              variant="bordered"
              size="lg"
              className="font-semibold border-gray-300 hover:border-green-500"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 