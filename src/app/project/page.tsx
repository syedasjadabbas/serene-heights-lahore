import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import Outro from "@/components/Outro";

export const metadata: Metadata = {
  title: "The Project",
  description:
    "Project overview and building configuration of Serene Heights Lahore: Lower Ground + 6 commercial floors, 5 parking floors, 7 office floors, 2 co-working floors and 2 hotel apartment floors.",
};

const stats = [
  ["LG+6", "Commercial Floors"],
  ["5", "Parking Floors"],
  ["7", "Office Floors"],
  ["2", "Co-Working Floors"],
  ["2", "Hotel Apartment Floors"],
];

const floors = [
  {
    id: "commercial", tag: "Lower Ground + 6", title: "Commercial", img: "/assets/project/Image3_v2.jpg", cta: "Enquire About Retail",
    body: [
      "One of Gulberg's most persistent commercial challenges has always been parking accessibility — a factor that directly impacts footfall, tenant demand and property value. This project redefines that experience.",
      "Designed with multiple parking levels and drive-through ramps, the building allows vehicular access to almost all floors, significantly reducing congestion and eliminating the inconvenience typically associated with high-density commercial areas.",
      "By solving a critical urban limitation, the project doesn't just compete in Gulberg — it sets a new benchmark for commercial developments.",
    ],
  },
  {
    id: "offices", tag: "×7 Office Floors", title: "Office", img: "/assets/project/Image6_1.jpg", plan: { src: "/assets/project/Image6_2.png", w: 260, h: 638 }, cta: "Enquire About Offices",
    body: [
      "Located at the heart of Lahore's most active commercial district, the office floors offer businesses an address that delivers visibility, accessibility and influence. Operating from Gulberg's central corridor places your business within immediate reach of key clients, partners and decision-makers.",
      "This strategic positioning enhances brand presence, improves operational efficiency and provides a competitive edge — allowing businesses not just to operate, but to lead and dominate in their market.",
    ],
  },
  {
    id: "coworking", tag: "×2 Co-Working Floors", title: "Co-Working", img: "/assets/project/Image8_1.jpg", plan: { src: "/assets/project/Image8_2.png", w: 244, h: 633 }, cta: "Enquire About Co-Working",
    body: [
      "Designed for modern professionals and growing businesses, the co-working floors offer flexible, fully equipped workspaces in the heart of Gulberg. Shared amenities, collaborative zones and private suites create an environment that supports productivity, networking and scalability.",
      "Whether for startups, freelancers or established teams seeking a premium address without long-term commitment, these floors deliver convenience, community and commercial value in one smart workplace solution.",
    ],
  },
  {
    id: "hotel", tag: "×2 Apartment Floors", title: "Hotel", word: "Apartments", img: "/assets/project/Image9.jpg", cta: "Enquire About Apartments",
    body: [
      "Designed as a true home away from home, these fully furnished serviced apartments combine comfort with income potential. Operated under a professional hospitality model, they allow owners to enjoy personal stays while generating rental returns during high-demand periods.",
      "A seamless blend of lifestyle convenience and investment performance — offering both use and ROI from a single smart asset.",
    ],
  },
];

export default function ProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="The Project"
        title={"Where Vision Meets\nVertical Excellence."}
        lead="The project offers investors an address with exceptional visibility, seamless connectivity and sustained demand — ideal for corporate offices, professional firms and commercial occupiers."
        img="/assets/project/image-1-new.jpg"
        alt="Serene Heights Lahore facade on Gulberg Main Boulevard"
      />

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap split">
          <div className="label">Project Overview</div>
          <Reveal as="p" mode="words" className="big" text="With direct access from a major arterial road and proximity to Lahore's leading business and retail hubs, the development is positioned for long-term capital appreciation and consistent rental potential. A landmark commercial investment in one of Lahore's most sought-after business districts." />
        </div>
      </section>

      <section className="sec dark" id="configuration">
        <div className="wrap">
          <div className="split" style={{ marginBottom: 60 }}>
            <div className="label">Building Configuration</div>
            <div>
              <Reveal className="huge" text={"21 Storeys.\nFive Ways to Own."} />
              <p className="lead" style={{ marginTop: 24, color: "#a9adad" }}>Designed as a mixed-use vertical development, the building includes Lower Ground + 6 commercial floors, 5 parking floors, 7 office floors, 2 co-working floors and 2 hotel apartment floors.</p>
            </div>
          </div>
          <div className="stats" data-stagger>
            {stats.map(([n, l]) => <div className="stat" key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
          <div className="reveal-img" style={{ marginTop: 60 }}>
            <Image src="/assets/project/Image2.jpg" alt="Exploded view of the building's floor configuration" width={1512} height={851} sizes="100vw" style={{ width: "100%", height: "auto", background: "#fff" }} />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          {floors.map((f) => (
            <article className="floor" id={f.id} key={f.id}>
              <div className="floor__media reveal-img">
                <Image src={f.img} alt={`${f.title} ${f.word ?? "floors"}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
                {f.plan && (
                  <div className="floor__plan">
                    <Image src={f.plan.src} alt={`${f.title} floor plan`} width={f.plan.w} height={f.plan.h} sizes="160px" style={{ width: "100%", height: "auto" }} />
                  </div>
                )}
              </div>
              <div data-stagger>
                <div className="floor__tag">{f.tag}</div>
                <h2>{f.title} <em>{f.word ?? "Floors"}</em></h2>
                {f.body.map((t) => <p key={t.slice(0, 20)}>{t}</p>)}
                <Btn href="/contact">{f.cta}</Btn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="split">
            <div className="label">Location</div>
            <div>
              <Reveal className="huge" text={"A Landmark Address\nfor Business."} />
              <p className="lead" style={{ marginTop: 24, color: "#5f6464" }}>Strategically located on Gulberg Main Boulevard, this 21-storey commercial high-rise sits within walking distance of Lahore&apos;s Central Business District, placing it at the centre of the city&apos;s most active commercial zone.</p>
            </div>
          </div>
          <div className="reveal-img" style={{ marginTop: 60 }}>
            <Image src="/assets/home/building-3.jpg" alt="Location map: Model Town, Kalma Underpass, CBD and Main Boulevard" width={1432} height={867} sizes="100vw" style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      <Outro img="/assets/project/Image4.jpg" title="Find Your Floor." ghost="We'll Walk You Through It." cta="Book a Site Visit" href="/contact" />
    </>
  );
}
