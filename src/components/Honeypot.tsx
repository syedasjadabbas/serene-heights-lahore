"use client";

import { useEffect, useState } from "react";

/**
 * Bot traps for the enquiry forms (checked in /api/enquiry):
 * - a field people never see, so only bots fill it in;
 * - when the form appeared, since bots submit within a second or two.
 */
export default function Honeypot() {
  const [since, setSince] = useState(0);
  useEffect(() => setSince(Date.now()), []);
  return (
    <>
      <input className="hp" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
      <input type="hidden" name="since" value={since} />
    </>
  );
}
