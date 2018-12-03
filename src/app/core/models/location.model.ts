export class ILocation {
  _id?: any;
  name: string;
  commission: number;
  useCommision: boolean;
  location?: string; // deprecated
  owner: string;
  sortOrder: number;
  useAddress: boolean;
  address?: string;
  state?: string;
  postalCode?: string;
  email: string;
  notifyEmail: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  notifyPhone: boolean;
  active: boolean;
}

export class ILocationBrief {
  _id?: any;
  name: string;
  email: string;
  commision: number;
  owner: string;
}
