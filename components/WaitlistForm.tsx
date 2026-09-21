"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({ idPrefix = "footer-" }: { idPrefix?: string }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const emailId = `${idPrefix}waitlist-email`;
  const noteId = `${idPrefix}waitlist-note`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setNote("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setNote("Adding you to the waitlist…");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: idPrefix }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setNote("Something went wrong. Please try again in a moment.");
        setSubmitting(false);
        return;
      }

      setJoined(true);
      setNote("You're on the list — we'll be in touch.");
      setEmail("");
    } catch {
      setNote("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor={emailId}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          aria-describedby={noteId}
          required
          disabled={joined}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button button-waitlist" type="submit" disabled={submitting || joined}>
          {joined ? "You're in" : submitting ? "Joining…" : "Join waitlist"}
        </button>
      </form>
      <p className="form-note" id={noteId} aria-live="polite">
        {note}
      </p>
    </>
  );
}
