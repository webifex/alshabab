"use client"
import { motion } from "framer-motion"
import { Container } from "@medusajs/ui"
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaShoppingBag, 
  FaCalendarAlt, 
  FaDollarSign,
  FaChevronRight,
  FaCheckCircle
} from "react-icons/fa"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AnimateOnScroll, { StaggerContainer } from "@modules/layout/components/animate-on-scroll"
import DynamicButton from "@modules/common/components/dynamic-button"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  
  return (
    <div data-testid="overview-page-wrapper">
      {/* Welcome Section */}
      <AnimateOnScroll direction="up">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2" data-testid="welcome-message" data-value={customer?.first_name}>
                Hello, {customer?.first_name}! 👋
              </h1>
              <p className="text-gray-600">
                Welcome back to your account dashboard
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
              Signed in as:{" "}
              <span
                className="font-semibold text-gray-700"
                data-testid="customer-email"
                data-value={customer?.email}
              >
                {customer?.email}
              </span>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Stats Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Profile Completion Card */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <FaUser className="text-emerald-600 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Profile</h3>
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold text-emerald-600"
                  data-testid="customer-profile-completion"
                  data-value={profileCompletion}
                >
                  {profileCompletion}%
                </span>
                <span className="text-sm text-gray-600">Complete</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Addresses Card */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Addresses</h3>
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold text-blue-600"
                  data-testid="addresses-count"
                  data-value={customer?.addresses?.length || 0}
                >
                  {customer?.addresses?.length || 0}
                </span>
                <span className="text-sm text-gray-600">Saved</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders Card */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FaShoppingBag className="text-purple-600 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Orders</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-purple-600">
                  {orders?.length || 0}
                </span>
                <span className="text-sm text-gray-600">Total</span>
              </div>
            </div>
          </div>
        </motion.div>
      </StaggerContainer>

      {/* Recent Orders Section */}
      <AnimateOnScroll direction="up" delay={0.3}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaShoppingBag className="text-emerald-600" />
                Recent Orders
              </h2>
              <LocalizedClientLink href="/account/orders">
                <DynamicButton variant="outline" size="sm">
                  View All
                  <FaChevronRight className="ml-2" />
                </DynamicButton>
              </LocalizedClientLink>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100" data-testid="orders-wrapper">
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-testid="order-wrapper"
                  data-value={order.id}
                >
                  <LocalizedClientLink
                    href={`/account/orders/details/${order.id}`}
                    className="block p-6 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <FaCalendarAlt className="text-emerald-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Order Date</p>
                            <p className="text-sm text-gray-600" data-testid="order-created-date">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaShoppingBag className="text-blue-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Order Number</p>
                            <p className="text-sm text-gray-600" data-testid="order-id" data-value={order.display_id}>
                              #{order.display_id}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FaDollarSign className="text-green-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Total</p>
                            <p className="text-sm text-gray-600" data-testid="order-amount">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaChevronRight className="text-gray-400" data-testid="open-order-button" />
                      </div>
                    </div>
                  </LocalizedClientLink>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FaShoppingBag className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6" data-testid="no-orders-message">
                  Start shopping to see your orders here
                </p>
                <LocalizedClientLink href="/store">
                  <DynamicButton variant="primary">
                    Browse Products
                  </DynamicButton>
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Quick Actions */}
      <AnimateOnScroll direction="up" delay={0.4}>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <LocalizedClientLink href="/account/profile">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaUser className="text-2xl" />
                <div>
                  <h3 className="font-semibold mb-1">Complete Your Profile</h3>
                  <p className="text-emerald-100 text-sm">
                    Add missing information for a better experience
                  </p>
                </div>
                <FaChevronRight className="ml-auto" />
              </div>
            </motion.div>
          </LocalizedClientLink>
          
          <LocalizedClientLink href="/account/addresses">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl" />
                <div>
                  <h3 className="font-semibold mb-1">Manage Addresses</h3>
                  <p className="text-blue-100 text-sm">
                    Add or update your shipping addresses
                  </p>
                </div>
                <FaChevronRight className="ml-auto" />
              </div>
            </motion.div>
          </LocalizedClientLink>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
