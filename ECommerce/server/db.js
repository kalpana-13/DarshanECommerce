const mongoose = require('mongoose');
require('dotenv').config();

MONGO_URI = process.env.MONGO_URI

const connectToDB = () => {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Connected to Database");
        })
        .catch((e) => {
            console.log("Error connecting to db", e)
        })
}

module.exports = connectToDB