'use client'
import React from 'react'
import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from '@heroui/react'

// Simple utility function for merging class names
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Define custom button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface DynamicButtonProps extends Omit<HeroUIButtonProps, 'variant' | 'size' | 'color'> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const buttonVariants = {
  primary: {
    className: "bg-gradient-to-r from-gray-800 to-black text-white border-0 shadow-lg hover:shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02]",
    color: "default" as const
  },
  secondary: {
    className: "bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0 shadow-md hover:shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300",
    color: "default" as const
  },
  outline: {
    className: "bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white hover:border-gray-900 transition-all duration-300",
    color: "default" as const
  },
  ghost: {
    className: "bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300",
    color: "default" as const
  },
  success: {
    className: "bg-gradient-to-r from-green-700 to-green-800 text-white border-0 shadow-lg hover:shadow-xl hover:from-green-800 hover:to-green-900 transition-all duration-300",
    color: "default" as const
  },
  danger: {
    className: "bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transition-all duration-300",
    color: "default" as const
  }
}

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-md",
  lg: "px-8 py-4 text-lg rounded-md"
}

export default function DynamicButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: DynamicButtonProps) {
  const variantConfig = buttonVariants[variant]
  const sizeClass = sizeStyles[size]
  
  return (
    <HeroUIButton
      {...props}
      color={variantConfig.color}
      disabled={disabled || isLoading}
      className={cn(
        variantConfig.className,
        sizeClass,
        "font-semibold",
        disabled && "opacity-50 cursor-not-allowed",
        isLoading && "opacity-75",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </div>
    </HeroUIButton>
  )
}

// Export types for use in other components
export type { ButtonVariant, ButtonSize, DynamicButtonProps } 