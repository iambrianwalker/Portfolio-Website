import { cookies } from "next/headers";
import { validateCognitoToken } from "@/lib/cognito";

export function isDevPasswordFallbackEnabled() {
  return process.env.NODE_ENV !== "production" && Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAdminAuthenticatedFromCookie(
  sessionCookie: string | undefined
): Promise<boolean> {
  if (!sessionCookie) {
    return false;
  }

  if (sessionCookie === "password") {
    return isDevPasswordFallbackEnabled();
  }

  return validateCognitoToken(sessionCookie);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin-auth")?.value;

  return isAdminAuthenticatedFromCookie(sessionCookie);
}

export function getAdminAuthCookieOptions(maxAge = 60 * 60 * 8) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
