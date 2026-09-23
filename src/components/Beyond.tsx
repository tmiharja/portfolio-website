import type { Beyond as BeyondContent } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Beyond({ content }: { content: BeyondContent }) {
  return (
    <Section id="beyond" title={content.title}>
      <div className="grid gap-10 sm:grid-cols-[2fr_1fr] sm:items-start">
        <Reveal>
          <div className="space-y-5 text-[17px] leading-relaxed">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <PhotoPlaceholder />
        </Reveal>
      </div>
    </Section>
  );
}

// Stand-in for the portrait while the layout is tuned. To swap in the real
// photo, statically import it from src/img and render a next/image <Image>
// with the same wrapper classes (aspect ratio, radius, max width).
function PhotoPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Photo placeholder"
      className="mx-auto flex aspect-[4/5] w-full max-w-[240px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-rule bg-accent-soft text-muted sm:max-w-none"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
      <span className="text-xs uppercase tracking-[0.14em]">Photo</span>
    </div>
  );
}
