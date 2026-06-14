import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { promises as fs } from "fs";
import path from "path";
import type { ResumeMetadata } from "@/types/admin";
import { RESUME_DOWNLOAD_PATH } from "@/types/admin";

const RESUME_S3_KEY = "resume/current.pdf";
const LOCAL_RESUME_PATH = path.join(process.cwd(), "public", "resume.pdf");
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const DOWNLOAD_FILE_NAME = "Brian-Walker-Resume.pdf";

const s3Client = process.env.APP_REGION
  ? new S3Client({ region: process.env.APP_REGION })
  : null;

function getResumeBucketName() {
  return process.env.RESUME_S3_BUCKET?.trim() || "";
}

function usesS3Storage() {
  return Boolean(s3Client && getResumeBucketName());
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export type { ResumeMetadata } from "@/types/admin";

export function getResumeDownloadPath() {
  return RESUME_DOWNLOAD_PATH;
}

export async function getResumeMetadata(): Promise<ResumeMetadata> {
  const downloadPath = getResumeDownloadPath();

  if (usesS3Storage()) {
    try {
      const response = await s3Client!.send(
        new HeadObjectCommand({
          Bucket: getResumeBucketName(),
          Key: RESUME_S3_KEY,
        })
      );

      return {
        fileName: DOWNLOAD_FILE_NAME,
        uploadedAt: response.LastModified?.toISOString() ?? null,
        sizeBytes: response.ContentLength ?? 0,
        storage: "s3",
        downloadPath,
      };
    } catch {
      return {
        fileName: DOWNLOAD_FILE_NAME,
        uploadedAt: null,
        sizeBytes: 0,
        storage: "none",
        downloadPath,
      };
    }
  }

  try {
    const stats = await fs.stat(LOCAL_RESUME_PATH);

    return {
      fileName: DOWNLOAD_FILE_NAME,
      uploadedAt: stats.mtime.toISOString(),
      sizeBytes: stats.size,
      storage: "local",
      downloadPath,
    };
  } catch {
    return {
      fileName: DOWNLOAD_FILE_NAME,
      uploadedAt: null,
      sizeBytes: 0,
      storage: "none",
      downloadPath,
    };
  }
}

export async function getResumeFile() {
  if (usesS3Storage()) {
    try {
      const response = await s3Client!.send(
        new GetObjectCommand({
          Bucket: getResumeBucketName(),
          Key: RESUME_S3_KEY,
        })
      );

      if (!response.Body) {
        return null;
      }

      const bytes = await response.Body.transformToByteArray();

      return {
        buffer: Buffer.from(bytes),
        uploadedAt: response.LastModified?.toISOString() ?? null,
        storage: "s3" as const,
      };
    } catch (error) {
      console.error("Failed to fetch resume from S3", error);
      return null;
    }
  }

  try {
    const buffer = await fs.readFile(LOCAL_RESUME_PATH);
    const stats = await fs.stat(LOCAL_RESUME_PATH);

    return {
      buffer,
      uploadedAt: stats.mtime.toISOString(),
      storage: "local" as const,
    };
  } catch {
    return null;
  }
}

export async function uploadResume(file: File) {
  if (!isPdfFile(file)) {
    throw new Error("Only PDF files are allowed.");
  }

  if (file.size > MAX_RESUME_BYTES) {
    throw new Error("Resume must be 5 MB or smaller.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!buffer.subarray(0, 4).equals(Buffer.from("%PDF"))) {
    throw new Error("The uploaded file is not a valid PDF.");
  }

  const uploadedAt = new Date().toISOString();

  if (usesS3Storage()) {
    try {
      await s3Client!.send(
        new PutObjectCommand({
          Bucket: getResumeBucketName(),
          Key: RESUME_S3_KEY,
          Body: buffer,
          ContentType: "application/pdf",
          ContentDisposition: `attachment; filename="${DOWNLOAD_FILE_NAME}"`,
          Metadata: {
            originalfilename: file.name,
            uploadedat: uploadedAt,
          },
        })
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "S3 upload failed";
      throw new Error(
        `Unable to upload resume to S3 (${getResumeBucketName()}). Check compute role s3:PutObject permission. ${message}`
      );
    }

    return {
      fileName: DOWNLOAD_FILE_NAME,
      uploadedAt,
      sizeBytes: buffer.length,
      storage: "s3" as const,
    };
  }

  await fs.mkdir(path.dirname(LOCAL_RESUME_PATH), { recursive: true });
  await fs.writeFile(LOCAL_RESUME_PATH, buffer);

  return {
    fileName: DOWNLOAD_FILE_NAME,
    uploadedAt,
    sizeBytes: buffer.length,
    storage: "local" as const,
  };
}

export { DOWNLOAD_FILE_NAME, MAX_RESUME_BYTES };

export function buildResumeMetadataFromUpload(uploaded: {
  uploadedAt: string;
  sizeBytes: number;
  storage: "s3" | "local";
}): ResumeMetadata {
  return {
    fileName: DOWNLOAD_FILE_NAME,
    uploadedAt: uploaded.uploadedAt,
    sizeBytes: uploaded.sizeBytes,
    storage: uploaded.storage,
    downloadPath: getResumeDownloadPath(),
  };
}
