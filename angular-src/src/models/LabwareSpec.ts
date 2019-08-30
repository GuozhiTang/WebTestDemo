/*
 * @Description: Model for LabwareSpec
 * @Author: Guozhi Tang
 * @Date: 2019-07-24 10:50:13
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:43:40
 */
export class LabwareSpec {
  className: String;
  moduleName: String;
  map_id: {
    id: Number;
    name: String;
    description: String;
    moduleName: String;
    className: String;
  }
  name: String;
  description: String;
  material: String;
  volume: String;
  cat_num: String;
  manufacturer: String;
  id: String;
}