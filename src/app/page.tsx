import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import DevSlider from "@/components/DevSlider";
import ServicesList from "@/components/ServicesList";
import Outro from "@/components/Outro";
import { enquire } from "@/lib/site";
import StatsBand from "@/components/StatsBand";
import { Arrow } from "@/components/icons";

const chevrons = [
  "/assets/chev/p9.webp",
  "/assets/chev/p10.webp",
  "/assets/chev/p5.webp",
  "/assets/chev/brand.webp",
];

const steps = [
  ["Talk to Our Team.", "Get the full brief on floors, sizes and pricing from people who know the project inside out."],
  ["Choose Your Space.", "Commercial, office, co-working or a hotel apartment — pick what fits your goals."],
  ["Move Forward.", "Lock it in with a flexible payment plan and watch value build as the tower rises."],
];

const cards = [
  { href: "/project#configuration", img: "/assets/project/image-1-new.jpg", title: "Building Configuration", text: "21 storeys: retail, parking, offices, co-working & hotel apartments." },
  { href: "/amenities#services", img: "/assets/amenities/amenities-1-new.jpg", title: "Amenities & Services", text: "Security, high-speed elevators, EV charging, gym, rooftop helipad." },
  { href: "/amenities#architecture", img: "/assets/amenities/amenities-2-new.jpg", title: "Modern Architecture", text: "Clean geometry, vertical elements and expansive glass." },
];

const posts = [
  { href: "/invest#rental", img: "/assets/home/building-7-new.jpg", tag: "Rental Demand", title: "High Rental Demand Next to the CBD", text: "Consistent demand from corporates, professionals and hospitality users — with limited premium supply nearby." },
  { href: "/invest#smart", img: "/assets/home/building-8-new.jpg", tag: "Smart Property", title: "Own a Share from PKR 2 Million", text: "Smart property units let you become a part-owner of a prime commercial asset with lower capital exposure." },
  { href: "/invest#delivery", img: "/assets/project/Image2.jpg", tag: "Delivery", title: "A Clear 2-Year Delivery Timeline", text: "Structured milestones and progress transparency keep the project aligned with planned returns." },
];

const directory = [
  { title: "Commercial", links: [["/project#commercial", "Lower Ground + 6 Commercial Floors"], ["/project#commercial", "5 Parking Floors"], ["/project#commercial", "Drive-Through Ramps"]] },
  { title: "Business", links: [["/project#offices", "7 Office Floors"], ["/project#coworking", "2 Co-Working Floors"], ["/amenities#services", "Meeting & Conference Halls"]] },
  { title: "Hospitality", links: [["/project#hotel", "2 Hotel Apartment Floors"], ["/amenities#services", "Fitness Center"], ["/amenities#services", "Rooftop Helipad"]] },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="sec">
        <div className="wrap split">
          <div><div className="label">Why Serene Heights</div></div>
          <Reveal as="p" mode="words" className="big" text="Lahore's skyline is rising. Don't just buy space — own an address. A 21-storey landmark on Gulberg Main Boulevard, within walking distance of the Central Business District." />
        </div>
      </section>

      <section className="arrows">
        <div className="wrap">
          <Reveal className="arrows__title" text="This isn't just about real estate." start={0.95} end={0.6} />
          <div className="arrows__row" aria-hidden="true">
            {chevrons.map((src) => <div key={src} className="chev" style={{ backgroundImage: `url(${src})` }} />)}
          </div>
          <Reveal as="p" mode="words" className="arrows__text" start={0.95} end={0.65} text="It's about visibility. Access. Lasting value. You're not just looking for a unit. You're looking for a landmark. That's what we built on Main Boulevard." />
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <Reveal className="huge" text={"Real Estate,\nElevated."} />
            <Btn href={enquire("visit")} style={{ marginTop: 30 }}>Book a Site Visit</Btn>
          </div>
          <div>
            <div className="label">Steps</div>
            <div className="steps__list" data-stagger style={{ borderTop: 0 }}>
              {steps.map(([title, text], i) => (
                <div className="step draw" key={title}>
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{title} <span>{text}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "clamp(70px, 9vw, 130px)" }}>
          <div className="label" style={{ marginBottom: 8 }}>By the Numbers</div>
          <StatsBand />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="split">
            <div><div className="label">For Investors</div></div>
            <Reveal className="huge" text="Don't Rent Your Address. Own It." />
          </div>
          <div className="inv">
            <div className="inv__small reveal-img parallax" data-speed=".5">
              <Image src="/assets/project/Image7.jpg" alt="Serene Heights entrance at dusk" fill sizes="25vw" />
            </div>
            <div>
              <div className="inv__big reveal-img" style={{ ["--d" as string]: ".15s" }}>
                <Image src="/assets/home/building-6-new.jpg" alt="Aerial view of Serene Heights Lahore in Gulberg" fill sizes="(max-width: 760px) 100vw, 66vw" />
              </div>
              <div data-stagger>
                <p className="inv__text">
                  At Serene Heights, you don&apos;t need a whole floor to own a piece of Main Boulevard.{" "}
                  <span className="ghost">Invest with as little as PKR 2 million through smart property units and become a part-owner of a prime commercial asset. With a clear 2-year delivery timeline, flexible payment plans and professional in-house management, your capital works while the tower rises — for rental returns today and appreciation tomorrow.</span>
                </p>
                <div><Btn href="/invest" style={{ marginTop: 28 }}>Explore Investment</Btn></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DevSlider />

      <section className="sec dark">
        <div className="wrap">
          <div className="split svc__head">
            <div><div className="label">The Tower</div></div>
            <Reveal className="huge" text={"How Serene Heights\nWorks for You"} />
          </div>
          <ServicesList />
          <div className="svc__cta" data-stagger>
            <p>Our team guides you through every floor, every size and every payment option with clear, reliable support.</p>
            <div><Btn href="/contact" variant="light">Get Started with Serene Heights</Btn></div>
          </div>
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="head-row">
            <Reveal className="huge" text={"Beyond Buying\nand Owning"} />
            <div data-stagger>
              <p className="lead">A commercial address is only as good as how it runs. <span style={{ color: "#8d9191" }}>Every service and facility is managed exclusively in-house — consistent standards, accountability and long-term value.</span></p>
              <div><Btn href="/amenities" variant="light" style={{ marginTop: 24 }}>Discover the Amenities</Btn></div>
            </div>
          </div>
          <div className="cards">
            {cards.map((c, i) => (
              <Link key={c.title} className="card reveal-img" href={c.href} style={{ ["--d" as string]: `${i * 0.12}s` }}>
                <Image src={c.img} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                <div><h3>{c.title}</h3><p>{c.text}</p></div>
                <span className="btn">Learn More <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec grey">
        <div className="wrap">
          <div className="head-row">
            <Reveal className="huge" text={"Investment\nHighlights"} />
            <div data-stagger>
              <p className="lead">Why investors are choosing Gulberg Main Boulevard — and why now is the time to enter.</p>
              <div><Btn href="/invest" style={{ marginTop: 24 }}>See All Opportunities</Btn></div>
            </div>
          </div>
          <div className="posts" data-stagger>
            {posts.map((p, i) => (
              <Link key={p.title} className="post" href={p.href}>
                <div className="post__img reveal-img" style={{ ["--d" as string]: `${i * 0.12}s` }}>
                  <Image src={p.img} alt="" width={1600} height={1200} sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="post__date">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className="more">Read More <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Outro img="/assets/project/Image12.jpg" title="Own the Address." ghost="We'll Help You Get There." cta="Let's Get Started" href="/contact" />

      <section className="dir">
        <div className="wrap">
          <div className="dir__head">
            <h2>21 storeys on Gulberg Main Boulevard</h2>
            <Link href="/project#configuration">Explore the full building →</Link>
          </div>
          <div className="dir__cols" data-stagger>
            {directory.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map(([href, label]) => <Link key={label} href={href}>{label}</Link>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
