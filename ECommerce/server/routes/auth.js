const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
require('dotenv').config();
const user = require('../models/user')
var jwt = require('jsonwebtoken');

// CreateUser API using POST method: Auth not required
router.post('/createuser', async (req, res) => {
    try {
        const userData = await user.create(req.body);
        const token = jwt.sign({ id: userData.id, role: userData.role }, process.env.JWT_SECRET_KEY); // Include role in the token

        res.status(200).json({
            alert: "Signed up successfully",
            userData,
            token
        });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({
                alert: "Email already exists",
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
});

// Login API using POST method: Auth not required
router.post('/login', async (req, res) => {
    try {
        const userData = await user.findOne({ email: req.body.email });

        if (!userData) {
            return res.status(400).json({
                alert: "Email id doesn't exist"
            });
        }

        if (userData.password === req.body.password) {
            const token = jwt.sign({ id: userData.id, role: userData.role }, process.env.JWT_SECRET_KEY); // Include role in token

            res.status(200).json({
                alert: "Login Successful",
                name: userData.name,
                role: userData.role, // Send the role in the response
                token
            });
            console.log("A user logged in...");
        } else {
            return res.status(404).json({
                alert: "Invalid password"
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "login api error: ",
            alert: error.message // Fixed typo here ('mmessage' -> 'message')
        });
    }
});

module.exports = router;
