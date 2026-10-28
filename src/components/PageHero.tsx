import Image from "next/image";
import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; lead: string; img?: string; alt?: string; id?: string };

export default function PageHero({ eyebrow, title, lead, img, alt = "", id }: Props) {
  return (
    <section className="page-hero" id={id}>
      <div className="wrap">
        <div className="eyebrow">{eyebrow}</div>
        <Reveal as="h1" text={title} start={1} end={0.7} />
        <p className="lead">{lead}</p>
        {img && (
          <div className="page-hero__img">
            <Image className="parallax" data-speed=".4" src={img} alt={alt} width={2200} height={1396} sizes="100vw" priority />
          </div>
        )}
      </div>
    </section>
  );
}
