const asyncHanlder = require('express-async-handler');
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler.util');

const register = asyncHanlder(async(req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    // const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        user,
        // token
    });
});

const login = asyncHanlder(async(req, res, next) => {
    res.send('Login');
});

module.exports = { register, login };