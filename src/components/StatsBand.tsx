"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { n: 21, unit: "", label: "Storeys of mixed-use commercial space on Main Boulevard" },
  { n: 5, unit: "", label: "Dedicated parking floors with drive-through ramps" },
  { n: 2, unit: "M", pre: "PKR ", label: "Entry point for smart property units" },
  { n: 2, unit: "yrs", label: "Clearly defined delivery timeline" },
];

/** Key figures that count up once the band scrolls into view. */
export default function StatsBand() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nums = root.current!.querySelectorAll<HTMLElement>("[data-n]");
    nums.forEach((el) => (el.textContent = "0"));
    ScrollTrigger.create({
      trigger: root.current,
      start: "top 85%",
      once: true,
      onEnter: () =>
        nums.forEach((el, i) => {
          const o = { v: 0 };
          gsap.to(o, {
            v: Number(el.dataset.n), duration: 1.8, delay: i * 0.12, ease: "power3.out",
            onUpdate: () => { el.textContent = String(Math.round(o.v)); },
          });
        }),
    });
  }, { scope: root });

  return (
    <div className="stats-band" data-stagger ref={root}>
      {stats.map((s) => (
        <div key={s.label} className="draw">
          <b>
            {s.pre && <small style={{ marginLeft: 0, marginRight: ".12em" }}>{s.pre}</small>}
            <span data-n={s.n}>{s.n}</span>
            {s.unit && <small>{s.unit}</small>}
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
