const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");

const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.user.id); // USE req.user later

        if (!course || !user) {
            console.log(course, user)
            return res.status(404).json({ msg: "User or course doesn't exist!" })
        }

        const existingEnrollment = await Enrollment.findOne({
            user: user._id,
            course: course._id
        });
        if (existingEnrollment) {
            console.log(existingEnrollment)
            return res.status(409).json({ msg: "This student already enrolled this course" });
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
        res.status(500).json({ msg: "Error enrolling course", error: error.message });
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

        if (!enrolledCourses || enrolledCourses.length === 0) {
            return res.status(404).json({ msg: "No enrollments found!" })
        }

        return res.status(200).json(enrolledCourses)
    } catch (error) {
        res.status(500).json({ msg: "Error getting enrolled courses", error: error.message });
    }
}


module.exports = { enrollCourse, getEnrollments }
