"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Download, RotateCcw, Check } from "lucide-react"
import { FormStep } from "./form-step"
import { FormSidebar } from "./form-sidebar"
import { ReviewStep } from "./review-step"
import { useFormData } from "@/hooks/use-form-data"
import { validateStep } from "@/lib/form-validation"
import { exportToJSON } from "@/lib/form-utils"
import { FORM_STEPS } from "@/lib/form-config"

export function BriefingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { formData, updateFormData, resetForm, saveToStorage } = useFormData()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = FORM_STEPS.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  useEffect(() => {
    saveToStorage()
  }, [formData, saveToStorage])

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData)

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      // Focus on first error field
      const firstErrorField = Object.keys(stepErrors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
      element?.focus()
      return
    }

    setErrors({})
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
      setErrors({})
    }
  }

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData)

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Envia os dados do formulário para o webhook
      const response = await fetch("https://n8n.forwardbridge.com.br/webhook/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar o briefing.")
      }
    } catch (error) {
      alert("Falha ao enviar briefing. Tente novamente mais tarde.")
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.")) {
      resetForm()
      setCurrentStep(0)
      setErrors({})
      setIsSubmitted(false)
    }
  }

  const handleExport = () => {
    exportToJSON(formData, "briefing-form-data.json")
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Briefing Enviado!</h1>
          <p className="text-zinc-600 mb-6">Obrigado por preencher nosso formulário. Entraremos em contato em breve.</p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              resetForm()
              setCurrentStep(0)
            }}
          >
            Novo Briefing
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Progress */}
      <div className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-zinc-900">Formulário de Briefing</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 whitespace-nowrap">
              Etapa {currentStep + 1} de {totalSteps}
            </span>
            <Progress value={progress} className="flex-1" />
            <span className="text-sm text-zinc-600 whitespace-nowrap">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FormSidebar steps={FORM_STEPS} currentStep={currentStep} onStepClick={handleStepClick} />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === totalSteps - 1 ? (
                    <ReviewStep formData={formData} onEdit={setCurrentStep} />
                  ) : (
                    <FormStep
                      step={FORM_STEPS[currentStep]}
                      formData={formData}
                      onUpdate={updateFormData}
                      errors={errors}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-200">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                {currentStep === totalSteps - 1 ? (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-zinc-900 hover:bg-zinc-800">
                    {isSubmitting ? "Enviando..." : "Enviar Briefing"}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-zinc-900 hover:bg-zinc-800">
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
