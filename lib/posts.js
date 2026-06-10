import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

export function getAllPosts() {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map(filename => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug || filename.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled",
      date: data.date || "2026-01-01",
      country: data.country || "General",
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 160) + "...",
      metaDescription: data.metaDescription || data.excerpt || "",
      readingTime: data.readingTime || 5,
      content,
    };
  });
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const postSlug = data.slug || filename.replace(/\.mdx?$/, "");
    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title || "Untitled",
        date: data.date || "2026-01-01",
        country: data.country || "General",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        metaDescription: data.metaDescription || "",
        readingTime: data.readingTime || 5,
        content,
      };
    }
  }
  return null;
}

export function getAllCountries() {
  const posts = getAllPosts();
  return [...new Set(posts.map(p => p.country))].filter(Boolean).sort();
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStr) {
  const d = new Date();
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) + " · " + d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
