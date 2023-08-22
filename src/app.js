const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');

const userRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/restaurants.route');
const mealRoutes = require('./routes/meal.route');
const ordersRoutes = require('./routes/order.route');

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
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', ordersRoutes);

app.all('*', (req, res, next) => {
  return next(new AppError(`can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHander);

module.exports = app;
