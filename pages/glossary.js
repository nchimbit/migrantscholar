import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";

const terms = [
  { term:"Asylum Seeker", def:"A person who has left their home country and applied for refugee status in another country. Their claim is still being processed. Many scholarships are open to asylum seekers even before a final decision is made." },
  { term:"Refugee", def:"A person who has been officially recognised as having fled persecution, war or violence. Refugees have UNHCR documentation or national refugee status and are eligible for many specific scholarship programmes." },
  { term:"Fully Funded Scholarship", def:"A scholarship that covers all costs — tuition fees, monthly living allowance, travel costs to and from the host country, and sometimes health insurance. You pay nothing out of pocket." },
  { term:"Tuition Waiver", def:"A scholarship that covers only tuition fees. You still need to arrange your own living costs, accommodation and travel separately." },
  { term:"IELTS", def:"International English Language Testing System. A test that proves your English proficiency. Many scholarships for migrants and refugees waive this requirement, especially if you have studied in English before." },
  { term:"DAAD", def:"German Academic Exchange Service (Deutscher Akademischer Austauschdienst). Germany's largest scholarship organisation, offering fully funded awards for migrants, refugees and international students." },
  { term:"Chevening Scholarship", def:"The UK government's flagship international scholarship programme, funded by the Foreign Commonwealth and Development Office. Open to outstanding individuals including migrants and refugees." },
  { term:"Vanier Scholarship", def:"Canada's most prestigious doctoral scholarship, offering $50,000 CAD per year for three years. Open to international students including migrants pursuing PhD programmes at Canadian universities." },
  { term:"Sanctuary Scholarship", def:"A type of scholarship offered by UK universities specifically for asylum seekers and refugees. Over 70 UK universities offer Sanctuary Scholarships covering full tuition and a maintenance grant." },
  { term:"Stipend", def:"A regular monthly payment provided as part of a scholarship to cover living costs such as food, accommodation and transport. Amounts vary by country — DAAD pays €934/month, Chevening covers UK living costs." },
  { term:"Maintenance Grant", def:"A lump sum or regular payment to cover living expenses during your studies. Similar to a stipend but sometimes paid termly or annually rather than monthly." },
  { term:"Migration Status", def:"Your legal status in a country as a migrant. This includes categories like refugee, asylum seeker, humanitarian protection, leave to remain, student visa, and others. Different scholarships require different migration statuses." },
  { term:"Leave to Remain", def:"Permission to stay in a country for a defined or indefinite period. In the UK, this includes Humanitarian Protection and Refugee Leave — both of which make you eligible for most UK Sanctuary Scholarships." },
  { term:"Humanitarian Protection", def:"A form of protection granted to people who don't meet the refugee definition but would face serious harm if returned to their country. Usually grants similar rights to refugee status for scholarship purposes." },
  { term:"Türkiye Bursları", def:"Turkey's government scholarship programme open to students from 180+ countries. Covers full tuition, accommodation, monthly stipend, health insurance and return flight. One of the most accessible fully funded scholarships globally." },
  { term:"Australia Awards", def:"Scholarships funded by the Australian government for students from developing countries. Cover full tuition, living costs, travel and health insurance. Open to migrants and refugees in eligible countries." },
  { term:"Fulbright Scholarship", def:"A prestigious US government scholarship for graduate students and researchers. Covers tuition, living costs and health insurance. Available to international students including those with migrant backgrounds." },
  { term:"Personal Statement", def:"A written document submitted with a scholarship application explaining who you are, why you want to study, your goals and why you deserve the scholarship. Also called a motivation letter or statement of purpose." },
  { term:"Motivation Letter", def:"A letter explaining your reasons for applying to a scholarship or university, your background, achievements and future plans. One of the most important parts of any scholarship application." },
  { term:"Reference Letter", def:"A letter written by a teacher, professor or employer supporting your scholarship application. Most scholarships require 2-3 reference letters from people who know your academic or professional work." },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Scholarship Glossary for Migrants & Refugees — MigrantScholar</title>
        <meta name="description" content="Plain-language definitions of scholarship terms for migrants and refugees — asylum seeker, refugee, fully funded, IELTS waiver, stipend and more." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/glossary" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"DefinedTermSet",
          "name":"Scholarship Glossary for Migrants and Refugees",
          "url":"https://migrantscholar.vercel.app/glossary",
          "hasDefinedTerm": terms.map(t=>({
            "@type":"DefinedTerm",
            "name":t.term,
            "description":t.def
          }))
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Reference</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Scholarship Glossary</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>Plain-language definitions of scholarship and immigration terms for migrants, refugees and asylum seekers.</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Glossary
        </div>

        <input
          type="text"
          placeholder="Search terms e.g. refugee, IELTS, stipend..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:"10px 16px",fontSize:"13px",marginBottom:"1.5rem",outline:"none"}}
        />

        <div style={{display:"flex",flexDirection:"column",gap:".75rem",marginBottom:"2rem"}}>
          {filtered.map(({term,def})=>(
            <div key={term} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
              <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0D6E6E",marginBottom:".4rem"}}>{term}</h2>
              <p style={{fontSize:"13px",color:"#374151",lineHeight:1.7}}>{def}</p>
            </div>
          ))}
        </div>

        <div style={{background:"#E6F4F1",borderRadius:"12px",padding:"1.5rem",textAlign:"center"}}>
          <p style={{fontSize:"13px",color:"#0A2A2A",marginBottom:".75rem"}}>Looking for scholarships? Browse our verified database.</p>
          <Link href="/blog" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse All Scholarships →</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
