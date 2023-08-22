const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meals.model');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!meal) {
    return next(new AppError(`meal with id ${id} not found!`, 404));
  }
  req.meal = meal;
  next();
});
