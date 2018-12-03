export class IInvoice {
  _id?: number | undefined;
  location: string | undefined;
  date: any | undefined;
  commission?: number | undefined;
  action: string | undefined;
  owner: string | undefined;
  items: IInvoiceItem[] ;
}

export class IInvoiceItem {
  _id?: number | undefined;
  invoiceId?: number | undefined;
  location?: string | undefined;
  date: any | undefined;
  owner: string | undefined;
  name: string | undefined;
  material: string | undefined;
  action: string | undefined;
  size: string | undefined;
}
