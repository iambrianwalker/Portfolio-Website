"use client";

import { useEffect, useState } from "react";
import type { ResumeMetadata } from "@/types/admin";
import { MAX_RESUME_BYTES, RESUME_DOWNLOAD_PATH } from "@/types/admin";

async function readApiResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    throw new Error(response.ok ? "Empty response from server." : `Request failed (${response.status}).`);
  }

  const trimmed = text.trimStart();
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<HTML") || trimmed.startsWith("<html")) {
    throw new Error(
      "Upload failed because the server returned an HTML error page. On Amplify, use direct S3 upload (redeploy if this persists)."
    );
  }

  try {
    return JSON.parse(text) as {
      success?: boolean;
      message?: string;
      resume?: ResumeMetadata;
      mode?: "presigned" | "multipart";
      uploadUrl?: string;
      contentType?: string;
    };
  } catch {
    throw new Error(
      response.ok
        ? "Unexpected response from server."
        : text.slice(0, 200) || `Request failed (${response.status}).`
    );
  }
}

async function uploadResumeFile(file: File) {
  const presignResponse = await fetch("/api/admin/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "presign",
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type || "application/pdf",
    }),
  });

  const presignData = await readApiResponse(presignResponse);

  if (!presignResponse.ok) {
    throw new Error(presignData.message || "Unable to prepare resume upload.");
  }

  if (presignData.mode === "presigned" && presignData.uploadUrl) {
    let putResponse: Response;

    try {
      putResponse = await fetch(presignData.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": presignData.contentType || file.type || "application/pdf",
        },
      });
    } catch {
      throw new Error(
        "Direct upload failed. Add CORS on the resume S3 bucket using infra/s3-resume-cors.json (include www, apex, and Amplify URLs)."
      );
    }

    if (!putResponse.ok) {
      const s3Error = (await putResponse.text()).replace(/\s+/g, " ").trim().slice(0, 240);
      const detail = s3Error ? ` ${s3Error}` : "";

      throw new Error(
        putResponse.status === 403
          ? `Direct upload blocked (403). Check Amplify IAM s3:PutObject on resume/* and S3 CORS for your site domain.${detail}`
          : `Direct upload to storage failed (${putResponse.status}).${detail}`
      );
    }

    const confirmResponse = await fetch("/api/admin/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm" }),
    });

    const confirmData = await readApiResponse(confirmResponse);

    if (!confirmResponse.ok) {
      throw new Error(confirmData.message || "Unable to confirm resume upload.");
    }

    return confirmData;
  }

  const formData = new FormData();
  formData.set("resume", file);

  const response = await fetch("/api/admin/resume", {
    method: "POST",
    body: formData,
  });

  const data = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Unable to upload resume.");
  }

  return data;
}

function formatFileSize(bytes: number) {
  if (bytes <= 0) {
    return "No file uploaded";
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeUploadPanel() {
  const [resume, setResume] = useState<ResumeMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadResume() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/resume");
      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Unable to load resume details.");
      }

      setResume(data.resume ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load resume details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadResume();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("resume");

    if (!(fileInput instanceof HTMLInputElement) || !fileInput.files?.[0]) {
      setError("A PDF resume file is required.");
      setUploading(false);
      return;
    }

    const file = fileInput.files[0];

    try {
      const data = await uploadResumeFile(file);

      setResume(data.resume ?? null);
      setMessage(data.message || "Resume uploaded successfully.");
      form.reset();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload resume.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/20">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Resume management</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Upload a fresh PDF resume for the public Download Resume button.
          </p>
        </div>
        <a
          href={
            resume?.uploadedAt
              ? `${RESUME_DOWNLOAD_PATH}?v=${encodeURIComponent(resume.uploadedAt)}`
              : RESUME_DOWNLOAD_PATH
          }
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
        >
          Preview download
        </a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
          <p className="text-sm text-zinc-400">Current file</p>
          <p className="mt-2 font-medium text-white">
            {loading ? "Loading..." : resume?.storage === "none" ? "No resume uploaded" : resume?.fileName}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
          <p className="text-sm text-zinc-400">Last updated</p>
          <p className="mt-2 font-medium text-white">
            {loading || !resume?.uploadedAt
              ? "—"
              : new Date(resume.uploadedAt).toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
          <p className="text-sm text-zinc-400">Storage</p>
          <p className="mt-2 font-medium text-white">
            {loading
              ? "—"
              : resume?.storage === "none"
                ? "Not available"
                : `${formatFileSize(resume?.sizeBytes ?? 0)} · ${resume?.storage.toUpperCase()}`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm text-zinc-300">
          Upload new resume (PDF, max {Math.round(MAX_RESUME_BYTES / (1024 * 1024))} MB)
          <input
            type="file"
            name="resume"
            accept="application/pdf,.pdf"
            required
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-950"
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload resume"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}
