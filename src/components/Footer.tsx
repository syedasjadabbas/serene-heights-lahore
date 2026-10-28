"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { site, tel } from "@/lib/site";
import { Arrow } from "./icons";
import { scrollToTop } from "./SmoothScroll";

export default function Footer() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = new FormData(form).get("phone");
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "callback", phone }),
      });
      if (!res.ok) throw new Error();
      setMsg("Thank you — our team will call you shortly.");
      form.reset();
    } catch {
      setMsg(`Sorry, that didn't go through. Please call ${site.phones.commercial.numbers[0]}.`);
    } finally {
      setBusy(false);
    }
  }

  const allPhones = [...site.phones.commercial.numbers, ...site.phones.hospitality.numbers];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <h3>Request a Callback</h3>
            <form className="sub-form" onSubmit={onSubmit}>
              <input name="phone" type="tel" placeholder="Enter your phone number" aria-label="Phone number" required minLength={7} />
              <button aria-label="Submit" disabled={busy}><Arrow /></button>
            </form>
            <div className="sub-ok" aria-live="polite">{msg}</div>
            <div className="footer__info">
              <div><small>Project Site</small><p>Gulberg Main Boulevard,<br />Lahore, Pakistan</p></div>
              <div><small>Email Us</small><a href={`mailto:${site.email}`}>{site.email}</a></div>
              <div>
                <small>Call Us</small>
                {allPhones.map((n) => <a key={n} href={tel(n)}>{n}</a>)}
              </div>
            </div>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            <Link href="/project">The Project</Link>
            <Link href="/amenities">Amenities</Link>
            <Link href="/invest">Invest</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer__soc">
            <a href={site.groupUrl} target="_blank" rel="noopener">Group Website</a>
            <a href="https://wa.me/923041111106" target="_blank" rel="noopener">WhatsApp</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
        <div className="footer__mark" data-in>
          <div className="wm" aria-hidden="true">
            {"SERENE".split("").map((c, i) => <span key={i} style={{ ["--i" as string]: i }}>{c}</span>)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 22 }}>
            <Image src="/assets/logo/serene-white-transp.png" alt="Serene Heights Lahore logo" width={1944} height={2147} sizes="130px" />
            <button className="to-top" onClick={() => scrollToTop()}>Back to top <Arrow /></button>
          </div>
        </div>
        <div className="footer__legal">
          <span>Corporate Office / Commercial: {site.phones.commercial.numbers.join(" · ")}</span>
          <span>Co-Working / Hotel Apartments: {site.phones.hospitality.numbers.join(" · ")}</span>
          <span>A joint venture by Fatir Developers, Falah Developers &amp; DM Consortium</span>
          <span>© {new Date().getFullYear()} Serene Heights Lahore. All Rights Reserved.</span>
          <Image className="lda" src="/assets/home/lda-approved.png" alt="LDA Approved" width={417} height={417} sizes="44px" />
        </div>
      </div>
    </footer>
  );
}
