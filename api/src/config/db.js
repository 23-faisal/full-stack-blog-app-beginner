import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB  database");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
