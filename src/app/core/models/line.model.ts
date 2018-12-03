export class ILine {
  _id?: number;
  description: string;
  name: string;
  owner: string;
  default: boolean;
  active: true;
  sortOrder: number;
}

export class ILineBrief {
  _id?: any;
  name: string;
  owner?: string;
  default?: boolean;
}
