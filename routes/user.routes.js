const express = require('express')
const router = express.Router();
const { getProfile, getAllUsers } = require('../controllers/user.controller');
const { authorize, checkCourseOwnership } = require('../middlewares/role.middleware');


router.get('/profile/:id', getProfile)
router.get('/', getAllUsers, authorize("admin")) // admin only

module.exports = router