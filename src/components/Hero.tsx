"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Btn from "./Btn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const TITLE = "A New Standard of Urban Living";
const TOWER = "/assets/hero/tower.webp";
const TOWER_ASPECT = 1072 / 2660; // width / height of the cut-out
const FOCUS = 0.4; // point down the tower (share of its height) that ends up behind the letters

// Scroll timeline (share of the pinned hero):
const RISE = [0, 0.4];        // headline floats away, the tower rises out of the clouds and grows
const OUTLINE = [0.15, 0.3];  // outline lettering traces in over the tower
const MELT = [0.4, 0.56];     // the tower melts away, leaving its facade inside the letters
const CLOUDS = [0.64, 1];     // the cloud bank rolls up and swallows everything into white

const CLOUD_LAYERS = ["back", "mid", "front"] as const;

/**
 * Pinned hero, after findrealestate.com.
 * On load: the sky settles, the tower rises out of a sea of clouds, the headline rises word by word.
 * On scroll: headline away -> the tower rises and grows while "SERENE Heights Lahore" traces in as an
 * outline -> the tower melts, leaving its lit facade inside the letters against the dusk sky -> hold ->
 * the clouds roll up over everything into the white page below.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = root.current!;
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const words = qa(".hero__title .wd > span");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Load-in ---------- */
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (reduced) {
      tl.set([words, ".hero__sub", ".hero__copy .btn", ".clouds"], { y: 0, opacity: 1, filter: "none" });
    } else {
      tl.fromTo(".hero__sky-in", { scale: 1.14 }, { scale: 1, duration: 3.4, ease: "power3.out" }, 0)
        .fromTo(".hero__tower-in", { yPercent: 16 }, { yPercent: 0, duration: 2.8, ease: "power3.out" }, 0.1)
        .fromTo(".clouds", { yPercent: 12, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 2.6, ease: "power2.out" }, 0)
        .to(words, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.07 }, 0.45)
        .to(".hero__sub", { y: 0, opacity: 1, duration: 1.2 }, 1.05)
        .to(".hero__copy .btn", { y: 0, opacity: 1, scale: 1, duration: 1.1 }, 1.2);
    }

    /* ---------- Pointer parallax (desktop): sky, tower and clouds at different depths ---------- */
    if (!reduced && matchMedia("(hover: hover)").matches) {
      const sx = gsap.quickTo(".hero__sky-in", "x", { duration: 2, ease: "power3.out" });
      const tx = gsap.quickTo(".hero__tower-in", "x", { duration: 1.6, ease: "power3.out" });
      const cx = gsap.quickTo(".clouds", "x", { duration: 1.8, ease: "power3.out" });
      const hx = gsap.quickTo(q(".hero__copy"), "x", { duration: 1.8, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5;
        sx(nx * -10); tx(nx * -18); cx(nx * -40); hx(nx * 8);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }
  }, { scope: root });

  useGSAP(() => {
    const el = root.current!;
    const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const stage = q(".hero__stage"), sky = q(".hero__sky"), copyIn = q(".hero__copy-in");
    const tower = q(".hero__tower"), outline = q(".hero__outline"), fill = q(".hero__fill");
    const fogs = qa(".fog"), clouds = q(".clouds");

    // Tower geometry, in px, recomputed on resize. The tower starts small with its top just below the
    // headline and its base in the clouds; it ends wide enough to sit behind the whole "SERENE" word.
    const g = { W0: 0, H0: 0, top0: 0, S1: 1, ty1: 0 };
    const measure = () => {
      const vw = stage.clientWidth, vh = stage.clientHeight;
      g.H0 = Math.min(vh * 1.3, (vw * 0.6) / TOWER_ASPECT);
      g.W0 = g.H0 * TOWER_ASPECT;
      g.top0 = vh * (vw < 761 ? 0.5 : 0.52);
      const word = q(".hero__fill .hero__word").getBoundingClientRect().width / (gsap.getProperty(fill, "scale") as number || 1);
      g.S1 = Math.max(1.4, (word * 1.12) / g.W0);
      g.ty1 = vh * 0.47 - g.top0 - FOCUS * g.H0 * g.S1;
      Object.assign(tower.style, { width: `${g.W0}px`, height: `${g.H0}px`, left: `${(vw - g.W0) / 2}px`, top: `${g.top0}px` });
      // The letters are filled with the tower exactly where it stands when it starts to melt,
      // so the facade inside them lines up with the one fading out around them.
      const W1 = g.W0 * g.S1, H1 = g.H0 * g.S1;
      fill.style.backgroundSize = `${W1}px ${H1}px`;
      fill.style.backgroundPosition = `${(vw - W1) / 2}px ${g.top0 + g.ty1}px`;
    };

    const render = (p: number) => {
      // 1. Headline floats up and fades away.
      const out = seg(p, 0, 0.14);
      copyIn.style.transform = `translateY(${-smooth(out) * 160}px)`;
      copyIn.style.opacity = String(1 - seg(p, 0.02, 0.13));
      // 2. The tower rises and grows (zoom eased exponentially, so it reads as one camera move).
      const e = inOut(seg(p, RISE[0], RISE[1]));
      tower.style.transform = `translate3d(0, ${g.ty1 * e}px, 0) scale(${Math.pow(g.S1, e)})`;
      sky.style.transform = `translate3d(0, ${-e * 3}%, 0) scale(${1 + e * 0.08})`;
      // 3. Outline lettering traces in over the tower, then gives way to the filled letters.
      const oIn = smooth(seg(p, OUTLINE[0], OUTLINE[1]));
      outline.style.opacity = String(oIn * (1 - smooth(seg(p, MELT[0] + 0.04, MELT[1]))));
      outline.style.transform = `scale(${0.94 + oIn * 0.06})`;
      // 4. Melt: the tower fades out, its facade stays inside the letters; they drift a touch closer.
      const m = smooth(seg(p, MELT[0], MELT[1]));
      tower.style.opacity = String(1 - m);
      fill.style.opacity = String(m); // the clouds cover the letters at the end
      fill.style.transform = `scale(${1 + seg(p, MELT[0], 0.9) * 0.05})`;
      // 5. Clouds: a gentle rise with the tower, then the bank rolls up steadily over the screen.
      const c = smooth(seg(p, CLOUDS[0], CLOUDS[1]));
      fogs.forEach((f, i) => {
        const lift = e * (4 + i * 3) + c * (60 + i * 45);   // vh; the front layer climbs fastest
        f.style.transform = `translate3d(0, ${-lift}vh, 0) scale(${1 + c * (0.1 + i * 0.12)})`;
      });
      clouds.classList.toggle("is-idle", p > 0.99);
    };

    measure();
    render(0);
    const state = { p: 0 };
    gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: () => render(state.p),
      scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true, onRefresh: () => { measure(); render(state.p); } },
    });
    document.fonts?.ready.then(() => { measure(); ScrollTrigger.refresh(); });
  }, { scope: root });

  const brand = (
    <>
      <span className="hero__word">SERENE</span>
      <span className="hero__word-sub">Heights Lahore</span>
    </>
  );

  return (
    <section className="hero" aria-label="Introduction" ref={root}>
      <div className="hero__stage">
        <div className="hero__sky"><div className="hero__sky-in" /></div>
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
        <div className="hero__tower">
          {/* eslint-disable-next-line @next/next/no-img-element -- a plain <img> keeps the cut-out a single GPU layer */}
          <img className="hero__tower-in" src={TOWER} alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero__outline" aria-hidden="true">{brand}</div>
        <div className="hero__fill" aria-hidden="true" style={{ backgroundImage: `url(${TOWER})` }}>{brand}</div>
        <div className="clouds" aria-hidden="true">
          {CLOUD_LAYERS.map((d) => <div className={`fog fog--${d}`} key={d}><span /></div>)}
        </div>
      </div>
    </section>
  );
}
