import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-24 scroll-mt-24 sm:mt-28">
      <Reveal>
        <h2
          id={`${id}-heading`}
          className="mb-8 text-2xl font-semibold tracking-tight sm:mb-10 sm:text-[1.75rem]"
        >
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
