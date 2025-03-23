const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const Course = require('../models/courses');
const TestSeries = require('../models/TestSeries');


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide an email and password' 
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Create token
    const token = admin.getSignedJwtToken();

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

// @desc    Add a new staff member
// @route   POST /api/admin/staff
// @access  Private/Admin
exports.addStaff = async (req, res) => {
  try {
    const { name, position, department, email } = req.body;

    // Create staff
    const staff = await Staff.create({
      name,
      position,
      department,
      email
    });

    res.status(201).json({
      success: true,
      data: staff
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        success: false,
        error: 'Staff with this email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete a student
// @route   DELETE /api/admin/student/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: {}
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};





// @desc    Add a new student
// @route   POST /api/admin/student
// @access  Private/Admin
exports.addStudent = async (req, res) => {
  try {
    const { name, email, password, enrolledCourses, feesPaid } = req.body;

    // Create student
    const student = await Student.create({
      name,
      email,
      password,
      enrolledCourses: enrolledCourses || [],
      feesPaid: feesPaid || false
    });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        success: false,
        error: 'Student with this email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add a new course
// @route   POST /api/admin/course
// @access  Private/Admin
exports.addCourse = async (req, res) => {
  try {
    const { title, description, fees } = req.body;

    // Create course
    const course = await Course.create({
      title,
      description,
      fees
    });

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        success: false,
        error: 'Course with this title already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};




// @desc    Add test series marks to a student
// @route   POST /api/admin/test-series/:studentId
// @access  Private/Admin
exports.addTestSeries = async (req, res) => {
  try {
    const { testName, marks } = req.body;
    const studentId = req.params.studentId;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Create test series entry
    const testSeries = await TestSeries.create({
      studentId,
      testName,
      marks
    });

    // Add test series to student document
    await Student.findByIdAndUpdate(
      studentId,
      { 
        $push: { 
          testSeries: { 
            testName, 
            marks 
          } 
        } 
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: testSeries
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses');
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all courses
// @route   GET /api/admin/courses
// @access  Private/Admin
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


// @desc    Delete a course
// @route   DELETE /api/admin/course/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID'
      });
    }
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all staff
// @route   GET /api/admin/staff
// @access  Private/Admin
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};