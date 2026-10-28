import Image from "next/image";

type Props = { eyebrow: string; title: string; lead: string; img?: string; alt?: string; id?: string };

/**
 * Inner-page opening. On load (ScrollFx adds .in): the label dot pops, the title rises word by
 * word, then the lead fades up and the photo's curtain lifts.
 */
export default function PageHero({ eyebrow, title, lead, img, alt = "", id }: Props) {
  let n = 0;
  return (
    <section className="page-hero" id={id} data-in>
      <div className="wrap">
        <div className="eyebrow label">{eyebrow}</div>
        <h1 aria-label={title.replace(/\n/g, " ")}>
          {title.split("\n").map((line, li) => (
            <span className="ph-line" key={li}>
              {line.split(" ").map((w) => (
                <span className="wd" key={n} aria-hidden="true" style={{ ["--i" as string]: n++ }}>
                  <span>{w}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="lead">{lead}</p>
        {img && (
          <div className="page-hero__img reveal-img" style={{ ["--d" as string]: ".45s" }}>
            <div className="parallax" data-speed=".4">
              <Image src={img} alt={alt} width={2200} height={1396} sizes="100vw" priority />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
