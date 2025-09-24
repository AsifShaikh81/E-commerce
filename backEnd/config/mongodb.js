import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ DB Connected");
    });

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ecommerce", // name your database here
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
