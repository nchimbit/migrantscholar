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
    website: "https://www.ox.ac.uk",
    searchTerm: "Oxford UK scholarship"
  },
  "daad": {
    name: "DAAD — German Academic Exchange Service",
    country: "Germany", flag: "🇩🇪",
    description: "DAAD is Germany's largest scholarship organisation, offering fully funded Master's and PhD scholarships for migrants, asylum seekers and international students.",
    scholarship: "DAAD Development-Related Postgraduate Courses",
    funding: "Full tuition + €934/month + travel + health insurance",
    deadline: "October–November each year",
    eligibility: ["Refugees", "Asylum seekers", "International students", "Migrants"],
    website: "https://www.daad.de",
    searchTerm: "DAAD Germany scholarship"
  },
  "chevening": {
    name: "Chevening — UK Government",
    country: "UK", flag: "🇬🇧",
    description: "Chevening is the UK government's international scholarship programme offering fully funded Master's degrees at UK universities to outstanding individuals worldwide.",
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
};

export default function UniversityPage({ university, posts, info }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>{info.name} Scholarships for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/universities/${university}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"EducationalOrganization",
          "name":info.name,
          "description":info.description,
          "url":info.website
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:".5rem"}}>
                <span style={{fontSize:"2rem"}}>{info.flag}</span>
                <span style={{fontSize:"10px",fontWeight:700,color:"#F5A623",textTransform:"uppercase",letterSpacing:".08em"}}>{info.country}</span>
              </div>
              <h1 style={{fontSize:"1.4rem",fontWeight:900,color:"#fff",marginBottom:".4rem"}}>{info.name}</h1>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",maxWidth:"480px",lineHeight:1.6}}>{info.description}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:".5rem",flexShrink:0}}>
              {[["🎓 Scholarship",info.scholarship],["💰 Funding",info.funding],["📅 Deadline",info.deadline]].map(([label,val])=>(
                <div key={label} style={{background:"rgba(255,255,255,.1)",borderRadius:"6px",padding:".5rem .875rem"}}>
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
          <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0D6E6E",marginBottom:".75rem"}}>Who Can Apply</h2>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {info.eligibility.map(e=>(
              <span key={e} style={{background:"#fff",border:"1px solid #A7D4CC",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:"#0A2A2A"}}>✓ {e}</span>
            ))}
          </div>
        </div>

        {/* Related posts */}
        <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Related Scholarship Guides</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.length > 0 ? posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
              </div>
            </Link>
          )) : (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"#6b7280"}}>
              <Link href="/blog" style={{color:"#0D6E6E"}}>Browse all scholarships →</Link>
            </div>
          )}
        </div>

        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <a href={info.website} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",padding:"12px 28px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",marginRight:"1rem"}}>Visit Official Website →</a>
          <Link href="/alerts" style={{display:"inline-block",background:"#0D6E6E",color:"#fff",padding:"12px 28px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Get Deadline Alerts →</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: Object.keys({
      "oxford":1,"daad":1,"chevening":1,"vanier":1,"turkiye-burslari":1,"australia-awards":1,"fulbright":1
    }).map(university=>({params:{university}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = universityData[params.university];
  if (!info) return { notFound: true };
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return info.searchTerm.toLowerCase().split(" ").some(k => k.length > 3 && text.includes(k));
  }).slice(0, 6);
  return { props: { university: params.university, posts, info }, revalidate: 3600 };
}
