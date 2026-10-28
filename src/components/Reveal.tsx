import { createElement, Fragment, type CSSProperties } from "react";

type Props = {
  text: string; // use "\n" for line breaks
  as?: "h1" | "h2" | "h3" | "p";
  mode?: "chars" | "words";
  className?: string;
  start?: number;
  end?: number;
  style?: CSSProperties;
};

/**
 * Renders text pre-split into spans; ScrollFx turns them from grey to ink as the element scrolls into view.
 */
export default function Reveal({ text, as = "h2", mode = "chars", className, start, end, style }: Props) {
  const lines = text.split("\n");
  const children = lines.map((line, li) => {
    const parts = mode === "chars" ? [...line] : line.split(/(\s+)/);
    return (
      <Fragment key={li}>
        {li > 0 && <br />}
        {parts.map((p, i) =>
          !p ? null : /^\s+$/.test(p) ? p : (
            <span key={i} className={mode === "chars" ? "ch" : "w"}>{p}</span>
          )
        )}
      </Fragment>
    );
  });
  return createElement(
    as,
    {
      className,
      style,
      "data-reveal": mode,
      ...(start !== undefined && { "data-start": start }),
      ...(end !== undefined && { "data-end": end }),
    },
    children
  );
}
