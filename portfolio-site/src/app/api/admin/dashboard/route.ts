import { NextResponse } from "next/server";
import { getAdminDashboardData } from "@/services/adminService";

export async function GET() {
  try {
    const data = await getAdminDashboardData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Unable to load dashboard data" }, { status: 500 });
  }
}
