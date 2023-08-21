const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');

const userRoutes = require('./routes/user.route');

const globalErrorHander = require('./controllers/error.controller');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHander);

module.exports = app;
