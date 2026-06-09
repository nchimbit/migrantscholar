import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer, AdBanner } from "../components/Layout";
import { getAllPosts, formatDate } from "../lib/posts";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>MigrantScholar — Scholarships for Migrants and Refugees</title>
        <meta name="description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers in the UK, Germany, Canada, Turkey and more. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.vercel.app" />
      </Head>
      <Navbar />
      <section style={{background:"var(--hero)",padding:"2rem 2rem 1.75rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.85)",fontSize:"11px",fontWeight:500,letterSpacing:".08em",textTransform:"uppercase",padding:"3px 12px",borderRadius:"20px",marginBottom:"1rem",border:"1px solid rgba(255,255,255,.15)"}}>Updated daily · 2026</div>
        <h1 style={{fontFamily:"var(--ff-display)",fontSize:"clamp(1.5rem,4vw,2.25rem)",fontWeight:600,color:"#fff",lineHeight:1.2,letterSpacing:"-0.03em",maxWidth:"600px",margin:"0 auto .75rem"}}>Scholarships for <em style={{fontStyle:"italic",color:"#6EE7B7"}}>Migrant Students</em> Worldwide</h1>
        <p style={{color:"rgba(255,255,255,.7)",fontSize:".95rem",maxWidth:"480px",margin:"0 auto 1.25rem"}}>Verified fully funded awards open to refugees, asylum seekers, and forced migrants. Free to use, updated every day.</p>
        <div style={{display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap"}}>
          {[["70+","Universities"],["£17k+","Top Award"],["Free","Always"]].map(([val,label])=>(
            <div key={label} style={{textAlign:"center"}}>
              <strong style={{display:"block",fontSize:"1.25rem",fontWeight:600,color:"#fff",fontFamily:"var(--ff-display)"}}>{val}</strong>
              <span style={{fontSize:"11px",color:"rgba(255,255,255,.55)",textTransform:"uppercase",letterSpacing:".07em"}}>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"0 2rem"}}>
        <AdBanner label="Advertisement" />
      </div>
      <main style={{maxWidth:"1080px",margin:"0 auto",padding:"1rem 2rem 4rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
          <div>
            <div style={{fontSize:"11px",fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",color:"var(--accent)",marginBottom:".25rem"}}>Latest guides</div>
            <h2 style={{fontFamily:"var(--ff-display)",fontSize:"1.5rem",fontWeight:600,letterSpacing:"-0.02em"}}>Today's scholarship posts</h2>
          </div>
          <Link href="/blog" style={{fontSize:"14px",color:"var(--accent)",fontWeight:500}}>View all →</Link>
        </div>
        {posts.length === 0 ? (
          <div style={{textAlign:"center",padding:"4rem 1rem",color:"var(--muted)"}}>
            <p>Posts are generated daily. Check back soon.</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.25rem"}}>
            {posts.slice(0,6).map(post=>(
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{display:"block",background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"1.5rem",color:"inherit"}}>
                <div style={{display:"flex",gap:"8px",marginBottom:".75rem"}}>
                  <span style={{fontSize:"11px",background:"var(--accent-light)",color:"#0B5E47",padding:"3px 9px",borderRadius:"20px",fontWeight:500}}>{post.country}</span>
                  <span style={{fontSize:"11px",color:"var(--muted)"}}>{post.readingTime} min read</span>
                </div>
                <h3 style={{fontFamily:"var(--ff-display)",fontSize:"1rem",fontWeight:600,marginBottom:".5rem",lineHeight:1.35}}>{post.title}</h3>
                <p style={{fontSize:"13px",color:"var(--muted)",lineHeight:1.55,marginBottom:".75rem"}}>{post.excerpt.slice(0,120)}...</p>
                <div style={{fontSize:"11px",color:"var(--muted)"}}>{formatDate(post.date)}</div>
              </Link>
            ))}
          </div>
        )}
        <div id="alerts" style={{background:"var(--hero)",borderRadius:"var(--r)",padding:"2rem",textAlign:"center",marginTop:"2.5rem"}}>
          <h2 style={{fontFamily:"var(--ff-display)",fontSize:"1.5rem",fontWeight:600,color:"#fff",marginBottom:".5rem",letterSpacing:"-0.02em"}}>Never miss a deadline again</h2>
          <p style={{color:"rgba(255,255,255,.65)",marginBottom:"1.5rem",fontSize:".9rem"}}>Free alerts when new scholarships open for migrants.</p>
          <div style={{display:"flex",maxWidth:"420px",margin:"0 auto",gap:".5rem",flexWrap:"wrap",justifyContent:"center"}}>
            <input type="email" placeholder="your@email.com" style={{flex:1,minWidth:"200px",border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",outline:"none"}} />
            <button style={{background:"#6EE7B7",color:"#0D3B2E",border:"none",padding:"10px 20px",borderRadius:"6px",fontSize:"14px",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>Get Free Alerts</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts }, revalidate: 3600 };
}
