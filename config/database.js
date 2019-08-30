/*
 * @Description: Configuration for databse related
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:08:31
 */
// Set up the mongodb
module.exports = {
  database: 'mongodb://localhost:27017/fptest',
  // database: 'mongodb+srv://guozhi:12345@guozhimongo-4p5ba.mongodb.net/Bio-WebApp?retryWrites=true&w=majority',
  // Here we put our secret for our token
  secret: 'yoursecret'
}