import type { Project } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Selected work">
      <ul className="divide-y divide-rule border-y border-rule">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={i * 0.05}>
              <article className="-mx-3 rounded px-3 py-6 transition-colors duration-200 ease-out hover:bg-accent-soft/60">
                <h3 className="text-lg font-medium leading-snug">{project.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{project.summary}</p>
                {project.body && (
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
                    {project.body.split(/\n\s*\n/).map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted" aria-label="Tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
