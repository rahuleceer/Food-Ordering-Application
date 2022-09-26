const User = require('../database/Schema/user.schema');
const Restaurant = require('../database/Schema/restaurant.schema');
const _Error = require('../utils/_Error');
const catchAsync = require('../utils/catch_async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// const sendMail = require('../utils/send_mail');

module.exports.singUpUser = catchAsync(async (req, res, next) => {
  const { Name, email, password, confirmPassword, phone} = req.body;

  //console.log("----->",req.body);

  //   if (password !== confirmPassword) {
  //     return next(new _Error('Passwords do not match 😁😁', 400));
  //   }
  console.log("----->",req.body);
  const user = await User.create({
    Name,
    email,
    password,
    confirmPassword,
    phone,
  });

  const token = jwt.sign(
    {
      id: user._id,
      Name: user.Name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );

  console.log("----->",token);

  res.cookie('authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user
  });
});

module.exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new _Error('Please provide email and password', 400));
  }

  const user = await User.findOne({
    email,
  }).select('+password');


  //# just to fix
  // if (password === user.password) {
  //   //  ? password is correct but it is not hashed

  //   user.password = await bcrypt.hash(this.password, 12);

  //   await user.save();
  // }


  // ! switch to invalid email or password error

  if (!user) {
    res.status(400).json({
      user: null,
      token: null
    })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({
      user: null,
      token: null
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      Name: user.Name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );

  // # EXPLAIN THE BELOW LINE
  res.cookie('authorization', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
    user
  });
});

module.exports.singUpRestaurant = catchAsync(async (req, res, next) => {
    const { Name, email,address, password, confirmPassword, phone} = req.body;
  
    //console.log("----->",req.body);
  
    //   if (password !== confirmPassword) {
    //     return next(new _Error('Passwords do not match 😁😁', 400));
    //   }
  
    const user = await Restaurant.create({
      Name,
      email,
      address,
      password,
      confirmPassword,
      phone
    });
  
    const token = jwt.sign(
      {
        id: user._id,
        Name: user.Name,
        email: user.email,
        address: user.address,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );
  
    res.cookie('authorization', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      token,
      user
    });
  });
  
  module.exports.loginRestaurant = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        user: null,
        token: null
      })
    }
  
    const user = await Restaurant.findOne({
      email,
    }).select('+password');
  
  
    //# just to fix
    // if (password === user.password) {
    //   //  ? password is correct but it is not hashed
  
    //   user.password = await bcrypt.hash(this.password, 12);
  
    //   await user.save();
    // }
  
  
    // ! switch to invalid email or password error
  
    if (!user) {
      res.status(400).json({
        user: null,
        token: null
      })
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      res.status(400).json({
        user: null,
        token: null
      })
    }
  
    const token = jwt.sign(
      {
        id: user._id,
        Name: user.Name,
        email: user.email,
        address: user.address,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );
  
    // # EXPLAIN THE BELOW LINE
    res.cookie('authorization', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token,
      user
    });
  });
  

