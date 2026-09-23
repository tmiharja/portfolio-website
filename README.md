# portfolio-website

Personal portfolio site for Toni Miharja. Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Editing content

All copy lives in `content/` as Markdown with frontmatter — nothing is hardcoded in components.

- `content/site.md` — name, role, email, LinkedIn (frontmatter) and bio paragraphs (body)
- `content/experience.md` — `roles` list in frontmatter
- `content/projects/*.md` — one file per case study: `title`, `summary`, `tags`, `date`; body is the write-up
- `content/posts/*.md` — one file per note: `title`, `summary`, `date`

Placeholders still to fill are marked like `[YOUR BIO HERE]`.

## Deploy

Push to GitHub and import into Vercel — no extra configuration needed.
