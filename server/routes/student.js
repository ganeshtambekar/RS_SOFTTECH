const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../Middleware/auth');

// Create a new student
router.post('/students', auth, async (req, res) => {
  try {
    const { name, enrolledCourses, feesPaid } = req.body;
    console.log(req.body);

    // Validate input
    if (!name || !Array.isArray(enrolledCourses) || typeof feesPaid !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Convert course names to ObjectIds
    const courses = await Course.find({ name: { $in: enrolledCourses } }).select('_id');
    const courseIds = courses.map(course => course._id);

    if (courseIds.length !== enrolledCourses.length) {
      return res.status(400).json({ message: 'Some courses not found' });
    }

    // Create the student
    const student = new Student({ name, enrolledCourses: courseIds, feesPaid });
    await student.save();
    
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all students
router.get('/students', auth, async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses', 'name description');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a student by ID
router.get('/students/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses', 'name description');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student details
router.put('/students/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    Object.assign(student, req.body);
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
router.delete('/students/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
