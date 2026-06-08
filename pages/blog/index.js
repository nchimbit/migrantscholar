import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer, AdBanner } from "../../components/Layout";
import { getAllPosts, getAllCountries, formatDate } from "../../lib/posts";

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
        <link rel="canonical" href="https://migrantscholar.com/blog" />
      </Head>
      <Navbar />
      <div style={{background:"var(--surface)",borderBottom:"1px solid var(--border)",padding:"2.5rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <h1 style={{fontFamily:"var(--ff-display)",fontSize:"clamp(1.5rem,3vw,2.25rem)",fontWeight:600,letterSpacing:"-0.02em",marginBottom:"1.25rem"}}>{filtered.length} scholarship guides for migrant students</h1>
          <input type="text" placeholder="Search by country, scholarship name, or keyword..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",maxWidth:"480px",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"10px 16px",fontSize:"14px",outline:"none",marginBottom:"1rem",background:"#fff"}} />
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {["All",...countries].map(c=>(
              <button key={c} onClick={()=>setActiveCountry(c)} style={{border:"1px solid",borderColor:activeCountry===c?"var(--accent)":"var(--border)",background:activeCountry===c?"var(--accent)":"#fff",color:activeCountry===c?"#fff":"var(--slate)",padding:"6px 14px",borderRadius:"20px",fontSize:"13px",fontWeight:500,cursor:"pointer"}}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"0 2rem"}}>
        <AdBanner label="Advertisement" />
      </div>
      <main style={{maxWidth:"1080px",margin:"0 auto",padding:"0 2rem 4rem"}}>
        {filtered.length === 0 ? (
          <p style={{textAlign:"center",padding:"4rem",color:"var(--muted)"}}>No posts found. Try a different keyword.</p>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.25rem"}}>
            {filtered.map(post=>(
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{display:"block",background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"1.5rem",color:"inherit"}}>
                <div style={{display:"flex",gap:"8px",marginBottom:".75rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"11px",background:"var(--accent-light)",color:"#0B5E47",padding:"3px 9px",borderRadius:"20px",fontWeight:500}}>{post.country}</span>
                  <span style={{fontSize:"11px",color:"var(--muted)"}}>{post.readingTime} min read</span>
                </div>
                <h2 style={{fontFamily:"var(--ff-display)",fontSize:"1rem",fontWeight:600,marginBottom:".5rem",lineHeight:1.35}}>{post.title}</h2>
                <p style={{fontSize:"13px",color:"var(--muted)",lineHeight:1.55,marginBottom:".75rem"}}>{post.excerpt.slice(0,130)}...</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:"11px",color:"var(--muted)"}}>{formatDate(post.date)}</span>
                  <span style={{fontSize:"12px",color:"var(--accent)",fontWeight:500}}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
export async function getStaticProps() {
  const posts = getAllPosts();
  const countries = getAllCountries();
  return { props: { posts, countries }, revalidate: 3600 };
}
