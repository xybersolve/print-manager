export class ILocation {
  _id: number;
  commission: number;
  useCommision: boolean;
  location: string;
  owner: string;
  sortOrder: number;
  address: string;
  state: string;
  postalCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  active: boolean;
}

export class ILocationBrief {
  _id: number;
  location: string;
  email: string;
  commision: number;
}
