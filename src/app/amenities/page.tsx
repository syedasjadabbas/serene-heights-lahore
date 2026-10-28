import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Outro from "@/components/Outro";

export const metadata: Metadata = {
  title: "Design & Amenities",
  description:
    "Architecture, services and amenities at Serene Heights Lahore: 24/7 security, high-speed elevators, 5 parking floors, EV charging, gym, rooftop helipad and in-house management.",
};

const chevrons = [
  "/assets/chev/am1.webp",
  "/assets/chev/brand.webp",
  "/assets/chev/p11.webp",
  "/assets/chev/b8.webp",
];

const groups = [
  { icon: "safety", title: "Safety & Security", items: ["24/7 security with comprehensive CCTV surveillance", "Manned reception and lobby concierge", "Fire detection systems with clearly marked emergency exits"] },
  { icon: "access", title: "Access, Mobility & Parking", items: ["High-speed elevators with destination control", "Private driveway access up to 5 floors", "Ample multi-level parking across 5 dedicated floors", "Wheelchair accessibility with dedicated ramps"] },
  { icon: "infra", title: "Infrastructure & Utilities", items: ["Uninterrupted power supply", "Energy-efficient lighting systems", "High-speed internet and fiber-optic connectivity", "Electric vehicle (EV) charging stations"] },
  { icon: "business", title: "Business & Corporate", items: ["Business center and co-working spaces", "Meeting and conference halls for corporate offices", "Lounge for professionals and guests"] },
  { icon: "lifestyle", title: "Lifestyle & Convenience", items: ["Coffee shops and food courts", "Fitness center / Gym", "Rooftop helipad"] },
  { icon: "operations", title: "Operations & Management", items: ["Dedicated in-house maintenance support", "Centralized facility helpdesk"] },
];

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        id="architecture"
        eyebrow="Architecture"
        title={"Modern by Design.\nIconic by Presence."}
        lead="The architectural expression of the building reflects contemporary design, clean geometry and corporate sophistication. A sleek modern façade, defined by vertical elements and expansive glass panels, creates a commanding presence while maintaining visual elegance."
        img="/assets/amenities/amenities-2-new.jpg"
        alt="Serene Heights Lahore façade detail"
      />

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap split">
          <div className="label">The Façade</div>
          <div>
            <Reveal as="p" mode="words" className="big" text="Designed to stand out without excess, the structure balances transparency and solidity — allowing natural light to flow through workspaces while reinforcing a strong, professional identity from the outside." />
            <p className="lead" style={{ marginTop: 30, color: "#5f6464" }}>The layered façade treatment adds depth and character, ensuring the building remains visually striking from every angle. At street level, the design enhances approachability and accessibility, while upper levels project stature and exclusivity — reinforcing the building&apos;s position as a premium commercial landmark.</p>
          </div>
        </div>
      </section>

      <section className="arrows" style={{ paddingBottom: 100 }}>
        <div className="wrap">
          <Reveal className="arrows__title" text="A statement of credibility." start={0.95} end={0.6} />
          <div className="arrows__row" aria-hidden="true">
            {chevrons.map((src) => <div key={src} className="chev" style={{ backgroundImage: `url(${src})` }} />)}
          </div>
          <Reveal as="p" mode="words" className="arrows__text" start={0.95} end={0.65} text="Purposefully crafted to appeal to corporates, investors and high-end occupiers, the architecture is not just aesthetic — it is a statement of permanence and forward-thinking design." />
        </div>
      </section>

      <section className="sec dark" id="services">
        <div className="wrap">
          <div className="split">
            <div className="label">Services &amp; Amenities</div>
            <div>
              <Reveal className="huge" text={"Everything a Modern\nBusiness Needs."} />
              <p className="lead" style={{ marginTop: 24, color: "#a9adad" }}>Designed to support modern business, hospitality and lifestyle needs, the project offers a comprehensive range of professionally managed facilities — ensuring comfort, efficiency and long-term value.</p>
            </div>
          </div>
          <div className="amen" data-stagger>
            {groups.map((g) => (
              <div className="amen__item" key={g.title}>
                <Image src={`/assets/amenities/${g.icon}.png`} alt="" width={48} height={48} />
                <h3>{g.title}</h3>
                <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="assure" data-stagger>
            <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-.02em" }}>Management Assurance</h3>
            <p>All services and facilities will be managed exclusively by in-house management, ensuring consistent standards, accountability and operational control. No unions or third-party operators are involved in day-to-day management.</p>
          </div>
        </div>
      </section>

      <Outro img="/assets/amenities/amenities-1-new.jpg" title="See It for Yourself." ghost="Visit Gulberg Main Boulevard." cta="Book a Visit" href="/contact" />
    </>
  );
}
