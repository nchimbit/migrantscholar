import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const countryInfo = {
  UK: { flag:"🇬🇧", color:"#0D6E6E", description:"The UK offers some of the most generous sanctuary scholarships in the world, open to refugees and asylum seekers at over 70 universities.", topAward:"£17,635", topScholarship:"City St George's Sanctuary Scholarship" },
  Germany: { flag:"🇩🇪", color:"#3730A3", description:"Germany's DAAD and other programs offer fully-funded Master's and PhD scholarships for asylum seekers, covering tuition, living costs and health insurance.", topAward:"Full funding", topScholarship:"DAAD Scholarships" },
  Canada: { flag:"🇨🇦", color:"#9A3412", description:"Canada offers world-class doctoral funding through the Vanier Graduate Scholarship and other programs open to international students including migrants.", topAward:"$50,000/yr", topScholarship:"Vanier Graduate Scholarship" },
  Australia: { flag:"🇦🇺", color:"#166534", description:"Australia Awards and university-specific scholarships provide full funding for refugee students, covering tuition, living expenses and return airfare.", topAward:"Full funding", topScholarship:"Australia Awards" },
  USA: { flag:"🇺🇸", color:"#7E22CE", description:"The Fulbright Program and other US scholarships offer graduate funding for international students including those with migrant and refugee status.", topAward:"Full funding", topScholarship:"Fulbright Scholarship" },
  Turkey: { flag:"🇹🇷", color:"#92400E", description:"Türkiye Bursları is one of the most accessible fully-funded scholarships in the world, open to students from 180+ countries including migrants and refugees.", topAward:"Full funding", topScholarship:"Türkiye Bursları" },
};

const countryFAQs = {
  UK: [
    { q: "Can asylum seekers study in the UK?", a: "Yes — asylum seekers in the UK can apply for Sanctuary Scholarships at over 70 UK universities without settled status. You need proof of your asylum seeker status." },
    { q: "What is the Chevening Scholarship?", a: "Chevening is the UK government flagship scholarship covering full tuition plus £1,236/month for international students including migrants." },
    { q: "Do I need IELTS for UK scholarships?", a: "Some UK Sanctuary Scholarships waive IELTS for refugees. Chevening requires IELTS 6.5. Check each scholarship individually." },
    { q: "How much does it cost to study in the UK?", a: "Tuition fees range from £10,000–£38,000/year. Most scholarships for migrants cover full tuition plus living costs." },
  ],
  Germany: [
    { q: "Is studying in Germany really free?", a: "Yes — most public universities in Germany charge no tuition fees, only a semester contribution of €100–€350. This applies to all students including migrants and refugees." },
    { q: "What is the DAAD scholarship?", a: "DAAD is Germany largest scholarship covering full tuition plus €934/month for living costs, health insurance and travel. Open to migrants and refugees." },
    { q: "Do I need German language skills?", a: "Not for English-taught programmes. Many Master programmes in Germany are in English. German helps with daily life." },
    { q: "Can asylum seekers study in Germany?", a: "Yes — in most German states asylum seekers can enrol at public universities. Rules vary by state." },
  ],
  Canada: [
    { q: "What is the Vanier Scholarship?", a: "The Vanier Canada Graduate Scholarship offers $50,000 CAD per year for 3 years for PhD students including migrants." },
    { q: "Can refugees study in Canada?", a: "Yes — refugees with permanent resident status can study without restrictions. Asylum seekers may also be eligible — contact IRCC." },
    { q: "Can I work while studying in Canada?", a: "Yes — study permit holders can work up to 20 hours per week off-campus during studies." },
    { q: "What is the Post-Graduation Work Permit?", a: "The PGWP lets you work in Canada for up to 3 years after graduation — a pathway to permanent residence." },
  ],
  Australia: [
    { q: "What are Australia Awards?", a: "Australia Awards are fully funded scholarships from the Australian government covering tuition, living costs, travel and health insurance for students from developing countries." },
    { q: "Can migrants apply for Australian scholarships?", a: "Yes — migrants and refugees can apply for Australia Awards and university-specific scholarships." },
    { q: "Do I need IELTS for Australian scholarships?", a: "Australia Awards require IELTS 6.5. Some universities may waive for refugees — check individually." },
    { q: "How much does it cost to study in Australia?", a: "Tuition fees range from AUD 20,000–45,000/year. Australia Awards cover full costs including flights." },
  ],
  USA: [
    { q: "What is the Fulbright Scholarship?", a: "Fulbright is the US government flagship scholarship covering full tuition plus living costs for graduate students from 160+ countries including migrants." },
    { q: "Can asylum seekers get scholarships in the USA?", a: "Asylum seekers in the USA may access scholarships. Many universities offer dedicated funding for displaced students." },
    { q: "Do DACA recipients qualify for scholarships?", a: "Some private scholarships accept DACA recipients. Federal Fulbright requires non-US citizen status. Check each scholarship individually." },
    { q: "Can I work on an F1 student visa?", a: "Yes — up to 20 hours per week on campus during studies and full-time during holidays." },
  ],
  Turkey: [
    { q: "What is Türkiye Bursları?", a: "Türkiye Bursları is Turkey government scholarship open to students from 180+ countries covering full tuition, accommodation, monthly stipend, health insurance and return flights." },
    { q: "Do I need IELTS for Turkey scholarships?", a: "No — Türkiye Bursları does not require IELTS. It is one of the few fully funded scholarships without language test requirements." },
    { q: "Can refugees apply for Turkish scholarships?", a: "Yes — Türkiye Bursları is open to students from 180+ countries including refugees and migrants." },
    { q: "What is the monthly stipend for Türkiye Bursları?", a: "The monthly stipend is TRY 1,700 for undergraduate students and more for postgraduate students. Accommodation is also provided." },
  ],
};

export default function CountryPage({ country, posts }) {
  const info = countryInfo[country] || { flag:"🌍", color:"#0D6E6E", description:"", topAward:"", topScholarship:"" };

  return (
    <>
      <Head>
        <title>{info.flag} {country} Scholarships for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content={`Find fully-funded scholarships in ${country} for migrants, refugees and asylum seekers. ${info.description}`} />
        <link rel="canonical" href={`https://migrantscholar.com/countries/${country.toLowerCase()}`} />
      </Head>
      <Navbar />

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"1.5rem 2rem 0"}}>
        {/* Boxed hero */}
        <div style={{background:`linear-gradient(135deg,${info.color} 0%,#0A2A2A 100%)`,borderRadius:"14px",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          <div style={{flex:1,minWidth:"280px"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:".6rem"}}>
              <span style={{fontSize:"2rem"}}>{info.flag}</span>
              <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"4px",textTransform:"uppercase",letterSpacing:".07em"}}>Country Guide</div>
            </div>
            <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:".5rem",letterSpacing:"-0.02em"}}>{country} Scholarships for Migrants & Refugees</h1>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",lineHeight:1.55,maxWidth:"380px"}}>{info.description}</p>
          </div>
          <div style={{display:"flex",borderLeft:"1px solid rgba(255,255,255,.15)",paddingLeft:"1.5rem",flexShrink:0}}>
            {[[posts.length,"Guides"],[info.topAward,"Top Award"],[info.topScholarship,"Top Scholarship"]].map(([val,label],i)=>(
              <div key={label} style={{textAlign:"center",padding:"0 .9rem",borderRight:i<2?"1px solid rgba(255,255,255,.15)":"none"}}>
                <strong style={{display:"block",fontSize:"1.1rem",fontWeight:800,color:"#fff"}}>{val}</strong>
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.65)",textTransform:"uppercase",letterSpacing:".05em"}}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div style={{textAlign:"center",marginBottom:"1.75rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>All Guides</div>
          <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>All {country} Scholarship Guides</h2>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",padding:"2px 8px",borderRadius:"4px",textTransform:"uppercase"}}>{post.country}</span>
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
          ))}
        </div>

        {/* CTA */}
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a {country} scholarship deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new {country} awards open for migrants and refugees.</p>
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
    paths: ["UK","Germany","Canada","Australia","USA","Turkey"].map(country=>({params:{country}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const posts = allPosts.filter(p=>p.country===params.country);
  return { props: { country: params.country, posts }, revalidate: 3600 };
}
