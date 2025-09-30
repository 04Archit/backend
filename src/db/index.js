import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\n database connected!! & DB HOST : ${connectionInstance.connection.host}`);
    // console.log(connectionInstance);
  } catch (error) {
    console.log("connection error:", error);
    process.exit(1);
  }
};
