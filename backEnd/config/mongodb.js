import mongoose from "mongoose";
import express from "express";
const app = express();

let isConnected = false
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ DB Connected");
    });

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ecommerce", // name your database here
    });
    isConnected = true
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

app.use((req, res, next) => {
  if (!isConnected) {
    return res.status(503).json({ message: "Service Unavailable" });
  }
  next();
});


export default connectDB;
