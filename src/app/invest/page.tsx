import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Unique investment opportunities at Serene Heights Lahore: high rental demand, capital appreciation, 2-year delivery, smart property units from PKR 2 million and flexible payment plans.",
};

const reasons = [
  { id: "rental", icon: "rental", title: "High Rental Demand", text: "Located on Gulberg Main Boulevard and within walking distance of the CBD, the project benefits from consistent demand from corporates, professionals and hospitality users. Limited premium commercial supply in the area positions the development for strong occupancy and sustainable rental returns." },
  { icon: "capital", title: "Capital Appreciation Potential", text: "Early entry on a prime commercial artery allows investors to benefit from asset appreciation as construction progresses. Historically, well-located commercial developments on Main Boulevard have demonstrated strong capital growth over time." },
  { icon: "professional", title: "Professional In-House Management", text: "All operations, maintenance and facilities are managed through in-house professional management, ensuring consistent service standards, asset upkeep and long-term value preservation — a key consideration for serious investors." },
  { id: "delivery", icon: "assured", title: "Assured Delivery Timeline", text: "With a clearly defined 2-year delivery timeline, investors gain visibility and confidence on execution. Structured milestones and progress transparency ensure the project remains aligned with planned returns and market cycles." },
  { icon: "dedicated", title: "Dedicated Above-Ground Parking", text: "5 dedicated above-ground parking floors with direct access via drive-through ramps. This feature enhances tenant convenience, increases footfall and significantly improves leasing potential." },
  { id: "smart", icon: "low-entry", title: "Low-Entry Smart Property Investment", text: "Invest with as little as PKR 2 million through smart property units, offering the opportunity to become a part-owner of a prime commercial asset on Gulberg Main Boulevard — high-value real estate with lower capital exposure and diversified risk." },
  { icon: "flexible", title: "Flexible Payment Plans", text: "Designed to reduce entry barriers, the project offers investor-friendly and flexible payment plans, allowing capital to be deployed gradually while value builds during construction — better cash-flow management and higher investment comfort." },
];

export default function InvestPage() {
  const main = site.phones.commercial.numbers[0];
  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title={"Unique Investment\nOpportunities."}
        lead="A prime commercial artery, a clear delivery timeline and entry from PKR 2 million — seven reasons investors are choosing Serene Heights Lahore."
        img="/assets/home/building-7-new.jpg"
        alt="Serene Heights Lahore on Gulberg Main Boulevard"
      />

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="split">
            <div className="label">Why Invest</div>
            <Reveal className="huge" text={"Seven Reasons.\nOne Address."} />
          </div>
          <div className="reasons">
            {reasons.map((r, i) => (
              <div className="reason" id={r.id} key={r.title}>
                <span className="reason__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <Image src={`/assets/invest/${r.icon}.png`} alt="" width={112} height={112} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark">
        <div className="wrap">
          <div className="split">
            <div className="label">Smart Property</div>
            <div>
              <Reveal className="huge" text="From PKR 2 Million." />
              <p className="lead" style={{ marginTop: 24, color: "#a9adad" }}>Become a part-owner of a 21-storey commercial landmark — without buying a whole floor. Speak to our team for current availability and payment plans.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                <Btn href="/contact" variant="light">Request Payment Plan</Btn>
                <Btn href={tel(main)} variant="ghost" arrow={false}>Call {main}</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
