const express = require('express');
const controller = require('../controller/fooditems.controller');
const authController = require('../controller/authorization.controller');

const Route = express.Router();

Route.post('/add_fooditem',controller.addItem);

Route.post('/remove_fooditem',controller.removeItem);

Route.post('/get_fooditems',controller.getItems);

module.exports = Route;
