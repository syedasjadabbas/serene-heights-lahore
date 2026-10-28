"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { LongArrow } from "./icons";

const rows = [
  { word: "Retail", href: "/project#commercial", img: "/assets/peek/retail.webp", text: "Lower Ground + 6 commercial floors with drive-through ramps and vehicle access to almost every level — solving Gulberg's biggest footfall problem." },
  { word: "Offices", href: "/project#offices", img: "/assets/peek/offices.webp", text: "Seven office floors in Gulberg's central corridor — visibility, accessibility and influence for businesses that want to lead their market." },
  { word: "Co-Work", href: "/project#coworking", img: "/assets/peek/cowork.webp", text: "Two floors of flexible, fully equipped workspaces with shared amenities, collaborative zones and private suites." },
  { word: "Stay", href: "/project#hotel", img: "/assets/peek/stay.webp", text: "Fully furnished serviced apartments under a professional hospitality model — stay when you want, earn rental returns when you don't." },
];

/**
 * Big-word rows; on hover-capable screens a preview follows the cursor.
 * All four small previews stay loaded and are switched with a class (no re-render, no decode
 * on hover); rows pass under a still cursor while scrolling, so this must be cheap.
 */
export default function ServicesList() {
  const peek = useRef<HTMLDivElement>(null);

  const show = (i: number | null) => {
    const el = peek.current;
    if (!el) return;
    el.classList.toggle("on", i !== null);
    if (i !== null) el.querySelectorAll("img").forEach((img, k) => img.classList.toggle("on", k === i));
  };
  const move = (e: MouseEvent) => {
    const el = peek.current;
    if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <>
      <div className="svc__list" data-stagger>
        {rows.map((r, i) => (
          <Link
            key={r.word}
            className="svc__row draw"
            href={r.href}
            onMouseEnter={(e) => { move(e); show(i); }}
            onMouseLeave={() => show(null)}
            onMouseMove={move}
          >
            <div className="svc__info"><span className="svc__n">{i + 1}</span><p>{r.text}</p></div>
            <div className="svc__word">{r.word} <LongArrow /></div>
          </Link>
        ))}
      </div>
      <div className="svc__peek" ref={peek} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny, preloaded, toggled on hover */}
        {rows.map((r) => <img key={r.img} src={r.img} alt="" decoding="async" />)}
      </div>
    </>
  );
}
