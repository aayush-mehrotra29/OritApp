import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
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
        source: body.source ?? "",
        userAgent: request.headers.get("user-agent") ?? "",
      }),
    });

    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result?.ok) {
      console.error("Waitlist webhook rejected the submission:", result?.error);
      return NextResponse.json({ ok: false, error: result?.error ?? "upstream_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist webhook request failed:", err);
    return NextResponse.json({ ok: false, error: "network_error" }, { status: 502 });
  }
}
