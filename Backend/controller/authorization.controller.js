const _Error = require('../utils/_Error');
const User = require('../database/Schema/user.schema');
const Restaurant = require('../database/Schema/restaurant.schema');
const catchAsync = require('../utils/catch_async');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//! get the token from header or cookies
//! Check if the token is starting with Bearer
//! if yes then remove it before decoding

module.exports.authenticate = catchAsync(async (req, res, next) => {
  let token= req.body.token;

  if (!token) {
    res.status(400).json({
      user: null,
      token: null
    })
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(400).json({
      user: null,
      token: null
    })
  }
  let user;
  if(decoded.role!='restaurant')
     user = await User.findById(decoded.id);
 else
     user = await Restaurant.findById(decoded.id);

  req.user = user;
  
  next();
});

module.exports.whoami = catchAsync(async (req, res, next) => {
  let token= req.header.token;

  if (!token) {
    res.status(200).json({
      status: 'success',
      isvalid: false,
    });
  }

  _(token);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(200).json({
      status: 'success',
      isvalid: false,
    });
  }

  //const user = await User.findById(decoded.id);

  res.status(200).json({
    status: 'success',
    isvalid: true,
  });
});
