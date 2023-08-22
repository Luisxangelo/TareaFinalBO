const express = require('express');
const router = express.Router();

const mealMiddleware = require('../middlewares/meal.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');
const orderMiddleware = require('../middlewares/order.middleware');

router
  .route('/')
  .post(
    authMiddleware.protect,
    mealMiddleware.validMeal,
    orderController.createOrder
  );
router
  .route('/me')
  .get(
    authMiddleware.protectAccountOwner,
    orderMiddleware.validOrder,
    orderController.findUserIdOrders
  );

router
  .route('/:id')
  .patch(
    authMiddleware.protectAccountOwner,
    orderMiddleware.validOrder,
    orderController.updateOrder
  )
  .delete(
    authMiddleware.protectAccountOwner,
    orderMiddleware.validOrder,
    orderController.deleteOrder
  );

module.exports = router;
