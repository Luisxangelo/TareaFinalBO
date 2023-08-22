const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const { db } = require('../database/config');

exports.findUserOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const user = User.findAll({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ['userId', 'id', 'totalPrice', 'quantity', 'role'],
        },
        include: [
          {
            model: Meal,
            attributes: ['name'],
          },
          {
            model: Restaurant,
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    results: user.length,
    user,
  });
});

exports.findUserIdOrders = catchAsync(async (req, res, next) => {
  const { uid } = req.sessionUser.id;
  const { id } = req.params;

  const order = Order.findOne({
    where: {
      id,
      userID: uid,
    },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ['userId', 'id', 'totalPrice', 'quantity', 'role'],
        },
        include: [
          {
            model: Meal,
            attributes: ['name'],
          },
          {
            model: Restaurant,
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    messagge: 'order retrieved successfully',
    order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;

  const price = await Meal.findOne({
    where: {
      id: mealId,
    },
    attributes: {
      include: ['price'],
    },
  });

  const totalPrice = quantity * price;

  const order = await Order.create({ quantity, mealId, totalPrice });

  return res.status(200).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  Order.findOne({
    where: {
      status: 'active',
    },
  });

  await order.update({ status: 'completed' });

  const orderUpdate = await order.update({});
  return res.status(200).json({
    status: 'success',
    messagge: 'order update successfully',
    orderUpdate,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  Order.findOne({
    where: {
      status: 'active',
    },
  });
  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    messagge: 'order delete successfully',
  });
});
