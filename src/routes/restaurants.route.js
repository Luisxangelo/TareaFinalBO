const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const reviewController = require('../controllers/review.controller');
const reviewMiddleware = require('../middlewares/reviewsMiddleware');

router
  .route('/')
  .get(restaurantController.findAllRestaurant)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.createRestaurant
  );

router

  .route('/:id')
  .get(
    restaurantMiddleware.validRestaurant,
    restaurantController.findOneRestaurant
  )
  .patch(
    restaurantMiddleware.validRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.validRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteRestaurant
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.validRestaurant,
  reviewController.createReview
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.validReview,
    restaurantMiddleware.validRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(authMiddleware.protectAccountOwner, reviewController.updateReview)
  .delete(authMiddleware.protectAccountOwner, reviewController.deleteReview);

module.exports = router;
