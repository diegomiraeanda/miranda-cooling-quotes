
import { Quote } from "@/types";

// Mock quote data
export const quotes: Quote[] = [
  {
    id: "quote-1",
    number: "ORC-1001",
    date: "2025-04-01",
    customerId: "cust-1",
    customerName: "João Silva",
    customerAddress: "Rua das Flores, 123",
    customerPhone: "(11) 98765-4321",
    customerEmail: "joao.silva@email.com",
    customerCity: "São Paulo",
    customerState: "SP",
    
    deviceType: "Ar Condicionado Split",
    deviceBrand: "LG",
    deviceModel: "Inverter Q/F 12000 BTUs",
    deviceSerialNumber: "LG12345678",
    purchaseDate: "2023-05-15",
    voltage: "220v",
    
    items: [
      {
        id: "item-1",
        code: "GAS-001",
        description: "Recarga de gás refrigerante R410A",
        quantity: 1,
        unitPrice: 180.00,
        total: 180.00
      },
      {
        id: "item-2",
        code: "SERV-001",
        description: "Mão de obra para manutenção preventiva",
        quantity: 1,
        unitPrice: 120.00,
        total: 120.00
      }
    ],
    
    partsCost: 180.00,       // Added missing property
    laborCost: 120.00,       // Added missing property
    transportCost: 50.00,
    waterproofingCost: 80.00,
    subtotal: 430.00,
    total: 430.00,           // Removed tax from calculation
    
    notes: "Cliente relatou baixa refrigeração. Verificar possível vazamento.",
    status: "approved",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "12.345.678/0001-99"
    }
  },
  {
    id: "quote-2",
    number: "ORC-1002",
    date: "2025-04-02",
    customerId: "cust-2",
    customerName: "Maria Santos",
    customerAddress: "Av. Brasil, 456",
    customerPhone: "(11) 91234-5678",
    customerEmail: "maria.santos@email.com",
    customerCity: "Rio de Janeiro",
    customerState: "RJ",
    
    deviceType: "Geladeira",
    deviceBrand: "Brastemp",
    deviceModel: "Frost Free 400L",
    deviceSerialNumber: "BRM45XYZ",
    purchaseDate: "2022-08-10",
    voltage: "110v",
    
    items: [
      {
        id: "item-3",
        code: "COMP-001",
        description: "Compressor novo",
        quantity: 1,
        unitPrice: 550.00,
        total: 550.00
      },
      {
        id: "item-4",
        code: "SERV-002",
        description: "Substituição de compressor",
        quantity: 1,
        unitPrice: 250.00,
        total: 250.00
      }
    ],
    
    partsCost: 550.00,       // Added missing property
    laborCost: 250.00,       // Added missing property
    subtotal: 800.00,
    total: 800.00,           // Removed tax from calculation
    
    notes: "Geladeira não refrigera. Compressor com defeito.",
    status: "sent",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "12.345.678/0001-99"
    }
  },
  {
    id: "quote-3",
    number: "ORC-1003",
    date: "2025-04-03",
    customerId: "cust-3",
    customerName: "Pedro Oliveira",
    customerAddress: "Rua Ipiranga, 789",
    customerPhone: "(11) 97777-8888",
    customerEmail: "pedro.oliveira@email.com",
    customerCity: "Belo Horizonte",
    customerState: "MG",
    
    deviceType: "Freezer",
    deviceBrand: "Consul",
    deviceModel: "Horizontal 500L",
    deviceSerialNumber: "CHN50ABC",
    purchaseDate: "2021-11-20",
    voltage: "220v",
    
    items: [
      {
        id: "item-5",
        code: "TERM-001",
        description: "Termostato",
        quantity: 1,
        unitPrice: 120.00,
        total: 120.00
      },
      {
        id: "item-6",
        code: "SERV-003",
        description: "Instalação de termostato",
        quantity: 1,
        unitPrice: 80.00,
        total: 80.00
      }
    ],
    
    partsCost: 120.00,       // Added missing property
    laborCost: 80.00,        // Added missing property
    subtotal: 200.00,
    total: 200.00,           // Removed tax from calculation
    
    notes: "Freezer não mantém temperatura. Termostato com defeito.",
    status: "draft",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "12.345.678/0001-99"
    }
  }
];
