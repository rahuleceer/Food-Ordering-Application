const express = require('express');
const controller = require('../controller/restaurant.controller');


const Route = express.Router();

Route.post('/get_restaurants',controller.restaurantsList);


module.exports = Route;
