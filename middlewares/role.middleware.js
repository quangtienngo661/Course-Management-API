const Course = require("../models/Course");
const User = require("../models/User");

const authorize = (...roles) => {
    return async (req, res, next) => {
        // console.log(req.user.role)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({msg: "User not found"})
        }
        console.log(user.role)
        console.log(roles, !roles.includes(user.role))
        if (!roles.includes(user.role)) {
            return res.status(403).json({ msg: "You are not allowed to perform this action!" })
        }
        next();
    }
}

const checkCourseOwnership = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({msg: "User not found"})
        }

        // Allow if user is owner or admin
        if (course.createdBy.toString() === req.user.id || user.role === 'admin') {
            req.course = course; // Pass course to controller
            return next();
        }

        return res.status(403).json({ msg: "You cannot modify others' courses" });
    } catch (error) {
        return res.status(500).json({ msg: "Error checking ownership", error: error.message });
    }
};

module.exports = { authorize, checkCourseOwnership }
