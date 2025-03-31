
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
  serviceId?: string;  // Optional
  description: string; // Use this directly
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  date: string;
  customerId?: string;  // Optional
  customerName: string; // Required field for direct customer name entry
  customerAddress?: string; // Direct customer address entry
  customerPhone?: string; // Direct customer phone entry
  customerEmail?: string; // Direct customer email entry
  customer?: Customer;  // Optional
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: "draft" | "sent" | "approved" | "rejected";
}
