import Image from "next/image";
import Btn from "./Btn";

type Props = { img: string; title: string; ghost: string; cta: string; href: string };

/** Full-bleed photo with a closing headline and call to action. */
export default function Outro({ img, title, ghost, cta, href }: Props) {
  return (
    <section className="outro" data-in>
      <Image className="parallax" data-speed=".6" src={img} alt="" fill sizes="100vw" />
      <div className="wrap">
        <h2 aria-label={`${title} ${ghost}`}>
          {`${title} ${ghost}`.split(" ").map((w, i) => (
            <span className="wd" key={i} aria-hidden="true" style={{ ["--i" as string]: i }}>
              <span style={i >= title.split(" ").length ? { color: "rgba(255,255,255,.62)" } : undefined}>{w}</span>
            </span>
          ))}
        </h2>
        <Btn href={href} variant="light">{cta}</Btn>
      </div>
    </section>
  );
}
