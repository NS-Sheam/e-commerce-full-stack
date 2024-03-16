import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  client_url: process.env.CLIENT_URL,
  server_url: process.env.SERVER_URL,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  email_from: process.env.EMAIL_FROM,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  sslc_store_id: process.env.SSLC_STORE_ID,
  sslc_store_password: process.env.SSLC_STORE_PASSWORD,
};
