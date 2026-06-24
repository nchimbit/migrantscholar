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
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",display:"flex",flexDirection:"column",gap:".5rem",textDecoration:"none",color:"inherit"}}>
                <div style={{display:"inline-block",background:"#E6F4F1",color:"#0D6E6E",fontSize:"11px",fontWeight:600,padding:"3px 10px",borderRadius:"20px",width:"fit-content"}}>{post.deadline && post.deadline!=="Unknown" ? `Deadline: ${post.deadline}` : "Deadline unknown"}</div>
                <div style={{display:"flex",gap:".35rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"10px",color:"#374151",background:"#f3f4f6",border:"1px solid #e5e7eb",padding:"2px 8px",borderRadius:"20px"}}>{post.country}</span>
                  <span style={{fontSize:"10px",color:"#166534",background:"#F0FDF4",border:"1px solid #BBF7D0",padding:"2px 8px",borderRadius:"20px"}}>{post.type || "scholarship"}</span>
                  <span style={{fontSize:"10px",color:"#1D4ED8",background:"#EFF6FF",border:"1px solid #BFDBFE",padding:"2px 8px",borderRadius:"20px"}}>open</span>
                </div>
                <h3 style={{fontSize:".9rem",fontWeight:700,color:"#0D6E6E",lineHeight:1.4}}>{post.title}</h3>
                <p style={{fontSize:"12px",color:"#374151",lineHeight:1.6,flex:1}}>{post.excerpt.slice(0,120)}...</p>
                {post.funding && <div style={{fontSize:"11px",color:"#6b7280",paddingTop:".4rem",borderTop:"1px solid #f0faf9"}}>{post.funding}</div>}
                <div style={{background:"#0D6E6E",color:"#fff",textAlign:"center",padding:"8px",borderRadius:"7px",fontSize:"12px",fontWeight:700,marginTop:".25rem"}}>View details</div>
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
