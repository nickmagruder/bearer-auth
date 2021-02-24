'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users =  new  mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  };
  return jwt.sign(tokenObject, process.env.SECRET);
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hash(this.password, 10);
  }
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
};

// BEARER AUTH
users.statics.authenticateWithToken =  async  function (token) {
  console.log(process.env.SECRET);
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({ username: parsedToken.username });
    console.log(user);
    if (user) { return user; }
    throw new Error('User Not Found');
  } catch (e) {
    console.log(e.message, 'e.message xxxxxxx')
    throw new Error(e.message);
  }
};


module.exports = mongoose.model('users', users);
