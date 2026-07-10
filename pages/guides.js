import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../components/Layout";

const guides = [
  {
    slug: "how-to-apply-scholarship-refugee",
    title: "How to Apply for a Scholarship as a Refugee",
    desc: "Complete step-by-step guide for refugees applying for scholarships — from finding awards to submitting your application.",
    icon: "🛡️",
    time: "10 min read",
  },
  {
    slug: "scholarships-without-ielts",
    title: "How to Get a Scholarship Without IELTS",
    desc: "Many scholarships waive IELTS for refugees and migrants. Learn which ones and how to apply.",
    icon: "📝",
    time: "8 min read",
  },
  {
    slug: "fully-funded-scholarship-guide",
    title: "What is a Fully Funded Scholarship?",
    desc: "Everything covered — tuition, living costs, travel, health insurance. Learn what to expect and how to win one.",
    icon: "💰",
    time: "7 min read",
  },
  {
    slug: "motivation-letter-guide",
    title: "How to Write a Winning Motivation Letter",
    desc: "A complete guide with examples, templates and tips for migrants and refugees applying for scholarships.",
    icon: "✍️",
    time: "12 min read",
  },
  {
    slug: "asylum-seeker-scholarship-guide",
    title: "Scholarships for Asylum Seekers with Pending Claims",
    desc: "You don't need a final decision to apply. Learn which scholarships accept pending asylum claims.",
    icon: "⏳",
    time: "9 min read",
  },
  {
    slug: "daad-scholarship-guide",
    title: "Complete Guide to DAAD Scholarships for Migrants",
    desc: "Everything you need to know about Germany's DAAD scholarships — eligibility, amounts, deadlines and application tips.",
    icon: "🇩🇪",
    time: "11 min read",
  },
  {
    slug: "chevening-scholarship-guide",
    title: "Complete Guide to Chevening Scholarships",
    desc: "UK's prestigious Chevening scholarship explained for migrants and refugees — eligibility, tips and application process.",
    icon: "🇬🇧",
    time: "10 min read",
  },
  {
    slug: "student-visa-guide",
    title: "Student Visa Guide for Migrants & Refugees",
    desc: "Step-by-step visa application guides for international students by country — UK, Germany, Canada, Australia, USA.",
    icon: "🌐",
    time: "15 min read",
  },
];

export default function GuidesPage() {
  return (
    <>
      <Head>
        <title>Scholarship Guides for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content="Free step-by-step scholarship guides for migrants, refugees and asylum seekers. How to apply, motivation letters, IELTS waivers and more." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/guides" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          "name":"Scholarship Guides for Migrants & Refugees",
          "description":"Free step-by-step scholarship guides for migrants, refugees and asylum seekers.",
          "url":"https://migrantscholar.vercel.app/guides"
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Free Guides</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Scholarship Guides for Migrants & Refugees</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>Step-by-step guides to help you find, apply for, and win scholarships — written specifically for migrants, refugees and asylum seekers.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Guides
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {guides.map(guide=>(
            <Link key={guide.slug} href={`/blog?search=${encodeURIComponent(guide.title.split(' ').slice(0,3).join(' '))}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{fontSize:"2rem",marginBottom:".75rem"}}>{guide.icon}</div>
              <h2 style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{guide.title}</h2>
              <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".75rem"}}>{guide.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                <span style={{fontSize:"10px",color:"#9ca3af"}}>{guide.time}</span>
                <span style={{fontSize:"11px",color:"#0D6E6E",fontWeight:700}}>Read guide →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get new guides in your inbox</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new scholarship guides are published.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
