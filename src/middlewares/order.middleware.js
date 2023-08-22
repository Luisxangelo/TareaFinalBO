const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const User = require('../models/users.model');
const Meal = require('../models/meals.model');

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Meal,
      },
    ],
  });
  if (!order) {
    return next(new AppError(`order with id ${id} not found!`, 404));
  }
  req.order = order;
  req.user = order.user;
  req.meal = order.meal;
  next();
});
