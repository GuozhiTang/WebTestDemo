/*
 * @Description: Model for Request Status
 * @Author: Guozhi Tang
 * @Date: 2019-07-24 10:50:13
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:44:45
 */
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
  requestor_id: {
    moduleName: String;
    name: String;
    admin: Boolean;
    className: String;
    active: Boolean;
    manufacturing: Boolean;
    id: Number;
  }
  dept_spec: Object;
  className: String;
  moduleName: String;
  completed_op: Object;
}