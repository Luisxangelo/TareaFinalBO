const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.model');
const User = require('../models/users.model');

exports.validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  if (!review) {
    return next(new AppError(`Review with id ${id} not found!`, 404));
  }
  req.review = review;
  req.user = review.user;
  next();
});
