const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utilis/error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const register = async (req, res, next) => {
  const { username, email, address, password } = req.body;
  try {
    const found = await User.findOne({ email });
    if (found) {
      return next(errorHandler(401, "User already exists!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      address,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    if (!savedUser) {
      return next(errorHandler(500, "Failed to register user"));
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Enter details carefully"));
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(200).json({
        success: false,
        message: 'User not registered',
      });
    }

    const matched = await bcrypt.compare(password, findUser.password);
    if (!matched) {
      return res.status(200).json({
        success: false,
        message: 'Password not matched',
      });
    }

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );

    const { password: _, ...rest } = findUser._doc;

    return res
      .cookie('token', token, {
        path: ' /',
        httpOnly: false,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        rest,
        message: 'User logged in successfully',
      });
  } catch (err) {
    return next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie('token', {
    secure: true,
    sameSite: isProduction ? 'None' : 'Lax',
  }).json({
    success: true,
    message: 'Logged out successfully',
  });
};

const authV = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ authenticated: false });
    req.user = user;
    return res.status(202).json({ authenticated: true });
  });
};

module.exports = {
  register,
  login,
  logout,
  authV,
};
