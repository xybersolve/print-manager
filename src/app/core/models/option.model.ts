export class IOptions {
  inventory: IInvoiceOptions;
  invoice: IInvoiceOptions;
  image: IImageOptions;
  line: ILineOptions;
  location: ILocationOptions;
  material: IMaterialOptions;
  size: ISizeOptions;
  aspectRatio: IAspectRatioOptions;
}

export class IInventory {
  locationDefault: string;
  actionDefault: string;
}

export class IInvoiceOptions {
  locationDefault: string;
  actionDefault: string;
}

export class IImageOptions {
  activeOnly: boolean;
  lineDefault: string;
}

export class ILineOptions {
  activeOnly: boolean;
}

export class ILocationOptions {
  activeOnly: boolean;
}

export class IMaterialOptions {
  activeOnly: boolean;
}

export class ISizeOptions {
  activeOnly: boolean;
}

export class IAspectRatioOptions {
  activeOnly: boolean;
}
