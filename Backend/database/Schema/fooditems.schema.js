const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const itemSchema = new Schema(
  {
    restaurantemail: {
        type: String,
        required: [true, 'restaurantemail is required'],
        unique: true,
        lowercase: true,
      },
    item: {
      type: String,
      required: [true, 'item is required'],
    },
    price: {
        type: String,
        required: [true, 'price is required']
    }
  },
  {
    timestamps: true,
    collection: 'fooditems',
  }
);


const fooditems = model('fooditems', itemSchema);

module.exports = fooditems;
