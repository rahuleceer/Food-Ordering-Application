const express = require('express');
const controller = require('../controller/order.controller');
const authController = require('../controller/authorization.controller');

const Route = express.Router();

Route.route('/order_completed').post(controller.itemOrdered);

module.exports = Route;
