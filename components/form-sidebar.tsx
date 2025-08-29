"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { FormStep } from "@/lib/form-config"
import { cn } from "@/lib/utils"

interface FormSidebarProps {
  steps: FormStep[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
}

export function FormSidebar({ steps, currentStep, onStepClick }: FormSidebarProps) {
  return (
    <div className="sticky top-32">
      <nav className="space-y-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = index <= currentStep

          return (
            <motion.button
              key={step.id}
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3",
                isCurrent && "bg-zinc-100 border border-zinc-300",
                isCompleted && "bg-green-50 border border-green-200",
                !isCurrent && !isCompleted && "hover:bg-zinc-50",
                !isClickable && "opacity-50 cursor-not-allowed",
              )}
              whileHover={isClickable ? { scale: 1.02 } : {}}
              whileTap={isClickable ? { scale: 0.98 } : {}}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  isCurrent && "bg-zinc-900 text-white",
                  isCompleted && "bg-green-600 text-white",
                  !isCurrent && !isCompleted && "bg-zinc-200 text-zinc-600",
                )}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isCurrent && "text-zinc-900",
                    isCompleted && "text-green-800",
                    !isCurrent && !isCompleted && "text-zinc-600",
                  )}
                >
                  {step.title}
                </p>
              </div>
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}
