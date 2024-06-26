const asyncHanlder = require('express-async-handler');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler.util');
const sendToken = require('../utils/sendToken.util');

const register = asyncHanlder(async(req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    // const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        user,
        // token
    });
    sendToken(user, 201, res);
});

const login = asyncHanlder(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    // Find the User in the database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next('Invalid email or password', 401);
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // const token = user.getJwtToken();

    sendToken(user, 200, res);
});

const logout = asyncHanlder(async(req, res) => {
    res.cookie('token'), '', {
        expires: new Date(Date.now()),
        httpOnly: true
    }

    res.status(200).json({ message:  'Logged out' });
});

// ----------- Logout --------------------
// const logout = asyncHanlder(async(req, res) => {
//     res.cookie('token', '', {
//         path: '/',
//         httpOnly: true,
//         expires: new Date(0),
//         sameSite: 'none',
//         secure: true
//     });

//     return res.status(200).json({ message: 'Logout Successful' })
// });
module.exports = { register, login, logout };