const mongoose = require('mongoose');
//const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const restaurantSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [20, 'Name must be at most 20 characters'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
      },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [3, 'Password must be at least 3 characters'],
      maxlength: [255, 'Password must be at most 255 characters'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      minlength: [3, 'Confirm Password must be at least 3 characters'],
      maxlength: [255, 'Confirm Password must be at most 255 characters'],
      validate: {
        validator: function (value) {
          //` this is targeting the document which is getting saved to
          //` value is the "value" of current field i.e. confirmPassword
          return this.password === value;
        },
        message: 'Password and Confirm Password must be the same',
      },
    },
  },
  {
    timestamps: true,
    collection: 'user',
  }
);

restaurantSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }

  next();
});

// restaurantSchema.methods.generateOTP = async function () {
//   this.OTP = Math.floor(Math.random() * 1000000);
//   this.OTPExpiry = new Date(Date.now() + 1000000);

//   await this.save({ validateBeforeSave: false });
// };

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
