const mongoose = require('mongoose');

const TestSeriesSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  testName: {
    type: String,
    required: [true, 'Please add a test name']
  },
  marks: {
    type: Number,
    required: [true, 'Please add marks']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TestSeries', TestSeriesSchema);