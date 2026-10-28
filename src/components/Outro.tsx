import Image from "next/image";
import Btn from "./Btn";

type Props = { img: string; title: string; ghost: string; cta: string; href: string };

/** Full-bleed photo with a closing headline and call to action. */
export default function Outro({ img, title, ghost, cta, href }: Props) {
  return (
    <section className="outro">
      <Image className="parallax" data-speed=".6" src={img} alt="" fill sizes="100vw" />
      <div className="wrap">
        <h2>{title} <span>{ghost}</span></h2>
        <Btn href={href} variant="light">{cta}</Btn>
      </div>
    </section>
  );
}
