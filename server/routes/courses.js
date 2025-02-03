
const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');

// Get all courses
router.get('/', CourseController.getAllCourses);

// Create new course (Admin only)
router.post('/', authMiddleware, adminCheck, CourseController.createCourse);

// Get single course
router.get('/:id', CourseController.getCourse);

module.exports = router;