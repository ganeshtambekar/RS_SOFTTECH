// const express = require('express');
// const cors=require('cors');
// const connectDB = require('./config/db');  // Ensure this file exists
// const authRoutes = require('./routes/auth');  
// const courserouts=require('./routes/courses');
// const { errorHandler }=require('./utils/errorhandler');
// const app = express();
// connectDB();



// app.use(cors());
// app.use(errorHandler);
// app.use(express.json());
// app.use('/api/auth', authRoutes);  
// app.use('/api/auth',courserouts);

// const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
