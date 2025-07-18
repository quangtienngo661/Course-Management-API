const express = require('express');
const router = express.Router();
const { authorize, checkCourseOwnership } = require('../middlewares/role.middleware');
const { enrollCourse, getEnrollments } = require('../controllers/enrollment.controller');

router.post('/:id/enroll', authorize("student"), enrollCourse);
router.get('/enrolled-courses', authorize("student"), getEnrollments);

module.exports = router;