import Image from "next/image";
import type { Site } from "@/lib/content";
import heroDark from "@/img/hero-background-dark.jpg";
import heroLight from "@/img/hero-background-light.jpg";
import HeroGlow from "./HeroGlow";
import Reveal from "./Reveal";

export default function Hero({ site }: { site: Site }) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="hero relative isolate flex items-end overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Only the image for the active theme is displayed. Lazy loading keeps
            the browser from fetching the hidden one until the theme switches. */}
        <Image
          src={heroLight}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          loading="lazy"
          className="hero-image hero-image--light"
        />
        <Image
          src={heroDark}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          loading="lazy"
          className="hero-image hero-image--dark"
        />
        <HeroGlow />
        <div className="hero-fade" />
      </div>
      <div className="mx-auto w-full max-w-[680px] px-6 pb-14 pt-32 sm:pb-20">
        <Reveal>
          <h1
            id="about-heading"
            className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
          >
            {site.headline}
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">{site.role}</p>
        </Reveal>
      </div>
    </section>
  );
}
