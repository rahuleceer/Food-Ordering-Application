const express = require('express');
const controller = require('../controller/authentication.controller');
const authController = require('../controller/authorization.controller');

const authRoute = express.Router();

authRoute.route('/sign_up_user').post(controller.singUpUser);

authRoute.route('/sign_in_user').post(controller.loginUser);

authRoute.route('/sign_up_rest').post(controller.singUpRestaurant);

authRoute.route('/sign_in_rest').post(controller.loginRestaurant);

authRoute.route('/whoami').get(authController.whoami);

module.exports = authRoute;
