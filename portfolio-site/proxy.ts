import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminAuthenticatedFromCookie } from "@/lib/auth";
import {
  getAdminBasePath,
  getAdminLoginPath,
  isLegacyAdminPath,
  isPublicAdminPath,
  toInternalAdminPath,
  toPublicAdminPath,
} from "@/lib/admin-path";

function notFound() {
  return new NextResponse(null, { status: 404 });
}

function clearAdminAuthCookie(response: NextResponse) {
  response.cookies.set("admin-auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminBasePath = getAdminBasePath();
  const internalPath = toInternalAdminPath(pathname);
  const isLoginRoute = internalPath === "/admin/login";
  const isAdminRoute =
    internalPath.startsWith("/admin") &&
    internalPath !== "/admin/login" &&
    internalPath !== "/admin/logout";

  if (adminBasePath !== "/admin" && isLegacyAdminPath(pathname)) {
    return notFound();
  }

  const sessionCookie = request.cookies.get("admin-auth")?.value;
  const isAuthenticated = await isAdminAuthenticatedFromCookie(sessionCookie);

  if (isPublicAdminPath(pathname)) {
    if (isAdminRoute && !isAuthenticated) {
      if (sessionCookie) {
        const loginUrl = new URL(getAdminLoginPath(), request.url);
        const response = NextResponse.redirect(loginUrl);
        clearAdminAuthCookie(response);
        return response;
      }

      return notFound();
    }

    if (isLoginRoute && isAuthenticated) {
      return NextResponse.redirect(new URL(toPublicAdminPath("/admin"), request.url));
    }

    if (isLoginRoute && sessionCookie && !isAuthenticated) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = internalPath;
      const response = NextResponse.rewrite(rewriteUrl);
      clearAdminAuthCookie(response);
      response.headers.set("x-pathname", pathname);
      response.headers.set("x-robots-tag", "noindex, nofollow");
      return response;
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
