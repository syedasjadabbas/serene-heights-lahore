"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const devs = [
  {
    name: "Fatir Developers (Pvt) Ltd",
    logo: { src: "/assets/home/pvt.png", w: 460, h: 431 },
    img: "/assets/about/Image2.jpg",
    quote: "A master planner and leading property developer and provider of premier lifestyles, FATIR's strengths lie in its comprehensive capabilities in marketing, post-sales, and construction management — delivering outstanding value to its clients.",
  },
  {
    name: "Falah Developers",
    logo: { src: "/assets/home/falah.png", w: 376, h: 340 },
    img: "/assets/about/Image4.jpg",
    quote: "At Falah Developers, we don't just build projects — we build trust, long-term relationships, and a legacy of integrity.",
  },
  {
    name: "DM Consortium",
    logo: { src: "/assets/home/consortium.png", w: 466, h: 406 },
    img: "/assets/about/Image6.jpg",
    quote: "Prior to commencing vertical construction, DM Consortium achieved remarkable success with the completion of Serene Farms on Barki Road, Lahore — and Serene Heights Hotel & Resorts in Nathia Gali.",
  },
];

export default function DevSlider() {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % devs.length), 6500);
    return () => clearInterval(t);
  }, [tick]);

  const go = (n: number) => { setI(n); setTick((t) => t + 1); };

  return (
    <section className="sec grey">
      <div className="wrap">
        <Reveal className="huge" text="Built by Names You Trust." />
        <div className="devs__grid">
          <div className="reveal-img"><div className="devs__img">
            {devs.map((d, k) => (
              <Image key={d.img} src={d.img} alt={d.name} fill sizes="(max-width: 760px) 100vw, 58vw" className={k === i ? "on" : ""} />
            ))}
          </div></div>
          <div className="devs__panel" data-stagger>
            <div className="devs__top">
              <div className="dots">
                {devs.map((d, k) => (
                  <button key={d.name} className={k === i ? "on" : ""} aria-label={d.name} onClick={() => go(k)}>{k + 1}</button>
                ))}
              </div>
              <span className="quote-mark">”</span>
            </div>
            <div className="devs__progress"><span key={`${i}-${tick}`} /></div>
            <div className="devs__q">
              {devs.map((d, k) => (
                <div key={d.name} className={k === i ? "on" : ""}>
                  <p>&ldquo;{d.quote}&rdquo;</p>
                  <div className="devs__by">
                    <Image src={d.logo.src} alt="" width={d.logo.w} height={d.logo.h} sizes="40px" />
                    {d.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
