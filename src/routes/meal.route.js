const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

router
  .route('/:id')
  .post(
    authMiddleware.restrictTo('admin'),
    validationMiddleware.createMealsVAlidation,
    mealController.createMeal
  );

router.route('/').get(mealController.findAllMeal);

router.route('/:id').get(mealMiddleware.validMeal, mealController.findOneMeal);

router

  .route('/:id')
  .patch(
    mealMiddleware.validMeal,
    authMiddleware.restrictTo('admin'),
    mealController.updateMeal
  )
  .delete(
    mealMiddleware.validMeal,
    authMiddleware.restrictTo('admin'),
    mealController.deleteMeal
  );

module.exports = router;
