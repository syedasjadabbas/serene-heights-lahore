"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./icons";
import Honeypot from "./Honeypot";
import { interests, type InterestKey } from "@/lib/site";
import { BASE_PATH } from "@/lib/asset";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const select = useRef<HTMLSelectElement>(null);

  // "Enquire About Offices" etc. link here as /contact?for=offices: preselect that interest.
  useEffect(() => {
    const key = new URLSearchParams(location.search).get("for") as InterestKey | null;
    if (key && key in interests && select.current) select.current.value = interests[key];
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`${BASE_PATH}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", ...Object.fromEntries(new FormData(form)) }),
      });
      // The API explains validation problems ("Please enter a valid phone number"); show that if present.
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} data-stagger>
      <div className="field"><label htmlFor="f-name">Full name</label><input id="f-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} /></div>
      <div className="field full"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" /></div>
      <div className="field full">
        <label htmlFor="f-int">I&apos;m interested in</label>
        <select id="f-int" name="interest" ref={select}>{Object.values(interests).map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="field full"><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" /></div>
      <Honeypot />
      <div className="full">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Enquiry"} <Arrow />
        </button>
      </div>
      <div className="form-ok" aria-live="polite" style={status === "error" ? { color: "#b3261e" } : undefined}>
        {status === "ok" && "Thank you — our team will get back to you shortly."}
        {status === "error" && (error || "Sorry, that didn't go through. Please call 0304-1111106 or email info@sereneheightslahore.com.")}
      </div>
    </form>
  );
}
