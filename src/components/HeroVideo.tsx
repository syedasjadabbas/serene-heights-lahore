"use client";

import { useEffect, useRef } from "react";

const SRC = "/assets/home/hero-loop.mp4";
const POSTER = "/assets/home/hero-poster.jpg";
const FADE = 0.9; // seconds of crossfade at the loop point

/**
 * Seamless background loop. A native `loop` freezes briefly while the browser seeks back
 * to the start, and the clip's last frame doesn't match its first. Instead two copies take
 * turns: shortly before one ends, the other starts from 0 and fades in over it.
 */
export default function HeroVideo() {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vids = [a.current!, b.current!];
    let active = 0;
    let fading = false;

    vids[1].style.opacity = "0";
    vids[0].play().catch(() => {});

    // timeupdate fires every ~250ms, well inside the fade window.
    const tick = (e: Event) => {
      const cur = vids[active];
      const next = vids[1 - active];
      if (e.target !== cur) return;
      if (!fading && cur.duration && cur.currentTime >= cur.duration - FADE) {
        fading = true;
        next.currentTime = 0;
        next.play().catch(() => {});
        next.style.opacity = "1";
        cur.style.opacity = "0";
        window.setTimeout(() => {
          cur.pause();
          active = 1 - active;
          fading = false;
        }, FADE * 1000 + 50);
      }
    };
    vids.forEach((v) => v.addEventListener("timeupdate", tick));

    // Pause both when the tab is hidden; resume the active one when it returns.
    const onVis = () => (document.hidden ? vids.forEach((v) => v.pause()) : vids[active].play().catch(() => {}));
    document.addEventListener("visibilitychange", onVis);
    return () => {
      vids.forEach((v) => v.removeEventListener("timeupdate", tick));
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <video ref={a} className="hero__vid" muted playsInline preload="auto" poster={POSTER} src={SRC} />
      <video ref={b} className="hero__vid" muted playsInline preload="auto" src={SRC} aria-hidden="true" />
    </>
  );
}
