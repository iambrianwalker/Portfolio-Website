"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  getClientAdminBasePath,
  getClientAdminDashboardPath,
  getClientAdminLoginPath,
} from "@/lib/admin-path";

type AdminPathContextValue = {
  basePath: string;
  loginPath: string;
  dashboardPath: string;
};

const AdminPathContext = createContext<AdminPathContextValue | null>(null);

type AdminPathProviderProps = {
  basePath: string;
  loginPath: string;
  dashboardPath: string;
  children: ReactNode;
};

export function AdminPathProvider({
  basePath,
  loginPath,
  dashboardPath,
  children,
}: AdminPathProviderProps) {
  if (typeof window !== "undefined") {
    window.__ADMIN_BASE_PATH__ = basePath;
  }

  return (
    <AdminPathContext.Provider value={{ basePath, loginPath, dashboardPath }}>
      {children}
    </AdminPathContext.Provider>
  );
}

export function useAdminPaths() {
  const context = useContext(AdminPathContext);

  if (context) {
    return context;
  }

  return {
    basePath: getClientAdminBasePath(),
    loginPath: getClientAdminLoginPath(),
    dashboardPath: getClientAdminDashboardPath(),
  };
}
