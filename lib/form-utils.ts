export function formatCurrency(value: string): string {
  const numericValue = value.replace(/[^\d,]/g, "").replace(",", ".")
  const number = Number.parseFloat(numericValue)

  if (isNaN(number)) return ""

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number)
}

export function formatPercentage(value: string): string {
  const numericValue = Number.parseFloat(value.replace("%", ""))

  if (isNaN(numericValue)) return ""

  return `${Math.min(100, Math.max(0, numericValue))}%`
}

export function exportToJSON(data: Record<string, any>, filename: string) {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
