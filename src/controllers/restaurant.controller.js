const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurants.model');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({ name, address, rating });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant created successfully',
    restaurant,
  });
});

exports.findAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'true',
    results: restaurants.length,
    restaurants,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    messagge: 'restaurant retrieved successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  const restaurantUpdate = await restaurant.update({});
  return res.status(200).json({
    status: 'success',
    messagge: 'restaurant update successfully',
    restaurantUpdate,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurant.update({ status: 'delete' });

  return res.status(200).json({
    status: 'success',
    messagge: 'restaurant delete successfully',
  });
});
