"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { enquire, nav } from "@/lib/site";
import { Arrow, Chevron } from "./icons";
import { scrollToTop } from "./SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const [open, setOpen] = useState(false);

  // On the home page the header stays transparent over the hero sky.
  useEffect(() => {
    if (!isHome) { setSolid(true); return; }
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero) return setSolid(true);
      const p = window.scrollY / Math.max(1, hero.offsetHeight - window.innerHeight);
      setSolid(p > 0.84); // once the clouds start turning the screen white, so the menu never goes white-on-white
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const section = "/" + pathname.split("/")[1];

  return (
    <>
      <header className={"header" + (solid ? " is-solid" : "")}>
        <div className="wrap">
          <Link
            className="logo"
            href="/"
            aria-label="Serene Heights Lahore home"
            onClick={(e) => {
              // Already home: glide back to the top instead of reloading the route.
              if (isHome) { e.preventDefault(); scrollToTop(); }
            }}
          >
            <span>SERENE HEIGHTS<small>LAHORE</small></span>
          </Link>
          <nav className="nav" aria-label="Main">
            {nav.map((item) =>
              item.children ? (
                // Once a section is picked the dropdown closes, and stays closed until the pointer leaves.
                <span className="has-drop" key={item.label} onMouseLeave={(e) => e.currentTarget.classList.remove("is-closed")}>
                  <Link href={item.href} className={section === item.href.split("#")[0] && !item.href.includes("#") ? "is-active" : ""}>
                    {item.label} <Chevron />
                  </Link>
                  <span className="drop">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={(e) => { e.currentTarget.blur(); e.currentTarget.closest(".has-drop")?.classList.add("is-closed"); }}>{c.label}</Link>
                    ))}
                  </span>
                </span>
              ) : (
                <Link key={item.href} href={item.href} className={section === item.href ? "is-active" : ""}>
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <Link className="btn" href={enquire("visit")}>Book a Visit</Link>
          <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span />
          </button>
        </div>
      </header>
      {/* Every link closes the menu, including ones to the page we're already on. */}
      <div className="mobile-menu" onClick={(e) => { if ((e.target as Element).closest("a")) setOpen(false); }}>
        <Link href="/">Home</Link>
        {nav.map((n) =>
          n.children ? (
            <div className="mobile-menu__group" key={n.label}>
              <span>{n.label}</span>
              {n.children.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
            </div>
          ) : (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          )
        )}
        <Link className="btn btn--light" href={enquire("visit")}>Book a Visit <Arrow /></Link>
      </div>
    </>
  );
}
