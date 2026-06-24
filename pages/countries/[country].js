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

export default function CountryPage({ country, posts }) {
  const info = countryInfo[country] || { flag:"🌍", color:"#0D6E6E", description:"", topAward:"", topScholarship:"" };

  return (
    <>
      <Head>
        <title>{info.flag} {country} Scholarships for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content={`Find fully-funded scholarships in ${country} for migrants, refugees and asylum seekers. ${info.description}`} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/countries/${country.toLowerCase()}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          "name":`${country} Scholarships for Migrants`,
          "description":info.description,
          "url":`https://migrantscholar.vercel.app/countries/${country.toLowerCase()}`
        })}} />
      </Head>
      <Navbar />

      <div style={{background:`linear-gradient(135deg,${info.color} 0%,#0A2A2A 100%)`,padding:"2.5rem 2rem",textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:".5rem"}}>{info.flag}</div>
        <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Country Guide</div>
        <h1 style={{fontSize:"1.85rem",fontWeight:900,color:"#fff",lineHeight:1.25,marginBottom:".75rem",letterSpacing:"-0.02em"}}>{country} Scholarships for Migrants & Refugees</h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto 1.5rem",lineHeight:1.7}}>{info.description}</p>
        <div style={{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"}}>
          <div style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"8px",padding:".75rem 1.25rem",textAlign:"center"}}>
            <strong style={{display:"block",fontSize:"1.25rem",fontWeight:800,color:"#fff"}}>{posts.length}</strong>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.7)",textTransform:"uppercase"}}>Guides</span>
          </div>
          <div style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"8px",padding:".75rem 1.25rem",textAlign:"center"}}>
            <strong style={{display:"block",fontSize:"1.25rem",fontWeight:800,color:"#fff"}}>{info.topAward}</strong>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.7)",textTransform:"uppercase"}}>Top Award</span>
          </div>
          <div style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"8px",padding:".75rem 1.25rem",textAlign:"center"}}>
            <strong style={{display:"block",fontSize:"1.1rem",fontWeight:800,color:"#fff"}}>{info.topScholarship}</strong>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.7)",textTransform:"uppercase"}}>Top Scholarship</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{textAlign:"center",marginBottom:"1.75rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>All Guides</div>
          <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>All {country} Scholarship Guides</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2rem"}}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:info.color,padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#fff",background:"rgba(255,255,255,.2)",padding:"2px 8px",borderRadius:"4px",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,.7)"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                  <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                  <span style={{display:"inline-block",background:info.color,color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
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
    paths: ["UK","Germany","Canada","Australia","USA","Turkey"].map(country => ({
      params: { country }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const posts = allPosts.filter(p => p.country === params.country);
  return { props: { country: params.country, posts }, revalidate: 3600 };
}
