/*
 * @Description: Model for Probe
 * @Author: Guozhi Tang
 * @Date: 2019-07-24 10:50:13
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-07-24 10:50:13
 */
export class Probe {
  className: String;
  moduleName: String;
  code: {
    className: String;
    codemap_id: {
      className: String;
      description: String;
      id: Number;
      moduleName: String;
      name: String;
    }
    col: Number;
    id: Number;
    moduleName: String;
    row: Number;
  }
  map_id: {
    className: String;
    codemap_id: {
      className: String;
      description: String;
      id: Number;
      moduleName: String;
      name: String;
    }
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
    id: Number;
    moduleName: String;
    most_current: Number;
    name: String;
  }
  probe_id: {
    className: String;
    ffid: String;
    id: Number;
    label_end: String;
    mir_name: String;
    mir_seq: String;
    mirbase_id: any;
    moduleName: String;
    operator_id: {
      active: Boolean;
      admin: Boolean;
      className: String;
      id: Number;
      manufacturing: Boolean;
      moduleName: String;
      name: String;
    }
    order_date: Date;
    order_name: String;
    project: String;
    qc: Boolean;
  }
  label: String;
  id: Number;
}