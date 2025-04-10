const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoute=require('./routes/adminRoutes');
const studentRoute=require('./routes/studentRoutes');

const connectDB = require('./config/db');

const createInitialAdmin = require('./config/db');


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();
//createInitialAdmin();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});