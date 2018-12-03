
export class IInventoryItem {
  _id?: any;
  date: string;
  action: string;
  location: string;
  material: string;
  name: string;
  size: string;
  owner: string;
}

export class IInventory {
  _id?: any;
  location: string;
  date: string;
  items: IInventoryItem[];
  owner: string;
}
/*
_id:5c0332e6407dc5462129fe63
location:"Many Hands Gallery"
date:"2018-12-02"
owner:"Greg Milligan"
action:"Delivered"
material:"Metal Print"
name:"A Cattail Sunset"
size:"12 x 18"
*/
