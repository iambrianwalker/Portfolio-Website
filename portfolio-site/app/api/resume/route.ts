import { NextResponse } from "next/server";
import { DOWNLOAD_FILE_NAME, getResumeFile } from "@/lib/resume";

export const runtime = "nodejs";

export async function GET() {
  try {
    const resume = await getResumeFile();

    if (!resume) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 }
      );
    }

    return new NextResponse(resume.buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_FILE_NAME}"`,
        "Cache-Control": "public, max-age=300",
        ...(resume.uploadedAt ? { "Last-Modified": new Date(resume.uploadedAt).toUTCString() } : {}),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to download resume",
      },
      { status: 500 }
    );
  }
}
