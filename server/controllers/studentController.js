const Student = require('../models/Student');
const Course = require('../models/courses');
const TestSeries = require('../models/TestSeries');


// @desc    Login student
// @route   POST /api/student/login
// @access  Public
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide an email and password' 
      });
    }

    // Check for student
    const student = await Student.findOne({ email }).select('+password');

    if (!student) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Check if password matches
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Create token
    const token = student.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get enrolled courses for logged in student
// @route   GET /api/student/courses
// @access  Private/Student
exports.getEnrolledCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('enrolledCourses');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student.enrolledCourses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get fee status for logged in student
// @route   GET /api/student/fees
// @access  Private/Student
exports.getFeeStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Get fee details for all enrolled courses
    const courses = await Course.find({
      _id: { $in: student.enrolledCourses }
    });

    const totalFees = courses.reduce((sum, course) => sum + course.fees, 0);

    res.status(200).json({
      success: true,
      data: {
        feesPaid: student.feesPaid,
        totalFees,
        courses: courses.map(course => ({
          title: course.title,
          fees: course.fees
        }))
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get test series marks for logged in student
// @route   GET /api/student/marks
// @access  Private/Student
exports.getMarks = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student.testSeries
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


exports.registerStudent = async (req, res) => {
  try {
    const { name,email,password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and password'
      });
    }

    // Check for existing student
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create student
    const student = await Student.create({
      name,
      email,
      password
    });

    // Create token
    const token = student.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
