const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const { db } = require('../database/config');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = Meal.create({ name, price, restaurantId: +id });

  return res.status(200).json({
    status: 'success',
    messagge: 'Meal create successfully',
    meal,
  });
});

exports.findAllMeal = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'true',
    results: meals.length,
    meals,
  });
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  return res.status(200).json({
    status: 'true',
    results: meal.length,
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  const mealUpdate = await meal.update({});
  return res.status(200).json({
    status: 'success',
    messagge: 'meal update successfully',
    mealUpdate,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: 'delete' });

  return res.status(200).json({
    status: 'success',
    messagge: 'meal delete successfully',
  });
});
