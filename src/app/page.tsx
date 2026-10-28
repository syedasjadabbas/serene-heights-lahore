import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import DevSlider from "@/components/DevSlider";
import ServicesList from "@/components/ServicesList";
import Outro from "@/components/Outro";
import { Arrow } from "@/components/icons";

const chevrons = [
  "/assets/project/Image9.jpg",
  "/assets/project/Image10.jpg",
  "/assets/project/Image5.jpg",
  "/assets/home/building-brand.jpg",
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
          <div className="label">Why Serene Heights</div>
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
            <Btn href="/contact" style={{ marginTop: 30 }}>Book a Site Visit</Btn>
          </div>
          <div>
            <div className="label">Steps:</div>
            <div className="steps__list">
              <div className="step"><span className="step__n">01</span><p>Talk to Our Team. <span>Get the full brief on floors, sizes and pricing from people who know the project inside out.</span></p></div>
              <div className="step"><span className="step__n">02</span><p>Choose Your Space. <span>Commercial, office, co-working or a hotel apartment — pick what fits your goals.</span></p></div>
              <div className="step"><span className="step__n">03</span><p>Move Forward. <span>Lock it in with a flexible payment plan and watch value build as the tower rises.</span></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="split">
            <div className="label">For Investors</div>
            <Reveal className="huge" text="Don't Rent Your Address. Own It." />
          </div>
          <div className="inv">
            <Image className="inv__small parallax" data-speed=".5" src="/assets/project/Image7.jpg" alt="Serene Heights entrance at dusk" width={2200} height={1396} sizes="25vw" />
            <div>
              <Image className="inv__big" src="/assets/home/building-6-new.jpg" alt="Aerial view of Serene Heights Lahore in Gulberg" width={2200} height={1396} sizes="(max-width: 760px) 100vw, 66vw" />
              <p className="inv__text">
                At Serene Heights, you don&apos;t need a whole floor to own a piece of Main Boulevard.{" "}
                <span className="ghost">Invest with as little as PKR 2 million through smart property units and become a part-owner of a prime commercial asset. With a clear 2-year delivery timeline, flexible payment plans and professional in-house management, your capital works while the tower rises — for rental returns today and appreciation tomorrow.</span>
              </p>
              <Btn href="/invest" style={{ marginTop: 28 }}>Explore Investment</Btn>
            </div>
          </div>
        </div>
      </section>

      <DevSlider />

      <section className="sec dark">
        <div className="wrap">
          <div className="split svc__head">
            <div className="label">The Tower</div>
            <Reveal className="huge" text={"How Serene Heights\nWorks for You"} />
          </div>
          <ServicesList />
          <div className="svc__cta">
            <p>Our team guides you through every floor, every size and every payment option with clear, reliable support.</p>
            <div><Btn href="/contact" variant="light">Get Started with Serene Heights</Btn></div>
          </div>
        </div>
      </section>

      <section className="sec dark" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="split">
            <Reveal className="huge" text={"Beyond Buying\nand Owning"} />
            <div>
              <p className="lead">A commercial address is only as good as how it runs. <span style={{ color: "#8d9191" }}>Every service and facility is managed exclusively in-house — consistent standards, accountability and long-term value.</span></p>
              <Btn href="/amenities" variant="light" style={{ marginTop: 24 }}>Discover the Amenities</Btn>
            </div>
          </div>
          <div className="cards">
            {cards.map((c) => (
              <Link key={c.title} className="card" href={c.href}>
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
          <div className="split">
            <Reveal className="huge" text={"Investment\nHighlights"} />
            <div>
              <p className="lead">Why investors are choosing Gulberg Main Boulevard — and why now is the time to enter.</p>
              <Btn href="/invest" style={{ marginTop: 24 }}>See All Opportunities</Btn>
            </div>
          </div>
          <div className="posts">
            {posts.map((p) => (
              <Link key={p.title} className="post fade-up" href={p.href}>
                <div className="post__img"><Image src={p.img} alt="" width={1600} height={1200} sizes="(max-width: 760px) 100vw, 33vw" /></div>
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
          <div className="dir__cols">
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
