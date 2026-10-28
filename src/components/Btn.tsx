import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Arrow } from "./icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "ghost";
  arrow?: boolean;
  style?: CSSProperties;
};

export default function Btn({ href, children, variant = "dark", arrow = true, style }: Props) {
  const cls = "btn" + (variant === "light" ? " btn--light" : variant === "ghost" ? " btn--ghost" : "");
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  return external ? (
    <a className={cls} href={href} style={style}>{inner}</a>
  ) : (
    <Link className={cls} href={href} style={style}>{inner}</Link>
  );
}
