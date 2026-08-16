import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const faqs = [
  { q: "What is the Fulbright Scholarship?", a: "The Fulbright Program is the US government's flagship international exchange scholarship, established in 1946. It offers fully funded graduate study and research opportunities in the USA for students from 160+ countries, including migrants and international students." },
  { q: "Can migrants apply for Fulbright scholarships?", a: "Yes — the Fulbright Foreign Student Program is open to citizens of eligible countries worldwide. Migrants living outside the USA who hold citizenship of a Fulbright-eligible country can apply through their home country's Fulbright commission." },
  { q: "What does the Fulbright Scholarship cover?", a: "Fulbright covers: full tuition fees, monthly living stipend, round-trip airfare, health insurance, and a book/supplies allowance. The exact amount varies by country and programme but typically covers all major costs." },
  { q: "When is the Fulbright application deadline?", a: "Fulbright deadlines vary by country — most are in October each year for the following academic year. Check your country's Fulbright commission website for exact dates as they differ significantly by country." },
  { q: "What is the Fulbright Foreign Student Program?", a: "The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to research and study in the USA for one year or longer at US universities and institutions." },
  { q: "Do I need IELTS or TOEFL for Fulbright?", a: "Yes — most Fulbright programmes require English proficiency. TOEFL iBT 80+ or IELTS 6.5+ is typically required. Some countries have minimum score requirements — check your country's Fulbright commission." },
  { q: "How competitive is Fulbright?", a: "Fulbright is highly competitive with typically 20-25% acceptance rates varying by country. Strong academic records, research proposals, leadership experience and clear career goals are essential." },
  { q: "What is the Fulbright Specialist Program?", a: "The Fulbright Specialist Program pairs US academics with host institutions in over 150 countries for 2-6 week project-based engagements. It is different from the Foreign Student Program which brings international students to the USA." },
];

export default function FulbrightGuidePage() {
  return (
    <>
      <Head>
        <title>Fulbright Scholarship 2026 — Complete Guide for Migrants & International Students | MigrantScholar</title>
        <meta name="description" content="Complete guide to the Fulbright Scholarship 2026. Fully funded graduate study in the USA for migrants and international students. Deadlines, eligibility and application tips." />
        <link rel="canonical" href="https://migrantscholar.com/guides/fulbright-scholarship-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Article",
          "headline":"Fulbright Scholarship 2026 — Complete Guide for Migrants and International Students",
          "description":"Complete guide to the Fulbright Scholarship for migrants and international students.",
          "dateModified": new Date().toISOString(),
          "author":{"@type":"Organization","name":"MigrantScholar","url":"https://migrantscholar.com"},
          "publisher":{"@type":"Organization","name":"MigrantScholar","url":"https://migrantscholar.com"}
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"FAQPage",
          "mainEntity": faqs.map(({q,a})=>({
            "@type":"Question",
            "name":q,
            "acceptedAnswer":{"@type":"Answer","text":a}
          }))
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://migrantscholar.com"},
            {"@type":"ListItem","position":2,"name":"Guides","item":"https://migrantscholar.com/guides"},
            {"@type":"ListItem","position":3,"name":"Fulbright Scholarship Guide","item":"https://migrantscholar.com/guides/fulbright-scholarship-guide"}
          ]
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"2rem"}}>🇺🇸</span>
              <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",textTransform:"uppercase"}}>Complete Guide · 2026</span>
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>Fulbright Scholarship 2026 — Complete Guide for Migrants & International Students</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"600px",lineHeight:1.7}}>Everything about the Fulbright Scholarship — the US government's most prestigious international award. Eligibility, funding, deadlines and application tips for migrants worldwide.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          Fulbright Scholarship Guide 2026
        </div>

        {/* Quick Facts */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>⚡ Fulbright Scholarship — Quick Facts 2026</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}}>
            {[
              ["💰 Funding","Full tuition + living costs"],
              ["📅 Deadline","October 2026 (varies)"],
              ["🎓 Level","Graduate + Research"],
              ["🌍 Countries","160+ eligible"],
              ["📝 TOEFL","80+ required"],
              ["🏥 Health","Insurance included"],
              ["✈️ Flights","Return airfare covered"],
              ["📚 Books","Supply allowance included"],
            ].map(([label,val])=>(
              <div key={label} style={{background:"#E6F4F1",borderRadius:"8px",padding:".875rem"}}>
                <div style={{fontSize:"11px",color:"#6b7280",marginBottom:".25rem"}}>{label}</div>
                <strong style={{fontSize:"13px",color:"#0A2A2A"}}>{val}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* What is Fulbright */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>What is the Fulbright Scholarship?</h2>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>The Fulbright Program is the US government's flagship international educational exchange programme, established by Senator J. William Fulbright in 1946. It is one of the most widely recognised and prestigious scholarship programmes in the world, operating in over 160 countries.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>The <strong>Fulbright Foreign Student Program</strong> brings international students, including <Link href="/by-eligibility/migrants" style={{color:"#0D6E6E",fontWeight:600}}>migrants</Link> and <Link href="/by-eligibility/refugees" style={{color:"#0D6E6E",fontWeight:600}}>refugees</Link>, to study at US universities for graduate degrees or research programmes. Over 400,000 alumni have participated since 1946.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8}}>Fulbright is administered by the US Department of State's Bureau of Educational and Cultural Affairs, with each country having its own Fulbright commission or embassy managing the selection process.</p>
        </div>

        {/* How to Apply */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>📋 How to Apply for Fulbright 2026 — Step by Step</h2>
          {[
            ["1","Find your country commission","Go to fulbright.state.gov and find your country's Fulbright commission or US embassy contact. Each country has different deadlines and requirements."],
            ["2","Check eligibility","Confirm you are a citizen of a Fulbright-eligible country, hold a Bachelor's degree, meet English requirements and are not a US citizen or permanent resident."],
            ["3","Choose your programme","Decide between a Master's degree, PhD, or research programme. Identify 2-3 US universities offering your field of study."],
            ["4","Prepare your application","Write a Statement of Grant Purpose (2 pages), Personal Statement (1 page), obtain 3 reference letters and prepare academic transcripts."],
            ["5","Take TOEFL or IELTS","Most programmes require TOEFL iBT 80+ or IELTS 6.5+. Take the test at least 3 months before the deadline."],
            ["6","Submit by October deadline","Submit your complete application through your country's Fulbright portal by October. Deadlines vary by country."],
            ["7","Await shortlisting","Shortlisted candidates are notified December–February and invited for interview with a selection committee."],
            ["8","University application","If selected as a Fulbright finalist, apply to your chosen US universities and secure admission before the Fulbright placement deadline."],
          ].map(([num,title,desc])=>(
            <div key={num} style={{display:"flex",gap:"1rem",marginBottom:"1rem",paddingBottom:"1rem",borderBottom:"1px solid #f0faf9"}}>
              <div style={{width:32,height:32,background:"#0D6E6E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>{num}</div>
              <div>
                <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block",marginBottom:".25rem"}}>{title}</strong>
                <p style={{fontSize:"12px",color:"#6b7280",lineHeight:1.6}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>❓ Fulbright Scholarship FAQs</h2>
          {faqs.map(({q,a},i)=>(
            <div key={i} style={{marginBottom:"1rem",paddingBottom:"1rem",borderBottom:i<faqs.length-1?"1px solid #f0faf9":"none"}}>
              <h3 style={{fontSize:"13px",fontWeight:700,color:"#0D6E6E",marginBottom:".375rem"}}>{q}</h3>
              <p style={{fontSize:"12px",color:"#374151",lineHeight:1.7}}>{a}</p>
            </div>
          ))}
        </div>

        {/* Related links */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📚 Related Guides</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:".5rem"}}>
            {[
              ["USA Scholarships for Migrants","/countries/USA"],
              ["F1 Visa Guide for Migrants","/guides/f1-visa-guide-migrants"],
              ["Harvard Scholarships","/universities/harvard"],
              ["MIT Scholarships","/universities/mit"],
              ["Columbia Scholarships","/universities/columbia"],
              ["Scholarships for Refugees","/by-eligibility/refugees"],
              ["Fully Funded Scholarships","/by-funding/fully-funded"],
              ["PhD Scholarships 2026","/by-level/phd"],
              ["Scholarship Deadlines 2026","/deadlines"],
            ].map(([label,href])=>(
              <Link key={label} href={href} style={{fontSize:"12px",color:"#0D6E6E",textDecoration:"none",fontWeight:600,padding:".375rem 0",borderBottom:"1px solid #f0faf9",display:"block"}}>→ {label}</Link>
            ))}
          </div>
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get Fulbright deadline alerts</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email when Fulbright applications open. Never miss the October deadline.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>

        <p style={{fontSize:"11px",color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>Last Reviewed: August 2026 · Source: <a href="https://foreign.fulbrightonline.org" target="_blank" rel="noopener noreferrer" style={{color:"#0D6E6E"}}>fulbright.state.gov</a> (official website)</p>
      </div>
      <Footer />
    </>
  );
}
