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
      { name: "relevantInfoCompany", label: "Informações relevantes", type: "textarea" },
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
      { name: "relevantInfoObjectives", label: "Informações relevantes", type: "textarea" },
    ],
  },
  {
    id: "history",
    title: "Histórico",
    fields: [
      { 
        name: "previousResultsPeriod", 
        label: "Resultados anteriores (Histórico)", 
        type: "select", 
        options: ["1 a 3 meses", "3 a 6 meses", "1 ano ou mais"] 
      },
      { 
        name: "resultSatisfaction", 
        label: "Satisfação com o resultado", 
        type: "select", 
        options: ["Sim", "Não"] 
      },
      { name: "paidTrafficInvestment", label: "Já investe em tráfego pago? Quanto?", type: "currency" },
      { name: "knowsCPA", label: "Sabe o que é CPA?", type: "select", options: ["Sim", "Não", "Mais ou menos"] },
      { name: "adPlatformsUsed", label: "Plataformas de anúncio já usadas", type: "text" },
      { name: "existingSalesStrategies", label: "Estratégias de vendas existentes", type: "textarea" },
      { name: "relevantInfoHistory", label: "Informações relevantes", type: "textarea" },
    ],
  },
  {
    id: "current-channels",
    title: "Canais Atuais",
    fields: [
      { 
        name: "channelsUsed", 
        label: "Canais utilizados", 
        type: "checkboxes", 
        options: ["Instagram", "Site", "LP", "TikTok", "LinkedIn"],
        hasOther: true 
      },
      { name: "contentFrequencyType", label: "Frequência e tipo de conteúdo", type: "textarea" },
      { name: "relevantInfoChannels", label: "Informações relevantes", type: "textarea" },
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
          "Site",
          "LP",
        ],
        hasOther: true,
      },
      { name: "desiredInvestment", label: "Investimento desejável", type: "currency", required: true },
      { name: "relevantInfoServices", label: "Informações relevantes", type: "textarea" },
    ],
  },
  {
    id: "urgency-expectations",
    title: "Urgência",
    fields: [
      { name: "idealStartDate", label: "Prazo ideal para começar", type: "text" },
      { name: "expectedROI", label: "Expectativa de ROI", type: "text" },
      { name: "plannedCampaign", label: "Campanha/lançamento previsto", type: "textarea" },
      { name: "relevantInfoUrgency", label: "Informações relevantes", type: "textarea" },
    ],
  },
  {
    id: "competition",
    title: "Concorrência",
    fields: [
      { name: "referenceCompany", label: "Empresa de referência", type: "text" },
      { name: "competitorOne", label: "Concorrente 1", type: "text" },
      { name: "competitorTwo", label: "Concorrente 2", type: "text" },
      { name: "relevantInfoCompetition", label: "Informações relevantes", type: "textarea" },
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
      { name: "relevantInfoCommercial", label: "Informações relevantes", type: "textarea" },
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
      { name: "relevantInfoModels", label: "Informações relevantes", type: "textarea" },
    ],
  },
  {
    id: "review",
    title: "Revisão & Envio",
    fields: [],
  },
]
