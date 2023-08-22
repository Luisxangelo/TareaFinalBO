const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.model');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  await Review.create({ comment, rating, restaurantId: +id, userId: +uid });

  return res.status(200).json({
    status: 'success',
    messagge: 'Review create successfully',
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  const reviewUpdate = await review.update({});
  return res.status(200).json({
    status: 'success',
    messagge: 'review update successfully',
    reviewUpdate,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: false });

  return res.status(200).json({
    status: 'success',
    messagge: 'review delete successfully',
  });
});
