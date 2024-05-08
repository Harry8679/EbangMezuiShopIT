const asyncHanlder = require('express-async-handler');
const User = require('../models/user.model');

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

module.exports = { register };