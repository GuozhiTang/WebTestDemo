export class OperatorDept {
  moduleName: String;
  className: String;
  enabled: Boolean;
  dept_spec: {
    id: Number;
    className: String;
    moduleName: String;
    name: String;
    description: String;
  }
  id: Number;
  operator_id: {
    id: Number;
    name: String;
    active: Boolean;
    manufacturing: Boolean;
    admin: Boolean;
    className: String;
    moduleName: String;
  }
}