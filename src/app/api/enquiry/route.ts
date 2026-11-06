import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

// Spam guards. Bots that trip them get a normal-looking "ok", so they don't learn to adapt.
const MIN_FILL_MS = 2500;          // people take longer than this to fill a form in
const LIMIT = 5, WINDOW_MS = 10 * 60_000; // at most 5 enquiries per visitor per 10 minutes
const recent = new Map<string, number[]>(); // per server instance; enough to stop a burst
const MAX_BODY_BYTES = 16_000;     // a filled-in form is ~1 KB; refuse anything far bigger before parsing
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear(); // keep memory bounded
  return hits.length > LIMIT;
}

/** Browsers always send Origin on a cross-site POST: refuse forms posted from other websites. */
function fromOtherSite(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== req.headers.get("host");
  } catch {
    return true;
  }
}

export async function POST(req: Request) {
  if (fromOtherSite(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) throw new Error("too large"); // Content-Length can be absent or wrong
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const since = Number(body.since);
  if (clean(body.company) || !since || Date.now() - since < MIN_FILL_MS) {
    console.warn("[enquiry] dropped: looks automated");
    return NextResponse.json({ ok: true });
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (tooMany(ip)) {
    return NextResponse.json({ error: "Too many requests — please call us instead." }, { status: 429 });
  }

  const type = body.type === "callback" ? "callback" : "enquiry";
  const phone = clean(body.phone, 30);
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  const email = clean(body.email, 160);
  if (email && !EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  const fields: [string, string][] = [
    ["Name", clean(body.name, 120)],
    ["Phone", phone],
    ["Email", email],
    ["Interest", clean(body.interest, 120)],
    ["Message", String(body.message ?? "").trim().slice(0, 4000)],
  ].filter(([, v]) => v) as [string, string][];

  const subject = type === "callback"
    ? `Callback request — ${phone}`
    : `Website enquiry — ${fields.find(([k]) => k === "Interest")?.[1] ?? "Serene Heights Lahore"}`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Not configured yet (e.g. local dev): log so enquiries aren't silently lost.
    console.warn("[enquiry] SMTP not configured — enquiry not emailed:\n" + subject + "\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const port = Number(SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Fail within the request instead of hanging it if the mail server stalls.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transporter.sendMail({
      from: `"Serene Heights Lahore Website" <${SMTP_USER}>`,
      to: ENQUIRY_TO || "info@sereneheightslahore.com",
      replyTo: email || undefined,
      subject,
      text,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
}
