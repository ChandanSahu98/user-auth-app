/**
 * @author: Chandan Sahu
 * @description: This Controller Handles User Creation/Registration/Signup and Login
 */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.create({ username, email, password });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    // Set as httpOnly cookie for session maintenance
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000
    })
        .status(200)
        .json({ message: "Logged in successfully", token });
};

exports.logout = async (req, res) => {
    try {
        //expired cookie after 5 secs
        res.cookie("token", "loggedout", {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax"
        });

        res.status(200).json({
            status: "success",
            message: "User logged out successfully"
        });
    } catch (error) {}
};
