
export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Service {
  id: string;
  description: string;
  price: number;
}

export interface QuoteItem {
  id: string;
  serviceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  date: string;
  customerId: string;
  customer: Customer;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: "draft" | "sent" | "approved" | "rejected";
}
