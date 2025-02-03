const express = require('express');
const cors=require('cors');
const connectDB = require('./config/db');  // Ensure this file exists
const authRoutes = require('./routes/auth');  // Fixed import path
const { errorHandler }=require('./utils/errorhandler');
const app = express();
connectDB();



app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use('/api/auth', authRoutes);  // Fixed route

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
