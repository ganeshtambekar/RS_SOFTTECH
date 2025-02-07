
const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/coursecontroller');

// Get all courses
// router.get('/', CourseController.getAllCourses);

// Create new course (Admin only)
router.post('/courses', CourseController.createCourse);

// Get single course
router.get('/:id', CourseController.getCourses);

module.exports = router;