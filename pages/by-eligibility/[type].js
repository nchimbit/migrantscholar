import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";
const eligibilityFAQs = {
  "refugees": [
    { q: "Can I apply for scholarships as a refugee?", a: "Yes — many scholarships are specifically designed for refugees including DAAD, Chevening and UK Sanctuary Scholarships." },
    { q: "Do I need settled status to get a scholarship?", a: "No — most refugee scholarships do not require settled status. Over 70 UK universities accept asylum seekers without permanent residence." },
    { q: "What documents do refugees need to apply?", a: "Typically UNHCR refugee card, academic transcripts, personal statement and 2 reference letters. Requirements vary by scholarship." },
    { q: "Which country has the most scholarships for refugees?", a: "The UK leads with 70+ Sanctuary Scholarships. Germany is second with DAAD. Canada, Australia, USA and Turkey also have strong options." },
  ],
  "asylum-seekers": [
    { q: "Can asylum seekers apply for scholarships?", a: "Yes — many scholarships accept asylum seekers with pending claims. UK Sanctuary Scholarships and DAAD accept pending applications." },
    { q: "What proof do asylum seekers need?", a: "A Home Office letter or ARC card showing your asylum claim is pending. Requirements vary by country and institution." },
    { q: "Can I get student finance as an asylum seeker?", a: "Generally no. Sanctuary Scholarships exist specifically to replace student finance for asylum seekers." },
    { q: "Are there emergency scholarships for asylum seekers?", a: "Yes — some universities offer emergency bursaries. Contact the financial aid office of your target university." },
  ],
  "without-ielts": [
    { q: "Which scholarships do not require IELTS?", a: "DAAD often waives IELTS for those who studied in English. Turkiye Burslari has no IELTS requirement. Many Sanctuary Scholarships also waive it for refugees." },
    { q: "What can replace IELTS?", a: "A medium of instruction letter from your university, TOEFL, or Duolingo English Test are accepted by many scholarships instead of IELTS." },
    { q: "Does DAAD require IELTS?", a: "Not always — DAAD accepts students who studied in English or who apply to English-taught programmes. Check daad.de for specific requirements." },
    { q: "Can I get a scholarship without any English test?", a: "Yes if you have studied in English for 2+ years. A letter from your university confirming English as medium of instruction is usually sufficient." },
  ],
  "migrants": [
    { q: "What scholarships are available for migrants?", a: "Chevening (UK), DAAD (Germany), Vanier (Canada), Australia Awards, Fulbright (USA) and Turkiye Burslari (Turkey) all welcome migrants." },
    { q: "Do I need to be in the destination country to apply?", a: "No — most scholarships require you to apply from your current country of residence before travelling." },
    { q: "Can I apply for multiple scholarships at once?", a: "Yes — applying to multiple scholarships simultaneously is strongly recommended to maximise your chances." },
    { q: "What is the difference between migrant and refugee scholarships?", a: "Refugee scholarships require official refugee status. Migrant scholarships are broader and include international students and skilled workers." },
  ],
  "fully-funded": [
    { q: "What does fully funded mean?", a: "A fully funded scholarship covers all costs: tuition, monthly living allowance, travel costs and usually health insurance. You pay nothing." },
    { q: "Which fully funded scholarships are open to migrants?", a: "DAAD (934 euros/month), Chevening (1236 pounds/month), Vanier (50000 CAD/year), Turkiye Burslari and Australia Awards all offer full funding." },
    { q: "How competitive are fully funded scholarships?", a: "Very competitive with 5-25% acceptance rates. Apply to multiple scholarships simultaneously to maximise your chances." },
    { q: "Can I apply for multiple fully funded scholarships?", a: "Yes — most scholarships do not require exclusivity at the application stage, only at the acceptance stage." },
  ],
};



const eligibilityInfo = {
  "refugees": {
    title: "Fully Funded Scholarships for Refugees 2026",
    description: "Fully funded scholarships for refugees 2026. UK Sanctuary Scholarships, DAAD Germany, Chevening and more. No settled status required. Updated daily.",
    keywords: ["refugee scholarship", "scholarships for refugees", "fully funded refugee scholarship"],
    intro: "If you are a refugee with UNHCR documentation or a national refugee status, these scholarships are specifically designed for you. Many cover full tuition, living costs, and travel.",
    filter: (p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return text.includes("refugee") || text.includes("asylum") || text.includes("displaced");
    }
  },
  "asylum-seekers": {
    title: "Scholarships for Asylum Seekers 2026 — No Settled Status Required",
    description: "Scholarships for asylum seekers 2026 with pending claims. Apply without settled status. DAAD, UK Sanctuary, Chevening and more. Updated daily.",
    keywords: ["asylum seeker scholarship", "scholarships for asylum seekers", "pending claim scholarship"],
    intro: "You do not need a final decision on your asylum claim to apply for many of these scholarships. Several UK Sanctuary Scholarships, DAAD awards, and others explicitly welcome applicants with pending claims.",
    filter: (p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return text.includes("asylum") || text.includes("refugee") || text.includes("sanctuary");
    }
  },
  "without-ielts": {
    title: "Scholarships Without IELTS 2026 — For Refugees & Migrants",
    description: "Fully funded scholarships without IELTS 2026. Many universities waive English tests for refugees and migrants. Updated daily.",
    keywords: ["scholarship without IELTS", "no IELTS scholarship", "scholarship without English test"],
    intro: "Many scholarships for migrants and refugees waive the IELTS requirement, especially if you have studied in English before or if English is your first language. These guides cover awards that either waive or do not require IELTS.",
    filter: (p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return text.includes("ielts") || text.includes("english") || text.includes("language");
    }
  },
  "migrants": {
    title: "Scholarships for Migrants 2026 — Verified Fully Funded Awards",
    description: "Verified scholarships for migrants and displaced students worldwide. Free, updated daily.",
    keywords: ["migrant scholarship", "scholarships for migrants", "displaced student scholarship"],
    intro: "Migrants, displaced students, and forced migrants can access hundreds of scholarships across the UK, Germany, Canada, Australia, USA and Turkey. These guides explain eligibility in plain language.",
    filter: (p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return text.includes("migrant") || text.includes("displaced") || text.includes("international");
    }
  },
  "fully-funded": {
    title: "Fully Funded Scholarships for Migrants 2026",
    description: "Complete coverage — tuition, living costs, travel, and health insurance for migrants and refugees.",
    keywords: ["fully funded scholarship migrants", "full scholarship refugees", "free scholarship migrants"],
    intro: "Fully funded scholarships cover everything — tuition fees, monthly living allowance, travel costs, and sometimes health insurance. These are the most competitive but most life-changing awards available to migrants and refugees.",
    filter: (p) => {
      const text = (p.title + " " + p.excerpt).toLowerCase();
      return text.includes("fully funded") || text.includes("full tuition") || text.includes("full funding");
    }
  },
};

export default function EligibilityPage({ type, posts, info }) {
  if (!info) return null;

  return (
    <>
      <Head>
        <title>{info.title} 2026 — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.com/by-eligibility/${type}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://migrantscholar.com"},
            {"@type":"ListItem","position":2,"name":"Scholarships by Eligibility","item":"https://migrantscholar.com/blog"},
            {"@type":"ListItem","position":3,"name":type.replace(/-/g," "),"item":`https://migrantscholar.com/by-eligibility/${type}`}
          ]
        })}} />
        {eligibilityFAQs[type] && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity":(eligibilityFAQs[type]||[]).map(({q,a})=>({
              "@type":"Question",
              "name":q,
              "acceptedAnswer":{"@type":"Answer","text":a}
            }))
          })}} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          "name":info.title,
          "description":info.description,
          "url":`https://migrantscholar.com/by-eligibility/${type}`
        })}} />
      </Head>
      <Navbar />

      {/* Hero */}
      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>
              {posts.length} Scholarships Found
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem",letterSpacing:"-0.02em"}}>{info.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{info.intro}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>

        {/* Breadcrumb */}
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/blog" style={{color:"#0D6E6E",textDecoration:"none"}}>Scholarships</Link> ›{" "}
          {info.title}
        </div>

        {/* Posts grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.length > 0 ? posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h2 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h2>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                  <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                  <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                </div>
              </div>
            </Link>
          )) : (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"3rem",color:"#6b7280"}}>
              <p>More guides coming soon. <Link href="/blog" style={{color:"#0D6E6E"}}>Browse all scholarships →</Link></p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new {info.title.toLowerCase()} open.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["refugees","asylum-seekers","without-ielts","migrants","fully-funded"].map(type=>({params:{type}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = eligibilityInfo[params.type];
  if (!info) return { notFound: true };
  const posts = allPosts.filter(info.filter).slice(0, 30);
  const { filter, ...safeInfo } = info;
  return { props: { type: params.type, posts, info: safeInfo }, revalidate: 3600 };
}
