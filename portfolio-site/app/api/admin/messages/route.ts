import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContactSubmissions } from "@/lib/admin";
import { logAppEvent } from "@/lib/cloudwatch";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;
    const submissions = await getContactSubmissions(search);

    await logAppEvent("admin-messages-fetch", {
      count: submissions.length,
      search: search || null,
    });

    return NextResponse.json({ success: true, messages: submissions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load messages";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
