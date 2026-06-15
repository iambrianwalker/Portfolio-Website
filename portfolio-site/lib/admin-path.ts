const DEFAULT_ADMIN_PATH = "/admin";

declare global {
  interface Window {
    __ADMIN_BASE_PATH__?: string;
  }
}

function normalizePath(path: string) {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") {
    return DEFAULT_ADMIN_PATH;
  }

  return trimmed.startsWith("/") ? trimmed.replace(/\/+$/, "") : `/${trimmed.replace(/\/+$/, "")}`;
}

export function getAdminBasePath() {
  return normalizePath(
    process.env.ADMIN_BASE_PATH ||
      process.env.NEXT_PUBLIC_ADMIN_BASE_PATH ||
      DEFAULT_ADMIN_PATH
  );
}

export function getAdminLoginPath() {
  return `${getAdminBasePath()}/login`;
}

export function getAdminDashboardPath() {
  return getAdminBasePath();
}

export function isPublicAdminPath(pathname: string) {
  const base = getAdminBasePath();
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function isLegacyAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function toInternalAdminPath(pathname: string) {
  const base = getAdminBasePath();

  if (base === "/admin") {
    return pathname;
  }

  if (pathname === base) {
    return "/admin";
  }

  if (pathname.startsWith(`${base}/`)) {
    return `/admin${pathname.slice(base.length)}`;
  }

  return pathname;
}

export function toPublicAdminPath(internalPath: string) {
  const base = getAdminBasePath();

  if (base === "/admin") {
    return internalPath;
  }

  if (internalPath === "/admin") {
    return base;
  }

  if (internalPath.startsWith("/admin/")) {
    return `${base}${internalPath.slice("/admin".length)}`;
  }

  return internalPath;
}

export function getClientAdminBasePath() {
  if (typeof window !== "undefined" && window.__ADMIN_BASE_PATH__) {
    return normalizePath(window.__ADMIN_BASE_PATH__);
  }

  return normalizePath(process.env.NEXT_PUBLIC_ADMIN_BASE_PATH || DEFAULT_ADMIN_PATH);
}

export function getClientAdminDashboardPath() {
  return getClientAdminBasePath();
}

export function getClientAdminLoginPath() {
  return `${getClientAdminBasePath()}/login`;
}

export function getClientAdminLogoutPath() {
  return `${getClientAdminBasePath()}/logout`;
}
