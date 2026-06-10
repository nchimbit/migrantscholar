import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer, AdBanner } from "../components/Layout";
import { getAllPosts, formatDate } from "../lib/posts";

const countryColors = {
  UK: { bg: "#DBEAFE", color: "#1E40AF" },
  Germany: { bg: "#EEF2FF", color: "#3730A3" },
  Canada: { bg: "#FFF7ED", color: "#9A3412" },
  Australia: { bg: "#F0FDF4", color: "#166534" },
  USA: { bg: "#FDF4FF", color: "#7E22CE" },
  Turkey: { bg: "#FFFBEB", color: "#92400E" },
};

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>MigrantScholar — Scholarships for Migrants and Refugees</title>
        <meta name="description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers in the UK, Germany, Canada, Turkey and more. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.vercel.app" />
      </Head>
      <Navbar />

      <div style={{background:"#EFF6FF",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Hero */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap",marginBottom:"1rem"}}>
            <div style={{flex:1,minWidth:"220px"}}>
              <div style={{display:"inline-block",background:"#EFF6FF",border:"0.5px solid #BFDBFE",color:"#1D4ED8",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",marginBottom:".4rem",fontWeight:500}}>Updated daily · 2026</div>
              <h1 style={{fontSize:"1rem",fontWeight:500,color:"#1E3A8A",lineHeight:1.3,marginBottom:".25rem"}}>
                Scholarships for <em style={{fontStyle:"normal",color:"#1D4ED8"}}>Migrant Students</em> Worldwide
              </h1>
              <p style={{fontSize:"11px",color:"#3B82F6"}}>Verified fully funded awards open to refugees, asylum seekers, and forced migrants.</p>
            </div>
            <div style={{display:"flex",border:"0.5px solid #BFDBFE",borderRadius:"8px",overflow:"hidden",flexShrink:0}}>
              {[["70+","Universities"],["£17k+","Top Award"],["Free","Always"]].map(([val,label],i)=>(
                <div key={label} style={{padding:".5rem .9rem",textAlign:"center",borderRight:i<2?"0.5px solid #BFDBFE":"none"}}>
                  <strong style={{display:"block",fontSize:".9rem",fontWeight:500,color:"#1E3A8A"}}>{val}</strong>
                  <span style={{fontSize:"10px",color:"#93C5FD",textTransform:"uppercase",letterSpacing:".05em"}}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad */}
          <div style={{background:"#fff",border:"0.5px dashed #BFDBFE",borderRadius:"8px",height:"52px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#BFDBFE",marginBottom:"1rem"}}>
            Advertisement
          </div>

          {/* Section head */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem"}}>
            <span style={{fontSize:"11px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em"}}>Latest guides</span>
            <Link href="/blog" style={{fontSize:"12px",color:"#1D4ED8",fontWeight:500}}>View all →</Link>
          </div>

          {/* Cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:".75rem",marginBottom:"1rem"}}>
            {posts.slice(0,6).map(post=>{
              const c = countryColors[post.country] || {bg:"#DBEAFE",color:"#1E40AF"};
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{display:"block",background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".875rem 1rem",color:"inherit",textDecoration:"none",transition:"border-color .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#1D4ED8"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#BFDBFE"}
                >
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".5rem"}}>
                    <span style={{fontSize:"10px",fontWeight:500,padding:"2px 7px",borderRadius:"4px",background:c.bg,color:c.color}}>{post.country}</span>
                    <span style={{fontSize:"10px",color:"#93C5FD"}}>{post.readingTime} min read</span>
                  </div>
                  <h3 style={{fontSize:"12px",fontWeight:500,color:"#1E3A8A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                  <p style={{fontSize:"11px",color:"#64748b",lineHeight:1.5,marginBottom:".6rem"}}>{post.excerpt.slice(0,110)}...</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"0.5px solid #DBEAFE",paddingTop:".5rem"}}>
                    <span style={{fontSize:"10px",color:"#93C5FD"}}>{formatDate(post.date)}</span>
                    <span style={{fontSize:"11px",color:"#1D4ED8",fontWeight:500}}>Read guide →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div id="alerts" style={{background:"#DBEAFE",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:"1rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".75rem",marginBottom:"1rem"}}>
            <div>
              <h3 style={{fontSize:".85rem",fontWeight:500,color:"#1E3A8A",marginBottom:".15rem"}}>Never miss a scholarship deadline</h3>
              <p style={{fontSize:"11px",color:"#3B82F6"}}>Free alerts when new awards open for migrants, refugees, and asylum seekers.</p>
            </div>
            <div style={{display:"flex",gap:".35rem"}}>
              <input type="email" placeholder="your@email.com" style={{background:"#fff",border:"0.5px solid #BFDBFE",color:"#1E3A8A",padding:"6px 10px",borderRadius:"6px",fontSize:"12px",outline:"none",minWidth:"170px"}} />
              <button style={{background:"#1E40AF",color:"#fff",border:"none",padding:"6px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>Get free alerts</button>
            </div>
          </div>

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
  return { props: { posts }, revalidate: 3600 };
}
