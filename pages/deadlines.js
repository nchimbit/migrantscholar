import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../components/Layout";
import { getAllPosts } from "../lib/posts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const upcomingDeadlines = [
  { name:"DAAD Development Scholarships", country:"Germany", flag:"🇩🇪", deadline:"Oct 2026", type:"Fully Funded", link:"/universities/daad" },
  { name:"Chevening Scholarship 2027", country:"UK", flag:"🇬🇧", deadline:"Nov 2026", type:"Fully Funded", link:"/universities/chevening" },
  { name:"Fulbright Foreign Student Program", country:"USA", flag:"🇺🇸", deadline:"Oct 2026", type:"Fully Funded", link:"/universities/fulbright" },
  { name:"Vanier Canada Graduate Scholarships", country:"Canada", flag:"🇨🇦", deadline:"Nov 2026", type:"Fully Funded", link:"/universities/vanier" },
  { name:"Türkiye Bursları Scholarship", country:"Turkey", flag:"🇹🇷", deadline:"Feb 2027", type:"Fully Funded", link:"/universities/turkiye-burslari" },
  { name:"Australia Awards Scholarships", country:"Australia", flag:"🇦🇺", deadline:"Apr 2027", type:"Fully Funded", link:"/universities/australia-awards" },
  { name:"Oxford Sanctuary Scholarship", country:"UK", flag:"🇬🇧", deadline:"Mar 2027", type:"Fully Funded", link:"/universities/oxford" },
  { name:"DAAD Helmut Schmidt Programme", country:"Germany", flag:"🇩🇪", deadline:"Nov 2026", type:"Fully Funded", link:"/countries/Germany" },
  { name:"Commonwealth Scholarship", country:"UK", flag:"🇬🇧", deadline:"Dec 2026", type:"Fully Funded", link:"/countries/UK" },
  { name:"Erasmus Mundus Joint Masters", country:"Europe", flag:"🇪🇺", deadline:"Jan 2027", type:"Fully Funded", link:"/blog" },
];

export default function DeadlinesPage({ totalPosts }) {
  return (
    <>
      <Head>
        <title>Scholarship Deadlines 2026-2027 for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content="Upcoming scholarship deadlines for migrants, refugees and asylum seekers in 2026 and 2027. DAAD, Chevening, Fulbright, Vanier and more." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/deadlines" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"ItemList",
          "name":"Scholarship Deadlines 2026-2027 for Migrants and Refugees",
          "itemListElement": upcomingDeadlines.map((d,i)=>({
            "@type":"ListItem",
            "position":i+1,
            "name":d.name,
            "description":`Deadline: ${d.deadline} — ${d.type} scholarship in ${d.country}`
          }))
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>2026 — 2027</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Scholarship Deadlines for Migrants & Refugees</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>Never miss a deadline. All upcoming scholarship deadlines for migrants, refugees and asylum seekers in one place.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Deadlines
        </div>

        {/* Alert signup */}
        <div style={{background:"#FFF7ED",border:"1.5px solid #F5A623",borderRadius:"10px",padding:"1.25rem",marginBottom:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
          <div>
            <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>🔔 Get deadline reminders by email</strong>
            <span style={{fontSize:"12px",color:"#6b7280"}}>Free alerts when scholarship applications open for migrants and refugees.</span>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"8px 18px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts →</Link>
        </div>

        {/* Deadline list */}
        <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.25rem"}}>Upcoming Deadlines</h2>
        <div style={{display:"flex",flexDirection:"column",gap:".75rem",marginBottom:"2rem"}}>
          {upcomingDeadlines.map(d=>(
            <Link key={d.name} href={d.link} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1rem 1.25rem",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",color:"inherit"}}>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",flex:1}}>
                <span style={{fontSize:"1.5rem"}}>{d.flag}</span>
                <div>
                  <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>{d.name}</strong>
                  <span style={{fontSize:"11px",color:"#6b7280"}}>{d.country} · {d.type}</span>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",flexShrink:0}}>
                <span style={{background:"#DC2626",color:"#fff",padding:"4px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:700}}>📅 {d.deadline}</span>
                <span style={{fontSize:"12px",color:"#0D6E6E",fontWeight:700}}>View →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Monthly calendar */}
        <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.25rem"}}>Deadline Calendar</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:".75rem",marginBottom:"2rem"}}>
          {[
            ["Jul 2026",[]],
            ["Aug 2026",["DAAD opening"]],
            ["Sep 2026",["Chevening opens"]],
            ["Oct 2026",["DAAD deadline","Fulbright deadline"]],
            ["Nov 2026",["Chevening deadline","Vanier deadline","DAAD Helmut Schmidt"]],
            ["Dec 2026",["Commonwealth deadline"]],
            ["Jan 2027",["Erasmus Mundus"]],
            ["Feb 2027",["Türkiye Bursları"]],
            ["Mar 2027",["Oxford Sanctuary"]],
            ["Apr 2027",["Australia Awards"]],
            ["May 2027",[]],
            ["Jun 2027",[]],
          ].map(([month, items])=>(
            <div key={month} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:".875rem"}}>
              <strong style={{display:"block",fontSize:"12px",color:"#0D6E6E",marginBottom:".4rem"}}>{month}</strong>
              {items.length > 0 ? items.map(item=>(
                <div key={item} style={{fontSize:"10px",color:"#374151",padding:"2px 0",borderBottom:"1px solid #f6f9f8"}}>• {item}</div>
              )) : (
                <div style={{fontSize:"10px",color:"#9ca3af"}}>No major deadlines</div>
              )}
            </div>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email alerts when scholarship applications open for migrants.</p>
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
  return { props: { totalPosts: posts.length }, revalidate: 3600 };
}
