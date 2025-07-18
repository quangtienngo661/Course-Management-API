const User = require("../models/User")
const hashPassword = require('../utils/hash_password');
const generateToken = require('../utils/jwt_sign');
const bcrypt = require('bcryptjs')

const userRegister = async (req, res) => {
    try {
        const userInfo = { ...req.body }

        if (!userInfo.email || !userInfo.password || !userInfo.username) {
            return res.status(400).json({ msg: "Missing required fields" })
        }

        const existingUser = await User.exists({ email: userInfo.email })
        if (existingUser) {
            return res.status(409).json({ msg: "Email existed" })
        }

        const hashedPassword = await hashPassword(userInfo.password);

        const createdUser = await User.create({
            username: userInfo.username,
            email: userInfo.email,
            password: hashedPassword, 
            role: userInfo.role
        })

        const userResponse = createdUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            msg: "Successfully created user",
            newUser: userResponse
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error creating user",
            error: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const userInfo = { ...req.body }

        if (!userInfo.email || !userInfo.password) {
            return res.status(400).json({ msg: "Missing required fields" })
        }

        const user = await User.findOne({ email: userInfo.email })
        if (!user) {
            return res.status(400).json({ msg: "Email or password's incorrect!" })
        }

        const isValidPassword = bcrypt.compareSync(userInfo.password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ msg: "Email or password's incorrect!" })
        }

        const token = await generateToken(user._id);
        if (!token) {
            return res.status(500).json({ msg: "Error generating token" })
        }

        return res.status(200).json({ token })

    } catch (error) {
        return res.status(500).json({
            msg: "Error login user",
            error: error.message
        })
    }
}

module.exports = { userRegister, userLogin }    