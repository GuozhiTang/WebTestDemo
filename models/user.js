// create models for our users, hold all the fields
// fields: types of fields (name, password, email etc.), functions interacting with the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  // Attributes
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

// We want to use it outside
// model('the name of user')
// module.exports so that it can be used outside this file
const User = module.exports = mongoose.model('Userlog', UserSchema);

// Use function outside: search by id
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.addUser = function (newUser, callback) {
  newUser.save(callback);
}

module.exports.getUserByName = function(name, callback) {
  const query = {name: name}
  User.findOne(query, callback);
}

module.exports.getByDep = function (department, callback) {
  const query = {department: department}
  User.find(query, callback);
}

// // Use function outside: search by username
// module.exports.getUserByUsername = function(username, callback) {
//   // create this query (an object) for findOne()
//   const query = {username: username}
//   User.findOne(query, callback);
// }

// // create the addUser() function, especially the password hash part
// module.exports.addUser = function (newUser, callback) {
//   // Hash the password here
//   // generate a salt which is basiclly like a random key that use to hash the password
//   // www.npmjs.com
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       // take the password in newUser object and then make them into the hash
//       // Store hash in the password DB
//       if (err) throw err;
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if (err) throw err;
//     callback(null, isMatch);
//   });
// }