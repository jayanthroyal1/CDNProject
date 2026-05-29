import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB Connected");
  } catch (err) {
    process.exit(1);
  }
};
