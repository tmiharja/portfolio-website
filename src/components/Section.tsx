import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-20 scroll-mt-24">
      <Reveal>
        <h2
          id={`${id}-heading`}
          className="mb-8 text-xs font-medium uppercase tracking-[0.14em] text-muted"
        >
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
