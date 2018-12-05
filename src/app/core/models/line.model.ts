export class ILine {
  _id?: number;
  description: string;
  name: string;
  owner: string;
  default: boolean;
  active: true;
}

export class ILineBrief {
  _id?: any;
  name: string;
  default: boolean;
  active: boolean;
}
