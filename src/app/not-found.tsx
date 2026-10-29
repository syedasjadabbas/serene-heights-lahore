import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Btn from "@/components/Btn";
import { nav, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  const main = site.phones.commercial.numbers[0];
  return (
    <>
      <PageHero
        eyebrow="404"
        title={"This Floor\nDoesn't Exist."}
        lead="The page you were looking for has moved or never existed. Every other floor of Serene Heights Lahore is just a click away."
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn href="/">Back to Home</Btn>
            <Btn href={tel(main)} variant="ghost" arrow={false}>Call {main}</Btn>
          </div>
          <div className="nf-links" data-stagger>
            {nav.filter((n) => !n.href.includes("#")).map((n) => (
              <Link key={n.href} href={n.href}>{n.label} <span aria-hidden="true">→</span></Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
