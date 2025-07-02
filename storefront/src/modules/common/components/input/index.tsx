import React, { useState } from "react"
import { Input as HeroInput } from "@heroui/react"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

interface InputProps {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  type?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  readOnly?: boolean
  className?: string
  startContent?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, errors, value, onChange, startContent, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
      setIsVisible(!isVisible)
    }

    const hasError = errors && errors[name] && touched && touched[name]
    const inputType = type === "password" ? (isVisible ? "text" : "password") : type

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <label className="mb-2 text-sm font-medium text-gray-700">{topLabel}</label>
        )}
        <HeroInput
          ref={ref}
          name={name}
          type={inputType}
          label={label}
          value={value || ""}
          onChange={onChange}
          isRequired={required}
          variant="bordered"
          size="lg"
          placeholder=" "
          className="w-full"
          startContent={startContent}
          classNames={{
            input: "text-gray-900 bg-transparent",
            inputWrapper: [
              "border-gray-300",
              "hover:border-gray-400",
              "focus-within:border-teal-500",
              "focus-within:ring-2",
              "focus-within:ring-teal-500/20",
              "rounded-md",
              "transition-all",
              "duration-200",
              "bg-white",
              hasError ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-red-500/20" : ""
            ].filter(Boolean).join(" "),
            label: [
              "text-gray-500",
              "group-data-[filled=true]:text-teal-600",
              "group-data-[focused=true]:text-teal-600",
              hasError ? "!text-red-500" : ""
            ].filter(Boolean).join(" "),
            errorMessage: "text-red-500 text-sm mt-1"
          }}
          endContent={
            type === "password" ? (
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            ) : undefined
          }
          errorMessage={hasError ? String(errors[name]) : undefined}
          isInvalid={!!hasError}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
