import { FORM_STEPS } from "./form-config"

export function validateStep(stepIndex: number, formData: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {}
  const step = FORM_STEPS[stepIndex]

  if (!step) return errors

  step.fields.forEach((field) => {
    if (field.required) {
      const value = formData[field.name]

      if (value === undefined || value === null || value === "") {
        errors[field.name] = "Este campo é obrigatório"
      } else if (Array.isArray(value) && value.length === 0) {
        errors[field.name] = "Selecione pelo menos uma opção"
      } else if (field.type === "number" && (isNaN(value) || value < 0)) {
        errors[field.name] = "Digite um número válido"
      }
    }
  })

  return errors
}
