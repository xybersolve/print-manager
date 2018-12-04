export class ISize {
  _id?: any;
  ratio: string;
  size: string;
  sizeSort: number;
  volume: number;
  active?: boolean;
  owner?: string;
}
// aspect ratio as pulled from size collections
export class IAspectRatio {
  _id?: any;
  ratio: string;
  owner?: string;
}
/*
{ ratio: 1, size: 1, volume: 1, owner: 1, _id: 1}

ratio:"1:1"
size:"16 x 16"
sizeSort:256
volume:256
owner:"Greg Milligan"
*/
