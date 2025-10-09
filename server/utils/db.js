import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI; 
    if (!URI) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(URI);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    process.exit(1);
  }
};

export { connectDB };
