import { formatDate, type Post } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Writing({ posts }: { posts: Post[] }) {
  return (
    <Section id="writing" title="Learnings & writing">
      <ul className="space-y-5">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 0.04}>
              <article className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-6">
                <time dateTime={post.date} className="text-sm text-muted tabular-nums">
                  {formatDate(post.date)}
                </time>
                <div>
                  <h3 className="font-medium leading-snug">{post.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{post.summary}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
