import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { logAppEvent } from "@/lib/cloudwatch";
import {
  buildResumeMetadataFromUpload,
  confirmResumeUpload,
  createResumePresignedUploadUrl,
  getResumeMetadata,
  uploadResume,
} from "@/lib/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PresignBody = {
  action: "presign";
  fileName?: string;
  fileSize?: number;
  contentType?: string;
};

type ConfirmBody = {
  action: "confirm";
};

function isPresignBody(body: unknown): body is PresignBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "action" in body &&
    (body as PresignBody).action === "presign"
  );
}

function isConfirmBody(body: unknown): body is ConfirmBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "action" in body &&
    (body as ConfirmBody).action === "confirm"
  );
}

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

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await request.json();

      if (isPresignBody(body)) {
        const fileName = typeof body.fileName === "string" ? body.fileName : "";
        const fileSize = typeof body.fileSize === "number" ? body.fileSize : 0;
        const fileContentType =
          typeof body.contentType === "string" && body.contentType
            ? body.contentType
            : "application/pdf";

        const presign = await createResumePresignedUploadUrl(
          fileName,
          fileSize,
          fileContentType
        );

        if (presign.mode === "multipart") {
          return NextResponse.json({
            success: true,
            mode: "multipart",
            message: "Use multipart upload for local storage.",
          });
        }

        return NextResponse.json({
          success: true,
          mode: "presigned",
          uploadUrl: presign.uploadUrl,
          contentType: presign.contentType,
        });
      }

      if (isConfirmBody(body)) {
        const resume = await confirmResumeUpload();

        await logAppEvent("admin-resume-upload", {
          sizeBytes: resume.sizeBytes,
          storage: resume.storage,
          method: "presigned",
        });

        return NextResponse.json({
          success: true,
          message: "Resume uploaded successfully.",
          resume,
        });
      }

      return NextResponse.json(
        { success: false, message: "Unsupported upload action." },
        { status: 400 }
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
    const resume = buildResumeMetadataFromUpload(uploaded);

    await logAppEvent("admin-resume-upload", {
      sizeBytes: uploaded.sizeBytes,
      storage: uploaded.storage,
      method: "multipart",
    });

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully.",
      uploaded,
      resume,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload resume";
    const status = message.includes("Permission") || message.includes("not authorized") ? 500 : 400;

    return NextResponse.json({ success: false, message }, { status });
  }
}
