const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
