/*
 * @Description: Model for Workorder
 * @Author: Guozhi Tang
 * @Date: 2019-07-24 10:50:13
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-07-24 10:50:13
 */
export class Workorder {
  index: BigInteger;
  antibodyName: String;
  antibodyType: String;
  internalId: String;
  cloneId: String;
  lotNum: String;
  antibodyBarcode: String;
  antibodyMatrixBarcode: String;
  match: Boolean;
  msg: String;
}