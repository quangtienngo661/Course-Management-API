const User = require('../models/User')

const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return next(new Error(404, "User not found"))
        }

        return res.status(200).json({ userProfile: user })
    } catch (error) {
        return next(new Error(500, "Error getting user's profile"))
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');

        if (!allUsers) {
            return next(new Error(404, "Error returning all users"))
        }

        return res.status(200).json(allUsers);
    } catch (error) {
        return next(new Error(500, "Error getting all users"))
    }
}

module.exports = { getProfile, getAllUsers }