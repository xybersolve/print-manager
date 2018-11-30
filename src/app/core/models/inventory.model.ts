
export class IInventoryItem {
  material: string;
  size: string;
  title: string;
}

export class IInventory {
  location: string;
  date: string;
  items: IInventoryItem[];
}
