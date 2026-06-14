import type { MetadataRoute } from "next";
import { getAdminBasePath } from "@/lib/admin-path";

export default function robots(): MetadataRoute.Robots {
  const adminPath = getAdminBasePath();

  return {
    rules: {
      userAgent: "*",
      disallow: [adminPath, `${adminPath}/`, "/admin", "/admin/"],
    },
  };
}
