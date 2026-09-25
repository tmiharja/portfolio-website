import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { formatDate, getPost, getPosts, getSite } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Only posts in content/posts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${getSite().name}`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const site = getSite();
  // Newest first, so "newer" is the previous entry and "older" the next one.
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <>
      <Header name={site.name} />
      <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-6 pb-24 pt-32 sm:pt-40">
        <Link href="/#writing" className="link text-sm !text-muted hover:!text-foreground">
          ← All writing
        </Link>

        <article className="mt-10">
          <header>
            <time dateTime={post.date} className="text-sm text-muted tabular-nums">
              {formatDate(post.date)}
            </time>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{post.summary}</p>
          </header>

          <div className="mt-10 space-y-5 border-t border-rule pt-10 text-[17px] leading-relaxed">
            {post.blocks.map((block, i) =>
              block.type === "heading" ? (
                <h2
                  key={i}
                  className="!mt-12 text-xl font-semibold tracking-tight first:!mt-0 sm:text-2xl"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>
        </article>

        {(newer || older) && (
          <nav
            aria-label="More writing"
            className="mt-20 grid gap-6 border-t border-rule pt-8 text-sm sm:grid-cols-2"
          >
            {older && (
              <Link href={`/writing/${older.slug}`} className="group block">
                <span className="text-muted">← Older</span>
                <span className="mt-1 block font-medium leading-snug group-hover:text-accent">
                  {older.title}
                </span>
              </Link>
            )}
            {newer && (
              <Link href={`/writing/${newer.slug}`} className="group block sm:col-start-2 sm:text-right">
                <span className="text-muted">Newer →</span>
                <span className="mt-1 block font-medium leading-snug group-hover:text-accent">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </main>
      <Footer linkedin={site.linkedin} name={site.name} />
    </>
  );
}
