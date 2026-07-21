import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is MigrantScholar?",
        a: "MigrantScholar is a free scholarship database specifically for migrants, refugees, asylum seekers and international students. We publish verified scholarship guides daily across 6 countries — UK, Germany, Canada, Australia, USA and Turkey."
      },
      {
        q: "Is MigrantScholar free to use?",
        a: "Yes — MigrantScholar is completely free forever. We never charge for access to scholarship information. All scholarships listed are also free to apply for through their official pages."
      },
      {
        q: "How often is MigrantScholar updated?",
        a: "We publish 5 new verified scholarship guides every single day at 9AM East Africa Time. Our database grows daily and all guides are verified by our team."
      },
    ]
  },
  {
    category: "Eligibility",
    questions: [
      {
        q: "Can asylum seekers apply for scholarships?",
        a: "Yes — many scholarships are open to asylum seekers with pending claims. You do not need a final decision on your asylum application to apply. UK Sanctuary Scholarships, DAAD and several others explicitly welcome applicants with pending claims."
      },
      {
        q: "Can I apply without IELTS?",
        a: "Yes — many scholarships waive the IELTS requirement for refugees and migrants, especially if you have studied in English before or if English is your first language. Browse our Without IELTS scholarships page for options."
      },
      {
        q: "Do I need settled status to apply?",
        a: "No — most scholarships on MigrantScholar do not require settled status. Many are specifically designed for people without settled status, including asylum seekers and refugees with pending claims."
      },
      {
        q: "What migration statuses are eligible?",
        a: "We cover scholarships for: Refugees (UNHCR or national status), Asylum seekers (pending claims), Humanitarian protection, Leave to remain, International students, Skilled migrants, and Displaced students. Each guide specifies exact eligibility requirements."
      },
    ]
  },
  {
    category: "Scholarships",
    questions: [
      {
        q: "What does fully funded mean?",
        a: "A fully funded scholarship covers all your costs — tuition fees, monthly living allowance, travel to and from the host country, and sometimes health insurance. You pay nothing out of pocket. Examples include DAAD (€934/month), Chevening (£1,236/month) and Türkiye Bursları."
      },
      {
        q: "Which country has the most scholarships for refugees?",
        a: "The UK leads with over 70 universities offering Sanctuary Scholarships specifically for refugees and asylum seekers. Germany is second with DAAD and university-specific programmes. Canada, Australia, USA and Turkey also have strong options."
      },
      {
        q: "What is the Chevening Scholarship?",
        a: "Chevening is the UK government's flagship international scholarship for outstanding individuals. It covers full tuition, monthly living costs (£1,236/month), travel and visa fees for a one-year Master's degree at any UK university. Applications open in August each year."
      },
      {
        q: "What is the DAAD Scholarship?",
        a: "DAAD (German Academic Exchange Service) offers fully funded scholarships for Master's and PhD students in Germany, including migrants and refugees. It covers full tuition, €934/month living allowance, health insurance and travel costs."
      },
      {
        q: "What is the Vanier Scholarship?",
        a: "The Vanier Canada Graduate Scholarship is Canada's most prestigious doctoral award, offering $50,000 CAD per year for three years. It's open to international students including migrants pursuing PhD programmes at Canadian universities."
      },
    ]
  },
  {
    category: "Applying",
    questions: [
      {
        q: "How do I apply for a scholarship?",
        a: "Each scholarship has its own application process. Our guides include step-by-step application instructions, required documents, and links to official application pages. Generally you'll need: academic transcripts, personal statement, reference letters, and proof of language proficiency."
      },
      {
        q: "What documents do I need?",
        a: "Most scholarships require: valid passport or travel document, proof of refugee/asylum status (if applicable), academic transcripts, personal statement or motivation letter, 2-3 reference letters, and language test results (IELTS/TOEFL — sometimes waived). Each scholarship specifies exact requirements."
      },
      {
        q: "How do I write a motivation letter?",
        a: "A strong motivation letter explains who you are, why you want to study this subject, what you've achieved, and how the scholarship will help you achieve your goals. Read our complete motivation letter guide for templates and examples."
      },
      {
        q: "Can I apply to multiple scholarships at once?",
        a: "Yes — and we strongly recommend it! Apply to as many relevant scholarships as possible simultaneously. Most scholarships don't require exclusivity, and applying to multiple awards significantly increases your chances of success."
      },
    ]
  },
  {
    category: "Platform",
    questions: [
      {
        q: "How do I get scholarship alerts?",
        a: "Visit our Alerts page and enter your email address. We'll send you free notifications when new scholarships open for migrants and refugees. No spam — you can unsubscribe anytime."
      },
      {
        q: "How do I search for scholarships?",
        a: "Use the search bar on our homepage to filter by country, study level, funding type and keyword. You can also browse by country, eligibility type, study level or funding type using our hub pages."
      },
      {
        q: "Are the scholarships verified?",
        a: "Yes — every scholarship guide on MigrantScholar is verified by our team. We check official sources, university websites and government pages before publishing. Each guide includes a verified date and links to official application pages."
      },
    ]
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <>
      <Head>
        <title>FAQ — Scholarships for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content="Frequently asked questions about scholarships for migrants, refugees and asylum seekers. Eligibility, IELTS waivers, fully funded awards and more." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/faq" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"FAQPage",
          "mainEntity": faqs.flatMap(cat=>cat.questions.map(({q,a})=>({
            "@type":"Question",
            "name":q,
            "acceptedAnswer":{"@type":"Answer","text":a}
          })))
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Help Center</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Frequently Asked Questions</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto .75rem"}}>Everything you need to know about scholarships for migrants, refugees and asylum seekers.</p>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",maxWidth:"400px",padding:"10px 16px",borderRadius:"8px",border:"none",fontSize:"13px",outline:"none",marginTop:".5rem"}}
            />
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › FAQ
        </div>

        {filtered.map(cat=>(
          <div key={cat.category} style={{marginBottom:"2rem"}}>
            <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem",paddingBottom:".5rem",borderBottom:"2px solid #E6F4F1"}}>{cat.category}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
              {cat.questions.map(({q,a},i)=>{
                const key = cat.category+i;
                return (
                  <div key={key} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden"}}>
                    <button onClick={()=>setOpenItem(openItem===key?null:key)} style={{width:"100%",textAlign:"left",padding:"1rem 1.25rem",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
                      <span style={{fontSize:"13px",fontWeight:600,color:"#0A2A2A"}}>{q}</span>
                      <span style={{color:"#0D6E6E",fontWeight:700,flexShrink:0,fontSize:"18px"}}>{openItem===key?"−":"+"}</span>
                    </button>
                    {openItem===key && (
                      <div style={{padding:"0 1.25rem 1rem",fontSize:"13px",color:"#374151",lineHeight:1.7,borderTop:"1px solid #f0faf9"}}>{a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap",marginTop:"2rem"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Still have questions?</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Browse our full scholarship database or contact us.</p>
          </div>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <Link href="/blog" style={{background:"#0D6E6E",color:"#fff",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse Scholarships →</Link>
            <Link href="/about" style={{background:"#fff",color:"#0A2A2A",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Contact Us →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
