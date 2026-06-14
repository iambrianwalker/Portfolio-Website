import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminAuthCookieOptions,
  isAdminAuthenticated,
  isDevPasswordFallbackEnabled,
} from "@/lib/auth";
import { authenticateWithCognito } from "@/lib/cognito";
import { logAppEvent } from "@/lib/cloudwatch";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rateLimitResponse = enforceRateLimit(request, "admin-login", 10, 15 * 60 * 1000);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const usernameInput =
      typeof body?.username === "string" ? body.username.trim() : "";

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookieOptions = getAdminAuthCookieOptions();

    if (usernameInput) {
      const cognitoResult = await authenticateWithCognito(usernameInput, password);

      if (cognitoResult?.AccessToken) {
        cookieStore.set("admin-auth", cognitoResult.AccessToken, cookieOptions);

        await logAppEvent("admin-login-success", {
          method: "cognito",
          username: usernameInput,
        });

        return NextResponse.json({ success: true, method: "cognito" });
      }
    }

    const passwordMatches =
      isDevPasswordFallbackEnabled() && password === process.env.ADMIN_PASSWORD;

    if (passwordMatches && !usernameInput) {
      cookieStore.set("admin-auth", "password", cookieOptions);

      await logAppEvent("admin-login-success", {
        method: "password",
      });

      return NextResponse.json({ success: true, method: "password" });
    }

    await logAppEvent("admin-login-failure", {
      username: usernameInput || "unknown",
    });

    return NextResponse.json(
      {
        success: false,
        message: usernameInput
          ? "Invalid username or password"
          : "Username is required",
      },
      { status: 401 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to sign in";

    await logAppEvent("admin-login-error", {
      message,
    });

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}
