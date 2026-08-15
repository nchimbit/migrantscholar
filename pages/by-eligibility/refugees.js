import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

export default function RefugeesPage({ posts }) {
  const faqs = [
    { q: "Can I apply for scholarships while my asylum claim is pending?", a: "Yes — many scholarships accept applications from asylum seekers with pending claims. UK Sanctuary Scholarships, DAAD and several university programmes do not require a final decision on your asylum application." },
    { q: "Do I need settled status to get a scholarship in the UK?", a: "No. Over 70 UK universities offer Sanctuary Scholarships specifically for asylum seekers and refugees without settled status. You only need proof of your asylum seeker status or refugee documentation." },
    { q: "What documents do I need as a refugee to apply?", a: "Typically: UNHCR refugee card or national refugee status document, Home Office letter (UK), BRP card, academic transcripts, personal statement, and 2 reference letters. Each scholarship specifies its requirements." },
    { q: "Which country has the most scholarships for refugees?", a: "The UK leads with 70+ Sanctuary Scholarships. Germany is second with DAAD and university programmes. Canada, Australia, Turkey and the USA also have strong options specifically for refugees." },
    { q: "Are there fully funded scholarships for refugees?", a: "Yes — many are fully funded covering tuition, living costs, travel and health insurance. DAAD covers full tuition + €934/month. Chevening covers full tuition + £1,236/month. Oxford Sanctuary covers full tuition + £17,635/year." },
    { q: "Can stateless persons apply for refugee scholarships?", a: "Yes — many scholarships open to refugees also accept stateless persons and those with humanitarian protection. Check each scholarship's specific eligibility criteria." },
  ];

  return (
    <>
      <Head>
        <title>Fully Funded Scholarships for Refugees 2026 — Verified Awards | MigrantScholar</title>
        <meta name="description" content="Fully funded scholarships for refugees 2026. UK Sanctuary Scholarships, DAAD Germany, Chevening, Vanier Canada and more. No settled status required. Updated daily." />
        <link rel="canonical" href="https://migrantscholar.com/by-eligibility/refugees" />
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
            {"@type":"ListItem","position":2,"name":"Scholarships for Refugees","item":"https://migrantscholar.com/by-eligibility/refugees"}
          ]
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Updated Daily · 2026</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem",lineHeight:1.3}}>Fully Funded Scholarships for Refugees 2026</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"600px",margin:"0 auto .875rem"}}>Verified fully funded scholarships specifically for refugees. No settled status required. UK, Germany, Canada, Australia, USA and Turkey. Updated daily.</p>
            <div style={{display:"flex",gap:".5rem",justifyContent:"center",flexWrap:"wrap"}}>
              <Link href="/by-eligibility/asylum-seekers" style={{background:"rgba(255,255,255,.15)",color:"#fff",padding:"6px 14px",borderRadius:"20px",fontSize:"12px",textDecoration:"none",fontWeight:600}}>Asylum Seekers →</Link>
              <Link href="/by-eligibility/without-ielts" style={{background:"rgba(255,255,255,.15)",color:"#fff",padding:"6px 14px",borderRadius:"20px",fontSize:"12px",textDecoration:"none",fontWeight:600}}>Without IELTS →</Link>
              <Link href="/by-funding/fully-funded" style={{background:"rgba(255,255,255,.15)",color:"#fff",padding:"6px 14px",borderRadius:"20px",fontSize:"12px",textDecoration:"none",fontWeight:600}}>Fully Funded →</Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> › Scholarships for Refugees
        </div>

        {/* Top scholarships table */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>🏆 Top Fully Funded Scholarships for Refugees 2026</h2>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:"12px"}}>
              <thead>
                <tr style={{background:"#E6F4F1"}}>
                  {["Scholarship","Country","Funding","Deadline","IELTS","Link"].map(h=>(
                    <th key={h} style={{padding:".625rem .875rem",textAlign:"left",fontWeight:700,color:"#0A2A2A",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Oxford Sanctuary Scholarship","🇬🇧 UK","Full tuition + £17,635/yr","March","Waived","/universities/oxford"],
                  ["DAAD Scholarship","🇩🇪 Germany","Full tuition + €934/month","Oct–Nov","Not always required","/universities/daad"],
                  ["Chevening Scholarship","🇬🇧 UK","Full tuition + £1,236/month","November","IELTS 6.5","/universities/chevening"],
                  ["Edinburgh Sanctuary","🇬🇧 UK","Full tuition + maintenance","April","Waived","/universities/university-of-edinburgh"],
                  ["Vanier Canada","🇨🇦 Canada","$50,000 CAD/year","November","IELTS 6.5","/universities/vanier"],
                  ["Türkiye Bursları","🇹🇷 Turkey","Full + accommodation + flights","February","Not required","/universities/turkiye-burslari"],
                  ["Australia Awards","🇦🇺 Australia","Full tuition + living costs","April–June","IELTS 6.5","/universities/australia-awards"],
                  ["Fulbright Program","🇺🇸 USA","Full tuition + living costs","October","TOEFL/IELTS","/universities/fulbright"],
                ].map(([name,country,funding,deadline,ielts,link])=>(
                  <tr key={name} style={{borderBottom:"1px solid #f0faf9"}}>
                    <td style={{padding:".625rem .875rem",fontWeight:600,color:"#0D6E6E"}}><Link href={link} style={{color:"#0D6E6E",textDecoration:"none"}}>{name}</Link></td>
                    <td style={{padding:".625rem .875rem"}}>{country}</td>
                    <td style={{padding:".625rem .875rem",color:"#166534",fontWeight:600}}>{funding}</td>
                    <td style={{padding:".625rem .875rem"}}>{deadline}</td>
                    <td style={{padding:".625rem .875rem"}}>{ielts}</td>
                    <td style={{padding:".625rem .875rem"}}><Link href={link} style={{color:"#0D6E6E",fontWeight:700,textDecoration:"none"}}>View →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Who qualifies */}
        <div style={{background:"#E6F4F1",border:"1.5px solid #A7D4CC",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1rem"}}>✅ Who Qualifies for Refugee Scholarships?</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem"}}>
            {[
              ["🛡️","Convention Refugees","UNHCR recognised or nationally recognised refugee status"],
              ["⏳","Asylum Seekers","Pending asylum claims — many scholarships accept you"],
              ["🏠","Humanitarian Protection","HP or equivalent status in your country"],
              ["📄","Refugee Leave","Those with refugee leave to remain in UK"],
              ["🌍","Stateless Persons","Stateless individuals with appropriate documentation"],
              ["🔄","Displaced Students","Students displaced by conflict or persecution"],
            ].map(([icon,title,desc])=>(
              <div key={title} style={{background:"#fff",borderRadius:"8px",padding:"1rem"}}>
                <div style={{fontSize:"1.25rem",marginBottom:".375rem"}}>{icon}</div>
                <strong style={{fontSize:"12px",color:"#0A2A2A",display:"block",marginBottom:".25rem"}}>{title}</strong>
                <span style={{fontSize:"11px",color:"#6b7280",lineHeight:1.5}}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related posts */}
        <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Latest Scholarship Guides for Refugees</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Internal links */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📚 Related Guides</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:".5rem"}}>
            {[
              ["Scholarships for Asylum Seekers","/by-eligibility/asylum-seekers"],
              ["Scholarships Without IELTS","/by-eligibility/without-ielts"],
              ["Fully Funded Scholarships","/by-funding/fully-funded"],
              ["Top 10 Refugee Scholarships","/lists/top-10-fully-funded-scholarships-refugees"],
              ["DAAD Scholarships Germany","/universities/daad"],
              ["Oxford Sanctuary Scholarship","/universities/oxford"],
              ["Chevening Scholarship","/universities/chevening"],
              ["Masters Scholarships","/by-level/masters"],
              ["PhD Scholarships","/by-level/phd"],
              ["UK Scholarships","/countries/UK"],
              ["Germany Scholarships","/countries/Germany"],
              ["Scholarship Deadlines 2026","/deadlines"],
            ].map(([label,href])=>(
              <Link key={label} href={href} style={{fontSize:"12px",color:"#0D6E6E",textDecoration:"none",fontWeight:600,padding:".375rem 0",borderBottom:"1px solid #f0faf9",display:"block"}}>→ {label}</Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>❓ Frequently Asked Questions</h2>
          {faqs.map(({q,a},i)=>(
            <div key={i} style={{marginBottom:"1rem",paddingBottom:"1rem",borderBottom:i<faqs.length-1?"1px solid #f0faf9":"none"}}>
              <h3 style={{fontSize:"13px",fontWeight:700,color:"#0A2A2A",marginBottom:".375rem"}}>{q}</h3>
              <p style={{fontSize:"12px",color:"#374151",lineHeight:1.7}}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get free refugee scholarship alerts</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free email alerts when new scholarships open for refugees. Never miss a deadline.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>

        <p style={{fontSize:"11px",color:"#9ca3af",marginTop:"1rem",textAlign:"center"}}>Last Reviewed: August 2026 · Information sourced from official university and government websites.</p>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return text.includes("refugee") || text.includes("asylum") || text.includes("sanctuary");
  }).slice(0, 9);
  return { props: { posts }, revalidate: 3600 };
}
