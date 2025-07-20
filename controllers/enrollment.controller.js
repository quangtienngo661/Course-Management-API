const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");

const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.user.id); // USE req.user later

        if (!course || !user) {
            console.log(course, user)
            return next(new Error(404, "User or course doesn't exist!"));
        }

        const existingEnrollment = await Enrollment.findOne({
            user: user._id,
            course: course._id
        });
        if (existingEnrollment) {
            console.log(existingEnrollment)
            return next(new Error(409, "This student already enrolled this course"));
        }

        const newEnrollment = await Enrollment.create({
            user: user._id,
            course: course._id
        })

        const populatedEnrollment = await Enrollment.findById(newEnrollment._id)
            .populate('user')
            .populate('course');

        return res.status(201).json({
            msg: "Successfully add new enrollment",
            newEnrollment: populatedEnrollment
        })
    } catch (error) {
        return next(new Error(500, "Error enrolling course"))
    }
}

const getEnrollments = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // req.user.id
        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist!" })
        }

        const enrolledCourses = await Enrollment.find({ user: user._id })
            .populate('course')
            .populate('user');

        // if (!enrolledCourses || enrolledCourses.length === 0) {
        //     return res.status(200).json({ msg: "No enrollments found!" })
        // }

        return res.status(200).json(enrolledCourses)
    } catch (error) {
        return next(new Error(500, "Error getting enrolled courses"))
    }
}


module.exports = { enrollCourse, getEnrollments }
