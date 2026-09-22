"use client";

import { useState, type CSSProperties } from "react";
import { normalizeWaitlistEmail } from "@/lib/waitlist-email";

type FormStatus = "idle" | "invalid" | "submitting" | "joined" | "duplicate" | "error";

const STATUS_NOTES: Record<FormStatus, string> = {
  idle: "",
  invalid: "Please enter a valid email address.",
  submitting: "Checking the waitlist…",
  joined: "You're on the list — we'll be in touch.",
  duplicate: "That email is already on the list.",
  error: "Something went wrong. Please try again in a moment.",
};

const CONFETTI_PIXELS = [
  { left: 9, drift: -25, rise: -49, delay: 20, size: 4, color: "#f2f0e9" },
  { left: 18, drift: -14, rise: -67, delay: 90, size: 3, color: "#8bc4f8" },
  { left: 25, drift: -29, rise: -44, delay: 0, size: 5, color: "#c5c6c8" },
  { left: 32, drift: -8, rise: -79, delay: 45, size: 3, color: "#f2f0e9" },
  { left: 39, drift: -17, rise: -57, delay: 125, size: 4, color: "#ed8d5d" },
  { left: 46, drift: -3, rise: -69, delay: 15, size: 5, color: "#f2f0e9" },
  { left: 54, drift: 8, rise: -83, delay: 100, size: 3, color: "#8bc4f8" },
  { left: 61, drift: 16, rise: -53, delay: 35, size: 4, color: "#d3d2cc" },
  { left: 68, drift: 5, rise: -72, delay: 155, size: 5, color: "#f2f0e9" },
  { left: 75, drift: 24, rise: -48, delay: 60, size: 3, color: "#ed8d5d" },
  { left: 82, drift: 13, rise: -64, delay: 10, size: 4, color: "#f2f0e9" },
  { left: 91, drift: 27, rise: -54, delay: 105, size: 3, color: "#8bc4f8" },
];

export function WaitlistForm({ idPrefix = "footer-" }: { idPrefix?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const submitting = status === "submitting";
  const joined = status === "joined" || status === "duplicate";
  const emailId = `${idPrefix}waitlist-email`;
  const noteId = `${idPrefix}waitlist-note`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = normalizeWaitlistEmail(email);

    if (!normalizedEmail) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setStatus(result?.error === "invalid_email" ? "invalid" : "error");
        return;
      }

      setStatus(result.alreadyJoined ? "duplicate" : "joined");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form className="waitlist-form" data-state={status} aria-busy={submitting} onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor={emailId}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          aria-describedby={noteId}
          aria-invalid={status === "invalid"}
          required
          disabled={submitting || joined}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "invalid" || status === "error") setStatus("idle");
          }}
        />
        <button className="button button-waitlist" type="submit" disabled={submitting || joined}>
          {status === "joined" && (
            <span className="waitlist-confetti" aria-hidden="true">
              {CONFETTI_PIXELS.map((pixel, index) => (
                <i
                  key={index}
                  style={{
                    left: `${pixel.left}%`,
                    width: pixel.size,
                    height: pixel.size,
                    backgroundColor: pixel.color,
                    animationDelay: `${pixel.delay}ms`,
                    "--pixel-drift": `${pixel.drift}px`,
                    "--pixel-rise": `${pixel.rise}px`,
                  } as CSSProperties}
                />
              ))}
            </span>
          )}
          <span className="waitlist-button-content">
            {submitting && <span className="waitlist-spinner" aria-hidden="true" />}
            <span>{joined ? "You're in" : submitting ? "Joining…" : "Join waitlist"}</span>
          </span>
        </button>
      </form>
      <p className="form-note" id={noteId} aria-live="polite">
        {STATUS_NOTES[status] && <span key={status} data-state={status}>{STATUS_NOTES[status]}</span>}
      </p>
    </>
  );
}
