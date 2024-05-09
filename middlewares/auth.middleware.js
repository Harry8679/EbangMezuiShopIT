const ErrorHandler = require('../utils/errorHandler.util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const asyncHanlder = require('express-async-handler');

// Check if user is authenticated or not
const isAuthenticated = asyncHanlder(async(req, res, next) => {
    const { token } = req.cookies;

    console.log(token);

    if (!token) {
        return next(new ErrorHandler('Login first to success this resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    req.user = await User.findById(decoded.id);
    next();
});

module.exports = { isAuthenticated };