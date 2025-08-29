"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { FORM_STEPS } from "@/lib/form-config"

interface ReviewStepProps {
  formData: Record<string, any>
  onEdit: (stepIndex: number) => void
}

export function ReviewStep({ formData, onEdit }: ReviewStepProps) {
  const formatValue = (value: any, type?: string) => {
    if (value === null || value === undefined || value === "") return "Não informado"

    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "Não informado"
    }

    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }

    if (type === "percentage") {
      return `${value}%`
    }

    return value.toString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Revisão & Envio</h2>
        <p className="text-zinc-600">Revise todas as informações antes de enviar o briefing.</p>
      </div>

      <div className="space-y-6">
        {FORM_STEPS.slice(0, -1).map((step, stepIndex) => (
          <Card key={step.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-zinc-900">{step.title}</h3>
              <Button variant="outline" size="sm" onClick={() => onEdit(stepIndex)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <dt className="text-sm font-medium text-zinc-600 mb-1">{field.label}</dt>
                  <dd className="text-sm text-zinc-900">{formatValue(formData[field.name], field.type)}</dd>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
