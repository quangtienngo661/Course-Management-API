const User = require('../models/User')

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(200).json({ userProfile: user })
    } catch (error) {
        return res.status(500).json({
            msg: "Error getting user's profile",
            error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');

        if (!allUsers) {
            return res.status(404).json({ msg: "Error returning all users" })
        }

        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error getting all users",
            error: error.message
        })
    }
}

module.exports = { getProfile, getAllUsers }