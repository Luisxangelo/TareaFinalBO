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
  const { id } = req.sessionUser;
  const { idorder } = req.params;

  const [rows, fields] = await db.query(query, {
    replacements: { id, idorder: idorder },
  });
  return res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    post: rows,
  });
});
