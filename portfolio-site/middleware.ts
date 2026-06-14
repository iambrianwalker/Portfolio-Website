import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getAdminBasePath,
  isLegacyAdminPath,
  isPublicAdminPath,
  toInternalAdminPath,
  toPublicAdminPath,
} from "@/lib/admin-path";

function notFound() {
  return new NextResponse(null, { status: 404 });
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminBasePath = getAdminBasePath();
  const internalPath = toInternalAdminPath(pathname);
  const isLoginRoute = internalPath === "/admin/login";
  const isLogoutRoute = internalPath === "/admin/logout";
  const isAdminRoute =
    internalPath.startsWith("/admin") &&
    internalPath !== "/admin/login" &&
    internalPath !== "/admin/logout";

  if (adminBasePath !== "/admin" && isLegacyAdminPath(pathname)) {
    return notFound();
  }

  const sessionCookie = request.cookies.get("admin-auth")?.value;
  const isAuthenticated = Boolean(sessionCookie);

  if (isPublicAdminPath(pathname)) {
    if (isAdminRoute && !isAuthenticated) {
      return notFound();
    }

    if (isLoginRoute && isAuthenticated) {
      return NextResponse.redirect(new URL(toPublicAdminPath("/admin"), request.url));
    }

    if (pathname !== internalPath) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = internalPath;
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set("x-pathname", pathname);
      response.headers.set("x-robots-tag", "noindex, nofollow");
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") || isPublicAdminPath(pathname)) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
