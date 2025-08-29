"use client"

import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "briefing-form-data"

export function useFormData() {
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setFormData(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading form data:", error)
    }
  }, [])

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch (error) {
      console.error("Error saving form data:", error)
    }
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing form data:", error)
    }
  }, [])

  return {
    formData,
    updateFormData,
    saveToStorage,
    resetForm,
  }
}
