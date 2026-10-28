import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const type = body.type === "callback" ? "callback" : "enquiry";
  const phone = clean(body.phone, 30);
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  const fields: [string, string][] = [
    ["Name", clean(body.name, 120)],
    ["Phone", phone],
    ["Email", clean(body.email, 160)],
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
    });
    const email = fields.find(([k]) => k === "Email")?.[1];
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
