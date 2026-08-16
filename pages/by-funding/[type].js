import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const fundingInfo = {
  "fully-funded": {
    title: "Fully Funded Scholarships 2026 — Complete Guide for Refugees & Migrants",
    description: "Fully funded scholarships 2026 covering tuition, living costs, travel and health insurance for refugees and migrants. DAAD, Chevening, Vanier and more.",
    intro: "Fully funded scholarships cover everything — tuition fees, monthly living allowance, travel costs, and health insurance. These are the most competitive but most life-changing awards for migrants and refugees.",
    keywords: ["fully funded","full tuition","full scholarship","complete funding","all expenses"],
  },
  "partial": {
    title: "Partial Scholarships 2026 — For Migrants & Refugees",
    description: "Tuition waivers and partial bursaries for migrants, refugees and asylum seekers. Updated daily.",
    intro: "Partial scholarships reduce the cost of studying abroad by covering tuition fees or providing a monthly stipend. Combined with other funding, they can make studying abroad affordable.",
    keywords: ["partial","tuition waiver","bursary","grant","partial funding"],
  },
  "tuition-waiver": {
    title: "Tuition Waiver Scholarships 2026 — For Migrants & Refugees",
    description: "Tuition fee waivers for migrants, refugees and asylum seekers at universities worldwide.",
    intro: "Tuition waivers cover your university fees while you arrange living costs separately. Many UK Sanctuary Scholarships offer full tuition waivers plus a maintenance grant.",
    keywords: ["tuition waiver","fee waiver","tuition reduction","fee reduction"],
  },
};

export default function FundingPage({ type, posts, info }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>{info.title} 2026 — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.com/by-funding/${type}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://migrantscholar.com"},
            {"@type":"ListItem","position":2,"name":"Scholarships by Funding","item":"https://migrantscholar.com/blog"},
            {"@type":"ListItem","position":3,"name":info.title,"item":`https://migrantscholar.com/by-funding/${type}`}
          ]
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"FAQPage",
          "mainEntity":[
            {"@type":"Question","name":"What does fully funded scholarship mean?","acceptedAnswer":{"@type":"Answer","text":"A fully funded scholarship covers all costs including tuition fees, monthly living allowance, travel costs to and from the host country, and usually health insurance. You pay nothing out of pocket. Examples include DAAD (€934/month + tuition), Chevening (£1,236/month + tuition) and Türkiye Bursları (full coverage including accommodation)."}},
            {"@type":"Question","name":"Which fully funded scholarships are open to refugees?","acceptedAnswer":{"@type":"Answer","text":"Top fully funded scholarships for refugees include: DAAD Germany (full tuition + €934/month), Chevening UK (full tuition + £1,236/month), Oxford Sanctuary Scholarship (full tuition + £17,635/year), Vanier Canada ($50,000 CAD/year), Türkiye Bursları (full coverage), and Australia Awards (full coverage including flights)."}},
            {"@type":"Question","name":"How do I apply for a fully funded scholarship?","acceptedAnswer":{"@type":"Answer","text":"To apply for a fully funded scholarship: 1) Research scholarships matching your eligibility on migrantscholar.com, 2) Check specific requirements and deadlines, 3) Prepare documents (transcripts, personal statement, reference letters), 4) Apply before the deadline, 5) Await results. Most deadlines fall October-March."}},
            {"@type":"Question","name":"What is the difference between fully funded and partial scholarships?","acceptedAnswer":{"@type":"Answer","text":"A fully funded scholarship covers all costs (tuition + living + travel + health). A partial scholarship covers only some costs — typically tuition only or a monthly stipend only. You need additional funding to cover remaining costs with a partial scholarship."}}
          ]
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>
              {posts.length} Scholarships Found
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>{info.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{info.intro}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/blog" style={{color:"#0D6E6E",textDecoration:"none"}}>Scholarships</Link> ›{" "}
          {info.title}
        </div>

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

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts for new {info.title.toLowerCase()}.</p>
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
    paths: ["fully-funded","partial","tuition-waiver"].map(type=>({params:{type}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = fundingInfo[params.type];
  if (!info) return { notFound: true };
  const keywords = info.keywords || [];
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return keywords.some(k => text.includes(k));
  }).slice(0, 30);
  const { keywords: _, ...safeInfo } = info;
  return { props: { type: params.type, posts, info: safeInfo }, revalidate: 3600 };
}
