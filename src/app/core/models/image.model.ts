export class IImage {
  _id?: any; // default new books at 0, server will update when creating
  active = true;
  fileStub: string;
  line: string;
  name: string;
  owner = 'Greg Milligan'; // default owner for now
  tags?: string[];
}

/*
export class Image implements IImage {
  constructor(
    public _id,
    public active = true,
    public fileStub,
    public line,
    public name,
    public owner = 'Greg Milligan',
    public tags
  ) {

  }
}
*/
