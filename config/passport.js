/*
 * @Description: Configuration for passport
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:08:48
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../models/user');
const Operator = require('../models/operator');
const config = require('../config/database');

module.exports = function (passport) {
  let opts = {};
  // Error: ExtractJwt.fromAuthHeader is not a function
  // https://github.com/bradtraversy/meanauthapp/issues/9
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // It is very important to see what the jwt_payload is first and then we can get _id correctly!!!
    console.log(jwt_payload);
    Operator.getById(jwt_payload.data._id, (err, operator) => {
      if (err) {
        return done(err, false);
      }
      if (operator) {
        return done(null, operator);
      } else {
        return done(null, false);
      }
    });
    // User.getUserById(jwt_payload.data._id, (err, user) => {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //   }
    // });
  }));
}