// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// require('dotenv').config();
// const authRoutes = require('./routes/auth');
// const { errorHandler } = require('./utils/errorhandler');

// const app = express();

// // Connect to Database
// (async () => {
//   try {
//     await connectDB();
//     console.log('Database connected successfully.');
//   } catch (err) {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   }
// })();

// // Middleware
// app.use(express.json());

// // CORS Configuration
// const allowedOrigins = [
//   process.env.FRONTEND_URL || 'http://localhost:3000',
//   'http://localhost:5173', // Vite (if needed)
// ];

// app.use(
//   cors()
// );

// // Handle preflight requests
// // app.options('*', cors());

// // Routes
// app.use('/api', authRoutes);

// // Error Handler (Always at the End)
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
// const authRoutes = require("./routes/auth");
// const emailRoutes = require("./routes/email"); 
// const courseRoutes=require("./routes/courses");
// const { errorHandler } = require("./utils/errorhandler");
const router = express.Router();


const app = express();

(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());

// // CORS Configuration
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "http://localhost:3000"
// ];

// app.use(cors());

// // Routes
// app.use("/api", authRoutes);
// app.use("/api", emailRoutes); 
// app.use("/api",courseRoutes);
router.get("/", (req, res) => {
  res.send("Welcome");
});


app.use("/", router);


// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;