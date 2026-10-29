"use client";

import { useEffect, useRef } from "react";

const SRC = "/assets/home/hero-720.mp4";
const POSTER = "/assets/home/hero-poster.jpg";
const W = 1280, H = 720; // drawing size; matches the video
const FADE = 0.9; // seconds the loop-point dissolve lasts
const LOOP_AT = 0.12; // restart this many seconds before the clip ends

/**
 * Hero footage: one video that keeps playing through the whole hero, always shown through one canvas.
 * Measured on Intel UHD 620 laptop graphics:
 * - a live <video> layer that's being resized every scroll step drops ~15% of frames;
 *   a canvas resizes for free, so the (hidden) video only decodes and each frame is copied over;
 * - a second <video> starting up at the loop point stalls for ~120 ms, so there's one video:
 *   just before the end it restarts, and a snapshot of the last frame dissolves over it
 *   (a native `loop` freezes while seeking back, and the clip's last frame doesn't match its first).
 */
export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const v = video.current!;
    const cv = canvas.current!;
    cv.width = W;
    cv.height = H;
    const c = cv.getContext("2d")!;
    const snap = document.createElement("canvas");
    snap.width = W;
    snap.height = H;
    let fadeStart = -1;
    let alive = true;

    const draw = () => {
      if (v.readyState < 2) return;
      c.globalAlpha = 1;
      c.drawImage(v, 0, 0, W, H);
      if (fadeStart >= 0) {
        const k = (performance.now() - fadeStart) / (FADE * 1000);
        if (k >= 1) fadeStart = -1;
        else { c.globalAlpha = 1 - k; c.drawImage(snap, 0, 0); c.globalAlpha = 1; }
      }
    };
    v.play().catch(() => {});

    // Copy every decoded frame to the canvas (requestVideoFrameCallback where available, else rAF).
    let raf = 0;
    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      const cb = () => { if (!alive) return; draw(); v.requestVideoFrameCallback(cb); };
      v.requestVideoFrameCallback(cb);
    } else {
      const loop = () => { draw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    v.addEventListener("loadeddata", draw, { once: true });

    // Just before the end: keep the last frame, restart, and let that frame dissolve away.
    // Checked every frame while the dissolve could be due (timeupdate alone is too coarse).
    let loopRaf = 0;
    const watch = () => {
      if (!alive) return;
      if (v.duration && v.currentTime >= v.duration - LOOP_AT && fadeStart < 0) {
        snap.getContext("2d")!.drawImage(cv, 0, 0);
        fadeStart = performance.now();
        v.currentTime = 0;
      }
      loopRaf = requestAnimationFrame(watch);
    };
    loopRaf = requestAnimationFrame(watch);
    // If the video does reach its end (e.g. a frame was missed), restart anyway.
    const onEnded = () => { v.currentTime = 0; v.play().catch(() => {}); };
    v.addEventListener("ended", onEnded);

    // Pause when the tab is hidden; resume when it returns.
    const onVis = () => { if (document.hidden) v.pause(); else v.play().catch(() => {}); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loopRaf);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      {/* Decoder only; what's on screen is the canvas. */}
      <video ref={video} className="hero__vid" muted playsInline preload="auto" src={SRC} aria-hidden="true" />
      <canvas ref={canvas} className="hero__frames" aria-hidden="true" style={{ backgroundImage: `url(${POSTER})` }} />
    </>
  );
}
