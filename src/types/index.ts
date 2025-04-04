
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
  code?: string;         // Item code
  serviceId?: string;    // Optional
  description: string;   // Use this directly
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  date: string;
  customerId?: string;      // Optional
  customerName: string;     // Required field for direct customer name entry
  customerAddress?: string; // Direct customer address entry
  customerPhone?: string;   // Direct customer phone entry
  customerEmail?: string;   // Direct customer email entry
  customerCity?: string;    // Customer city
  customerState?: string;   // Customer state
  
  // Equipment fields (all optional)
  deviceType?: string;      // Type of device/equipment
  deviceBrand?: string;     // Brand of the device
  deviceModel?: string;     // Model of the device
  deviceSerialNumber?: string; // Serial number
  purchaseDate?: string;    // Date of purchase
  voltage?: "110v" | "220v" | ""; // Voltage selection
  
  customer?: Customer;      // Optional
  items: QuoteItem[];
  
  // Cost breakdown
  partsCost: number;        // Total parts cost
  laborCost: number;        // Total labor cost
  waterproofingCost?: number; // Waterproofing cost (optional)
  transportCost?: number;   // Transport fee (optional)
  subtotal: number;
  tax?: number;             // Making tax optional
  total: number;
  
  notes: string;
  status: "draft" | "sent" | "approved" | "rejected";
  companyInfo?: {
    name: string;
    shortName: string;
    address: string;
    phone: string;
    email: string;
    taxId: string;
  };
}
