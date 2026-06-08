import { getAllPosts } from "../lib/posts";
const SITE = "https://migrantscholar.com";
function generateSitemap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url><url><loc>${SITE}/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>${posts.map(({slug,date})=>`<url><loc>${SITE}/blog/${slug}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("")}</urlset>`;
}
export default function Sitemap() {}
export async function getServerSideProps({res}) {
  const posts = getAllPosts();
  res.setHeader("Content-Type","text/xml");
  res.setHeader("Cache-Control","public, s-maxage=3600");
  res.write(generateSitemap(posts));
  res.end();
  return {props:{}};
}
