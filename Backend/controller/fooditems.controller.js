const fooditems = require('../database/Schema/fooditems.schema');
const catchAsync = require('../utils/catch_async');

// methiods add to cart
module.exports.addItem = catchAsync( async function (req, res) {
    const restaurantemail = req.body.restaurantemail;
    const item = req.body.item;
    const price = req.body.price;

    const o= await fooditems.create({
        restaurantemail, price, item
    });

    res.status(200).json({
        status: 'success',
        message: 'item added to fooditems successfully',
      });
})

module.exports.removeItem = catchAsync( async function (req, res) {
    const restaurantemail = req.body.restaurantemail;
    const item = req.body.item;
    const price = req.body.price;

    const o= await fooditems.deleteOne({
        restaurantemail, price, item
    });

    res.status(200).json({
        status: 'success',
        message: 'item removed from fooditems successfully',
      });
})

module.exports.getItems = catchAsync( async function (req, res) {
    const fooditemslist= await fooditems.find();

    res.status(200).json({
        status: 'success',
        message: 'item added to cart successfully',
        list: fooditemslist
      });
})