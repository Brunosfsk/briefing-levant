"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormField as FormFieldType } from "@/lib/form-config"
import { formatCurrency, formatPercentage } from "@/lib/form-utils"

interface FormFieldProps {
  field: FormFieldType
  value: any
  onChange: (value: any) => void
  error?: string
}

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  const [displayValue, setDisplayValue] = useState(value?.toString() || "")

  const handleBlur = () => {
    if (field.type === "currency") {
      const formatted = formatCurrency(displayValue)
      setDisplayValue(formatted)
      onChange(Number.parseFloat(displayValue.replace(/[^\d,]/g, "").replace(",", ".")) || 0)
    } else if (field.type === "percentage") {
      const formatted = formatPercentage(displayValue)
      setDisplayValue(formatted)
      onChange(Number.parseFloat(displayValue.replace("%", "")) || 0)
    }
  }

  // Check if company name field should be disabled based on checkbox state
  const isCompanyNameDisabled = field.name === "companyName" && value === ""

  // Get form data context to check checkbox state
  const getFormData = () => {
    try {
      const saved = localStorage.getItem("briefing-form-data")
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error("Error loading form data:", error)
    }
    return {}
  }

  const formData = getFormData()
  const isNameCheckboxChecked = formData.useCompanyName === true

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "number":
      case "currency":
      case "percentage":
        return (
          <Input
            name={field.name}
            type={field.type === "number" ? "number" : "text"}
            value={field.type === "currency" || field.type === "percentage" ? displayValue : value}
            onChange={(e) => {
              const newValue = e.target.value
              if (field.type === "currency" || field.type === "percentage") {
                setDisplayValue(newValue)
              } else {
                onChange(field.type === "number" ? Number.parseFloat(newValue) || 0 : newValue)
              }
            }}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            min={field.type === "number" ? 0 : undefined}
            aria-invalid={!!error}
            className={error ? "border-red-500 focus:border-red-500" : ""}
            disabled={field.name === "companyName" && isNameCheckboxChecked}
          />
        )

      case "textarea":
        return (
          <Textarea
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            aria-invalid={!!error}
            className={error ? "border-red-500 focus:border-red-500" : ""}
          />
        )

      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={error ? "border-red-500 focus:border-red-500" : ""}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={value === true}
              onCheckedChange={(checked) => {
                onChange(checked === true)
              }}
            />
            <Label htmlFor={field.name} className="text-sm">
              {field.label}
            </Label>
          </div>
        )

      case "range":
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{field.min || 0}</span>
              <span>{value}</span>
              <span>{field.max || 100}</span>
            </div>
            <input
              type="range"
              name={field.name}
              value={value}
              min={field.min || 0}
              max={field.max || 100}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )

      case "checkboxes":
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option}`}
                  checked={Array.isArray(value) && value.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : []
                    if (checked) {
                      onChange([...currentValues, option])
                    } else {
                      onChange(currentValues.filter((v: string) => v !== option))
                    }
                  }}
                />
                <Label htmlFor={`${field.name}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
            {field.hasOther && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-outro`}
                  checked={Array.isArray(value) && value.some((v: string) => v.startsWith("Outro:"))}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : []
                    if (checked) {
                      onChange([...currentValues.filter((v: string) => !v.startsWith("Outro:")), "Outro: "])
                    } else {
                      onChange(currentValues.filter((v: string) => !v.startsWith("Outro:")))
                    }
                  }}
                />
                <Label htmlFor={`${field.name}-outro`} className="text-sm">
                  Outro:
                </Label>
                <Input
                  placeholder="Especifique..."
                  value={
                    Array.isArray(value)
                      ? value.find((v: string) => v.startsWith("Outro:"))?.replace("Outro: ", "") || ""
                      : ""
                  }
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : []
                    const otherValues = currentValues.filter((v: string) => !v.startsWith("Outro:"))
                    if (e.target.value) {
                      onChange([...otherValues, `Outro: ${e.target.value}`])
                    } else {
                      onChange(otherValues)
                    }
                  }}
                  className="flex-1"
                />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-sm font-medium text-zinc-900">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
