const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  feesPaid: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
