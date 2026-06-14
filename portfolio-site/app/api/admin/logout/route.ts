import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuthCookieOptions } from "@/lib/auth";
import { logAppEvent } from "@/lib/cloudwatch";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();
  const cookieOptions = getAdminAuthCookieOptions(0);

  cookieStore.set("admin-auth", "", cookieOptions);

  await logAppEvent("admin-logout");

  return NextResponse.json({ success: true });
}
