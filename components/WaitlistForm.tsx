"use client";

import { useState } from "react";

const WAITLIST_URL = "https://tally.so/r/OD6zzY";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setNote("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setNote("Taking you to the waitlist…");
    const params = new URLSearchParams({ email: trimmed });
    window.location.href = `${WAITLIST_URL}?${params.toString()}`;
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          aria-describedby="waitlist-note"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button button-waitlist" type="submit" disabled={submitting}>
          {submitting ? "Opening…" : "Join waitlist"}
        </button>
      </form>
      <p className="form-note" id="waitlist-note" aria-live="polite">
        {note}
      </p>
    </>
  );
}
