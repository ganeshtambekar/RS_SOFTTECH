const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected`);

    // Call the initial admin creator after DB is connected
    await createInitialAdmin();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

const createInitialAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@rssofttech.com' });

    if (!adminExists) {
      await Admin.create({
        name: 'Admin User',
        email: 'admin@rssofttech.com',
        password: 'password123'
      });
      console.log('✅ Initial admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Error creating initial admin:', err);
  }
};

module.exports = connectDB;
