import type { Site } from "@/lib/content";
import HeroGlow from "./HeroGlow";
import Reveal from "./Reveal";

export default function Hero({ site }: { site: Site }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative pb-12 sm:pb-20">
      <HeroGlow />
      <Reveal>
        <h1 id="about-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">
          {site.headline}
        </h1>
        <p className="mt-3 text-base text-muted">{site.role}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed">
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
