'use client'
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Button
} from '@heroui/react'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import DynamicButton from '../dynamic-button'

interface FormData {
  schoolName: string
  contactPerson: string
  email: string
  phone: string
  requiredProducts: string[]
  customMessage: string
}

interface FormErrors {
  schoolName?: string
  contactPerson?: string
  email?: string
  phone?: string
  requiredProducts?: string
  customMessage?: string
}

const productOptions = [
  { value: 'school-uniforms', label: 'School Uniforms' },
  { value: 'sportswear', label: 'Sportswear' },
  { value: 'islamic-essentials', label: 'Islamic Essentials' },
  { value: 'school-furniture', label: 'School Furniture' },
  { value: 'student-books', label: 'Student Books & Supplies' }
]

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    requiredProducts: [],
    customMessage: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Phone number formatting
  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    return phoneRegex.test(phone)
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // School name validation
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required'
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = 'School name must be at least 2 characters'
    }

    // Contact person validation
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required'
    } else if (formData.contactPerson.trim().length < 2) {
      newErrors.contactPerson = 'Contact person name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Products validation
    if (formData.requiredProducts.length === 0) {
      newErrors.requiredProducts = 'Please select at least one product category'
    }

    // Custom message validation
    if (!formData.customMessage.trim()) {
      newErrors.customMessage = 'Additional details are required'
    } else if (formData.customMessage.trim().length < 10) {
      newErrors.customMessage = 'Please provide at least 10 characters of details'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    let processedValue = value

    // Format phone number
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value)
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  // Handle checkbox changes
  const handleProductsChange = (values: string[]) => {
    setFormData(prev => ({
      ...prev,
      requiredProducts: values
    }))

    // Clear error when user selects products
    if (errors.requiredProducts) {
      setErrors(prev => ({
        ...prev,
        requiredProducts: undefined
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Quote request submitted:', formData)
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          schoolName: '',
          contactPerson: '',
          email: '',
          phone: '',
          requiredProducts: [],
          customMessage: ''
        })
      }, 3000)
      
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardBody className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h3>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your interest. We'll review your requirements and get back to you within 24 hours with a customized quote.
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to {formData.email}
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-800 text-white p-8">
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold mb-2">Let's Get Started — Request a Quote Today</h2>
          <p className="text-white/90">Fill out the form below and we'll provide you with a customized quote</p>
        </div>
      </CardHeader>
      
      <CardBody className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Name */}
          <div>
            <Input
              label="School Name"
              placeholder="Enter your school name"
              value={formData.schoolName}
              onChange={(e) => handleInputChange('schoolName', e.target.value)}
              variant="bordered"
              size="lg"
              isInvalid={!!errors.schoolName}
              errorMessage={errors.schoolName}
              className="rounded-xl"
              startContent={
                <AcademicCapIcon className="w-5 h-5 text-gray-400" />
              }
              classNames={{
                input: "text-gray-900",
                inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
              }}
            />
          </div>

          {/* Contact Person */}
          <div>
            <Input
              label="Contact Person"
              placeholder="Enter your name"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              variant="bordered"
              size="lg"
              isInvalid={!!errors.contactPerson}
              errorMessage={errors.contactPerson}
              className="rounded-xl"
              startContent={
                <UserIcon className="w-5 h-5 text-gray-400" />
              }
              classNames={{
                input: "text-gray-900",
                inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
              }}
            />
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              variant="bordered"
              size="lg"
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              className="rounded-xl"
              startContent={
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              }
              classNames={{
                input: "text-gray-900",
                inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
              }}
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              variant="bordered"
              size="lg"
              maxLength={14}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone}
              className="rounded-xl"
              startContent={
                <PhoneIcon className="w-5 h-5 text-gray-400" />
              }
              classNames={{
                input: "text-gray-900",
                inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
              }}
            />
          </div>

          {/* Required Products */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Required Products (Select all that apply)
            </label>
            <CheckboxGroup
              value={formData.requiredProducts}
              onChange={handleProductsChange}
              orientation="horizontal"
              className="gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {productOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    color="success"
                    className="max-w-none"
                    classNames={{
                      label: "text-gray-700 font-medium"
                    }}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </div>
            </CheckboxGroup>
            {errors.requiredProducts && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.requiredProducts}
              </p>
            )}
          </div>

          {/* Custom Message */}
          <div>
            <Textarea
              label="Additional Details / Custom Message"
              placeholder="Write any specific details or customization requests here"
              value={formData.customMessage}
              onChange={(e) => handleInputChange('customMessage', e.target.value)}
              variant="bordered"
              size="lg"
              minRows={6}
              maxRows={10}
              isInvalid={!!errors.customMessage}
              errorMessage={errors.customMessage}
              className="rounded-xl"
              startContent={
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
              }
              classNames={{
                input: "text-gray-900",
                inputWrapper: "border-gray-200 hover:border-green-400 focus-within:border-green-500 rounded-xl"
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <DynamicButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Submitting Quote Request...' : 'GET A CUSTOM QUOTE'}
            </DynamicButton>
          </div>
        </form>
      </CardBody>
    </Card>
  )
} 