'use strict';

// Start up DB Server

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./src/server.js');


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {

    server.startup(process.env.PORT);
  });

