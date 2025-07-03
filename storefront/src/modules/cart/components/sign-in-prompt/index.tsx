import { Button, Heading, Text } from "@medusajs/ui"
import { FaUser, FaArrowRight } from "react-icons/fa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="relative p-6 rounded-xl border border-gray-200/80 hover:border-gray-300/80 transition-all duration-300 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-xl"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mt-1">
            <FaUser className="w-4 h-4 text-emerald-600" />
          </div>
          
          {/* Content */}
          <div>
            <Heading level="h3" className="text-lg font-semibold text-gray-900 mb-1">
              Already have an account?
            </Heading>
            <Text className="text-sm text-gray-600 leading-relaxed">
              Sign in for a better experience with saved addresses and order history.
            </Text>
          </div>
        </div>
        
        {/* Action */}
        <div className="flex-shrink-0 ml-6">
          <LocalizedClientLink href="/account">
            <Button 
              variant="secondary" 
              className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-emerald-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md" 
              data-testid="sign-in-button"
            >
              <span>Sign in</span>
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default SignInPrompt
