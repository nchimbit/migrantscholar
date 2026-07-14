import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";
import { getAllPosts, formatDate } from "../lib/posts";

export default function ByDeadlinePage({ posts }) {
  const [filter, setFilter] = useState("all");

  const withDeadline = posts.filter(p => p.deadline && p.deadline !== "Unknown");
  const withoutDeadline = posts.filter(p => !p.deadline || p.deadline === "Unknown");

  const filtered = filter === "known" ? withDeadline :
                   filter === "unknown" ? withoutDeadline : posts;

  // Sort by deadline
  const sorted = [...filtered].sort((a, b) => {
    if (!a.deadline || a.deadline === "Unknown") return 1;
    if (!b.deadline || b.deadline === "Unknown") return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <>
      <Head>
        <title>Scholarships by Deadline 2026-2027 for Migrants — MigrantScholar</title>
        <meta name="description" content="Browse scholarships for migrants and refugees sorted by deadline. Find the next closing scholarship and apply before it's too late." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/by-deadline" />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Sort by Deadline</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Scholarships by Deadline</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>Find the next closing scholarship for migrants and refugees. Never miss a deadline again.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Scholarships by Deadline
        </div>

        {/* Filter tabs */}
        <div style={{display:"flex",gap:".5rem",marginBottom:"1.5rem",flexWrap:"wrap"}}>
          {[["all","All Scholarships"],["known","With Known Deadline"],["unknown","Deadline TBC"]].map(([val,label])=>(
            <button key={val} onClick={()=>setFilter(val)} style={{padding:"6px 16px",borderRadius:"20px",border:"1.5px solid #e2f0f0",background:filter===val?"#0D6E6E":"#fff",color:filter===val?"#fff":"#374151",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>
              {label} {val==="all"?`(${posts.length})`:val==="known"?`(${withDeadline.length})`:`(${withoutDeadline.length})`}
            </button>
          ))}
        </div>

        {/* Alert strip */}
        <div style={{background:"#FFF7ED",border:"1.5px solid #F5A623",borderRadius:"10px",padding:"1rem 1.25rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
          <div>
            <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>🔔 Get deadline alerts by email</strong>
            <span style={{fontSize:"12px",color:"#6b7280"}}>Free alerts when scholarships open for migrants and refugees.</span>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"8px 18px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts →</Link>
        </div>

        {/* Posts list */}
        <div style={{display:"flex",flexDirection:"column",gap:".75rem",marginBottom:"2rem"}}>
          {sorted.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1rem 1.25rem",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",color:"inherit"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:".5rem",marginBottom:".3rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",background:"#E6F4F1",padding:"2px 8px",borderRadius:"10px"}}>{post.country}</span>
                  <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
                </div>
                <h2 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".25rem"}}>{post.title}</h2>
                <p style={{fontSize:"11px",color:"#6b7280"}}>{post.excerpt.slice(0,100)}...</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:".35rem",flexShrink:0}}>
                {post.deadline && post.deadline !== "Unknown" ? (
                  <span style={{background:"#DC2626",color:"#fff",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,whiteSpace:"nowrap"}}>📅 {post.deadline}</span>
                ) : (
                  <span style={{background:"#6b7280",color:"#fff",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700}}>Deadline TBC</span>
                )}
                <span style={{fontSize:"11px",color:"#0D6E6E",fontWeight:700}}>View →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email alerts when scholarships open for migrants and refugees.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts }, revalidate: 3600 };
}
