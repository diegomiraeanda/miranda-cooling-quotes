
import { Quote } from "@/types";

// If quotes are exported from CreateQuote.ts, we'll import them
import { quotes as createdQuotes } from "@/pages/CreateQuote";

// Mock data for customers
export const customers = [
  {
    id: "customer-1",
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "customer-2",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    phone: "(21) 98765-4321",
    address: "Av. Atlântica, 456",
    city: "Rio de Janeiro",
    state: "RJ",
  },
];

// Mock data for services
export const services = [
  {
    id: "service-1",
    name: "Instalação de Ar Condicionado Split",
    description: "Instalação completa de ar condicionado split incluindo suportes e tubulação.",
    price: 350.00,
  },
  {
    id: "service-2",
    name: "Manutenção Preventiva",
    description: "Limpeza de filtros, verificação de gás e componentes elétricos.",
    price: 180.00,
  },
  {
    id: "service-3",
    name: "Reparo de Compressor",
    description: "Serviço de reparo ou substituição de compressor com garantia.",
    price: 450.00,
  },
];

// Combine created quotes with any pre-defined quotes
export const quotes = [
  ...createdQuotes,
  {
    id: "quote-sample",
    number: "ORC-1234",
    date: "2025-04-01",
    customerName: "Empresa ABC Ltda",
    customerAddress: "Av. Industrial, 1000",
    customerCity: "São Paulo",
    customerState: "SP",
    customerPhone: "(11) 3333-4444",
    customerEmail: "contato@empresaabc.com.br",
    
    deviceType: "Ar Condicionado Split",
    deviceBrand: "Consul",
    deviceModel: "CBA123",
    deviceSerialNumber: "SN123456789",
    purchaseDate: "10/01/2023",
    voltage: "220v",
    
    items: [
      {
        id: "item-1",
        code: "S001",
        description: "Instalação de Ar Condicionado Split",
        quantity: 1,
        unitPrice: 350.00,
        total: 350.00
      },
      {
        id: "item-2",
        code: "P001",
        description: "Suporte para Condensadora",
        quantity: 1,
        unitPrice: 120.00,
        total: 120.00
      },
      {
        id: "item-3",
        code: "P002",
        description: "Kit Instalação (3m)",
        quantity: 1,
        unitPrice: 85.00,
        total: 85.00
      }
    ],
    
    partsCost: 205.00,
    laborCost: 350.00,
    waterproofingCost: 50.00,
    transportCost: 30.00,
    subtotal: 635.00,
    total: 635.00,
    notes: "Instalação com agendamento prévio. Garantia de 3 meses para o serviço.",
    status: "approved",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "CNPJ: 12.345.678/0001-99"
    }
  }
];
