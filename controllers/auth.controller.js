const asyncHanlder = require('express-async-handler');
const User = require('../models/user.model');

const register = asyncHanlder(async(req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(201).json({
        success: true,
        user
    });
});

module.exports = { register };