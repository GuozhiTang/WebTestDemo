export class Probemap {
  className: String;
  moduleName: String;
  name: String;
  creator: {
    className: String;
      id: Number;
      moduleName: String;
      requested: Date;
      requestor_id: {
        active: Boolean;
        admin: Boolean;
        className: String;
        id: Number;
        manufacturing: Boolean;
        moduleName: String;
        name: String;
      }
      spec_id: {
        approver_id: any;
        className: String;
        description: String;
        id: Number;
        moduleName: String;
        name: String;
        sop_id: any;
      }
  }
  codemap_id: {
    className: String;
    description: String;
    id: Number;
    moduleName: String;
    name: String;
  }
  most_current: Number;
  id: Number;
}