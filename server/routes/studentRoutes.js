const express = require('express');
const {
  loginAdmin,
  addStaff,
  addStudent,
  addCourse,
  addTestSeries,
  getStudents,
  getCourses,
  getStaff
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes (admin only)
router.post('/staff', protect, authorize('admin'), addStaff);
router.post('/student', protect, authorize('admin'), addStudent);
router.post('/course', protect, authorize('admin'), addCourse);
router.post('/test-series/:studentId', protect, authorize('admin'), addTestSeries);

// Optional routes
router.get('/students', protect, authorize('admin'), getStudents);
router.get('/courses', protect, authorize('admin'), getCourses);
router.get('/staff', protect, authorize('admin'), getStaff);

module.exports = router;