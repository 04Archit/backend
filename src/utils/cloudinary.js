import { v2 as cloudinary } from "cloudinary";
import fs, { unlink, unlinkSync } from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;
    //upload the file
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file has been uploaded on cloudinary", response.url);
    console.log(response);
    unlinkSync(filepath);
    return response;
  } catch (error) {
    unlinkSync(filepath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
