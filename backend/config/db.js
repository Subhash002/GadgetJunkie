import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongoose Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to :${process.env.MONGO_URI}`, error.message);
    process.exit(1);
  }
};
