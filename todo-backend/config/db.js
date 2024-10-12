import mongoose from "mongoose";
import "dotenv/config";

// Created Database connection in a seperate file to keep the code clean

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error connecting to DB", err.message);
    process.exit(1);
  }
};

export default dbConnection;
