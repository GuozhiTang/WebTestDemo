/*
 * @Description: Model for Instrument
 * @Author: Guozhi Tang
 * @Date: 2019-07-24 10:50:13
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:43:19
 */
export class Instrument {
  className: String;
  moduleName: String;
  short: String;
  spec_id: {
    className: String;
    id: Number;
    manufacturer: String;
    model: String;
    moduleName: String;
    type: String;
  };
  id: Number;
}