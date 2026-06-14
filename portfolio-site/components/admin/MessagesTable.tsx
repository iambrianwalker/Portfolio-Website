"use client";

import { useMemo, useState } from "react";
import type { ContactSubmission } from "@/types/admin";

interface MessagesTableProps {
  submissions: ContactSubmission[];
}

export function MessagesTable({ submissions }: MessagesTableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSubmissions = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return submissions;
    }

    return submissions.filter((item) => {
      const haystack = [item.name, item.email, item.subject, item.message]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [search, submissions]);

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/20">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Recent submissions</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Search by name, email, subject, or message content.
          </p>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search submissions"
          className="w-full rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 text-sm text-zinc-100 outline-none ring-0 md:max-w-xs"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="hidden grid-cols-[1.2fr_1.4fr_1.1fr_0.8fr] gap-3 bg-zinc-950/70 px-4 py-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 md:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Subject</span>
          <span>Date</span>
        </div>

        <div className="divide-y divide-white/10">
          {filteredSubmissions.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-zinc-400">
              No submissions match your search yet.
            </div>
          ) : null}
          {filteredSubmissions.map((submission) => {
            const isExpanded = expandedId === submission.id;
            return (
              <div key={submission.id} className="bg-zinc-900/60 px-4 py-4">
                <button
                  type="button"
                  className="grid w-full grid-cols-1 gap-2 text-left md:grid-cols-[1.2fr_1.4fr_1.1fr_0.8fr]"
                  onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                >
                  <span className="font-medium text-white">{submission.name}</span>
                  <span className="text-sm text-zinc-400">{submission.email}</span>
                  <span className="text-sm text-zinc-400">{submission.subject || "No subject"}</span>
                  <span className="text-sm text-zinc-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </span>
                </button>

                {isExpanded ? (
                  <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-zinc-300">
                    <p className="font-medium text-cyan-300">Message</p>
                    <p className="mt-2 whitespace-pre-wrap leading-7">
                      {submission.message}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
