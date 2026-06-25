import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";
import { getAllPosts, formatDate } from "../lib/posts";

const countryColors = {
  UK:{bg:"#0D6E6E"}, Germany:{bg:"#3730A3"}, Canada:{bg:"#9A3412"},
  Australia:{bg:"#166534"}, USA:{bg:"#7E22CE"}, Turkey:{bg:"#92400E"},
};

const countries = [
  ["🇬🇧","United Kingdom","Sanctuary Scholarships · £17k+","UK"],
  ["🇩🇪","Germany","DAAD · Fully Funded","Germany"],
  ["🇨🇦","Canada","Vanier · $50,000/yr","Canada"],
  ["🇦🇺","Australia","Australia Awards · Full funding","Australia"],
  ["🇺🇸","USA","Fulbright · Graduate awards","USA"],
  ["🇹🇷","Turkey","Türkiye Bursları · 180+ countries","Turkey"],
];

const types = [
  ["⭐","Fully Funded","Complete coverage — tuition, living costs, travel, and health insurance included.","#E6F4EF"],
  ["🎓","Undergraduate","Bachelor's degree awards open to refugees and asylum seekers at top universities.","#FEF3C7"],
  ["📚","Master's Degrees","Postgraduate scholarships for migrants pursuing Master's programmes abroad.","#EEF2FF"],
  ["🔬","PhD Research","Doctoral scholarships for forced migrants with research ambitions.","#FDF4FF"],
  ["🛡️","Refugee Specific","Awards exclusively for refugees and asylum seekers — no settled status required.","#FFF7ED"],
  ["💰","Partially Funded","Tuition waivers and partial bursaries to reduce the cost of study abroad.","#F0FDF4"],
];

export default function Home({ posts }) {
  const [visible, setVisible] = useState(9);
  const showing = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <Head>
        <title>MigrantScholar — Scholarships for Migrants and Refugees</title>
        <meta name="description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers in the UK, Germany, Canada, Turkey and more. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.vercel.app" />
        <meta name="google-site-verification" content="xD-MIsy__wA8eoQYHgCK35xdAk0LjbPAxl2sDxAQifg" />
      </Head>
      <Navbar />

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"1.5rem 2rem 0"}}>
        {/* Boxed compact HERO */}
        <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          <div style={{flex:1,minWidth:"300px"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"4px",marginBottom:".6rem",textTransform:"uppercase",letterSpacing:".07em"}}>Updated Daily · 2026</div>
            <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:".5rem",letterSpacing:"-0.02em"}}>
              Find Your <em style={{fontStyle:"normal",color:"#F5A623"}}>Scholarship</em> As A Migrant!
            </h1>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",marginBottom:".875rem",lineHeight:1.55,maxWidth:"380px"}}>Verified fully funded awards open to refugees, asylum seekers, and forced migrants.</p>
            <div style={{display:"flex",gap:".6rem",flexWrap:"wrap"}}>
              <Link href="/blog" style={{background:"#F5A623",color:"#0A2A2A",padding:"8px 18px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>Browse Scholarships</Link>
              <Link href="/alerts" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",padding:"8px 18px",borderRadius:"6px",fontSize:"12px",fontWeight:600,textDecoration:"none"}}>Get Free Alerts</Link>
            </div>
          </div>
          <div style={{display:"flex",borderLeft:"1px solid rgba(255,255,255,.15)",paddingLeft:"1.5rem",flexShrink:0}}>
            {[["70+","Universities"],[`${posts.length}+`,"Scholarships"],["£17k+","Top Award"],["Free","Always"]].map(([val,label],i)=>(
              <div key={label} style={{textAlign:"center",padding:"0 .9rem",borderRight:i<3?"1px solid rgba(255,255,255,.15)":"none"}}>
                <strong style={{display:"block",fontSize:"1.1rem",fontWeight:800,color:"#fff"}}>{val}</strong>
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.65)",textTransform:"uppercase",letterSpacing:".05em"}}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div style={{textAlign:"center",marginBottom:"1.75rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>Browse by Country</div>
          <h2 style={{fontSize:"1.5rem",fontWeight:800,color:"#0D6E6E",letterSpacing:"-0.02em"}}>Countries We Cover</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2.5rem"}}>
          {countries.map(([flag,name,desc,code])=>(
            <Link key={code} href={`/countries/${code}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",display:"flex",alignItems:"center",gap:".875rem",textDecoration:"none",cursor:"pointer"}}>
              <div style={{fontSize:"2rem",flexShrink:0}}>{flag}</div>
              <div style={{flex:1}}>
                <strong style={{display:"block",fontSize:".9rem",fontWeight:700,color:"#0A2A2A",marginBottom:".15rem"}}>{name}</strong>
                <span style={{fontSize:"11px",color:"#6b7280"}}>{desc}</span>
              </div>
              <div style={{color:"#0D6E6E",fontSize:"16px",fontWeight:700}}>→</div>
            </Link>
          ))}
        </div>

        {/* Types */}
        <div style={{textAlign:"center",marginBottom:"1.75rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>Scholarship Types</div>
          <h2 style={{fontSize:"1.5rem",fontWeight:800,color:"#0D6E6E",letterSpacing:"-0.02em"}}>What We Cover</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2.5rem"}}>
          {types.map(([icon,title,desc,bg])=>(
            <div key={title} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",textAlign:"center"}}>
              <div style={{width:"48px",height:"48px",borderRadius:"10px",background:bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto .75rem",fontSize:"22px"}}>{icon}</div>
              <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".25rem"}}>{title}</h3>
              <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55}}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div style={{textAlign:"center",marginBottom:"1.75rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>Latest Guides</div>
          <h2 style={{fontSize:"1.5rem",fontWeight:800,color:"#0D6E6E",letterSpacing:"-0.02em"}}>Today's Scholarship Posts</h2>
        </div>
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

        {hasMore && (
          <div style={{textAlign:"center",marginBottom:"2rem"}}>
            <button onClick={()=>setVisible(v=>v+9)} style={{background:"#fff",border:"1.5px solid #0D6E6E",borderRadius:"8px",padding:".75rem 2rem",fontSize:"13px",color:"#0D6E6E",fontWeight:700,cursor:"pointer"}}>
              Load more guides ({posts.length - visible} remaining)
            </button>
          </div>
        )}

        {/* Why */}
        <div style={{background:"#0D6E6E",borderRadius:"12px",padding:"2rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#fff",marginBottom:"1.25rem",textAlign:"center"}}>WHY CHOOSE MIGRANTSCHOLAR?</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1rem"}}>
            {[["✓","Verified Scholarships"],["📅","Updated Daily"],["🌍","7 Countries"],["🔓","Always Free"],["⚡","AI Powered"]].map(([icon,label])=>(
              <div key={label} style={{textAlign:"center"}}>
                <div style={{width:"44px",height:"44px",background:"rgba(255,255,255,.15)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto .5rem",fontSize:"20px"}}>{icon}</div>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,.85)",fontWeight:500}}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div id="alerts" style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          <div>
            <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>NEVER MISS A DEADLINE AGAIN!</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new scholarships open for migrants, refugees, and asylum seekers.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",border:"none",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>GET FREE ALERTS</Link>
        </div>

      </div>

      {/* Contact bar */}
      <div style={{background:"#0A2A2A",padding:".875rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:".5rem",color:"rgba(255,255,255,.85)",fontSize:"12px"}}>📍 Access from anywhere, anytime</div>
          <div style={{display:"flex",alignItems:"center",gap:".5rem",color:"rgba(255,255,255,.85)",fontSize:"12px"}}>📧 contact@migrantscholar.com</div>
          <div style={{display:"flex",alignItems:"center",gap:".5rem",color:"rgba(255,255,255,.85)",fontSize:"12px"}}>🌐 migrantscholar.com</div>
          <Link href="/blog" style={{background:"#F5A623",color:"#0A2A2A",padding:"6px 18px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>BROWSE NOW</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts }, revalidate: 60 };
}
