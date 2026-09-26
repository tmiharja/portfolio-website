import Image from "next/image";
import type { Beyond as BeyondContent } from "@/lib/content";
import beyondHike from "@/img/beyond-1.jpeg";
import beyondAquarium from "@/img/beyond-2.jpeg";
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
          <PhotoStack />
        </Reveal>
      </div>
    </Section>
  );
}

// Two overlapping photos: one cropped to 4:5 at the back (top left) and a
// portrait in front (bottom right). Each subject sits clear of the overlap. A theme-tinted veil over each keeps
// them in the site's palette in both light and dark mode.
function PhotoStack() {
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] sm:max-w-none">
      <div className="photo-veil photo-hover absolute left-0 top-0 aspect-[4/5] w-[78%] overflow-hidden rounded-xl">
        <Image
          src={beyondAquarium}
          alt="Toni at home in front of his planted aquariums"
          fill
          sizes="(min-width: 640px) 160px, 240px"
          placeholder="blur"
          className="object-cover object-[52%_center]"
        />
      </div>
      <div className="photo-veil photo-hover absolute bottom-0 right-0 aspect-[3/4] w-[66%] overflow-hidden rounded-xl shadow-lg ring-4 ring-background">
        <Image
          src={beyondHike}
          alt="Hiking a mountain ridge trail above a lake"
          fill
          sizes="(min-width: 640px) 140px, 210px"
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </div>
  );
}
