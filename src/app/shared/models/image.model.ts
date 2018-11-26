export class IImage {
  _id = 0; // default new books at 0, server will update when creating
  active: boolean;
  fileStub: string;
  line: string;
  name: string;
  owner = 'Greg Milligan'; // default owner for now
  tags: string[];
}
