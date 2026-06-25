import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, getAllCountries, formatDate } from "../../lib/posts";

const countryColors = {
  UK:{bg:"#0D6E6E"}, Germany:{bg:"#3730A3"}, Canada:{bg:"#9A3412"},
  Australia:{bg:"#166534"}, USA:{bg:"#7E22CE"}, Turkey:{bg:"#92400E"},
};

export default function BlogIndex({ posts, countries }) {
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("All");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => posts.filter(p => {
    const matchCountry = activeCountry === "All" || p.country === activeCountry;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  }), [posts, search, activeCountry]);

  const showing = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      <Head>
        <title>Scholarship Guides for Migrants — MigrantScholar</title>
        <meta name="description" content="Browse all scholarship guides for migrants, refugees, and asylum seekers. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/blog" />
      </Head>
      <Navbar />

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",padding:"2.5rem 2rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>All Guides</div>
        <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".5rem",letterSpacing:"-0.02em"}}>{filtered.length} Scholarship Guides for Migrant Students</h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,.75)",maxWidth:"480px",margin:"0 auto"}}>Search by country, scholarship type, or keyword to find verified awards for migrants and refugees.</p>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>

        {/* Search + filters box */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",marginBottom:"1.5rem"}}>
          <input type="text" placeholder="Search by country, scholarship name, or keyword..." value={search} onChange={e=>{setSearch(e.target.value);setVisible(9);}}
            style={{width:"100%",background:"#E6F4F1",border:"1px solid #A7D4CC",borderRadius:"6px",padding:"9px 14px",fontSize:"13px",outline:"none",marginBottom:"1rem",color:"#0A2A2A"}} />
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {["All",...countries].map(c=>(
              <button key={c} onClick={()=>{setActiveCountry(c);setVisible(9);}} style={{
                border:"1.5px solid",
                borderColor:activeCountry===c?"#0D6E6E":"#e2f0f0",
                background:activeCountry===c?"#0D6E6E":"#fff",
                color:activeCountry===c?"#fff":"#374151",
                padding:"5px 14px",borderRadius:"20px",fontSize:"12px",fontWeight:activeCountry===c?700:500,cursor:"pointer"
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        {showing.length === 0 ? (
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"3rem",textAlign:"center",color:"#9ca3af",fontSize:"13px"}}>No posts found. Try a different keyword.</div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
            {showing.map(post=>{
              const c = countryColors[post.country] || {bg:"#0D6E6E"};
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
                  <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",background:"rgba(13,110,110,.1)",padding:"2px 8px",borderRadius:"4px",textTransform:"uppercase"}}>{post.country}</span>
                    <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
                  </div>
                  <div style={{padding:"1rem"}}>
                    <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                    <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                      <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                      <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
            <button onClick={()=>setVisible(v=>v+9)} style={{background:"#fff",border:"1.5px solid #0D6E6E",borderRadius:"8px",padding:".75rem 2rem",fontSize:"13px",color:"#0D6E6E",fontWeight:700,cursor:"pointer"}}>
              Load more guides ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const countries = getAllCountries();
  return { props: { posts, countries }, revalidate: 3600 };
}
