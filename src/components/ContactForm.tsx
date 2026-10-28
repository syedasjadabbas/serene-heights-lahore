"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./icons";

const interests = [
  "Commercial / Retail Floors",
  "Office Floors",
  "Co-Working Floors",
  "Hotel Apartments",
  "Smart Property (from PKR 2 million)",
  "Site Visit",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", ...Object.fromEntries(new FormData(form)) }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" required /></div>
      <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" required minLength={7} /></div>
      <div className="field full"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" /></div>
      <div className="field full">
        <label htmlFor="f-int">I&apos;m interested in</label>
        <select id="f-int" name="interest">{interests.map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="field full"><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" /></div>
      <div className="full">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Enquiry"} <Arrow />
        </button>
      </div>
      <div className="form-ok" aria-live="polite" style={status === "error" ? { color: "#b3261e" } : undefined}>
        {status === "ok" && "Thank you — our team will get back to you shortly."}
        {status === "error" && "Sorry, that didn't go through. Please call 0304-1111106 or email info@sereneheightslahore.com."}
      </div>
    </form>
  );
}
