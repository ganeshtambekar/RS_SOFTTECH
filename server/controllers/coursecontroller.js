const Course = require('../models/courses');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' })
      .populate('instructor', 'name email');
      
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
       instructor: req.user.id
    });
    
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};