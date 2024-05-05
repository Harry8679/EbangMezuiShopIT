const mongoose = require('mongoose');
const products = require('./data.json');
const Product = require('../models/product.model');

// const connectDatabase = require('./config/database');
const connectDatabase = require('../config/database');
const dotenv = require('dotenv');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// Connecting to database
// connectDatabase();

const seedProducts = async () => {
    try {
        // await mongoose.connect(process.env.DB_LOCAL_URI);
        await connectDatabase();

        await Product.deleteMany();
        console.log('All Products are deleted successfully');

        await Product.insertMany(products);
        console.log('All products are inserted successfully');

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();