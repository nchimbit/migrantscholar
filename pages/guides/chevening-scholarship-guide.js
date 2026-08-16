import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const faqs = [
  { q: "What is the Chevening Scholarship?", a: "Chevening is the UK government's flagship international scholarship programme, funded by the Foreign Commonwealth and Development Office (FCDO). It offers fully funded Master's degrees at any UK university to outstanding individuals with leadership potential from around the world, including migrants and refugees." },
  { q: "Can migrants and refugees apply for Chevening?", a: "Yes — Chevening is open to international students including migrants and refugees. You must be a citizen of a Chevening-eligible country and meet the academic and leadership requirements. Refugees with travel documents from eligible countries can apply." },
  { q: "What does the Chevening Scholarship cover?", a: "Chevening covers: full tuition fees, monthly living allowance (£1,236/month in London, £1,110/month elsewhere), return flights to the UK, arrival allowance, visa application fee, and travel grant for Chevening events." },
  { q: "When is the Chevening application deadline?", a: "Chevening applications typically open in August and close in November each year. For the 2026-2027 academic year, the deadline was November 2025. For 2027-2028, applications open August 2026." },
  { q: "Do I need work experience for Chevening?", a: "Yes — Chevening requires a minimum of 2 years of work experience (equivalent to 2,800 hours). This is one of the key requirements distinguishing Chevening from other scholarships." },
  { q: "What IELTS score do I need for Chevening?", a: "Chevening requires IELTS 6.5 overall with no component below 6.0, or equivalent. Some universities may require higher scores. The test must be taken within the last 2 years." },
  { q: "Can I choose any university for Chevening?", a: "Yes — you can apply to any UK university eligible for Chevening. You must apply to 3 different UK universities as part of your Chevening application and receive at least one unconditional offer." },
  { q: "Do I have to return home after Chevening?", a: "Yes — Chevening scholars must return to their home country for a minimum of 2 years after completing their scholarship. This is a condition of the award and supports development in your home country." },
];

export default function CheveningGuidePage() {
  return (
    <>
      <Head>
        <title>Chevening Scholarship 2026 — Complete Guide for Migrants & Refugees | MigrantScholar</title>
        <meta name="description" content="Complete guide to the Chevening Scholarship 2026. Full tuition + £1,236/month for migrants and international students. UK government scholarship. Deadlines, eligibility and tips." />
        <link rel="canonical" href="https://migrantscholar.com/guides/chevening-scholarship-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Article",
          "headline":"Chevening Scholarship 2026 — Complete Guide for Migrants and Refugees",
          "description":"Complete guide to the Chevening Scholarship for migrants and international students.",
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
            {"@type":"ListItem","position":3,"name":"Chevening Scholarship Guide","item":"https://migrantscholar.com/guides/chevening-scholarship-guide"}
          ]
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"2rem"}}>🇬🇧</span>
              <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",textTransform:"uppercase"}}>Complete Guide · 2026</span>
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>Chevening Scholarship 2026 — Complete Guide for Migrants & International Students</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"600px",lineHeight:1.7}}>Everything you need to know about the UK government Chevening Scholarship — eligibility, funding, deadlines, application process and tips for migrants and international students.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          Chevening Scholarship Guide 2026
        </div>

        {/* Quick Facts */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>⚡ Chevening Scholarship — Quick Facts 2026</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}}>
            {[
              ["💰 Funding","Full tuition + £1,236/month"],
              ["📅 Deadline","November 2026"],
              ["🎓 Level","Master's only"],
              ["⏱ Duration","1 year"],
              ["📝 IELTS","6.5 required"],
              ["💼 Experience","2 years required"],
              ["✈️ Flights","Return flights covered"],
              ["🌍 Countries","160+ eligible"],
            ].map(([label,val])=>(
              <div key={label} style={{background:"#E6F4F1",borderRadius:"8px",padding:".875rem"}}>
                <div style={{fontSize:"11px",color:"#6b7280",marginBottom:".25rem"}}>{label}</div>
                <strong style={{fontSize:"13px",color:"#0A2A2A"}}>{val}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* What is Chevening */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>What is the Chevening Scholarship?</h2>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>Chevening is the UK government's flagship international scholarship and fellowship programme, funded by the Foreign Commonwealth and Development Office (FCDO) and partner organisations. It offers fully funded one-year Master's degrees at any UK university to outstanding individuals with leadership potential from around the world.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>Chevening scholars are selected for their academic excellence, professional experience and leadership qualities. The scholarship is open to citizens of <Link href="/by-eligibility/refugees" style={{color:"#0D6E6E",fontWeight:600}}>Chevening-eligible countries</Link> including many developing nations and countries with significant migrant populations.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8}}>Since 1983, over 50,000 professionals from 160+ countries have benefited from Chevening scholarships. Chevening Alumni include presidents, prime ministers, Nobel laureates, and global business leaders.</p>
        </div>

        {/* How to Apply */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>📋 How to Apply for Chevening 2026 — Step by Step</h2>
          {[
            ["1","Check eligibility","Confirm you are a citizen of a Chevening-eligible country, have 2+ years work experience, and hold a Bachelor's degree equivalent to a UK upper second class honours (2:1)."],
            ["2","Choose your universities","Select 3 UK universities where you want to study. Research programmes carefully — all 3 choices must offer your preferred subject."],
            ["3","Apply online","Complete the Chevening application at chevening.org between August and November. Answer all 4 essay questions thoroughly."],
            ["4","Write compelling essays","Answer why you deserve Chevening, your leadership experience, networking plans and career goals. Be specific and use real examples."],
            ["5","Submit your application","Submit before the November deadline. Late applications are not accepted under any circumstances."],
            ["6","Shortlisting","Chevening reviews applications. Shortlisted candidates are notified in February and invited for interview."],
            ["7","Interview","Interviews are conducted in your home country by British embassy staff. Prepare to discuss your leadership experience and career plans."],
            ["8","Apply to universities","If selected, apply to your chosen UK universities and obtain an unconditional offer by July."],
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
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>❓ Chevening Scholarship FAQs</h2>
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
              ["UK Scholarships for Migrants","/countries/UK"],
              ["UK Student Visa for Refugees","/guides/uk-student-visa-refugees"],
              ["DAAD vs Chevening","/compare/daad-vs-chevening"],
              ["UK vs Germany Scholarships","/compare/uk-vs-germany"],
              ["Oxford Sanctuary Scholarship","/universities/oxford"],
              ["Scholarships for Refugees","/by-eligibility/refugees"],
              ["Masters Scholarships 2026","/by-level/masters"],
              ["Fully Funded Scholarships","/by-funding/fully-funded"],
              ["Scholarship Deadlines 2026","/deadlines"],
            ].map(([label,href])=>(
              <Link key={label} href={href} style={{fontSize:"12px",color:"#0D6E6E",textDecoration:"none",fontWeight:600,padding:".375rem 0",borderBottom:"1px solid #f0faf9",display:"block"}}>→ {label}</Link>
            ))}
          </div>
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get Chevening deadline alerts</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email when Chevening applications open in August. Never miss the deadline.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>

        <p style={{fontSize:"11px",color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>Last Reviewed: August 2026 · Source: <a href="https://www.chevening.org" target="_blank" rel="noopener noreferrer" style={{color:"#0D6E6E"}}>chevening.org</a> (official website)</p>
      </div>
      <Footer />
    </>
  );
}
