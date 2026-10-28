import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Outro from "@/components/Outro";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Serene Heights Lahore — Gulberg Main Boulevard, Lahore. Corporate office / commercial: 0304-1111106. Co-working / hotel apartments: 0321-4979446, 0300-8497999.",
};

export default function ContactPage() {
  const groups = [site.phones.commercial, site.phones.hospitality];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us Today."
        lead="Book a site visit, request a payment plan, or ask about a specific floor. Our team will get back to you shortly."
      />

      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap contact">
          <div className="c-list" data-stagger>
            {groups.flatMap((g) =>
              g.numbers.map((n) => (
                <a key={n} href={tel(n)}><small>{g.label}</small><b>{n}</b></a>
              ))
            )}
            <a href={`mailto:${site.email}`}><small>Email</small><b>{site.email}</b></a>
            <div><small>Project Site</small><b>Gulberg Main Boulevard, Lahore</b></div>
          </div>
          <ContactForm />
        </div>
        <div className="wrap">
          <div className="reveal-img" style={{ marginTop: 70 }}>
          <iframe
            className="map"
            style={{ marginTop: 0, display: "block" }}
            title="Map of Gulberg Main Boulevard, Lahore"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Main+Boulevard+Gulberg,+Lahore&output=embed"
          />
          </div>
        </div>
      </section>

      <Outro img="/assets/contact/contact-1.jpg" title="A Landmark Address." ghost="Waiting for You." cta="Call Now" href={tel(site.phones.commercial.numbers[0])} />
    </>
  );
}
