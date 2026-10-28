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
const smooth = (t: number) => t * t * (3 - 2 * t);

const TITLE = "A New Standard of Urban Living";
const BRAND = ["S", "E", "R", "E", "N", "E"];
const ZOOM_LETTER = 3; // second "E": the zoom flies through its stem

// Three depth layers of cloud: back (slow, faint) -> front (fast, dense).
const CLOUD_LAYERS = ["back", "mid", "front"] as const;
const Cloud = ({ depth }: { depth: (typeof CLOUD_LAYERS)[number] }) => (
  <div className={`fog fog--${depth}`}>
    <span /><span /><span /><span /><span /><span />
  </div>
);

/**
 * Pinned hero.
 * On load: video settles from a slow zoom, the headline rises word by word, clouds drift.
 * On scroll: headline floats away -> clouds rise in layers and swallow the tower ->
 * "SERENE" letters rise with the video showing through them -> the letters zoom until the video fills the screen.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = root.current!;
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const intro = q(".hero__media-in"), copy = q(".hero__copy");
    const sky = q(".hero__sky"), clouds = q(".clouds"), hint = q(".hero__scroll");
    const words = qa(".hero__title .wd > span");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Load-in ---------- */
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (reduced) {
      tl.set([words, ".hero__sub", ".hero__copy .btn", hint, clouds], { y: 0, opacity: 1, filter: "none" });
    } else {
      tl.fromTo(intro, { scale: 1.28 }, { scale: 1, duration: 3.2, ease: "power3.out" }, 0)
        .fromTo(sky, { opacity: 1 }, { opacity: 0.55, duration: 2.4, ease: "power2.out" }, 0)
        .to(words, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.07 }, 0.35)
        .to(".hero__sub", { y: 0, opacity: 1, duration: 1.2 }, 0.95)
        .to(".hero__copy .btn", { y: 0, opacity: 1, scale: 1, duration: 1.1 }, 1.1)
        .to(hint, { opacity: 1, duration: 1 }, 1.5)
        .fromTo(clouds, { yPercent: 25, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 2.8, ease: "power2.out" }, 0.1);
    }

    /* ---------- Pointer parallax (desktop) ---------- */
    if (!reduced && matchMedia("(hover: hover)").matches) {
      const vx = gsap.quickTo(intro, "x", { duration: 1.6, ease: "power3.out" });
      const vy = gsap.quickTo(intro, "y", { duration: 1.6, ease: "power3.out" });
      const cx = gsap.quickTo(clouds, "x", { duration: 2, ease: "power3.out" });
      const tx = gsap.quickTo(copy, "x", { duration: 1.8, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        vx(nx * -22); vy(ny * -14); cx(nx * 40); tx(nx * 10);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }
  }, { scope: root });

  useGSAP(() => {
    const el = root.current!;
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const media = q(".hero__media"), copyIn = q(".hero__copy-in"), sky = q(".hero__sky");
    const brand = q(".hero__brand"), mask = q(".hero__mask"), sub = q(".hero__mask-sub");
    const hint = q(".hero__scroll .hint-in");
    const fogs = qa(".fog"), letters = qa(".hero__mask .lt");
    const target = letters[ZOOM_LETTER];

    const setOrigin = () => {
      const prev = mask.style.transform;
      mask.style.transform = "none";
      const m = mask.getBoundingClientRect(), r = target.getBoundingClientRect();
      mask.style.transform = prev;
      mask.style.transformOrigin = `${r.left - m.left + r.width * 0.2}px ${r.top - m.top + r.height * 0.5}px`;
    };

    const render = (p: number) => {
      // 1. Headline floats up and softens away; video pushes in.
      const out = seg(p, 0, 0.22);
      copyIn.style.transform = `translateY(${-smooth(out) * 180}px) scale(${1 - out * 0.06})`;
      copyIn.style.opacity = String(1 - seg(p, 0.04, 0.2));
      copyIn.style.filter = `blur(${seg(p, 0.06, 0.22) * 10}px)`;
      hint.style.opacity = String(1 - seg(p, 0, 0.04));
      // 2. Clouds rise in depth layers: the front layer moves fastest.
      fogs.forEach((f, i) => {
        const k = smooth(seg(p, 0.03 + i * 0.025, 0.38 - (2 - i) * 0.03));
        const travel = 90 + i * 35;
        f.style.transform = `translateY(${-k * travel}%) scale(${1 + k * (0.3 + i * 0.15)})`;
        // Fade out under the white layer, so the letters show the video and not the clouds.
        f.style.opacity = String(1 - seg(p, 0.32, 0.4));
      });
      sky.style.transform = `translateY(${-seg(p, 0, 0.3) * 8}%)`;
      // 3. White layer fades in; letters rise one by one with the video showing through.
      brand.style.opacity = String(seg(p, 0.26, 0.38) * (1 - seg(p, 0.8, 0.9)));
      letters.forEach((l, i) => {
        const k = smooth(seg(p, 0.28 + i * 0.022, 0.42 + i * 0.022));
        l.style.transform = `translateY(${(1 - k) * 70}%)`;
        l.style.opacity = String(0.15 + k * 0.85);
      });
      sub.style.opacity = String(seg(p, 0.4, 0.46) * (1 - seg(p, 0.5, 0.58)));
      sub.style.transform = `translateY(${(1 - seg(p, 0.4, 0.48)) * 30 + seg(p, 0.5, 0.6) * 60}px)`;
      // 4. Zoom through the letters until the video fills the screen.
      const ze = smooth(seg(p, 0.52, 0.86));
      mask.style.transform = `scale(${(0.82 + seg(p, 0.3, 0.5) * 0.18) * Math.pow(70, ze)})`;
      media.style.transform = `scale(${1 + seg(p, 0, 0.5) * 0.15 + ze * 0.25 - seg(p, 0.86, 1) * 0.12})`;
    };

    setOrigin();
    render(0);
    const state = { p: 0 };
    gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: () => render(state.p),
      scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.4, onRefresh: setOrigin },
    });
    document.fonts?.ready.then(() => { setOrigin(); ScrollTrigger.refresh(); });
  }, { scope: root });

  return (
    <section className="hero" aria-label="Introduction" ref={root}>
      <div className="hero__stage">
        <div className="hero__media">
          <div className="hero__media-in"><HeroVideo /></div>
        </div>
        <div className="hero__sky" />
        <div className="hero__copy">
          <div className="hero__copy-in">
            <h1 className="hero__title" aria-label={TITLE}>
              {TITLE.split(" ").map((w, i) => (
                <span className="wd" key={i} aria-hidden="true"><span>{w}</span></span>
              ))}
            </h1>
            <p className="hero__sub">Prime address. <b>High demand.</b> Strong value.</p>
            <Btn href="/project" variant="light">Explore the Project</Btn>
          </div>
        </div>
        <div className="clouds">
          {CLOUD_LAYERS.map((d) => <Cloud key={d} depth={d} />)}
        </div>
        <div className="hero__brand" aria-hidden="true">
          <div className="hero__mask">
            {BRAND.map((c, i) => <span className="lt" key={i}>{c}</span>)}
          </div>
          <div className="hero__mask-sub">Heights Lahore</div>
        </div>
        <div className="hero__scroll"><span className="hint-in"><i />Scroll</span></div>
      </div>
    </section>
  );
}
