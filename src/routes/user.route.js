const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validationMiddelware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');
const { route } = require('../app');

router.post(
  '/login',
  validationMiddelware.loginUserValidation,
  authController.signIn
);
router.post(
  '/signup',
  validationMiddelware.createUserVAlidation,
  validationMiddelware.loginUserValidation,
  authController.singUp
);
router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.validUser)
  .route('/:id')
  .patch(validationMiddelware.updateUserValidation, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
