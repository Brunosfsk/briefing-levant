export interface FormField {
  name: string
  label: string
  type: "text" | "textarea" | "number" | "currency" | "percentage" | "select" | "checkboxes"
  required?: boolean
  placeholder?: string
  options?: string[]
  hasOther?: boolean
}

export interface FormStep {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

export const FORM_STEPS: FormStep[] = [
  {
    id: "company-info",
    title: "Informações da Empresa",
    fields: [
      { name: "companyName", label: "Nome da empresa", type: "text", required: true },
      { name: "segment", label: "Segmento de atuação", type: "text", required: true },
      { name: "marketTime", label: "Tempo de mercado", type: "text", required: true },
      {
        name: "location",
        label: "Localização e abrangência",
        type: "select",
        required: true,
        options: ["Local", "Regional", "Nacional", "Internacional"],
      },
      { name: "responsible", label: "Responsável pelo marketing / decisor", type: "text", required: true },
      { name: "employeeCount", label: "Quantidade de funcionários", type: "number" },
      { name: "seasonality", label: "Sazonalidades (meses de alta/baixa)", type: "textarea" },
      { name: "lowSeasonRevenue", label: "Faturamento baixa temporada", type: "currency" },
      { name: "highSeasonRevenue", label: "Faturamento alta temporada", type: "currency" },
      { name: "whyCustomersBuy", label: "Por que o cliente compra de você?", type: "textarea" },
    ],
  },
  {
    id: "agency-objectives",
    title: "Objetivos com a Agência",
    fields: [
      { name: "expectations", label: "O que espera com nosso trabalho?", type: "textarea", required: true },
      { name: "problemsToSolve", label: "Problemas a resolver", type: "textarea" },
      { name: "expectedResults", label: "Metas/resultados esperados", type: "textarea" },
      { name: "idealDeadline", label: "Prazo ideal", type: "text" },
      {
        name: "priorities",
        label: "Prioridades",
        type: "checkboxes",
        options: [
          "Conhecer clientes",
          "Aumentar vendas",
          "Reconhecimento de marca",
          "Melhorar presença digital",
          "Lançar novo produto/serviço",
        ],
        hasOther: true,
      },
    ],
  },
  {
    id: "history",
    title: "Histórico",
    fields: [
      { name: "previousResults", label: "Resultados anteriores", type: "textarea" },
      { name: "paidTrafficInvestment", label: "Já investe em tráfego pago? Quanto?", type: "currency" },
      { name: "knowsCPA", label: "Sabe o que é CPA?", type: "select", options: ["Sim", "Não", "Mais ou menos"] },
      { name: "adPlatformsUsed", label: "Plataformas de anúncio já usadas", type: "text" },
      { name: "currentResultsSatisfaction", label: "Satisfação com resultados atuais", type: "textarea" },
      { name: "existingSalesStrategies", label: "Estratégias de vendas existentes", type: "textarea" },
    ],
  },
  {
    id: "current-channels",
    title: "Canais Atuais",
    fields: [
      { name: "channelsUsed", label: "Canais utilizados", type: "text" },
      { name: "contentFrequencyType", label: "Frequência e tipo de conteúdo", type: "textarea" },
    ],
  },
  {
    id: "desired-services",
    title: "Serviços Desejados",
    fields: [
      {
        name: "desiredServices",
        label: "Serviços desejados",
        type: "checkboxes",
        options: [
          "Social Media",
          "Tráfego Pago",
          "Branding/Identidade Visual",
          "Estratégia e Consultoria",
          "Automação personalizada",
        ],
        hasOther: true,
      },
      { name: "availableBudget", label: "Orçamento disponível", type: "currency", required: true },
    ],
  },
  {
    id: "urgency-expectations",
    title: "Urgência e Expectativas",
    fields: [
      { name: "plannedCampaign", label: "Campanha/lançamento previsto", type: "textarea" },
      { name: "idealStartDate", label: "Prazo ideal para começar", type: "text" },
    ],
  },
  {
    id: "competition",
    title: "Concorrência",
    fields: [{ name: "referenceCompany", label: "Empresa de referência", type: "text" }],
  },
  {
    id: "observations",
    title: "Observações",
    fields: [
      {
        name: "proportionalResult",
        label: "Resultado proporcional ao investimento?",
        type: "select",
        options: ["Sim", "Não", "Depende"],
      },
      { name: "generalObservations", label: "Observações gerais", type: "textarea" },
    ],
  },
  {
    id: "financial-info",
    title: "Informações Financeiras (Complementares)",
    fields: [
      { name: "monthlyMarketingBudget", label: "Orçamento mensal de marketing", type: "currency" },
      { name: "annualBudgetType", label: "Verba anual definida ou variável", type: "text" },
      { name: "investmentPriority", label: "Prioridade de investimentos", type: "textarea" },
    ],
  },
  {
    id: "citroen-specifics",
    title: "Especificidades – Marca Citroën (Franquias)",
    fields: [
      {
        name: "specificGuidelines",
        label: "Guidelines específicos (brandbook, restrições legais, tom, assets)",
        type: "textarea",
      },
    ],
  },
  {
    id: "commercial-info",
    title: "Informações Comerciais",
    fields: [
      { name: "salespeople", label: "Quantos vendedores", type: "number" },
      { name: "averageTicketPerSalesperson", label: "Ticket médio por vendedor", type: "currency" },
      { name: "averageProfitMargin", label: "Margem média de lucro", type: "percentage" },
      { name: "averageMonthlySales", label: "Vendas médias/mês", type: "currency" },
      { name: "unfinishedNegotiations", label: "Negociações não finalizadas/mês", type: "number" },
      {
        name: "averageClosingCycle",
        label: "Ciclo médio de fechamento",
        type: "select",
        options: ["Dias", "Semanas", "Meses"],
      },
    ],
  },
  {
    id: "models-projections",
    title: "Modelos em Alta & Projeções",
    fields: [
      { name: "championModel", label: "Modelo campeão", type: "text" },
      { name: "currentRevenue", label: "Faturamento atual", type: "currency" },
      { name: "expected6MonthRevenue", label: "Faturamento esperado 6 meses", type: "currency" },
      { name: "expected12MonthRevenue", label: "Faturamento esperado 12 meses", type: "currency" },
    ],
  },
  {
    id: "review",
    title: "Revisão & Envio",
    fields: [],
  },
]
