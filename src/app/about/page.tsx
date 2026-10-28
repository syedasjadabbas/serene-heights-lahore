import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Outro from "@/components/Outro";

export const metadata: Metadata = {
  title: "About",
  description: "Serene Heights Lahore is a joint venture by Fatir Developers, Falah Developers and DM Consortium.",
};

const partners = [
  {
    name: "Fatir Developers (Pvt) Ltd", logo: { src: "/assets/home/pvt.png", w: 460, h: 431 },
    a: { src: "/assets/about/Image1.jpg", w: 756, h: 854 }, b: { src: "/assets/about/Image2.jpg", w: 1512, h: 855 },
    text: "By extending its expertise in master-planned real estate projects nationwide, FATIR has established a significant presence in real estate across the nation. A master planner and leading property developer and provider of premier lifestyles, FATIR's strengths lie in its comprehensive capabilities in marketing, post-sales and construction management, delivering outstanding and exceptional value to its clients.",
  },
  {
    name: "Falah Developers", logo: { src: "/assets/home/falah.png", w: 376, h: 340 },
    a: { src: "/assets/about/Image3.jpg", w: 701, h: 854 }, b: { src: "/assets/about/Image4.jpg", w: 1512, h: 855 },
    text: "At Falah Developers, we don't just build projects — we build trust, long-term relationships, and a legacy of integrity.",
  },
  {
    name: "DM Consortium", logo: { src: "/assets/home/consortium.png", w: 466, h: 406 },
    a: { src: "/assets/about/Image5.jpg", w: 701, h: 854 }, b: { src: "/assets/about/Image6.jpg", w: 1512, h: 855 },
    text: "Prior to commencing vertical construction, DM Consortium achieved remarkable success with the completion of a horizontal development project named Serene Farms, situated on Barki Road in Lahore.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={"A New Benchmark for\nCommercial Excellence."}
        lead="Serene Heights Lahore is envisioned as a future-ready commercial destination that reflects ambition, credibility and progress — one of its kind mixed-use development in the heart of Downtown Lahore."
        img="/assets/home/building-brand.jpg"
        alt="Serene Heights Lahore entrance"
      />

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap split">
          <div className="label">Luxury That Rises With Purpose</div>
          <Reveal as="p" mode="words" className="big" text="Three developers. One landmark. Serene Heights Lahore brings together nationwide master-planning experience, a legacy of integrity, and a proven delivery record — on Gulberg Main Boulevard." />
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="split" style={{ marginBottom: 40 }}>
            <div className="label">Joint Venture By</div>
            <Reveal className="huge" text="The Developers" />
          </div>
          {partners.map((p, i) => (
            <div key={p.name} style={i ? { marginTop: 60 } : undefined}>
              <div className="partner">
                <Image src={p.logo.src} alt={`${p.name} logo`} width={p.logo.w} height={p.logo.h} sizes="120px" style={{ width: "auto" }} />
                <div><h3>{p.name}</h3><p>{p.text}</p></div>
              </div>
              <div className="about-blocks">
                <div className="ab">
                  <div className="ab__a"><Image src={p.a.src} alt={p.name} width={p.a.w} height={p.a.h} sizes="(max-width: 760px) 100vw, 36vw" /></div>
                  <div><Image src={p.b.src} alt={`${p.name} project`} width={p.b.w} height={p.b.h} sizes="(max-width: 760px) 100vw, 64vw" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Outro img="/assets/project/Image12.jpg" title="Built on Trust." ghost="Rising on Main Boulevard." cta="Talk to Our Team" href="/contact" />
    </>
  );
}
