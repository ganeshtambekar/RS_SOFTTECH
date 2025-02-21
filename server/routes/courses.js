const dotenv=require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const Course=require('../models/courses')
const auth = require('../Middleware/auth');

router.get('/courses', auth, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('enrolledStudents', 'name email')
      .populate('staff', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/courses', [auth], async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    console.log(req.body);
  
    if (!name || !description || !duration || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const course = new Course({
      name,
      description,
      duration,
      price,
      enrolledStudents: [],
      staff: []
    });

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', [auth], async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    Object.assign(course, req.body);
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', [auth], async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;