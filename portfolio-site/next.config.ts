import path from "path";
import type { NextConfig } from "next";

const adminBasePath = process.env.ADMIN_BASE_PATH || "/admin";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  env: {
    NEXT_PUBLIC_ADMIN_BASE_PATH: adminBasePath,
  },
};

export default nextConfig;
