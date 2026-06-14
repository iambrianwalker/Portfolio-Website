import { cookies } from "next/headers";
import { validateCognitoToken } from "@/lib/cognito";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin-auth")?.value;

  if (!sessionCookie) {
    return false;
  }

  if (sessionCookie === "password") {
    return true;
  }

  return validateCognitoToken(sessionCookie);
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
