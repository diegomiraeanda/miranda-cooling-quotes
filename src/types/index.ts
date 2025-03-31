
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
  serviceId?: string;  // Now optional
  description: string; // Now we'll use this directly
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  date: string;
  customerId?: string;  // Now optional
  customerName: string; // New field for direct customer name entry
  customerAddress?: string; // New field for direct customer address entry
  customerPhone?: string; // New field for direct customer phone entry
  customerEmail?: string; // New field for direct customer email entry
  customer?: Customer;  // Now optional
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: "draft" | "sent" | "approved" | "rejected";
}
