import { getAllPosts } from "../lib/posts";

const SITE = "https://migrantscholar.vercel.app";

function generateSitemap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url><url><loc>${SITE}/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url><url><loc>${SITE}/deadlines</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/guides</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/glossary</loc><changefreq>monthly</changefreq><priority>0.7</priority></url><url><loc>${SITE}/universities</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-eligibility/refugees</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-eligibility/asylum-seekers</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-eligibility/without-ielts</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-eligibility/migrants</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-level/masters</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-level/phd</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-level/undergraduate</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-funding/fully-funded</loc><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>${SITE}/by-funding/partial</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>${posts.map(({slug,date})=>`<url><loc>${SITE}/blog/${slug}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("")}</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const posts = getAllPosts();
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600");
  res.write(generateSitemap(posts));
  res.end();
  return { props: {} };
}
