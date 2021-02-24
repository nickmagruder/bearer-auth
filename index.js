'use strict';

const server = require('./src/server.js');
require('dotenv').config();
const mongoose = require('mongoose');


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(process.env.MONGODB_URI, options).then(() => {
  server.startup(process.env.PORT);
}).catch(e => console.error('could not start server', e.message));

