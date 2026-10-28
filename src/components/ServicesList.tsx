"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { LongArrow } from "./icons";

const rows = [
  { word: "Retail", href: "/project#commercial", img: "/assets/project/Image3_v2.jpg", text: "Lower Ground + 6 commercial floors with drive-through ramps and vehicle access to almost every level — solving Gulberg's biggest footfall problem." },
  { word: "Offices", href: "/project#offices", img: "/assets/project/Image11.jpg", text: "Seven office floors in Gulberg's central corridor — visibility, accessibility and influence for businesses that want to lead their market." },
  { word: "Co-Work", href: "/project#coworking", img: "/assets/project/Image8_1.jpg", text: "Two floors of flexible, fully equipped workspaces with shared amenities, collaborative zones and private suites." },
  { word: "Stay", href: "/project#hotel", img: "/assets/project/Image9.jpg", text: "Fully furnished serviced apartments under a professional hospitality model — stay when you want, earn rental returns when you don't." },
];

/** Big-word rows; on hover-capable screens an image follows the cursor. */
export default function ServicesList() {
  const peek = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState(rows[0].img);
  const [on, setOn] = useState(false);

  const move = (e: MouseEvent) => {
    if (!peek.current) return;
    peek.current.style.left = e.clientX + "px";
    peek.current.style.top = e.clientY + "px";
  };

  return (
    <>
      <div className="svc__list">
        {rows.map((r, i) => (
          <Link
            key={r.word}
            className="svc__row"
            href={r.href}
            onMouseEnter={() => { setImg(r.img); setOn(true); }}
            onMouseLeave={() => setOn(false)}
            onMouseMove={move}
          >
            <div className="svc__info"><span className="svc__n">{i + 1}</span><p>{r.text}</p></div>
            <div className="svc__word">{r.word} <LongArrow /></div>
          </Link>
        ))}
      </div>
      <div className={"svc__peek" + (on ? " on" : "")} ref={peek}>
        {/* eslint-disable-next-line @next/next/no-img-element -- swapped rapidly on hover */}
        <img src={img} alt="" />
      </div>
    </>
  );
}
