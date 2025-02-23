
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email"); 
const courseRoutes=require("./routes/courses");
const {errorHandler} = require("./utils/errorhandler");
const Student = require('./routes/student');
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

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000"
];

app.use(cors());

// // Routes
app.use("/api", authRoutes);
app.use("/api", emailRoutes); 
app.use("/api",courseRoutes);
app.use("/api",Student);
// router.get("/", (req, res) => {
//   res.send("Welcome");
// });


// app.use("/", router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;