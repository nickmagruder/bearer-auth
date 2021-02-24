'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    console.log('SIGNUP!?!? XXXXXXXXXXXX');
    let user = new User(req.body);
    console.log(user, 'user XXXXXXXXXXXX');
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    console.log(output, 'THIS IS OUTPUT XXXXXXXXXXXX');
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', bearerAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  console.log(user, 'THIS IS SIGNIN USER XXXXXXXXXXXX');
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area!');
});


module.exports = authRouter;
