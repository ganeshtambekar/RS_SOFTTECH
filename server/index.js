const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const adminRoute = require('./routes/adminRoutes');
const studentRoute = require('./routes/studentRoutes');
const paymentRoute = require('./routes/paymentRoute');
const emailroute=require('./routes/email');

const connectDB = require('./config/db');
// const createInitialAdmin = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();
// createInitialAdmin(); // Uncomment if needed

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/',emailroute);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Frontend integration
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
