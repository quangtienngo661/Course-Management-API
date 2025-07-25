const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB's connected")
    } catch (error) {
        console.error("MongoDB connection error: ", err);
        process.exit(1)
    }
}

module.exports = connectDB;