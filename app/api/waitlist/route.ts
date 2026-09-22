import { NextResponse } from "next/server";
import { normalizeWaitlistEmail } from "@/lib/waitlist-email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const submittedEmail = body && typeof body === "object" && "email" in body ? body.email : null;
  const email = typeof submittedEmail === "string" ? normalizeWaitlistEmail(submittedEmail) : null;
  if (!email) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.WAITLIST_WEBHOOK_SECRET;

  if (!webhookUrl || !secret) {
    console.error("Waitlist is not configured: missing GOOGLE_SHEETS_WEBHOOK_URL or WAITLIST_WEBHOOK_SECRET.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        email,
      }),
    });

    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result?.ok) {
      console.error("Waitlist webhook rejected the submission:", result?.error);
      return NextResponse.json({ ok: false, error: result?.error ?? "upstream_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, alreadyJoined: result.alreadyJoined === true });
  } catch (err) {
    console.error("Waitlist webhook request failed:", err);
    return NextResponse.json({ ok: false, error: "network_error" }, { status: 502 });
  }
}
