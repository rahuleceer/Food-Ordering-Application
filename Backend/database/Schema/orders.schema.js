const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    item: {
      type: String,
      required: [true, 'item is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    },
    price: {
        type: String,
        required: [true, 'price is required']
    },
    process: {
        type: String,
        required: [true, 'process is required']   // [completed]
    }
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);


const order = model('orders', orderSchema);

module.exports = order;
