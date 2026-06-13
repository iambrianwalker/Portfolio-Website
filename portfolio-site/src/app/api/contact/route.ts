import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { logEvent } from "@/lib/logging";
import { createStructuredLog } from "@/lib/observability";
import { contactSchema } from "@/lib/validation";
import { submitContactMessage } from "@/services/contactService";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Please complete all fields before submitting." },
        { status: 400 },
      );
    }

    const result = await submitContactMessage(parsed.data);
    const logPayload = createStructuredLog({ event: "contact_submit", email: parsed.data.email, subject: parsed.data.subject, status: 200 });
    await logEvent("contact_submit", { message: logPayload });

    return NextResponse.json(result);
  } catch (error) {
    const logPayload = createStructuredLog({ event: "contact_error", error: error instanceof Error ? error.message : "Unable to process your request right now.", status: 500 });
    await logEvent("contact_error", { message: logPayload });
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unable to process your request right now." },
      { status: 500 },
    );
  }
}
