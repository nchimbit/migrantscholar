import { getAllPosts } from "../lib/posts";
const SITE = "https://migrantscholar.vercel.app";

function generateSitemap(posts) {
  const countries = ["uk","germany","canada","australia","usa","turkey"];
  const filters = ["masters","phd","undergraduate","postdoctoral","refugees","asylum-seekers","without-ielts","migrants","fully-funded","partial"];
  const nationalities = ["syrian","afghan","sudanese","somali","congolese","venezuelan","ukrainian","rohingya","iraqi","eritrean","south-sudanese","myanmar","ethiopian","nigerian","pakistani","kenyan","bangladeshi","zimbabwean","yemeni","libyan","burundian","malian","cameroonian","ghanaian","tanzanian","ugandan","rwandan","iranian","turkish"];
  const compareSlugs = ["daad-vs-chevening","uk-vs-germany","masters-vs-phd","canada-vs-australia","fully-funded-vs-partial","turkey-vs-canada","masters-vs-undergraduate","uk-vs-canada","germany-vs-turkey","phd-vs-postdoc"];

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
<url><loc>${SITE}/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
<url><loc>${SITE}/faq</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/deadlines</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-deadline</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/guides</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/glossary</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
<url><loc>${SITE}/alerts</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/by-eligibility/refugees</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-eligibility/asylum-seekers</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-eligibility/without-ielts</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-eligibility/migrants</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-eligibility/fully-funded</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-level/masters</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-level/phd</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-level/undergraduate</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-level/postdoctoral</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-funding/fully-funded</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-funding/partial</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/by-funding/tuition-waiver</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/UK</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/Germany</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/Canada</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/Australia</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/USA</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/countries/Turkey</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
<url><loc>${SITE}/universities/oxford</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/daad</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/chevening</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/vanier</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/fulbright</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/australia-awards</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>${SITE}/universities/turkiye-burslari</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
${nationalities.map(n=>`<url><loc>${SITE}/nationality/${n}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join("")}
${compareSlugs.map(s=>`<url><loc>${SITE}/compare/${s}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("")}
${countries.flatMap(c=>filters.map(f=>`<url><loc>${SITE}/scholarships/${c}/${f}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`)).join("")}
${posts.map(({slug,date})=>`<url><loc>${SITE}/blog/${slug}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("")}
</urlset>`;
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
