const Course = require('../models/Course')

const createCourse = async (req, res) => {

    /**
    const courseSchema = mongoose.Schema({
        title: { type: String, required: true }, 
        description: { type: String, required: true }, 
        price: { type: Number, required: true, min: 0 }, 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
    }, { timestamps: true });
     
    module.exports = mongoose.model("Course", courseSchema);
    */
    try {
        const courseInfo = { ...req.body, createdBy: req.user.id };
        if (
            !courseInfo.title ||
            !courseInfo.description ||
            !courseInfo.price ||
            !courseInfo.createdBy // Using req.user.id later
        ) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const newCourse = await Course.create(courseInfo);

        const populatedCourse = await Course.findById(newCourse._id).populate('createdBy');

        res.status(201).json({
            msg: "Course created successfully!",
            newCourse: populatedCourse
        })
    } catch (error) {
        return next(new Error(500, "Error creating course"))
    }
}

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('createdBy');
        if (!courses) {
            return next(new Error(404, "Course not found"))
        }

        return res.status(200).json(courses)
    } catch (error) {
        return next(new Error(500, "Error getting courses"))
    }
}

const getOneCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate('createdBy');
        if (!course) {
            return next(new Error(404, "Course not found"))
        }

        return res.status(200).json(course)
    } catch (error) {
        return next(new Error(500, "Error getting selected course"))
    }
}

const updateOneCourse = async (req, res) => {
    try {
        const course = req.course
        const { title, description, price } = req.body;

        if (!course) {
            return next(new Error(404, "Course not found"))
        }

        // if (course.createdBy !== req.user.id && req.user.role !== 'admin') {
        //     return res.status(403).json({msg: "You cannot update others' course(s)"})
        // }

        const updatedCourse = await Course.findByIdAndUpdate(
            course._id,
            { title, description, price },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return next(new Error(404, "Course not found"))
        }

        res.status(200).json({
            msg: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        return next(new Error(500, "Error updating course"))
    }
}

const deleteOneCourse = async (req, res) => {
    try {
        const { id } = req.params;
        // const course = await Course.findById(id);
        // if (!course) {
        //     return res.status(404).json({ msg: "Course not found" });
        // }

        // if (course.createdBy !== req.user.id && req.user.role !== 'admin') {
        //     return res.status(403).json({msg: "You cannot delete others' course(s)"})
        // }

        const deletedCourse = await Course.findByIdAndDelete(id)
        return res.status(200).json({ msg: "Course deleted successfully", deletedCourse })
    } catch (error) {
        return next(new Error(500, "Error delete selected course"))
    }
}

module.exports = { createCourse, getAllCourses, getOneCourse, updateOneCourse, deleteOneCourse }