import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const faqs = [
  { q: "What is the DAAD scholarship?", a: "DAAD (Deutscher Akademischer Austauschdienst) is Germany's largest scholarship organisation offering fully funded Master's and PhD scholarships for international students, migrants and refugees. It covers full tuition, €934/month living allowance, health insurance and travel costs." },
  { q: "Can refugees apply for DAAD scholarships?", a: "Yes — DAAD explicitly welcomes applications from refugees and asylum seekers. You do not need German citizenship or permanent residence. DAAD has specific programmes for refugees and displaced scholars." },
  { q: "What does DAAD cover?", a: "DAAD scholarships cover: full tuition fees, monthly living allowance of €934, health insurance, travel allowance to and from Germany, and sometimes a family allowance. It is one of the most generous scholarships globally." },
  { q: "When is the DAAD application deadline?", a: "Most DAAD scholarships have deadlines in October and November each year for the following academic year. Some research grants have rolling deadlines. Check daad.de for specific programme deadlines." },
  { q: "Do I need German language skills for DAAD?", a: "Not always — many DAAD-funded programmes are taught in English. However, some programmes require German language skills (DSH-2 or TestDaF-4). Check the specific programme requirements at daad.de." },
  { q: "What is the DAAD Helmut Schmidt Programme?", a: "The DAAD Helmut Schmidt Programme is specifically for public policy and good governance Master's degrees. It is open to students from developing countries and covers full tuition plus €934/month." },
  { q: "Can I bring my family to Germany on a DAAD scholarship?", a: "Yes — DAAD scholarship holders may bring family members to Germany. A monthly family allowance of €276 (spouse) and €276 per child is provided in addition to the standard stipend." },
  { q: "How competitive is the DAAD scholarship?", a: "DAAD is highly competitive with acceptance rates varying by programme. Strong academic records, research proposals and relevant experience are essential. Apply to multiple DAAD programmes simultaneously." },
];

export default function DAADGuidePage() {
  return (
    <>
      <Head>
        <title>DAAD Scholarship Germany 2026 — Complete Guide for Migrants & Refugees | MigrantScholar</title>
        <meta name="description" content="Complete guide to DAAD scholarships Germany 2026. Full tuition + €934/month for migrants, refugees and asylum seekers. Deadlines, eligibility and application tips." />
        <link rel="canonical" href="https://migrantscholar.com/guides/daad-scholarship-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Article",
          "headline":"DAAD Scholarship Germany 2026 — Complete Guide for Migrants and Refugees",
          "description":"Complete guide to DAAD scholarships in Germany for migrants, refugees and asylum seekers.",
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
            {"@type":"ListItem","position":3,"name":"DAAD Scholarship Guide","item":"https://migrantscholar.com/guides/daad-scholarship-guide"}
          ]
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"2rem"}}>🇩🇪</span>
              <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",textTransform:"uppercase"}}>Complete Guide · 2026</span>
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>DAAD Scholarship Germany 2026 — Complete Guide for Migrants & Refugees</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"600px",lineHeight:1.7}}>Everything you need to know about DAAD scholarships in Germany — eligibility, funding amounts, deadlines, application process and tips for refugees and migrants.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        {/* Breadcrumb */}
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          DAAD Scholarship Guide 2026
        </div>

        {/* Quick Facts */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>⚡ DAAD Scholarship — Quick Facts 2026</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}}>
            {[
              ["💰 Funding","Full tuition + €934/month"],
              ["📅 Deadline","October–November 2026"],
              ["🎓 Level","Master's + PhD"],
              ["🌍 Open to","180+ nationalities"],
              ["📝 IELTS","Not always required"],
              ["🏥 Health","Insurance included"],
              ["✈️ Travel","Costs covered"],
              ["👨‍👩‍👧 Family","€276/month extra"],
            ].map(([label,val])=>(
              <div key={label} style={{background:"#E6F4F1",borderRadius:"8px",padding:".875rem"}}>
                <div style={{fontSize:"11px",color:"#6b7280",marginBottom:".25rem"}}>{label}</div>
                <strong style={{fontSize:"13px",color:"#0A2A2A"}}>{val}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* What is DAAD */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>What is the DAAD Scholarship?</h2>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>The DAAD (Deutscher Akademischer Austauschdienst — German Academic Exchange Service) is Germany's largest and most prestigious scholarship organisation. In 2026, DAAD offers fully funded scholarships for Master's and PhD students from over 180 countries, including <Link href="/by-eligibility/refugees" style={{color:"#0D6E6E",fontWeight:600}}>refugees</Link>, <Link href="/by-eligibility/asylum-seekers" style={{color:"#0D6E6E",fontWeight:600}}>asylum seekers</Link> and migrants.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:"1rem"}}>Unlike many scholarships, DAAD does not require you to be a German citizen or resident. It is specifically designed to attract talented students from developing countries and displaced backgrounds to study at German universities, which offer <Link href="/guides/study-in-germany-free" style={{color:"#0D6E6E",fontWeight:600}}>free tuition at public institutions</Link>.</p>
          <p style={{fontSize:"14px",color:"#374151",lineHeight:1.8}}>DAAD funds over 100,000 scholars annually across 130+ countries, making it one of the world's largest scholarship programmes by volume and funding.</p>
        </div>

        {/* DAAD Programmes */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>Top DAAD Scholarship Programmes 2026</h2>
          {[
            {
              name:"DAAD Development-Related Postgraduate Courses",
              level:"Master's",
              funding:"Full tuition + €934/month + health + travel",
              deadline:"October–November 2026",
              target:"Students from developing countries and migrants",
              link:"https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/"
            },
            {
              name:"DAAD Helmut Schmidt Programme",
              level:"Master's (Public Policy)",
              funding:"Full tuition + €934/month + health + travel",
              deadline:"November 2026",
              target:"Students in public policy and governance",
              link:"https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/"
            },
            {
              name:"DAAD Research Grants (PhD)",
              level:"PhD",
              funding:"Full tuition + €1,200/month + health + travel",
              deadline:"October 2026",
              target:"Doctoral researchers from all countries",
              link:"https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/"
            },
            {
              name:"DAAD Scholarships for Refugees",
              level:"Master's + PhD",
              funding:"Full tuition + €934/month + health + travel",
              deadline:"Rolling — check daad.de",
              target:"Refugees and displaced scholars specifically",
              link:"https://www.daad.de/en/study-and-research-in-germany/scholarships/refugee-scholarship/"
            },
          ].map(p=>(
            <div key={p.name} style={{borderBottom:"1px solid #f0faf9",paddingBottom:"1.25rem",marginBottom:"1.25rem"}}>
              <h3 style={{fontSize:"14px",fontWeight:700,color:"#0A2A2A",marginBottom:".5rem"}}>{p.name}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:".5rem",marginBottom:".75rem"}}>
                {[["Level",p.level],["Funding",p.funding],["Deadline",p.deadline],["Target",p.target]].map(([label,val])=>(
                  <div key={label} style={{background:"#f9fafb",borderRadius:"6px",padding:".5rem .75rem"}}>
                    <span style={{fontSize:"10px",color:"#6b7280",display:"block"}}>{label}</span>
                    <strong style={{fontSize:"12px",color:"#0A2A2A"}}>{val}</strong>
                  </div>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" style={{fontSize:"12px",color:"#0D6E6E",fontWeight:700,textDecoration:"none"}}>Apply at DAAD.de →</a>
            </div>
          ))}
        </div>

        {/* Who qualifies */}
        <div style={{background:"#E6F4F1",border:"1.5px solid #A7D4CC",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>✅ Who Can Apply for DAAD Scholarships?</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem"}}>
            {[
              ["🛡️","Refugees","UNHCR or nationally recognised refugee status"],
              ["⏳","Asylum Seekers","Pending asylum claims accepted"],
              ["🌍","International Students","Students from 180+ countries"],
              ["🔬","Researchers","PhD and postdoctoral researchers"],
              ["👩‍🎓","Graduates","Bachelor degree holders for Master's"],
              ["📚","Academics","University staff and lecturers"],
            ].map(([icon,title,desc])=>(
              <div key={title} style={{background:"#fff",borderRadius:"8px",padding:"1rem"}}>
                <div style={{fontSize:"1.25rem",marginBottom:".375rem"}}>{icon}</div>
                <strong style={{fontSize:"12px",color:"#0A2A2A",display:"block",marginBottom:".25rem"}}>{title}</strong>
                <span style={{fontSize:"11px",color:"#6b7280",lineHeight:1.5}}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>📋 How to Apply for DAAD 2026 — Step by Step</h2>
          {[
            ["1","Find your programme","Go to daad.de and search for programmes matching your field of study and level (Master's or PhD)."],
            ["2","Check eligibility","Confirm you meet the nationality, academic and language requirements for your chosen programme."],
            ["3","Prepare documents","Academic transcripts, degree certificates, language certificates, CV, motivation letter, research proposal (for PhD), 2 reference letters."],
            ["4","Write your motivation letter","Explain your academic background, research interests, career goals and why you chose Germany. Be specific."],
            ["5","Get reference letters","Contact professors or employers at least 2 months before deadline. Give them your CV and motivation letter."],
            ["6","Submit online","Apply through the DAAD portal at portal.daad.de before the October/November deadline."],
            ["7","Await results","DAAD notifies successful applicants usually in February–March. Scholarships begin in October."],
            ["8","Apply for student visa","Once accepted, apply for a German student visa at your nearest German embassy with your DAAD award letter."],
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
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>❓ DAAD Scholarship FAQs</h2>
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
              ["Germany Scholarships for Migrants","/countries/Germany"],
              ["Study in Germany for Free","/guides/study-in-germany-free"],
              ["Germany Student Visa Guide","/guides/germany-student-visa"],
              ["DAAD vs Chevening Comparison","/compare/daad-vs-chevening"],
              ["TU Munich Scholarships","/universities/tu-munich"],
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
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get DAAD deadline alerts</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email when DAAD applications open. Never miss the October deadline.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>

        <p style={{fontSize:"11px",color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>Last Reviewed: August 2026 · Source: <a href="https://www.daad.de" target="_blank" rel="noopener noreferrer" style={{color:"#0D6E6E"}}>daad.de</a> (official DAAD website)</p>
      </div>
      <Footer />
    </>
  );
}
