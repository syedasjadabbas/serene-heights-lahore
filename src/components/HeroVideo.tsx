"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const SRC = "/assets/home/hero-720.mp4";
const POSTER = "/assets/home/hero-poster.jpg";
const W = 1280, H = 720; // drawing size; matches the video and the still frames
const FADE = 0.9; // seconds the loop-point dissolve lasts
const LOOP_AT = 0.12; // restart this many seconds before the clip ends
// The same clip as still frames (16 fps), for the scroll-driven stretch.
const FRAME_COUNT = 97;
const frameUrl = (i: number) => `/assets/frames/f${String(i + 1).padStart(3, "0")}.webp`;
const STILLS_FADE = 0.08; // share of the scroll-driven stretch spent crossfading from video to stills

export type HeroVideoHandle = {
  /** Start fetching the still frames (call a little before they're needed). */
  preload: () => void;
  /** 0..1 = how far through the scroll-driven stretch we are; null returns to the looping video. */
  follow: (amount: number | null) => void;
};

/**
 * Hero footage, always shown through one canvas. Measured on Intel UHD 620 laptop graphics:
 * - a live <video> layer that's being resized every scroll step drops ~15% of frames;
 *   a canvas resizes for free, so the (hidden) video only decodes and each frame is copied over;
 * - a second <video> starting up at the loop point stalls for ~120 ms, so there's one video:
 *   just before the end it restarts, and a snapshot of the last frame dissolves over it
 *   (a native `loop` freezes while seeking back, and the clip's last frame doesn't match its first);
 * - seeking a video per scroll step stalls 40–120 ms, so the scroll-driven stretch draws
 *   pre-decoded still frames instead, blended between neighbours so the motion is continuous.
 */
const HeroVideo = forwardRef<HeroVideoHandle>(function HeroVideo(_, ref) {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const snapshot = useRef<HTMLCanvasElement | null>(null);
  const st = useRef({ following: false, fadeStart: -1 });
  // Decoded, GPU-ready stills (an <img> would be re-uploaded on every draw).
  const stills = useRef<(ImageBitmap | undefined)[]>([]);
  // Scroll sets `target`; a small loop glides `pos` towards it.
  const motion = useRef({ target: 0, pos: -1, raf: 0, mixIn: 0 });

  const ctx = () => canvas.current!.getContext("2d")!;
  const ready = () => video.current!.readyState >= 2;

  /* ---------- Looping video -> canvas ---------- */
  const drawVideo = () => {
    const s = st.current, c = ctx();
    if (!ready()) return;
    c.globalAlpha = 1;
    c.drawImage(video.current!, 0, 0, W, H);
    if (s.fadeStart >= 0 && snapshot.current) {
      const k = (performance.now() - s.fadeStart) / (FADE * 1000);
      if (k >= 1) s.fadeStart = -1;
      else { c.globalAlpha = 1 - k; c.drawImage(snapshot.current, 0, 0); c.globalAlpha = 1; }
    }
  };

  /* ---------- Still frames -> canvas ---------- */
  const nearest = (i: number) => {
    const list = stills.current;
    for (let d = 0; d < FRAME_COUNT; d++)
      for (const k of [i - d, i + d]) {
        const f = list[k];
        if (f) return f;
      }
  };
  const drawStills = (pos: number, mixIn: number) => {
    const c = ctx();
    const i = Math.floor(pos), t = pos - i;
    const A = nearest(i), B = t > 0.02 ? nearest(Math.min(FRAME_COUNT - 1, i + 1)) : undefined;
    if (!A) return;
    // Entering: the paused video frame stays underneath while the stills fade in over it.
    if (mixIn < 1 && ready()) { c.globalAlpha = 1; c.drawImage(video.current!, 0, 0, W, H); }
    c.globalAlpha = mixIn;
    c.drawImage(A, 0, 0, W, H);
    if (B && B !== A) { c.globalAlpha = mixIn * t; c.drawImage(B, 0, 0, W, H); }
    c.globalAlpha = 1;
  };
  const glide = () => {
    const m = motion.current;
    m.pos = m.pos < 0 ? m.target : m.pos + (m.target - m.pos) * 0.2;
    if (Math.abs(m.target - m.pos) < 0.01) m.pos = m.target;
    drawStills(m.pos, m.mixIn);
    m.raf = m.pos === m.target ? 0 : requestAnimationFrame(glide);
  };

  useImperativeHandle(ref, () => ({
    preload() {
      if (stills.current.length) return;
      // Spread-out order, so a rough version of the whole range is available early.
      const order: number[] = [];
      for (let step = 8; step >= 1; step = Math.floor(step / 2))
        for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i);
      stills.current = new Array(FRAME_COUNT);
      let next = 0;
      const loadOne = () => {
        if (next >= order.length) return;
        const i = order[next++];
        fetch(frameUrl(i))
          .then((r) => r.blob())
          .then((blob) => createImageBitmap(blob))
          .then((bmp) => { stills.current[i] = bmp; })
          .catch(() => {})
          .finally(() => window.setTimeout(loadOne, 40)); // spaced out so decoding never piles up
      };
      loadOne(); // one at a time: a burst of decodes stalls laptop graphics mid-scroll
    },

    follow(amount) {
      const s = st.current, m = motion.current, v = video.current!;
      if (amount === null) {
        if (s.following) {
          s.following = false;
          cancelAnimationFrame(m.raf);
          m.raf = 0;
          m.pos = -1;
          if (!document.hidden) v.play().catch(() => {});
          drawVideo();
        }
        return;
      }
      if (!s.following) {
        s.following = true;
        s.fadeStart = -1;
        v.pause();
      }
      m.target = amount * (FRAME_COUNT - 1);
      m.mixIn = Math.min(1, amount / STILLS_FADE);
      if (!m.raf) m.raf = requestAnimationFrame(glide);
    },
  }));

  useEffect(() => {
    const s = st.current;
    const v = video.current!;
    const cv = canvas.current!;
    cv.width = W;
    cv.height = H;
    const snap = document.createElement("canvas");
    snap.width = W;
    snap.height = H;
    snapshot.current = snap;
    let alive = true;
    v.play().catch(() => {});

    // Copy every decoded frame to the canvas (requestVideoFrameCallback where available, else rAF).
    let raf = 0;
    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      const cb = () => {
        if (!alive) return;
        if (!s.following) drawVideo();
        v.requestVideoFrameCallback(cb);
      };
      v.requestVideoFrameCallback(cb);
    } else {
      const loop = () => { if (!s.following) drawVideo(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    v.addEventListener("loadeddata", drawVideo, { once: true });

    // Just before the end: keep the last frame, restart, and let that frame dissolve away.
    // Checked every frame while the dissolve could be due (timeupdate alone is too coarse).
    let loopRaf = 0;
    const watch = () => {
      if (!alive) return;
      if (!s.following && v.duration && v.currentTime >= v.duration - LOOP_AT && s.fadeStart < 0) {
        snap.getContext("2d")!.drawImage(cv, 0, 0);
        s.fadeStart = performance.now();
        v.currentTime = 0;
      }
      loopRaf = requestAnimationFrame(watch);
    };
    loopRaf = requestAnimationFrame(watch);
    // If the video does reach its end (e.g. a frame was missed), restart anyway.
    const onEnded = () => { if (!s.following) { v.currentTime = 0; v.play().catch(() => {}); } };
    v.addEventListener("ended", onEnded);

    // Pause when the tab is hidden; resume looping when it returns.
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (!s.following) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loopRaf);
      stills.current.forEach((b) => b?.close());
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
});

export default HeroVideo;
