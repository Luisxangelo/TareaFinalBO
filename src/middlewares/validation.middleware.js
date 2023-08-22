const { body, validationResult } = require('express-validator');
const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),
  validFields,
];

exports.createUserVAlidation = [
  body('name').notEmpty().withMessage('name is requered'),
  body('email')
    .notEmpty()
    .withMessage('Email is requered')
    .isEmail()
    .withMessage('email must be a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must have a least 8 characteres')
    .matches(/[a-zA-Z]/)
    .withMessage('password must have contain a least one letter'),
  validFields,
];
exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name is Requered'),
  body('email').notEmpty().withMessage('Email is Required'),
  validFields,
];
exports.createMealsVAlidation = [
  body('name').notEmpty().withMessage('name is requered'),
  body('price')
    .notEmpty()
    .withMessage('price is requered')
    .withMessage('price must be a correct format'),
  validFields,
];
