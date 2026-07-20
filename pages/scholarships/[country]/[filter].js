import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../../components/Layout";
import { getAllPosts, formatDate } from "../../../lib/posts";

const countryMap = { uk:"UK", germany:"Germany", canada:"Canada", australia:"Australia", usa:"USA", turkey:"Turkey" };
const countryData = {
  UK:{flag:"🇬🇧",fullName:"United Kingdom",topScholarship:"Chevening & Sanctuary Scholarships"},
  Germany:{flag:"🇩🇪",fullName:"Germany",topScholarship:"DAAD Scholarships"},
  Canada:{flag:"🇨🇦",fullName:"Canada",topScholarship:"Vanier Graduate Scholarships"},
  Australia:{flag:"🇦🇺",fullName:"Australia",topScholarship:"Australia Awards"},
  USA:{flag:"🇺🇸",fullName:"United States",topScholarship:"Fulbright Program"},
  Turkey:{flag:"🇹🇷",fullName:"Turkey",topScholarship:"Türkiye Bursları"},
};

const filterData = {
  masters:{label:"Master's",desc:"postgraduate Master's degree",keywords:["master","postgraduate","msc","graduate"],type:"level"},
  phd:{label:"PhD",desc:"doctoral research",keywords:["phd","doctoral","doctorate","research"],type:"level"},
  undergraduate:{label:"Undergraduate",desc:"Bachelor's degree",keywords:["undergraduate","bachelor","degree"],type:"level"},
  postdoctoral:{label:"Postdoctoral",desc:"postdoctoral research",keywords:["postdoc","fellowship","research grant"],type:"level"},
  refugees:{label:"Refugees",desc:"refugees with UNHCR documentation",keywords:["refugee","displaced","forced migrant"],type:"eligibility"},
  "asylum-seekers":{label:"Asylum Seekers",desc:"asylum seekers with pending claims",keywords:["asylum","sanctuary","pending"],type:"eligibility"},
  "without-ielts":{label:"Students Without IELTS",desc:"migrants without IELTS",keywords:["ielts","english","language"],type:"eligibility"},
  migrants:{label:"Migrants",desc:"migrants and displaced students",keywords:["migrant","international","displaced"],type:"eligibility"},
  "fully-funded":{label:"Fully Funded",desc:"fully funded scholarships",keywords:["fully funded","full tuition","complete funding"],type:"funding"},
  partial:{label:"Partial",desc:"partial scholarships",keywords:["partial","tuition waiver","bursary"],type:"funding"},
};

export default function CountryFilterPage({ country, filter, posts, cData, fData }) {
  return (
    <>
      <Head>
        <title>{fData.label} Scholarships in {cData.fullName} for Migrants 2026 — MigrantScholar</title>
        <meta name="description" content={`Verified ${fData.label} scholarships in ${cData.fullName} for migrants, refugees and asylum seekers. ${cData.topScholarship} and more. Updated daily.`} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/scholarships/${country}/${filter}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          "name":`${fData.label} Scholarships in ${cData.fullName} for Migrants`,
          "description":`Verified ${fData.label} scholarships in ${cData.fullName} for migrants and refugees.`,
          "url":`https://migrantscholar.vercel.app/scholarships/${country}/${filter}`
        })}} />
      </Head>
      <Navbar />
      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"2rem"}}>{cData.flag}</span>
              <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",textTransform:"uppercase"}}>{posts.length} Scholarships</span>
            </div>
            <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>{fData.label} Scholarships in {cData.fullName} for Migrants & Refugees 2026</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",lineHeight:1.6}}>Verified {fData.desc} scholarships in {cData.fullName} for migrants, refugees and asylum seekers. {cData.topScholarship} and more.</p>
            <div style={{display:"flex",gap:".75rem",marginTop:"1rem",flexWrap:"wrap"}}>
              <Link href={`/countries/${countryMap[country]||country}`} style={{background:"rgba(255,255,255,.15)",color:"#fff",padding:"6px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:600,textDecoration:"none"}}>All {cData.fullName} Scholarships →</Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › <Link href={`/countries/${countryMap[country]||country}`} style={{color:"#0D6E6E",textDecoration:"none"}}>{cData.fullName}</Link> › {fData.label} Scholarships
        </div>
        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"1.5rem"}}>
          {["masters","phd","undergraduate","refugees","asylum-seekers","without-ielts","fully-funded"].map(f=>(
            <Link key={f} href={`/scholarships/${country}/${f}`} style={{fontSize:"11px",color:f===filter?"#fff":"#0D6E6E",background:f===filter?"#0D6E6E":"#E6F4F1",border:"1px solid #A7D4CC",borderRadius:"20px",padding:"4px 12px",textDecoration:"none",fontWeight:600}}>{f.replace(/-/g," ")}</Link>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.length > 0 ? posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h2 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h2>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                  <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                  <span style={{background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"4px 10px",borderRadius:"5px"}}>Read More →</span>
                </div>
              </div>
            </Link>
          )) : (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"3rem"}}>
              <p style={{color:"#6b7280",marginBottom:"1rem"}}>More {fData.label} guides for {cData.fullName} coming soon.</p>
              <Link href={`/countries/${countryMap[country]||country}`} style={{background:"#0D6E6E",color:"#fff",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse All {cData.fullName} Scholarships →</Link>
            </div>
          )}
        </div>
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts for {fData.label.toLowerCase()} scholarships in {cData.fullName}.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const countries = ["uk","germany","canada","australia","usa","turkey"];
  const filters = ["masters","phd","undergraduate","postdoctoral","refugees","asylum-seekers","without-ielts","migrants","fully-funded","partial"];
  const paths = [];
  for (const country of countries) {
    for (const filter of filters) {
      paths.push({ params: { country, filter } });
    }
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const cMap = { uk:"UK", germany:"Germany", canada:"Canada", australia:"Australia", usa:"USA", turkey:"Turkey" };
  const country = params.country;
  const filter = params.filter;
  const cName = cMap[country] || country.toUpperCase();
  const cData = countryData[cName] || countryData.UK;
  const fData = filterData[filter] || filterData.migrants;
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    const matchCountry = p.country === cName || text.includes(cName.toLowerCase());
    const matchFilter = fData.keywords.some(k => text.includes(k));
    return matchCountry && matchFilter;
  }).slice(0, 12);
  return { props: { country, filter, posts, cData, fData }, revalidate: 3600 };
}
