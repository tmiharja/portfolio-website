import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Maps each markdown element to the site's typography. Raw HTML in posts is
// not rendered (react-markdown's default), so post files can't inject markup.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 text-lg font-semibold tracking-tight first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => <h4 className="mt-8 font-semibold first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="link"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-muted">{children}</ul>
  ),
  ol: ({ children, start }) => (
    <ol start={start} className="mt-5 list-decimal space-y-2 pl-6 marker:text-muted">{children}</ol>
  ),
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-rule pl-5 text-muted">{children}</blockquote>
  ),
  hr: () => <hr className="my-10 border-rule" />,
  img: ({ src, alt }) => (
    // Post images come from markdown with unknown dimensions, so a plain <img>
    // is used instead of next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="mt-6 w-full rounded-xl border border-rule"
    />
  ),
  code: ({ className, children }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-accent-soft px-1.5 py-0.5 text-[0.9em]">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-xl bg-accent-soft p-4 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-rule py-2 pr-4 font-semibold">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-rule py-2 pr-4">{children}</td>,
};

export default function PostBody({ markdown }: { markdown: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </Markdown>
  );
}
