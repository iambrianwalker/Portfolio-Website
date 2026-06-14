import path from "path";
import type { NextConfig } from "next";

const adminBasePath =
  process.env.ADMIN_BASE_PATH ||
  process.env.NEXT_PUBLIC_ADMIN_BASE_PATH ||
  "/admin";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  env: {
    APP_REGION: process.env.APP_REGION,
    CONTACT_TABLE_NAME: process.env.CONTACT_TABLE_NAME,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    ANALYTICS_TABLE_NAME: process.env.ANALYTICS_TABLE_NAME,
    COGNITO_USER_POOL_CLIENT_ID: process.env.COGNITO_USER_POOL_CLIENT_ID,
    COGNITO_USER_POOL_CLIENT_SECRET: process.env.COGNITO_USER_POOL_CLIENT_SECRET,
    ADMIN_BASE_PATH: adminBasePath,
    NEXT_PUBLIC_ADMIN_BASE_PATH: adminBasePath,
    CLOUDWATCH_LOG_GROUP_NAME: process.env.CLOUDWATCH_LOG_GROUP_NAME,
    RESUME_S3_BUCKET: process.env.RESUME_S3_BUCKET,
  },
};

export default nextConfig;
