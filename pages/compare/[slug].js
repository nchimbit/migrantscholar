import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";

const comparisons = {
  "daad-vs-chevening": {
    title: "DAAD vs Chevening Scholarship — Which is Better for Migrants?",
    description: "Compare DAAD Germany and Chevening UK scholarships for migrants and refugees. Funding amounts, eligibility, deadlines and application tips.",
    a: {
      name: "DAAD Scholarship",
      country: "Germany 🇩🇪",
      funding: "Full tuition + €934/month",
      deadline: "October–November",
      duration: "1–2 years (Master's), 3+ years (PhD)",
      ielts: "Not always required",
      eligibility: "Refugees, asylum seekers, international students",
      pros: ["High monthly stipend","Health insurance included","No IELTS for many programmes","Strong research focus","180+ nationalities eligible"],
      cons: ["German language sometimes required","Competitive application","Limited to German universities"],
      link: "/universities/daad"
    },
    b: {
      name: "Chevening Scholarship",
      country: "UK 🇬🇧",
      funding: "Full tuition + £1,236/month",
      deadline: "November",
      duration: "1 year (Master's only)",
      ielts: "Required (IELTS 6.5+)",
      eligibility: "International students with leadership potential",
      pros: ["Prestigious UK degree","Access to 150+ UK universities","Strong alumni network","Covers all Master's subjects","Travel costs included"],
      cons: ["IELTS required","Leadership experience needed","Master's only — no PhD","Must return home for 2 years after"],
      link: "/universities/chevening"
    }
  },
  "uk-vs-germany": {
    title: "UK vs Germany Scholarships for Migrants & Refugees",
    description: "Compare UK and Germany scholarship options for migrants, refugees and asylum seekers. Which country is better for your situation?",
    a: {
      name: "UK Scholarships",
      country: "United Kingdom 🇬🇧",
      funding: "Full tuition + £17,635/year",
      deadline: "March (Sanctuary), November (Chevening)",
      duration: "1–4 years",
      ielts: "Required for most (waived for refugees at some universities)",
      eligibility: "Asylum seekers, refugees, humanitarian protection",
      pros: ["70+ universities offer Sanctuary Scholarships","No settled status required","English language teaching","Strong job market after graduation","Prestigious degrees globally recognised"],
      cons: ["IELTS usually required","High cost of living","Post-study visa restrictions"],
      link: "/countries/UK"
    },
    b: {
      name: "Germany Scholarships",
      country: "Germany 🇩🇪",
      funding: "Full tuition + €934/month",
      deadline: "October–November",
      duration: "1–4 years",
      ielts: "Often not required",
      eligibility: "Refugees, asylum seekers, international students",
      pros: ["Free tuition at public universities","No IELTS for many programmes","Strong engineering and science","Lower cost of living than UK","Post-study work visa available"],
      cons: ["German language often needed","Colder climate","Bureaucratic processes"],
      link: "/countries/Germany"
    }
  },
  "masters-vs-phd": {
    title: "Master's vs PhD Scholarships for Migrants — Which Should You Apply For?",
    description: "Compare Master's and PhD scholarship options for migrants and refugees. Funding differences, eligibility requirements and career outcomes.",
    a: {
      name: "Master's Scholarships",
      country: "All Countries 🌍",
      funding: "Full tuition + £800–£1,500/month",
      deadline: "Varies (Oct–March)",
      duration: "1–2 years",
      ielts: "Usually required",
      eligibility: "Bachelor's degree holders, migrants, refugees",
      pros: ["Most scholarships at this level","Chevening, DAAD, Vanier available","Shorter than PhD","Higher earning potential","International recognition"],
      cons: ["Need Bachelor's degree first","IELTS usually required","Competitive application"],
      link: "/by-level/masters"
    },
    b: {
      name: "PhD Scholarships",
      country: "All Countries 🌍",
      funding: "Full tuition + £1,500–£2,500/month",
      deadline: "Varies (Oct–March)",
      duration: "3–5 years",
      ielts: "Sometimes waived for research programmes",
      eligibility: "Master's degree holders, researchers, migrants",
      pros: ["Higher monthly stipend","Longer funding period","Research independence","Academic career pathway","Vanier offers $50,000 CAD/year"],
      cons: ["Requires Master's degree first","Longer commitment","More competitive","Narrow research focus"],
      link: "/by-level/phd"
    }
  },
  "canada-vs-australia": {
    title: "Canada vs Australia Scholarships for Migrants & Refugees",
    description: "Compare Canada and Australia scholarship options for migrants and refugees. Vanier vs Australia Awards — which is right for you?",
    a: {
      name: "Canada Scholarships",
      country: "Canada 🇨🇦",
      funding: "$50,000 CAD/year (Vanier)",
      deadline: "November each year",
      duration: "3 years (PhD)",
      ielts: "Required (IELTS 6.5+)",
      eligibility: "International PhD students, migrants, refugees in Canada",
      pros: ["Highest PhD stipend globally","Multicultural society","Post-study work permit","French/English bilingual","Strong refugee support system"],
      cons: ["Mainly PhD level","Competitive application","Cold climate","IELTS required"],
      link: "/countries/Canada"
    },
    b: {
      name: "Australia Awards",
      country: "Australia 🇦🇺",
      funding: "Full tuition + living costs",
      deadline: "April–June each year",
      duration: "2–4 years",
      ielts: "Required (IELTS 6.5+)",
      eligibility: "Students from developing countries, migrants, refugees",
      pros: ["All levels covered (Bachelor to PhD)","Return airfare included","Health insurance covered","Warm climate","Strong economy"],
      cons: ["Must return home after study","Specific eligible countries","Competitive"],
      link: "/countries/Australia"
    }
  },
  "fully-funded-vs-partial": {
    title: "Fully Funded vs Partial Scholarships — What is the Difference?",
    description: "Understand the difference between fully funded and partial scholarships for migrants and refugees.",
    a: {
      name: "Fully Funded Scholarships",
      country: "All Countries 🌍",
      funding: "Tuition + living + travel + health",
      deadline: "Varies",
      duration: "1–5 years",
      ielts: "Sometimes waived",
      eligibility: "Refugees, asylum seekers, migrants, international students",
      pros: ["Zero out-of-pocket costs","Monthly stipend for living","Travel costs covered","Health insurance included","Most life-changing option"],
      cons: ["Very competitive","Long application process","Limited spots","High academic requirements"],
      link: "/by-funding/fully-funded"
    },
    b: {
      name: "Partial Scholarships",
      country: "All Countries 🌍",
      funding: "Tuition waiver or stipend only",
      deadline: "Varies",
      duration: "1–4 years",
      ielts: "Usually required",
      eligibility: "International students, migrants, refugees",
      pros: ["Less competitive","More available","Good starting point","Can combine with other funding","Faster application"],
      cons: ["Still need living cost funding","Partial coverage only","May need part-time work","Financial stress possible"],
      link: "/by-funding/partial"
    }
  },
  "turkey-vs-canada": {
    title: "Turkey vs Canada Scholarships for Migrants — Which is Better?",
    description: "Compare Turkey and Canada scholarship options for migrants and refugees. Türkiye Bursları vs Vanier — which should you apply for?",
    a: {
      name: "Türkiye Bursları",
      country: "Turkey 🇹🇷",
      funding: "Full tuition + accommodation + stipend + flights",
      deadline: "February each year",
      duration: "1–4 years",
      ielts: "Not required",
      eligibility: "Students from 180+ countries, migrants, refugees, international students",
      pros: ["Open to 180+ nationalities","No IELTS required","Accommodation provided","Return flights covered","Health insurance included","Very accessible application"],
      cons: ["Turkish language required for some programmes","Lower stipend than Canada","Less globally recognised degree"],
      link: "/universities/turkiye-burslari"
    },
    b: {
      name: "Vanier Canada Scholarship",
      country: "Canada 🇨🇦",
      funding: "$50,000 CAD/year for 3 years",
      deadline: "November each year",
      duration: "3 years (PhD only)",
      ielts: "Required (IELTS 6.5+)",
      eligibility: "International PhD students, migrants, refugees in Canada",
      pros: ["Highest stipend globally ($50k/yr)","World-class universities","Post-study work permit","Multicultural society","PhD from Canadian university"],
      cons: ["PhD only — no Masters","IELTS required","Very competitive","Cold climate"],
      link: "/universities/vanier"
    }
  },
  "masters-vs-undergraduate": {
    title: "Master's vs Undergraduate Scholarships for Migrants",
    description: "Compare Master's and undergraduate scholarship options for migrants and refugees. Which level has more funding available?",
    a: {
      name: "Master's Scholarships",
      country: "All Countries 🌍",
      funding: "Full tuition + £800–£1,500/month",
      deadline: "Varies (Oct–March)",
      duration: "1–2 years",
      ielts: "Usually required",
      eligibility: "Bachelor's degree holders, migrants, refugees",
      pros: ["Most scholarships at this level","Chevening, DAAD, Vanier available","Shorter than PhD","Higher earning potential","International recognition"],
      cons: ["Need Bachelor's degree first","IELTS usually required","Competitive application"],
      link: "/by-level/masters"
    },
    b: {
      name: "Undergraduate Scholarships",
      country: "All Countries 🌍",
      funding: "Full tuition + maintenance grant",
      deadline: "Varies",
      duration: "3–4 years",
      ielts: "Sometimes waived for refugees",
      eligibility: "School leavers, migrants, refugees, asylum seekers",
      pros: ["No degree required","UK Sanctuary Scholarships available","Türkiye Bursları covers undergrad","Longer period of support","Entry point to higher education"],
      cons: ["Fewer scholarships than Masters","Longer commitment","Lower stipend"],
      link: "/by-level/undergraduate"
    }
  },
  "uk-vs-canada": {
    title: "UK vs Canada Scholarships for Migrants & Refugees",
    description: "Compare UK and Canada scholarship options for migrants, refugees and asylum seekers. Chevening vs Vanier — which is better?",
    a: {
      name: "UK Scholarships",
      country: "United Kingdom 🇬🇧",
      funding: "Full tuition + £1,236/month",
      deadline: "November (Chevening), March (Sanctuary)",
      duration: "1–4 years",
      ielts: "Required for most",
      eligibility: "Asylum seekers, refugees, international students",
      pros: ["70+ Sanctuary Scholarships","English language teaching","No settled status required","Prestigious degrees","Strong job market"],
      cons: ["High cost of living","IELTS usually required","Post-study visa restrictions"],
      link: "/countries/UK"
    },
    b: {
      name: "Canada Scholarships",
      country: "Canada 🇨🇦",
      funding: "$50,000 CAD/year (Vanier)",
      deadline: "November each year",
      duration: "3 years (PhD)",
      ielts: "Required (IELTS 6.5+)",
      eligibility: "International PhD students, migrants, refugees",
      pros: ["Highest stipend globally","Multicultural society","Post-study work permit","Strong refugee support","Bilingual country"],
      cons: ["Mainly PhD level","Cold climate","IELTS required","Very competitive"],
      link: "/countries/Canada"
    }
  },
  "germany-vs-turkey": {
    title: "Germany vs Turkey Scholarships for Migrants & Refugees",
    description: "Compare Germany and Turkey scholarship options for migrants. DAAD vs Türkiye Bursları — which country is easier to get a scholarship in?",
    a: {
      name: "Germany Scholarships",
      country: "Germany 🇩🇪",
      funding: "Full tuition + €934/month",
      deadline: "October–November",
      duration: "1–4 years",
      ielts: "Often not required",
      eligibility: "Refugees, asylum seekers, international students",
      pros: ["Free tuition at public universities","Strong engineering programmes","No IELTS for many courses","Post-study work visa","Lower cost of living than UK"],
      cons: ["German language often needed","Colder climate","Bureaucratic processes"],
      link: "/countries/Germany"
    },
    b: {
      name: "Turkey Scholarships",
      country: "Turkey 🇹🇷",
      funding: "Full tuition + accommodation + stipend",
      deadline: "February each year",
      duration: "1–4 years",
      ielts: "Not required",
      eligibility: "Students from 180+ countries, migrants, refugees",
      pros: ["Open to 180+ nationalities","No IELTS required","Accommodation included","Flights covered","Health insurance included"],
      cons: ["Turkish language required for some","Less globally recognised","Political instability concerns"],
      link: "/countries/Turkey"
    }
  },
  "phd-vs-postdoc": {
    title: "PhD vs Postdoctoral Scholarships for Migrants & Researchers",
    description: "Compare PhD and postdoctoral scholarship options for migrant researchers. Which level offers better funding and opportunities?",
    a: {
      name: "PhD Scholarships",
      country: "All Countries 🌍",
      funding: "Full tuition + £1,500–£2,500/month",
      deadline: "Varies (Oct–March)",
      duration: "3–5 years",
      ielts: "Sometimes waived",
      eligibility: "Master's degree holders, researchers, migrants",
      pros: ["Full funding available","Vanier offers $50k/year","Research independence","Academic career pathway","More scholarships available"],
      cons: ["Need Master's first","Long commitment 3-5 years","Narrow research focus","Very competitive"],
      link: "/by-level/phd"
    },
    b: {
      name: "Postdoctoral Fellowships",
      country: "All Countries 🌍",
      funding: "£2,000–£4,000/month",
      deadline: "Rolling applications",
      duration: "1–3 years",
      ielts: "Usually not required",
      eligibility: "PhD holders, displaced researchers, academics",
      pros: ["Higher salary than PhD","Flexible research topics","International mobility","Less competitive than PhD","Career advancement"],
      cons: ["Need PhD first","Short term contracts","Less job security","Limited to research roles"],
      link: "/by-level/postdoctoral"
    }
  },
};

export default function ComparePage({ slug, data }) {
  if (!data) return null;
  const { a, b } = data;

  return (
    <>
      <Head>
        <title>{data.title} — MigrantScholar</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/compare/${slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Article",
          "headline":data.title,
          "description":data.description
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Comparison Guide</div>
            <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",marginBottom:".75rem",lineHeight:1.3}}>{data.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{data.description}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          Comparison
        </div>

        {/* Side by side */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",marginBottom:"2rem"}}>
          {[a, b].map((item, idx) => (
            <div key={idx} style={{background:"#fff",border:`2px solid ${idx===0?"#0D6E6E":"#F5A623"}`,borderRadius:"12px",overflow:"hidden"}}>
              <div style={{background:idx===0?"#0D6E6E":"#F5A623",padding:"1rem",textAlign:"center"}}>
                <h2 style={{fontSize:"1rem",fontWeight:800,color:idx===0?"#fff":"#0A2A2A",marginBottom:".25rem"}}>{item.name}</h2>
                <span style={{fontSize:"13px",color:idx===0?"rgba(255,255,255,.8)":"rgba(10,42,42,.7)"}}>{item.country}</span>
              </div>
              <div style={{padding:"1.25rem"}}>
                {[["💰 Funding",item.funding],["📅 Deadline",item.deadline],["⏱ Duration",item.duration],["📝 IELTS",item.ielts],["✅ Eligibility",item.eligibility]].map(([label,val])=>(
                  <div key={label} style={{padding:".5rem 0",borderBottom:"1px solid #f6f9f8"}}>
                    <span style={{fontSize:"10px",color:"#6b7280",display:"block"}}>{label}</span>
                    <strong style={{fontSize:"12px",color:"#0A2A2A"}}>{val}</strong>
                  </div>
                ))}
                <div style={{marginTop:"1rem"}}>
                  <h3 style={{fontSize:"12px",fontWeight:700,color:"#166534",marginBottom:".5rem"}}>✅ Pros</h3>
                  {item.pros.map(p=><div key={p} style={{fontSize:"11px",color:"#374151",padding:"2px 0"}}>• {p}</div>)}
                </div>
                <div style={{marginTop:".75rem"}}>
                  <h3 style={{fontSize:"12px",fontWeight:700,color:"#DC2626",marginBottom:".5rem"}}>❌ Cons</h3>
                  {item.cons.map(c=><div key={c} style={{fontSize:"11px",color:"#374151",padding:"2px 0"}}>• {c}</div>)}
                </div>
                <Link href={item.link} style={{display:"block",marginTop:"1rem",background:idx===0?"#0D6E6E":"#F5A623",color:idx===0?"#fff":"#0A2A2A",textAlign:"center",padding:"8px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>
                  View {item.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div style={{background:"#E6F4F1",border:"1.5px solid #A7D4CC",borderRadius:"10px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0D6E6E",marginBottom:".75rem"}}>🏆 Which Should You Choose?</h2>
          <p style={{fontSize:"13px",color:"#374151",lineHeight:1.7}}>
            Both options have strong benefits for migrants and refugees. Your choice should depend on your academic background, career goals, language skills and which country you want to study in. Use our free alerts to stay updated on deadlines for both.
          </p>
          <Link href="/alerts" style={{display:"inline-block",marginTop:"1rem",background:"#0D6E6E",color:"#fff",padding:"8px 20px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>Get Free Deadline Alerts →</Link>
        </div>

        {/* More comparisons */}
        <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>More Comparisons</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem",marginBottom:"2rem"}}>
          {Object.entries(comparisons).filter(([s])=>s!==slug).map(([s,d])=>(
            <Link key={s} href={`/compare/${s}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:".875rem",textDecoration:"none",display:"block"}}>
              <h3 style={{fontSize:"12px",fontWeight:700,color:"#0D6E6E",lineHeight:1.4}}>{d.title.split("—")[0].trim()}</h3>
              <span style={{fontSize:"11px",color:"#6b7280"}}>Compare →</span>
            </Link>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Browse all scholarships</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Find verified scholarships for migrants, refugees and asylum seekers.</p>
          </div>
          <Link href="/blog" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Browse Scholarships →</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["daad-vs-chevening","uk-vs-germany","masters-vs-phd","canada-vs-australia","fully-funded-vs-partial","turkey-vs-canada","masters-vs-undergraduate","uk-vs-canada","germany-vs-turkey","phd-vs-postdoc"].map(slug=>({params:{slug}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const data = comparisons[params.slug];
  if (!data) return { notFound: true };
  return { props: { slug: params.slug, data }, revalidate: 3600 };
}
