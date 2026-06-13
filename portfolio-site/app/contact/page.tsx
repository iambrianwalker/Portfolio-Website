"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus("success");
      setMessage(data.message || "Your message has been received.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-8 lg:px-10">
      <AnimatedSection className="grid gap-8 rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-cyan-950/20 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something thoughtful."
            description="Whether you have a project idea, a question, or just want to connect, I’d love to hear from you."
          />
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6 text-sm leading-7 text-zinc-300">
            <p className="font-medium text-zinc-100">Availability</p>
            <p className="mt-2">Open to freelance work, internships, and collaborative builds.</p>
            <p className="mt-3">Response time is usually within 2–3 business days.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-cyan-400"
                placeholder="Brian Walker"
              />
            </label>
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-400"
              placeholder="Project discussion"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-400"
              placeholder="Tell me about your idea..."
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
            <p className="text-sm text-zinc-400">Mocked form submission — no AWS integration yet.</p>
          </div>

          {status !== "idle" ? (
            <p
              className={`rounded-xl border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                  : "border-rose-400/30 bg-rose-500/10 text-rose-300"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </AnimatedSection>
    </main>
  );
}
