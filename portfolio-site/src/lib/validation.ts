import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters long"),
});

export const analyticsSchema = z.object({
  eventType: z.enum(["resume_download", "project_view", "contact_submit"]),
  resourceId: z.string().trim().min(1).optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});
