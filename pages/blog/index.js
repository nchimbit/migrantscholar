import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar, AdBanner } from "../../components/Layout";
import { getAllPosts, getAllCountries, formatDate } from "../../lib/posts";

const countryColors = {
  UK:{bg:"#DBEAFE",color:"#1E40AF"},
  Germany:{bg:"#EEF2FF",color:"#3730A3"},
  Canada:{bg:"#FFF7ED",color:"#9A3412"},
  Australia:{bg:"#F0FDF4",color:"#166534"},
  USA:{bg:"#FDF4FF",color:"#7E22CE"},
  Turkey:{bg:"#FFFBEB",color:"#92400E"},
};

export default function BlogIndex({ posts, countries }) {
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("All");
  const filtered = useMemo(() => posts.filter(p => {
    const matchCountry = activeCountry === "All" || p.country === activeCountry;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  }), [posts, search, activeCountry]);

  return (
    <>
      <Head>
        <title>Scholarship Guides for Migrants — MigrantScholar</title>
        <meta name="description" content="Browse all scholarship guides for migrants, refugees, and asylum seekers. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/blog" />
      </Head>
      <Navbar />
      <div style={{background:"#EFF6FF",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Header box */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:".875rem 1.25rem",marginBottom:"1rem"}}>
            <div style={{display:"inline-block",background:"#EFF6FF",border:"0.5px solid #BFDBFE",color:"#1D4ED8",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",marginBottom:".5rem",fontWeight:500}}>All guides</div>
            <h1 style={{fontSize:"1rem",fontWeight:500,color:"#1E3A8A",marginBottom:".75rem"}}>{filtered.length} scholarship guides for migrant students</h1>
            <input type="text" placeholder="Search by country, scholarship name, or keyword..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",maxWidth:"420px",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:"6px 10px",fontSize:"12px",outline:"none",marginBottom:".75rem",color:"#1E3A8A"}} />
            <div style={{display:"flex",gap:".35rem",flexWrap:"wrap"}}>
              {["All",...countries].map(c=>(
                <button key={c} onClick={()=>setActiveCountry(c)} style={{border:"0.5px solid",borderColor:activeCountry===c?"#1D4ED8":"#BFDBFE",background:activeCountry===c?"#DBEAFE":"#fff",color:activeCountry===c?"#1E40AF":"#3B82F6",padding:"3px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:activeCountry===c?500:400,cursor:"pointer"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Ad */}
          <div style={{background:"#fff",border:"0.5px dashed #BFDBFE",borderRadius:"8px",height:"52px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#BFDBFE",marginBottom:"1rem"}}>Advertisement</div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:"3rem",textAlign:"center",color:"#93C5FD",fontSize:"13px"}}>No posts found. Try a different keyword.</div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:".75rem",marginBottom:"1rem"}}>
              {filtered.map(post=>{
                const c = countryColors[post.country] || {bg:"#DBEAFE",color:"#1E40AF"};
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{display:"block",background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".875rem 1rem",color:"inherit",textDecoration:"none"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#1D4ED8"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#BFDBFE"}
                  >
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".5rem"}}>
                      <span style={{fontSize:"10px",fontWeight:500,padding:"2px 7px",borderRadius:"4px",background:c.bg,color:c.color}}>{post.country}</span>
                      <span style={{fontSize:"10px",color:"#93C5FD"}}>{post.readingTime} min read</span>
                    </div>
                    <h2 style={{fontSize:"12px",fontWeight:500,color:"#1E3A8A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h2>
                    <p style={{fontSize:"11px",color:"#64748b",lineHeight:1.5,marginBottom:".6rem"}}>{post.excerpt.slice(0,110)}...</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"0.5px solid #DBEAFE",paddingTop:".5rem"}}>
                      <span style={{fontSize:"10px",color:"#93C5FD"}}>{formatDate(post.date)}</span>
                      <span style={{fontSize:"11px",color:"#1D4ED8",fontWeight:500}}>Read guide →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Footer box */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
            <p style={{fontSize:"11px",color:"#93C5FD"}}>© 2026 MigrantScholar.com — Free, independent scholarship resource</p>
            <div style={{display:"flex",gap:"1rem"}}>
              <Link href="/about" style={{fontSize:"11px",color:"#3B82F6",textDecoration:"none"}}>About</Link>
              <Link href="/sitemap.xml" style={{fontSize:"11px",color:"#3B82F6",textDecoration:"none"}}>Sitemap</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const countries = getAllCountries();
  return { props: { posts, countries }, revalidate: 3600 };
}
