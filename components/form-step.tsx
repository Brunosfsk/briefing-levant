"use client"

import { FormField } from "./form-field"
import type { FormStep as FormStepType } from "@/lib/form-config"

interface FormStepProps {
  step: FormStepType
  formData: Record<string, any>
  onUpdate: (field: string, value: any) => void
  errors: Record<string, string>
}

export function FormStep({ step, formData, onUpdate, errors }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">{step.title}</h2>
        {step.description && <p className="text-zinc-600">{step.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {step.fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
            <FormField
              field={field}
              value={formData[field.name] || ""}
              onChange={(value) => onUpdate(field.name, value)}
              error={errors[field.name]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
