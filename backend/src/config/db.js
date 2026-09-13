const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/capacity_connect';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3500
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection bypassed (${error.message}). Operating in high-speed In-Memory seed database mode for instant zero-dependency execution.`);
    return false;
  }
};

module.exports = connectDB;
