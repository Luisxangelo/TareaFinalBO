const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/app.error');

exports.singUp = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'succes',
    message: 'the user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.roles,
    },
  });
});
exports.signIn = catchAsync(async (req, res, next) => {
  // Toma los datos
  const { email, password } = req.body;
  // valida usaurio y reisa si existe
  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'active',
    },
  });
  if (!user) {
    return next(new AppError(`user with email ${email} not found!`, 404));
  }
  // valida la contrasñea
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // genera el token
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'succes',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
