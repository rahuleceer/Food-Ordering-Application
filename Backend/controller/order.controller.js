const order = require('../database/Schema/orders.schema');
const catchAsync = require('../utils/catch_async');


module.exports.itemOrdered = catchAsync( async function (req, res) {
    const email = req.body.email;
    const item = req.body.item;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const process = "completed";

    const o= await order.create({
        email, quantity, price, process, item
    });

    res.status(200).json({
        status: 'success',
        message: 'item deleviered successfully',
      });
});

