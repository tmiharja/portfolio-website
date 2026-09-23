import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Site = {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  bio: string[];
};

export type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  summary?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
};

function readFile(relPath: string) {
  return matter(fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8"));
}

function readDir(relDir: string) {
  const dir = path.join(CONTENT_DIR, relDir);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, ""), ...readFile(path.join(relDir, f)) }));
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

export function getSite(): Site {
  const { data, content } = readFile("site.md");
  return {
    name: String(data.name),
    role: String(data.role),
    email: String(data.email),
    linkedin: String(data.linkedin),
    bio: content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

export function getExperience(): Role[] {
  const { data } = readFile("experience.md");
  return (data.roles ?? []) as Role[];
}

export function getProjects(): Project[] {
  return readDir("projects")
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title),
      summary: String(data.summary),
      tags: (data.tags ?? []) as string[],
      date: toDateString(data.date),
      body: content.trim(),
    }))
    .sort(byDateDesc);
}

export function getPosts(): Post[] {
  return readDir("posts")
    .map(({ slug, data }) => ({
      slug,
      title: String(data.title),
      summary: String(data.summary),
      date: toDateString(data.date),
    }))
    .sort(byDateDesc);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });
}
