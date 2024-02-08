import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import fs from "fs";
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});
export const sendImageToCloudinary = async (
  imageName: string,
  imagePath: string,
): Promise<Record<string, unknown>> => {
  // making promise to send image to cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        fs.unlink(imagePath, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("File is deleted.");
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
