import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const universityData = {
  "oxford": {
    name: "University of Oxford",
    country: "UK", flag: "🇬🇧",
    description: "The University of Oxford offers Sanctuary Scholarships and other awards for refugees and asylum seekers. Full tuition plus £17,635/year maintenance grant.",
    scholarship: "Oxford Refugee & Sanctuary Scholarship",
    funding: "Full tuition + £17,635/year",
    deadline: "March each year",
    eligibility: ["Asylum seekers", "Refugees", "Those with humanitarian protection"],
    website: "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/scholarships-3",
    searchTerm: "Oxford UK scholarship refugee"
  },
  "university-of-edinburgh": {
    name: "University of Edinburgh",
    country: "UK", flag: "🇬🇧",
    description: "The University of Edinburgh offers full Sanctuary Scholarships for asylum seekers and refugees in Scotland, covering full tuition and a maintenance grant.",
    scholarship: "Edinburgh Sanctuary Scholarship",
    funding: "Full tuition + maintenance grant",
    deadline: "April each year",
    eligibility: ["Asylum seekers", "Refugees", "Humanitarian protection holders"],
    website: "https://www.ed.ac.uk/student-funding/postgraduate/uk-eu/other-scholarships/sanctuary",
    searchTerm: "Edinburgh UK scholarship refugee asylum"
  },
  "daad": {
    name: "DAAD — German Academic Exchange Service",
    country: "Germany", flag: "🇩🇪",
    description: "DAAD is Germany's largest scholarship organisation, offering fully funded Master's and PhD scholarships for migrants, asylum seekers and international students.",
    scholarship: "DAAD Development-Related Postgraduate Courses",
    funding: "Full tuition + €934/month + travel + health insurance",
    deadline: "October–November each year",
    eligibility: ["Refugees", "Asylum seekers", "International students", "Migrants"],
    website: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    searchTerm: "DAAD Germany scholarship"
  },
  "tu-munich": {
    name: "Technical University of Munich (TUM)",
    country: "Germany", flag: "🇩🇪",
    description: "TU Munich is one of Germany's top universities offering scholarships for outstanding international students including migrants and refugees through the TUM Global Incentive Fund and other programmes.",
    scholarship: "TUM Global Incentive Fund",
    funding: "Full tuition + monthly stipend",
    deadline: "January and July each year",
    eligibility: ["International students", "Migrants", "Refugees", "Asylum seekers"],
    website: "https://www.tum.de/en/studies/fees-and-financial-aid/scholarships",
    searchTerm: "TU Munich Germany scholarship international"
  },
  "humboldt-berlin": {
    name: "Humboldt University of Berlin",
    country: "Germany", flag: "🇩🇪",
    description: "Humboldt University Berlin offers dedicated scholarships for refugee students and migrants pursuing undergraduate and graduate degrees in Germany.",
    scholarship: "Humboldt Refugee Scholarship Programme",
    funding: "Full tuition + €750/month stipend",
    deadline: "March each year",
    eligibility: ["Refugees", "Asylum seekers", "Displaced students"],
    website: "https://www.hu-berlin.de/en/studies/financing/scholarships",
    searchTerm: "Humboldt Berlin Germany scholarship refugee"
  },
  "chevening": {
    name: "Chevening — UK Government",
    country: "UK", flag: "🇬🇧",
    description: "Chevening is the UK government's flagship international scholarship programme offering fully funded Master's degrees at UK universities to outstanding individuals worldwide.",
    scholarship: "Chevening Scholarship",
    funding: "Full tuition + £1,236/month + travel + visa",
    deadline: "November each year",
    eligibility: ["International students", "Migrants", "Professionals with leadership potential"],
    website: "https://www.chevening.org",
    searchTerm: "Chevening UK scholarship"
  },
  "vanier": {
    name: "Vanier Canada Graduate Scholarships",
    country: "Canada", flag: "🇨🇦",
    description: "Canada's most prestigious doctoral scholarship offering $50,000 CAD per year for three years. Open to international students including migrants at Canadian universities.",
    scholarship: "Vanier Canada Graduate Scholarship",
    funding: "$50,000 CAD/year for 3 years",
    deadline: "November each year",
    eligibility: ["International PhD students", "Migrants", "Refugees in Canada"],
    website: "https://vanier.gc.ca",
    searchTerm: "Vanier Canada scholarship"
  },
  "university-of-toronto": {
    name: "University of Toronto",
    country: "Canada", flag: "🇨🇦",
    description: "The University of Toronto is Canada's top-ranked university, offering the Vanier Graduate Scholarship and dedicated refugee bursaries for displaced students pursuing higher education.",
    scholarship: "U of T Refugee Student Bursary + Vanier",
    funding: "$50,000 CAD/year (Vanier) + bursaries",
    deadline: "November (Vanier), rolling (bursaries)",
    eligibility: ["Refugees", "Asylum seekers", "International PhD students", "Displaced students"],
    website: "https://www.utoronto.ca/academics/research/graduate-financial-support",
    searchTerm: "University Toronto Canada scholarship refugee"
  },
  "mcgill": {
    name: "McGill University",
    country: "Canada", flag: "🇨🇦",
    description: "McGill University in Montreal offers dedicated funding for refugee students and migrants, including the McGill Refugee Scholarship and other bursaries covering tuition and living costs.",
    scholarship: "McGill Refugee Scholarship",
    funding: "Full tuition + CAD $15,000/year",
    deadline: "February each year",
    eligibility: ["Refugees", "Asylum seekers", "Displaced students", "International students"],
    website: "https://www.mcgill.ca/studentaid/scholarships-bursaries",
    searchTerm: "McGill Canada scholarship refugee"
  },
  "australia-awards": {
    name: "Australia Awards",
    country: "Australia", flag: "🇦🇺",
    description: "Australia Awards are prestigious scholarships funded by the Australian government for students from developing countries, covering full tuition, living costs, travel and health insurance.",
    scholarship: "Australia Awards Scholarship",
    funding: "Full tuition + living costs + travel + health insurance",
    deadline: "April–June each year",
    eligibility: ["Students from developing countries", "Migrants", "Refugees"],
    website: "https://www.australiaawards.gov.au",
    searchTerm: "Australia Awards scholarship"
  },
  "fulbright": {
    name: "Fulbright Program — USA",
    country: "USA", flag: "🇺🇸",
    description: "The Fulbright Program is the US government's flagship international exchange scholarship offering graduate study and research funding for international students including migrants.",
    scholarship: "Fulbright Foreign Student Scholarship",
    funding: "Full tuition + living costs + health insurance",
    deadline: "October each year",
    eligibility: ["International graduate students", "Migrants", "Researchers"],
    website: "https://foreign.fulbrightonline.org",
    searchTerm: "Fulbright USA scholarship"
  },
  "harvard": {
    name: "Harvard University",
    country: "USA", flag: "🇺🇸",
    description: "Harvard University offers need-based financial aid covering 100% of demonstrated need for all admitted students. Harvard also has dedicated programmes for refugee and displaced students through the Harvard Griffin Graduate School of Arts and Sciences.",
    scholarship: "Harvard Griffin GSAS Fellowship + Need-Based Aid",
    funding: "Full tuition + $45,000+/year stipend",
    deadline: "December each year",
    eligibility: ["Refugees", "Asylum seekers", "International graduate students", "Displaced researchers"],
    website: "https://gsas.harvard.edu/financial-support",
    searchTerm: "Harvard USA scholarship refugee international"
  },
  "mit": {
    name: "Massachusetts Institute of Technology (MIT)",
    country: "USA", flag: "🇺🇸",
    description: "MIT provides full financial support for all admitted PhD students through research assistantships, teaching assistantships and fellowships. MIT also has dedicated support programmes for refugee and displaced students.",
    scholarship: "MIT Presidential Fellowship + Research Assistantship",
    funding: "Full tuition + $45,000+/year stipend + health insurance",
    deadline: "December–January each year",
    eligibility: ["International PhD students", "Refugees", "Displaced researchers", "Migrants"],
    website: "https://oge.mit.edu/finances/funding/",
    searchTerm: "MIT USA scholarship refugee international"
  },
  "columbia": {
    name: "Columbia University",
    country: "USA", flag: "🇺🇸",
    description: "Columbia University in New York offers dedicated scholarships for displaced students and refugees through its Scholarship for Displaced Students programme and graduate fellowship funding.",
    scholarship: "Columbia Scholarship for Displaced Students",
    funding: "Full tuition + living costs",
    deadline: "January each year",
    eligibility: ["Displaced students", "Refugees", "Asylum seekers", "International students"],
    website: "https://www.columbia.edu/content/financial-aid",
    searchTerm: "Columbia USA scholarship refugee displaced"
  },
  "turkiye-burslari": {
    name: "Türkiye Bursları — Turkey Government",
    country: "Turkey", flag: "🇹🇷",
    description: "Turkey's government scholarship programme open to students from 180+ countries. Covers full tuition, accommodation, monthly stipend, health insurance and return flights.",
    scholarship: "Türkiye Bursları Scholarship",
    funding: "Full tuition + accommodation + TRY 1,700/month + flights",
    deadline: "February each year",
    eligibility: ["Students from 180+ countries", "Migrants", "Refugees", "International students"],
    website: "https://turkiyeburslari.gov.tr",
    searchTerm: "Turkiye Burslari Turkey scholarship"
  },
};

export default function UniversityPage({ university, posts, info }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>{info.name} Scholarships for Migrants & Refugees 2026 — MigrantScholar</title>
        <meta name="description" content={`${info.description} Verified scholarship information for migrants, refugees and asylum seekers.`} />
        <link rel="canonical" href={`https://migrantscholar.com/universities/${university}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"EducationalOrganization",
          "name":info.name,
          "description":info.description,
          "url":info.website,
          "hasOfferCatalog":{
            "@type":"OfferCatalog",
            "name":"Scholarships for Migrants and Refugees",
            "itemListElement":[{
              "@type":"Offer",
              "name":info.scholarship,
              "description":info.funding
            }]
          }
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:".6rem"}}>
                <span style={{fontSize:"2rem"}}>{info.flag}</span>
                <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"4px",textTransform:"uppercase"}}>{info.country}</span>
              </div>
              <h1 style={{fontSize:"1.4rem",fontWeight:900,color:"#fff",marginBottom:".4rem",lineHeight:1.2}}>{info.name}</h1>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",lineHeight:1.6,maxWidth:"480px"}}>{info.description}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:".5rem",flexShrink:0}}>
              {[["🎓 Scholarship",info.scholarship],["💰 Funding",info.funding],["📅 Deadline",info.deadline]].map(([label,val])=>(
                <div key={label} style={{background:"rgba(255,255,255,.1)",borderRadius:"6px",padding:".5rem .875rem",minWidth:"200px"}}>
                  <span style={{fontSize:"9px",color:"rgba(255,255,255,.6)",display:"block"}}>{label}</span>
                  <strong style={{fontSize:"11px",color:"#fff"}}>{val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/universities" style={{color:"#0D6E6E",textDecoration:"none"}}>Universities</Link> ›{" "}
          {info.name}
        </div>

        {/* Eligibility */}
        <div style={{background:"#E6F4F1",border:"1.5px solid #A7D4CC",borderRadius:"10px",padding:"1.25rem",marginBottom:"1.5rem"}}>
          <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0D6E6E",marginBottom:".75rem"}}>✅ Who Can Apply</h2>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {info.eligibility.map(e=>(
              <span key={e} style={{background:"#fff",border:"1px solid #A7D4CC",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:"#0A2A2A"}}>✓ {e}</span>
            ))}
          </div>
        </div>

        {/* Related posts */}
        {posts.length > 0 && (
          <>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Related Scholarship Guides</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
              {posts.map(post=>(
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
                  <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                    <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
                  </div>
                  <div style={{padding:"1rem"}}>
                    <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                    <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                    <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Official link + CTA */}
        <div style={{display:"flex",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"}}>
          <a href={info.website} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"block",background:"#F5A623",color:"#0A2A2A",padding:"12px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center"}}>Visit Official Website →</a>
          <Link href="/alerts" style={{flex:1,display:"block",background:"#0D6E6E",color:"#fff",padding:"12px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center"}}>Get Deadline Alerts →</Link>
        </div>

        {/* Related universities */}
        <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>More Universities</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem",marginBottom:"2rem"}}>
          {[["oxford","🇬🇧 Oxford"],["daad","🇩🇪 DAAD"],["chevening","🇬🇧 Chevening"],["vanier","🇨🇦 Vanier"],["harvard","🇺🇸 Harvard"],["mit","🇺🇸 MIT"],["tu-munich","🇩🇪 TU Munich"],["mcgill","🇨🇦 McGill"]].filter(([s])=>s!==university).map(([slug,name])=>(
            <Link key={slug} href={`/universities/${slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:".875rem",textDecoration:"none",display:"block",fontSize:"13px",fontWeight:600,color:"#0D6E6E"}}>{name} →</Link>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when {info.name} scholarships open for migrants.</p>
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
    paths: ["oxford","university-of-edinburgh","daad","tu-munich","humboldt-berlin","chevening","vanier","university-of-toronto","mcgill","australia-awards","fulbright","harvard","mit","columbia","turkiye-burslari"].map(university=>({params:{university}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = universityData[params.university];
  if (!info) return { notFound: true };
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return info.searchTerm.toLowerCase().split(" ").filter(k=>k.length>3).some(k => text.includes(k));
  }).slice(0, 6);
  return { props: { university: params.university, posts, info }, revalidate: 3600 };
}
