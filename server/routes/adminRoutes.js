const express = require('express');
const {
  loginAdmin,
  addStaff,
  addStudent,
  addCourse,
  addTestSeries,
  getStudents,
  getCourses,
  getStaff,
  deleteCourse,
  deleteStudent,
  deleteStaff,
  loginStudent
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');
const { registerStudent } = require('../controllers/studentController');

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/studentLogin',loginStudent)
// Protected routes (admin only)
router.post('/staff', protect, authorize('admin'), addStaff);
router.post('/student', protect, authorize('admin'), addStudent);

router.post('/course', protect, authorize('admin'), addCourse);
// router.delete('/course', protect, authorize('admin'), deleteCourse);
router.delete('/course/:id',protect,authorize('admin'), deleteCourse);
router.delete('/students/:id',protect,authorize('admin'), deleteStudent);
router.delete('/staff/:id',protect,authorize('admin'), deleteStaff);
router.post('/test-series/:studentId', protect, authorize('admin'), addTestSeries);
router.post('/register',registerStudent)

router.get('/students', protect, authorize('admin'), getStudents);
router.get('/courses', protect, authorize('admin'), getCourses);
router.get('/staff', protect, authorize('admin'), getStaff);

module.exports = router;