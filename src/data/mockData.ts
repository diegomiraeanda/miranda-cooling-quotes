
import { Customer, Quote, Service } from "../types";

export const customers: Customer[] = [
  {
    id: "1",
    name: "Empresa ABC Ltda.",
    address: "Av. Principal, 123, Centro",
    phone: "(11) 9999-8888",
    email: "contato@empresaabc.com"
  },
  {
    id: "2",
    name: "Restaurante Sabor Certo",
    address: "Rua das Flores, 456, Jardim",
    phone: "(11) 3333-2222",
    email: "admin@saborcerto.com"
  },
  {
    id: "3",
    name: "Supermercado Economia",
    address: "Av. Comercial, 789, Vila Nova",
    phone: "(11) 7777-6666",
    email: "compras@economia.com"
  }
];

export const services: Service[] = [
  {
    id: "1",
    description: "Manutenção preventiva em ar-condicionado split",
    price: 250
  },
  {
    id: "2",
    description: "Instalação de ar-condicionado split até 12000 BTUs",
    price: 450
  },
  {
    id: "3",
    description: "Limpeza de sistema de refrigeração comercial",
    price: 600
  },
  {
    id: "4",
    description: "Reparo em compressor",
    price: 800
  },
  {
    id: "5",
    description: "Recarga de gás refrigerante",
    price: 350
  },
  {
    id: "6",
    description: "Diagnóstico técnico",
    price: 150
  }
];

export const quotes: Quote[] = [
  {
    id: "1",
    number: "RM0001-23",
    date: "2023-12-10",
    customerId: "1",
    customerName: "Empresa ABC Ltda.",
    customerAddress: "Av. Principal, 123, Centro",
    customerPhone: "(11) 9999-8888",
    customerEmail: "contato@empresaabc.com",
    deviceType: "Ar-condicionado Split",
    deviceBrand: "LG",
    deviceModel: "Inverter 12000 BTUs",
    deviceSerialNumber: "LG123456789",
    voltage: "220v",
    customer: customers[0],
    items: [
      {
        id: "1",
        serviceId: "1",
        description: "Manutenção preventiva em ar-condicionado split",
        quantity: 3,
        unitPrice: 250,
        total: 750
      },
      {
        id: "2",
        serviceId: "5",
        description: "Recarga de gás refrigerante",
        quantity: 2,
        unitPrice: 350,
        total: 700
      }
    ],
    subtotal: 1450,
    tax: 145,
    total: 1595,
    notes: "Serviço agendado para 15/12/2023",
    status: "approved",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "CNPJ: 12.345.678/0001-99"
    }
  },
  {
    id: "2",
    number: "RM0002-23",
    date: "2023-12-15",
    customerId: "2",
    customerName: "Restaurante Sabor Certo",
    customerAddress: "Rua das Flores, 456, Jardim",
    customerPhone: "(11) 3333-2222",
    customerEmail: "admin@saborcerto.com",
    deviceType: "Freezer Comercial",
    deviceBrand: "Metalfrio",
    deviceModel: "VF55D",
    deviceSerialNumber: "MF987654321",
    voltage: "110v",
    customer: customers[1],
    items: [
      {
        id: "1",
        serviceId: "3",
        description: "Limpeza de sistema de refrigeração comercial",
        quantity: 1,
        unitPrice: 600,
        total: 600
      }
    ],
    subtotal: 600,
    tax: 60,
    total: 660,
    notes: "Cliente solicitou urgência",
    status: "sent",
    companyInfo: {
      name: "Refrigeração Miranda",
      shortName: "RM",
      address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
      phone: "(00) 9999-8888",
      email: "contato@refrigeracaomiranda.com.br",
      taxId: "CNPJ: 12.345.678/0001-99"
    }
  },
  {
    id: "3",
    number: "RM0003-23",
    date: "2023-12-20",
    customerId: "3",
    customerName: "Supermercado Economia",
    customerAddress: "Av. Comercial, 789, Vila Nova",
    customerPhone: "(11) 7777-6666",
    customerEmail: "compras@economia.com",
    deviceType: "Câmara Fria",
    deviceBrand: "Danfoss",
    deviceModel: "CF-2000",
    deviceSerialNumber: "DF123987456",
    voltage: "220v",
    customer: customers[2],
    items: [
      {
        id: "1",
        serviceId: "4",
        description: "Reparo em compressor",
        quantity: 1,
        unitPrice: 800,
        total: 800
      },
      {
        id: "2",
        serviceId: "6",
        description: "Diagnóstico técnico",
        quantity: 1,
        unitPrice: 150,
        total: 150
      }
    ],
    subtotal: 950,
    tax: 95,
    total: 1045,
    notes: "Garantia de 6 meses para o serviço",
    status: "draft",
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
