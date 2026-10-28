"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Btn from "./Btn";
import HeroVideo from "./HeroVideo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const Fog = ({ warm }: { warm?: boolean }) => (
  <div className={"fog" + (warm ? " fog--warm" : "")}>
    <span /><span /><span /><span /><span /><span />
  </div>
);

/**
 * Pinned hero: video with a band of clouds at the bottom -> clouds rise -> "SERENE"
 * appears with the video showing through the letters -> letters zoom until the video fills the screen.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = root.current!;
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const media = q(".hero__media"), copy = q(".hero__copy"), sky = q(".hero__sky");
    const brand = q(".hero__brand"), mask = q(".hero__mask"), sub = q(".hero__mask-sub");
    const hint = q(".hero__scroll"), target = q(".zoom-target");
    const fogs = el.querySelectorAll<HTMLElement>(".fog");

    // Zoom origin: the stem of the second "E", so the zoom flies through solid letterform.
    const setOrigin = () => {
      const prev = mask.style.transform;
      mask.style.transform = "none";
      const m = mask.getBoundingClientRect(), r = target.getBoundingClientRect();
      mask.style.transform = prev;
      mask.style.transformOrigin = `${r.left - m.left + r.width * 0.2}px ${r.top - m.top + r.height * 0.5}px`;
    };

    const render = (p: number) => {
      // 1. Intro copy lifts away, video starts pushing in.
      copy.style.transform = `translateY(${-seg(p, 0, 0.2) * 140}px)`;
      copy.style.opacity = String(1 - seg(p, 0.05, 0.2));
      hint.style.opacity = String(1 - seg(p, 0, 0.04));
      // 2. Clouds rise from the bottom and swallow the tower.
      fogs.forEach((f, i) => {
        const k = seg(p, 0.04 + i * 0.03, 0.36);
        f.style.transform = `translateY(${(1 - k) * (34 + i * 6) - k * 40}%) scale(${1 + k * 0.4})`;
        f.style.opacity = String(1 - seg(p, 0.48, 0.56));
      });
      sky.style.opacity = String(1 - seg(p, 0.2, 0.35));
      // 3. White layer with the letters fades in, then the letters zoom until the video fills the screen.
      const z = seg(p, 0.52, 0.86);
      const ze = z * z * (3 - 2 * z);
      brand.style.opacity = String(seg(p, 0.26, 0.4) * (1 - seg(p, 0.8, 0.9)));
      mask.style.transform = `scale(${(0.8 + seg(p, 0.26, 0.5) * 0.2) * Math.pow(70, ze)})`;
      sub.style.opacity = String(1 - seg(p, 0.5, 0.58));
      sub.style.transform = `translateY(${seg(p, 0.5, 0.6) * 60}px)`;
      // Video keeps zooming in through the letters, then settles.
      media.style.transform = `scale(${1 + seg(p, 0, 0.5) * 0.15 + ze * 0.25 - seg(p, 0.86, 1) * 0.12})`;
    };

    setOrigin();
    render(0);
    const state = { p: 0 };
    gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: () => render(state.p),
      scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, onRefresh: setOrigin },
    });
    document.fonts?.ready.then(() => { setOrigin(); ScrollTrigger.refresh(); });
  }, { scope: root });

  return (
    <section className="hero" aria-label="Introduction" ref={root}>
      <div className="hero__stage">
        <div className="hero__media">
          <HeroVideo />
        </div>
        <div className="hero__sky" />
        <div className="hero__copy">
          <h1 className="hero__title">A New Standard of Urban Living</h1>
          <p className="hero__sub">Prime address. <b>High demand.</b> Strong value.</p>
          <Btn href="/project" variant="light">Explore the Project</Btn>
        </div>
        <Fog warm />
        <Fog />
        <div className="hero__brand" aria-hidden="true">
          <div className="hero__mask">SER<span className="zoom-target">E</span>NE</div>
          <div className="hero__mask-sub">Heights Lahore</div>
        </div>
        <div className="hero__scroll"><i />Scroll</div>
      </div>
    </section>
  );
}
