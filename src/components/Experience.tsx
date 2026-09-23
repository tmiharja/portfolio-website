import type { Role } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience({ roles }: { roles: Role[] }) {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-7">
        {roles.map((role, i) => (
          <li key={`${role.company}-${role.period}`}>
            <Reveal delay={i * 0.05}>
              <article className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-6">
                <p className="text-sm text-muted tabular-nums">{role.period}</p>
                <div>
                  <h3 className="font-medium leading-snug">{role.title}</h3>
                  <p className="text-sm text-muted">
                    {role.company} · {role.location}
                  </p>
                  {role.summary && (
                    <p className="mt-2 text-[15px] leading-relaxed">{role.summary}</p>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
