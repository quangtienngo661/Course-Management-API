const express = require('express')
const router = express.Router();
const { createCourse, getAllCourses, getOneCourse, updateOneCourse, deleteOneCourse } = require('../controllers/course.controller')
const { authorize, checkCourseOwnership } = require('../middlewares/role.middleware');

router.post('/', authorize("teacher", "admin"), createCourse)
router.get('/', authorize("admin"), getAllCourses)
router.get('/:id', getOneCourse)
router.put('/:id', authorize("teacher", "admin"), checkCourseOwnership, updateOneCourse)
router.delete('/:id', authorize("teacher", "admin"), checkCourseOwnership, deleteOneCourse)

module.exports = router
