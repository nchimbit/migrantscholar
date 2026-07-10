import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const universities = [
  { slug:"university-of-oxford", name:"University of Oxford", country:"UK", flag:"🇬🇧", scholarship:"Oxford Refugee Scholarship", funding:"Full tuition + £17,635/yr", desc:"Oxford offers Sanctuary Scholarships and other awards for refugees and asylum seekers." },
  { slug:"university-of-edinburgh", name:"University of Edinburgh", country:"UK", flag:"🇬🇧", scholarship:"Edinburgh Sanctuary Scholarship", funding:"Full tuition + maintenance", desc:"Edinburgh offers full Sanctuary Scholarships for asylum seekers and refugees in Scotland." },
  { slug:"daad-germany", name:"DAAD Germany", country:"Germany", flag:"🇩🇪", scholarship:"DAAD Scholarship", funding:"Full tuition + €934/month", desc:"DAAD is Germany's largest scholarship organisation offering fully funded awards for migrants." },
  { slug:"university-of-toronto", name:"University of Toronto", country:"Canada", flag:"🇨🇦", scholarship:"Vanier Canada Scholarship", funding:"$50,000 CAD/year", desc:"U of T hosts Vanier scholars and offers refugee-specific bursaries for displaced students." },
  { slug:"australian-national-university", name:"Australian National University", country:"Australia", flag:"🇦🇺", scholarship:"Australia Awards", funding:"Full tuition + living costs", desc:"ANU participates in Australia Awards offering full funding for students from developing nations." },
  { slug:"fulbright-usa", name:"Fulbright Program USA", country:"USA", flag:"🇺🇸", scholarship:"Fulbright Scholarship", funding:"Full tuition + living costs", desc:"The Fulbright Program offers graduate scholarships to international students including migrants." },
  { slug:"istanbul-university", name:"Istanbul University", country:"Turkey", flag:"🇹🇷", scholarship:"Türkiye Bursları", funding:"Full tuition + accommodation + stipend", desc:"Turkish universities host Türkiye Bursları scholars from 180+ countries including migrants." },
];

export default function UniversitiesPage() {
  return (
    <>
      <Head>
        <title>Universities Offering Scholarships for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content="Universities offering scholarships for migrants, refugees and asylum seekers worldwide. Oxford, DAAD, Toronto, ANU and more." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/universities" />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Universities</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Universities Offering Scholarships for Migrants</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>Top universities worldwide with verified scholarships open to migrants, refugees and asylum seekers.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Universities
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {universities.map(u=>(
            <div key={u.slug} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",gap:".5rem"}}>
                <span style={{fontSize:"1.25rem"}}>{u.flag}</span>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{u.country}</span>
              </div>
              <div style={{padding:"1.25rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:".25rem"}}>{u.name}</h2>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".75rem"}}>{u.desc}</p>
                <div style={{background:"#E6F4F1",borderRadius:"6px",padding:".5rem .75rem",marginBottom:".75rem"}}>
                  <span style={{fontSize:"10px",color:"#6b7280",display:"block"}}>Top Scholarship</span>
                  <strong style={{fontSize:"12px",color:"#0D6E6E"}}>{u.scholarship}</strong>
                </div>
                <div style={{background:"#F0FDF4",borderRadius:"6px",padding:".5rem .75rem",marginBottom:".875rem"}}>
                  <span style={{fontSize:"10px",color:"#6b7280",display:"block"}}>Funding</span>
                  <strong style={{fontSize:"12px",color:"#166534"}}>{u.funding}</strong>
                </div>
                <Link href={`/blog?search=${encodeURIComponent(u.name.split(' ')[0])}`} style={{display:"block",background:"#0D6E6E",color:"#fff",textAlign:"center",padding:"8px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>View Scholarships →</Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a university deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new university scholarships open for migrants.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
