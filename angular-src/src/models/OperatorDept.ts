/*
 * @Description: Model for OperatorDept
 * @Author: Guozhi Tang
 * @Date: 2019-08-06 15:01:27
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:44:10
 */
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