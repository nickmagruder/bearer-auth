'use strict';

// const users = require('../models/users.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('Invalid Login');}

  const token = req.headers.authorization.split(' ').pop();
  
  try {
    const validUser = jwt.verify(token, process.env.SECRET);
    if(validUser) {
      req.user = validUser;
      req.token = validUser.token;
      next();
    } else {
      next('Invalid User');
    }
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};