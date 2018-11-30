export class IInvoice {
  id: number | undefined;
  location: string | undefined;
  date: string | undefined;
  items: IInvoiceItem[];
}

export class IInvoiceItem {
  id: number | undefined;
  invoiceId: number | undefined;
  name: string;
  location: string;
  material: string;
  size: string;
}
