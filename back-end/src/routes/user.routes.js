const { Router } = require('express');

const userController = require('../controller/user.controller');
const { tokenAdminAuthorization } = require('../middlewares/admin.JwtAuthentication');
const { tokenAuthorization } = require('../middlewares/JwtAuthentication');
const { verifyEmail, verifyName, verifyPassword } = require('../middlewares/user.validation');

const route = Router();

route.post(
  '/register',
  tokenAdminAuthorization,
  verifyEmail,
  verifyName,
  verifyPassword,
  userController.createUser,
);

route.post('/login', verifyEmail, verifyPassword, userController.loginUser);
route.get('/all', tokenAuthorization, userController.findUsers);
route.delete('/:id', tokenAuthorization, userController.deleteUser);

module.exports = route;