// A practical, deliberately conservative address check for the waitlist.
// The leading character cannot be "=", which would be treated as a formula in Sheets.
const EMAIL_RE = /^[a-z0-9_%+-]+(?:\.[a-z0-9_%+-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function normalizeWaitlistEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  const [local, domain] = email.split("@");
  if (
    email.length > 254 ||
    !local || local.length > 64 ||
    !domain || domain.length > 253 ||
    !EMAIL_RE.test(email)
  ) {
    return null;
  }
  return email;
}
