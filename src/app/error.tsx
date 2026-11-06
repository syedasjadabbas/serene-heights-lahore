"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site, tel } from "@/lib/site";

/** Shown instead of a blank screen if a page throws while rendering in the browser. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  const main = site.phones.commercial.numbers[0];
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="eyebrow label in">Something went wrong</div>
        <h1>We hit a snag.</h1>
        <p className="lead">This page didn&apos;t load properly. Try again, or reach our team directly on {main}.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 34 }}>
          <button className="btn" onClick={reset}>Try again</button>
          <Link className="btn btn--ghost" href="/">Back to Home</Link>
          <a className="btn btn--ghost" href={tel(main)}>Call {main}</a>
        </div>
      </div>
    </section>
  );
}
