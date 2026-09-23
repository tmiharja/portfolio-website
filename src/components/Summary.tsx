import Reveal from "./Reveal";

export default function Summary({ bio }: { bio: string[] }) {
  return (
    <section id="summary" aria-label="Summary">
      <Reveal>
        <div className="space-y-5 text-[17px] leading-relaxed">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
