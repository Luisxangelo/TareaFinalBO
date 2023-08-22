const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const { db } = require('../database/config');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  const userUpdate = await user.update({});
  return res.status(200).json({
    status: 'success',
    messagge: 'user update successfully',
    userUpdate,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'delete' });

  return res.status(200).json({
    status: 'success',
    messagge: 'user delete successfully',
  });
});
