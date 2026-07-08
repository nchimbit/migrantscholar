import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const levelInfo = {
  "masters": {
    title: "Master's Scholarships for Migrants & Refugees",
    description: "Fully funded Master's degree scholarships for migrants, refugees and asylum seekers. Updated daily.",
    intro: "These Master's scholarships are specifically available to migrants, refugees and asylum seekers. Many cover full tuition plus a monthly living allowance.",
    keywords: ["masters scholarship migrants", "masters scholarship refugees", "postgraduate scholarship asylum seekers"],
  },
  "phd": {
    title: "PhD Scholarships for Migrants & Refugees",
    description: "Doctoral scholarships for migrants, refugees and forced migrants worldwide. Updated daily.",
    intro: "PhD scholarships for migrants and refugees offer full funding for doctoral research. The Vanier Scholarship in Canada offers $50,000/year for 3 years.",
    keywords: ["phd scholarship migrants", "doctoral scholarship refugees", "research scholarship asylum seekers"],
  },
  "undergraduate": {
    title: "Undergraduate Scholarships for Migrants & Refugees",
    description: "Bachelor's degree scholarships for migrants, refugees and asylum seekers. Updated daily.",
    intro: "Undergraduate scholarships for migrants and refugees fund your first degree. UK Sanctuary Scholarships cover full tuition at over 70 universities.",
    keywords: ["undergraduate scholarship migrants", "bachelors scholarship refugees", "degree scholarship asylum seekers"],
  },
  "postdoctoral": {
    title: "Postdoctoral Scholarships for Migrants & Refugees",
    description: "Postdoctoral research funding for migrants and displaced researchers worldwide.",
    intro: "Postdoctoral fellowships and research grants are available for displaced researchers and migrant academics at universities worldwide.",
    keywords: ["postdoc scholarship migrants", "research fellowship refugees", "postdoctoral funding displaced"],
  },
};

const levelKeywords = {
  "masters": ["master", "postgraduate", "msc", "ma ", "mba"],
  "phd": ["phd", "doctoral", "doctorate", "research degree"],
  "undergraduate": ["undergraduate", "bachelor", "degree", "ug "],
  "postdoctoral": ["postdoc", "postdoctoral", "fellowship", "research grant"],
};

export default function LevelPage({ level, posts, info }) {
  if (!info) return null;

  return (
    <>
      <Head>
        <title>{info.title} 2026 — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/by-level/${level}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          "name":info.title,
          "description":info.description,
          "url":`https://migrantscholar.vercel.app/by-level/${level}`
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>
              {posts.length} Scholarships Found
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem",letterSpacing:"-0.02em"}}>{info.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{info.intro}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/blog" style={{color:"#0D6E6E",textDecoration:"none"}}>Scholarships</Link> ›{" "}
          {info.title}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.length > 0 ? posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h2 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h2>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                  <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                  <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                </div>
              </div>
            </Link>
          )) : (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"3rem",color:"#6b7280"}}>
              <p>More guides coming soon. <Link href="/blog" style={{color:"#0D6E6E"}}>Browse all scholarships →</Link></p>
            </div>
          )}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts for new {info.title.toLowerCase()}.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["masters","phd","undergraduate","postdoctoral"].map(level=>({params:{level}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = levelInfo[params.level];
  if (!info) return { notFound: true };
  const keywords = levelKeywords[params.level] || [];
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return keywords.some(k => text.includes(k));
  }).slice(0, 30);
  const { ...safeInfo } = info;
  return { props: { level: params.level, posts, info: safeInfo }, revalidate: 3600 };
}
