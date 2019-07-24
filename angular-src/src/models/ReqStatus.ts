export class ReqStatus {
  requested: String;
  status_op: {
    comment: String;
    requested: String;
    moduleName: String;
    requestor_id: {
      moduleName: String;
      name: String;
      admin: Boolean;
      className: String;
      active: Boolean;
      manufacturing: Boolean;
      id: Number;
    }
    className: String;
    spec_id: {
      moduleName: String;
      description: String;
      approver_id: Number;
      name: String;
      className: String;
      sop_id: Number;
      id: Number;
    }
    id: Number;
  }
  requestor_id: Object;
  dept_spec: Object;
  className: String;
  moduleName: String;
  completed_op: Object;
}