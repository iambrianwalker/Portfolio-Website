"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error" | "idle"; message: string }>({
    type: "idle",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus({ type: "success", message: data.message });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send message.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Name
          <input required name="name" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0" />
        </label>
        <label className="text-sm text-slate-300">
          Email
          <input required type="email" name="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0" />
        </label>
      </div>

      <label className="mt-4 block text-sm text-slate-300">
        Subject
        <input required name="subject" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0" />
      </label>

      <label className="mt-4 block text-sm text-slate-300">
        Message
        <textarea required name="message" rows={6} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0" />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send message"}
      </button>

      {status.message ? (
        <p className={`mt-4 text-sm ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
          {status.message}
        </p>
      ) : null}
    </motion.form>
  );
}
