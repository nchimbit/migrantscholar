import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const guidesData = {
  "study-in-germany-free": {
    title: "How to Study in Germany for Free — Complete Guide for Migrants",
    description: "Germany offers free tuition at public universities for all students including migrants and refugees. This complete guide explains how to apply, what to expect and how to fund your studies.",
    country: "Germany",
    flag: "🇩🇪",
    lastReviewed: "August 2026",
    sections: [
      {
        heading: "Is it Really Free to Study in Germany?",
        content: "Yes — most public universities in Germany charge no tuition fees for undergraduate and graduate students, including international students, migrants and refugees. You only pay a semester contribution of €100–€350 which covers your student transport card and other services. This makes Germany one of the most affordable study destinations in the world."
      },
      {
        heading: "Who Can Study for Free in Germany?",
        content: "Free tuition applies to: EU and non-EU international students, refugees with recognised status, asylum seekers (in most states), migrants with valid residence permits, and displaced students. Some states like Baden-Württemberg charge non-EU students fees — always check the specific university and state."
      },
      {
        heading: "Top Free Universities in Germany for Migrants",
        content: "The best public universities offering free tuition include: Technical University of Munich (TUM), Humboldt University Berlin, University of Heidelberg, RWTH Aachen University, University of Hamburg, Goethe University Frankfurt, and University of Freiburg. All charge only the semester contribution fee."
      },
      {
        heading: "How to Apply — Step by Step",
        content: "1. Choose your course and university on uni-assist.de\n2. Check language requirements (German or English programmes)\n3. Get your documents translated and certified\n4. Apply through uni-assist or directly to the university\n5. Receive your admission letter\n6. Apply for a student visa at the German embassy\n7. Arrange accommodation and health insurance\n8. Enrol and pay the semester contribution"
      },
      {
        heading: "DAAD Scholarships to Cover Living Costs",
        content: "While tuition is free, you still need to cover living costs of approximately €850–€1,200/month. The DAAD scholarship covers full tuition plus €934/month for living costs, health insurance and travel. Apply at daad.de. Other options include the Deutschlandstipendium (€300/month) and university-specific scholarships."
      },
      {
        heading: "Language Requirements",
        content: "Many programmes are taught in German and require DSH-2 or TestDaF-4 language certification. However, hundreds of Master's programmes are taught entirely in English and require IELTS 6.0–6.5 or TOEFL 80+. Check the DAAD database at daad.de for English-taught programmes."
      },
      {
        heading: "Frequently Asked Questions",
        content: "**Can asylum seekers study for free in Germany?** Yes — in most German states, asylum seekers can enrol at public universities. However, access varies by state and your specific status. Contact the university's international office for guidance.\n\n**Do I need German language skills?** Not necessarily — many programmes are in English. But German skills help with daily life.\n\n**How much money do I need per month?** Budget €850–€1,200/month for accommodation, food, transport and personal expenses.\n\n**Can I work while studying?** Yes — students can work up to 120 full days or 240 half days per year."
      }
    ],
    relatedLinks: [
      ["Germany scholarships for migrants","https://migrantscholar.com/countries/Germany"],
      ["DAAD Scholarships","https://migrantscholar.com/universities/daad"],
      ["TU Munich scholarships","https://migrantscholar.com/universities/tu-munich"],
      ["Fully funded scholarships","https://migrantscholar.com/by-funding/fully-funded"],
    ]
  },
  "f1-visa-guide-migrants": {
    title: "F1 Student Visa Guide for Migrants & International Students — USA",
    description: "Complete guide to the F1 student visa for migrants and international students in the USA. Requirements, application process, costs and tips for asylum seekers.",
    country: "USA",
    flag: "🇺🇸",
    lastReviewed: "August 2026",
    sections: [
      {
        heading: "What is the F1 Student Visa?",
        content: "The F1 visa is the most common student visa for international students studying full-time at an accredited US university or college. It allows you to stay in the USA for the duration of your studies plus a 60-day grace period. After graduation, F1 holders can apply for Optional Practical Training (OPT) to work in the USA for up to 3 years in STEM fields."
      },
      {
        heading: "Can Migrants and Asylum Seekers Get an F1 Visa?",
        content: "Migrants can apply for an F1 visa from their home country or a third country. However, asylum seekers already in the USA face a different situation — they typically cannot apply for an F1 visa while their asylum claim is pending. Instead, they may be able to study using their Employment Authorization Document (EAD). Always consult an immigration lawyer for your specific situation."
      },
      {
        heading: "F1 Visa Requirements",
        content: "To qualify for an F1 visa you need: acceptance letter from a SEVP-approved school, Form I-20 from your school, sufficient funds to cover tuition and living costs, strong ties to your home country, English proficiency (IELTS/TOEFL), valid passport, and DS-160 application form. Financial proof typically means showing $30,000–$60,000 per year in available funds."
      },
      {
        heading: "How to Apply — Step by Step",
        content: "1. Get accepted to a SEVP-approved US university\n2. Receive your I-20 form from the university\n3. Pay the SEVIS fee ($350)\n4. Complete DS-160 online application\n5. Pay the visa application fee ($185)\n6. Schedule visa interview at US embassy\n7. Attend interview with required documents\n8. Receive visa decision (usually within 2-5 weeks)"
      },
      {
        heading: "Scholarships to Fund Your US Studies",
        content: "The Fulbright Foreign Student Scholarship covers full tuition, living costs and health insurance for graduate students. Many US universities including Harvard and MIT provide full funding for all admitted PhD students. The Joint Japan/World Bank Graduate Scholarship Programme is also available for developing country students."
      },
      {
        heading: "Frequently Asked Questions",
        content: "**Can I work on an F1 visa?** Yes — up to 20 hours/week on campus during studies, and full-time during holidays. OPT allows 12 months of post-graduation work (36 months for STEM).\n\n**How long does F1 visa processing take?** Allow 3-5 months — SEVIS registration, DS-160, interview scheduling and processing.\n\n**What if my F1 visa is denied?** You can reapply. Common reasons for denial include insufficient funds or weak ties to home country.\n\n**Can DACA recipients get F1 visas?** DACA recipients face complex situations — consult an immigration lawyer."
      }
    ],
    relatedLinks: [
      ["USA scholarships for migrants","https://migrantscholar.com/countries/USA"],
      ["Fulbright scholarships","https://migrantscholar.com/universities/fulbright"],
      ["Harvard scholarships","https://migrantscholar.com/universities/harvard"],
      ["MIT scholarships","https://migrantscholar.com/universities/mit"],
    ]
  },
  "canada-study-permit": {
    title: "Canada Study Permit Guide for Migrants & International Students",
    description: "Complete guide to the Canada study permit for migrants, refugees and international students. Requirements, application process, costs and tips for asylum seekers.",
    country: "Canada",
    flag: "🇨🇦",
    lastReviewed: "August 2026",
    sections: [
      {
        heading: "What is a Canada Study Permit?",
        content: "A Canada study permit allows international students to study at designated learning institutions (DLIs) in Canada. It is not a visa — most students also need a visitor visa or Electronic Travel Authorization (eTA). The permit is typically valid for the duration of your programme plus 90 days. After graduation, you can apply for the Post-Graduation Work Permit (PGWP)."
      },
      {
        heading: "Can Refugees and Asylum Seekers Study in Canada?",
        content: "Refugees with permanent resident status in Canada can study without a study permit. Asylum seekers with pending claims may be eligible to study — contact Immigration, Refugees and Citizenship Canada (IRCC) for your specific situation. Protected persons (Convention refugees) can study and work freely in Canada."
      },
      {
        heading: "Study Permit Requirements",
        content: "To get a Canada study permit you need: acceptance letter from a DLI, proof of financial support (CAD $10,000+ per year plus tuition), clean criminal record, good health, intention to leave Canada after studies, and valid passport. Language requirements depend on your programme — IELTS 6.0+ is typical."
      },
      {
        heading: "How to Apply — Step by Step",
        content: "1. Get accepted to a Canadian DLI\n2. Gather required documents\n3. Create a MyCIC account at ircc.canada.ca\n4. Complete the online application\n5. Pay the $150 CAD application fee\n6. Provide biometrics if required ($85 CAD)\n7. Wait for processing (8-16 weeks)\n8. Receive your Port of Entry letter\n9. Get your study permit stamped at the border"
      },
      {
        heading: "Scholarships to Fund Your Canadian Studies",
        content: "The Vanier Canada Graduate Scholarship offers $50,000 CAD/year for 3 years for PhD students. The Canada-ASEAN Scholarships provide funding for students from ASEAN countries. Many Canadian universities including U of T and McGill offer dedicated refugee bursaries. The Canadian Commonwealth Scholarship Programme supports students from Commonwealth countries."
      },
      {
        heading: "Frequently Asked Questions",
        content: "**Can I work while studying in Canada?** Yes — study permit holders can work up to 20 hours/week off-campus during studies and full-time during scheduled breaks.\n\n**What is the PGWP?** The Post-Graduation Work Permit lets you work in Canada for up to 3 years after graduation — a pathway to permanent residence.\n\n**How long does processing take?** Currently 8-16 weeks for most countries. Apply well in advance.\n\n**Can I bring my family?** Yes — your spouse may get an open work permit and children can study in Canada."
      }
    ],
    relatedLinks: [
      ["Canada scholarships for migrants","https://migrantscholar.com/countries/Canada"],
      ["Vanier scholarships","https://migrantscholar.com/universities/vanier"],
      ["McGill scholarships","https://migrantscholar.com/universities/mcgill"],
      ["University of Toronto scholarships","https://migrantscholar.com/universities/university-of-toronto"],
    ]
  },
  "germany-student-visa": {
    title: "Germany Student Visa Guide for Migrants & International Students",
    description: "Complete guide to the Germany student visa for migrants, refugees and international students. Requirements, application process, blocked account and tips for asylum seekers.",
    country: "Germany",
    flag: "🇩🇪",
    lastReviewed: "August 2026",
    sections: [
      {
        heading: "Do You Need a Visa to Study in Germany?",
        content: "EU/EEA citizens do not need a visa to study in Germany. Non-EU students including migrants need a German student visa (National Visa, Type D) before travelling to Germany. Once in Germany, you apply for a residence permit for study purposes. Asylum seekers already in Germany may be able to study — the rules depend on your specific status and the state (Bundesland) you are in."
      },
      {
        heading: "Germany Student Visa Requirements",
        content: "To get a Germany student visa you need: university admission letter, proof of financial means (€11,208/year in a blocked account), health insurance, language proficiency proof, valid passport (6+ months validity), biometric photos, completed visa application form, and APS certificate (for some countries). The blocked account (Sperrkonto) must contain €934/month."
      },
      {
        heading: "What is a Blocked Account (Sperrkonto)?",
        content: "A blocked account is a special German bank account that holds €11,208 (as of 2024) to prove you can support yourself during studies. The money is released monthly (€934/month). Providers include Deutsche Bank, Fintiba, Expatrio and Coracle. Opening takes 1-2 weeks and costs €30-100 in setup fees. The DAAD scholarship can substitute for the blocked account."
      },
      {
        heading: "How to Apply — Step by Step",
        content: "1. Get accepted to a German university\n2. Open a blocked account with €11,208\n3. Get health insurance (public or private)\n4. Book visa appointment at German embassy/consulate\n5. Complete visa application form\n6. Submit all documents at the appointment\n7. Wait 6-12 weeks for processing\n8. Travel to Germany and register at the local authority (Anmeldung)\n9. Apply for residence permit at the Ausländerbehörde"
      },
      {
        heading: "Can Asylum Seekers Study in Germany?",
        content: "Asylum seekers in Germany may study at universities depending on their status. Those with Aufenthaltsgestattung (pending asylum) can study in most states. Those with Duldung (tolerated stay) face more restrictions. Recognised refugees (Flüchtlingsanerkennung) can study freely. Contact your local Ausländerbehörde and the university's international office for guidance specific to your situation."
      },
      {
        heading: "Frequently Asked Questions",
        content: "**How long does the Germany student visa take?** Allow 6-12 weeks. Book your appointment 3-4 months before your intended travel date.\n\n**Can I work on a student visa in Germany?** Yes — up to 120 full days or 240 half days per year.\n\n**Do I need to speak German?** Not for English-taught programmes. But German helps with daily life and administration.\n\n**What happens after graduation?** You can get an 18-month job-seeker visa to find work in Germany."
      }
    ],
    relatedLinks: [
      ["Germany scholarships for migrants","https://migrantscholar.com/countries/Germany"],
      ["DAAD scholarships","https://migrantscholar.com/universities/daad"],
      ["TU Munich scholarships","https://migrantscholar.com/universities/tu-munich"],
      ["Study in Germany for free","https://migrantscholar.com/guides/study-in-germany-free"],
    ]
  },
  "uk-student-visa-refugees": {
    title: "UK Student Visa Guide for Refugees & Asylum Seekers",
    description: "Complete guide to the UK Student visa for refugees, asylum seekers and migrants. Requirements, Sanctuary Scholarships, and how to study in the UK without settled status.",
    country: "UK",
    flag: "🇬🇧",
    lastReviewed: "August 2026",
    sections: [
      {
        heading: "Can Refugees Study in the UK?",
        content: "Yes — refugees with recognised status in the UK can study at UK universities. Those with Refugee Leave or Humanitarian Protection are treated similarly to settled persons for student finance purposes. Many UK universities offer dedicated Sanctuary Scholarships specifically for refugees and asylum seekers, covering full tuition and maintenance."
      },
      {
        heading: "Do Asylum Seekers Need a Student Visa?",
        content: "Asylum seekers with pending claims in the UK do not need a separate student visa — your asylum seeker status allows you to study. However, you are typically not eligible for student finance loans. This is where Sanctuary Scholarships are crucial — over 70 UK universities offer free places for asylum seekers with no requirement for settled status."
      },
      {
        heading: "UK Student Visa Requirements (for those outside UK)",
        content: "If applying from abroad, you need the UK Student visa (formerly Tier 4). Requirements include: Confirmation of Acceptance for Studies (CAS) from a licensed sponsor university, proof of English (IELTS 5.5–6.5 depending on course), sufficient funds (£1,334/month in London, £1,023/month elsewhere for up to 9 months), valid passport, and tuberculosis test results (some countries)."
      },
      {
        heading: "Sanctuary Scholarships — Study Free in the UK",
        content: "Over 70 UK universities offer Sanctuary Scholarships for asylum seekers and refugees. These typically cover: full tuition fees, maintenance grant of £8,000–£17,635/year, and sometimes accommodation. Universities offering Sanctuary Scholarships include: University of Oxford, University of Edinburgh, University of Bristol, University of Leeds, King's College London, and many more. No settled status required."
      },
      {
        heading: "How to Apply — Step by Step",
        content: "1. Research universities offering Sanctuary Scholarships at universities.ac.uk\n2. Check eligibility — most require asylum seeker or refugee status\n3. Apply to the university through UCAS or direct application\n4. Apply separately for the Sanctuary Scholarship\n5. Submit proof of status (Home Office letter, BRP card)\n6. Attend interview if required\n7. Receive offer letter and scholarship confirmation\n8. Enrol and begin your studies"
      },
      {
        heading: "Frequently Asked Questions",
        content: "**Can I apply to university while my asylum claim is pending?** Yes — many UK universities and all Sanctuary Scholarship programmes accept applicants with pending asylum claims.\n\n**Am I eligible for student loans?** Generally no — unless you have refugee status or humanitarian protection. Sanctuary Scholarships replace student finance.\n\n**Can I work while studying in the UK?** Student visa holders can work 20 hours/week during term and full-time during holidays. Asylum seekers face restrictions — check your specific conditions.\n\n**What is the Chevening Scholarship?** Chevening is for international students applying from outside the UK. If you are already in the UK as an asylum seeker, Sanctuary Scholarships are more relevant."
      }
    ],
    relatedLinks: [
      ["UK scholarships for migrants","https://migrantscholar.com/countries/UK"],
      ["Chevening scholarships","https://migrantscholar.com/universities/chevening"],
      ["Oxford Sanctuary Scholarship","https://migrantscholar.com/universities/oxford"],
      ["Scholarships for refugees","https://migrantscholar.com/by-eligibility/refugees"],
    ]
  },
};

export default function GuidePage({ guide, info }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>{info.title} — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.com/guides/${guide}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Article",
          "headline":info.title,
          "description":info.description,
          "dateModified":new Date().toISOString(),
          "author":{"@type":"Organization","name":"MigrantScholar"},
          "publisher":{"@type":"Organization","name":"MigrantScholar","url":"https://migrantscholar.com"}
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"2rem"}}>{info.flag}</span>
              <span style={{background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",textTransform:"uppercase",letterSpacing:".07em"}}>Study Guide</span>
            </div>
            <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>{info.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",lineHeight:1.6}}>{info.description}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          {info.title.split("—")[0].trim()}
        </div>

        {/* Content sections */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"2rem",marginBottom:"2rem"}}>
          {info.sections.map((section, i) => (
            <div key={i} style={{marginBottom:"2rem",paddingBottom:"2rem",borderBottom:i<info.sections.length-1?"1px solid #f0faf9":"none"}}>
              <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:".875rem"}}>{section.heading}</h2>
              {section.content.split('\n\n').map((para, j) => (
                <p key={j} style={{fontSize:"14px",color:"#374151",lineHeight:1.8,marginBottom:".75rem"}}>{para}</p>
              ))}
            </div>
          ))}

          {/* Last reviewed */}
          <div style={{background:"#E6F4F1",borderRadius:"8px",padding:".75rem 1rem",fontSize:"12px",color:"#6b7280"}}>
            ✓ Last Reviewed: {info.lastReviewed} · Information sourced from official government and university websites.
          </div>
        </div>

        {/* Related guides */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>Related Guides & Scholarships</h2>
          <div style={{display:"flex",flexDirection:"column",gap:".5rem"}}>
            {info.relatedLinks.map(([label,href])=>(
              <a key={label} href={href} style={{fontSize:"13px",color:"#0D6E6E",textDecoration:"none",fontWeight:600}}>→ {label}</a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get free scholarship alerts</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Never miss a deadline — free email alerts for migrants and refugees.</p>
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
    paths: ["study-in-germany-free","f1-visa-guide-migrants","canada-study-permit","germany-student-visa","uk-student-visa-refugees"].map(guide=>({params:{guide}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const info = guidesData[params.guide];
  if (!info) return { notFound: true };
  return { props: { guide: params.guide, info }, revalidate: 3600 };
}
