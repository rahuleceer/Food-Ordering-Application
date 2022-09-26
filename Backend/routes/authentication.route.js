const express = require('express');
const controller = require('../controller/authentication.controller');
const authController = require('../controller/authorization.controller');

const authRoute = express.Router();

authRoute.post('/sign_up_user',controller.singUpUser);

authRoute.post('/sign_in_user',controller.loginUser);

authRoute.post('/sign_up_rest',controller.singUpRestaurant);

authRoute.post('/sign_in_rest',controller.loginRestaurant);

authRoute.route('/whoami').post(authController.whoami);

module.exports = authRoute;
