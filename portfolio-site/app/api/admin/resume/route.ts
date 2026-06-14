import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { logAppEvent } from "@/lib/cloudwatch";
import { getResumeMetadata, uploadResume } from "@/lib/resume";

export const runtime = "nodejs";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const resume = await getResumeMetadata();
    return NextResponse.json({ success: true, resume });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to load resume details",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "A PDF resume file is required." },
        { status: 400 }
      );
    }

    const uploaded = await uploadResume(file);
    const resume = await getResumeMetadata();

    await logAppEvent("admin-resume-upload", {
      sizeBytes: uploaded.sizeBytes,
      storage: uploaded.storage,
    });

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully.",
      uploaded,
      resume,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload resume",
      },
      { status: 400 }
    );
  }
}
