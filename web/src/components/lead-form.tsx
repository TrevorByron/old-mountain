"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead-capture";

type Status = {
  kind: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function LeadForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email) {
      setStatus({ kind: "error", message: "Name and email are required." });
      return;
    }

    setStatus({ kind: "loading" });
    try {
      const result = await submitLead({ name, email, message });
      setStatus({ kind: result.ok ? "success" : "error", message: result.message });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <form action={onSubmit} className="card p-6 md:p-8">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="name" className="kicker">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-md border border-[var(--border)] bg-white px-3 py-2.5 text-base outline-none ring-[var(--ring)] transition focus:ring-2"
            placeholder="Jane Doe"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="kicker">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md border border-[var(--border)] bg-white px-3 py-2.5 text-base outline-none ring-[var(--ring)] transition focus:ring-2"
            placeholder="jane@company.com"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="kicker">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="rounded-md border border-[var(--border)] bg-white px-3 py-2.5 text-base outline-none ring-[var(--ring)] transition focus:ring-2"
            placeholder="Tell us what you need..."
          />
        </div>

        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="rounded-md bg-[var(--primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status.kind === "loading" ? "Submitting..." : "Get in touch"}
        </button>

        {status.message ? (
          <p
            className={`text-sm ${
              status.kind === "error" ? "text-red-700" : "text-[var(--muted)]"
            }`}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
