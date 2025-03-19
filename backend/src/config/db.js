import { connect } from "mongoose";
import { MONGO_URI } from "../utils/secret.js";
export const connectDB = async () => {
  try {
    await connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};
