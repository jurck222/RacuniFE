export interface InvoiceItem {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: number;
  createdAt: Date;
  recipient: string;
  address: string;
  city: string;
  items: InvoiceItem[];
}
