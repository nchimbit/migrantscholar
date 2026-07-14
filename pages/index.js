import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";
import { getAllPosts, getAllCountries, formatDate } from "../lib/posts";

const countryColors = {
  UK:{bg:"#0D6E6E"}, Germany:{bg:"#3730A3"}, Canada:{bg:"#9A3412"},
  Australia:{bg:"#166534"}, USA:{bg:"#7E22CE"}, Turkey:{bg:"#92400E"},
};

const countryPhotos = {
  UK:"https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?w=400&h=200&fit=crop",
  Germany:"https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?w=400&h=200&fit=crop",
  Canada:"https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?w=400&h=200&fit=crop",
  Australia:"https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?w=400&h=200&fit=crop",
  USA:"https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?w=400&h=200&fit=crop",
  Turkey:"https://images.pexels.com/photos/2042106/pexels-photo-2042106.jpeg?w=400&h=200&fit=crop",
};

const countries = [
  ["🇬🇧","United Kingdom","Sanctuary Scholarships · £17k+","UK"],
  ["🇩🇪","Germany","DAAD · Fully Funded","Germany"],
  ["🇨🇦","Canada","Vanier · $50,000/yr","Canada"],
  ["🇦🇺","Australia","Australia Awards · Full funding","Australia"],
  ["🇺🇸","USA","Fulbright · Graduate awards","USA"],
  ["🇹🇷","Turkey","Türkiye Bursları · 180+ countries","Turkey"],
];

const faqs = [
  ["How can migrants or refugees get scholarships?","Most universities and governments offer specific scholarships for migrants, refugees and asylum seekers. MigrantScholar lists verified opportunities with eligibility requirements in plain language so you can find what applies to your situation."],
  ["Which countries offer fully funded scholarships?","The UK, Germany, Canada, Australia, USA and Turkey all offer fully funded scholarships specifically for migrants and refugees. Our guides cover all six countries with detailed eligibility and application steps."],
  ["Can I study abroad without IELTS?","Yes — many scholarships for refugees and asylum seekers waive English language test requirements, especially if you have studied in English before. Each guide specifies exact language requirements."],
  ["What documents are required to apply?","Typically: passport or travel document, proof of refugee/asylum status, academic transcripts, personal statement, and reference letters. Each scholarship has specific requirements listed in our guides."],
  ["How can I increase my chances of winning a scholarship?","Apply early, tailor your personal statement to the specific scholarship, demonstrate community impact, and apply to multiple scholarships simultaneously. Our guides include application tips for each award."],
  ["Are these scholarships really free?","Yes — MigrantScholar is completely free to use. We never charge for access to scholarship information, and all scholarships listed are free to apply for through the official application pages."],
];

export default function Home({ posts, totalCountries, trending }) {
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("All Countries");
  const [filterLevel, setFilterLevel] = useState("All Levels");
  const [filterFunding, setFilterFunding] = useState("All Types");
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState(6);
  const [aiStatus, setAiStatus] = useState("");
  const [aiLevel, setAiLevel] = useState("");
  const [aiField, setAiField] = useState("");
  const [aiNationality, setAiNationality] = useState("");
  const [aiResults, setAiResults] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  async function getAiSuggestions() {
    if (!aiStatus) return;
    setAiLoading(true);
    setAiResults([]);
    try {
      const query = `${aiStatus} looking to study ${aiLevel || "any level"} in ${aiField || "any field"} from ${aiNationality || "any country"}`;
      const matched = posts.filter(p => {
        const text = (p.title + " " + p.excerpt).toLowerCase();
        const levelMatch = !aiLevel || text.includes(aiLevel.toLowerCase().replace("'s","s"));
        const fieldMatch = !aiField || text.includes(aiField.toLowerCase());
        const statusMatch = text.includes(aiStatus.toLowerCase()) || text.includes("migrant") || text.includes("refugee") || text.includes("asylum");
        return statusMatch || levelMatch;
      }).slice(0, 3);
      setAiResults(matched);
    } catch(e) {
      setAiResults([]);
    } finally {
      setAiLoading(false);
    }
  }

  const filtered = posts.filter(p => {
    const matchCountry = filterCountry === "All Countries" || p.country === filterCountry;
    const matchLevel = filterLevel === "All Levels" || (p.type && p.type.toLowerCase().includes(filterLevel.toLowerCase())) || (p.title && p.title.toLowerCase().includes(filterLevel.toLowerCase()));
    const matchFunding = filterFunding === "All Types" || (p.type && p.type.toLowerCase().includes(filterFunding.toLowerCase())) || (p.title && p.title.toLowerCase().includes(filterFunding.toLowerCase()));
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()) || (p.country && p.country.toLowerCase().includes(search.toLowerCase()));
    return matchCountry && matchLevel && matchFunding && matchSearch;
  });

  const showing = filtered.slice(0, visible);

  return (
    <>
      <Head>
        <title>MigrantScholar — Free Scholarships for Migrants and Refugees</title>
        <meta name="description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers. Updated daily across UK, Germany, Canada, Australia, USA and Turkey." />
        <meta property="og:title" content="MigrantScholar — Free Scholarships for Migrants and Refugees" />
        <meta property="og:description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers. Updated daily." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://migrantscholar.vercel.app" />
        <meta property="og:image" content="https://migrantscholar.vercel.app/og-image.png" />
        <meta property="og:site_name" content="MigrantScholar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MigrantScholar — Free Scholarships for Migrants and Refugees" />
        <meta name="twitter:description" content="Find verified fully funded scholarships for migrants, refugees, and asylum seekers. Updated daily." />
        <meta name="twitter:image" content="https://migrantscholar.vercel.app/og-image.png" />
        <link rel="canonical" href="https://migrantscholar.vercel.app" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebSite",
          "name":"MigrantScholar",
          "url":"https://migrantscholar.vercel.app",
          "description":"Free verified scholarships for migrants, refugees, asylum seekers and international students. Updated daily.",
          "potentialAction":{"@type":"SearchAction","target":"https://migrantscholar.vercel.app/blog?search={search_term_string}","query-input":"required name=search_term_string"},
          "speakable":{"@type":"SpeakableSpecification","cssSelector":["h1","h2",".hero-description"]}
        })}} />
      </Head>
      <Navbar />

      {/* HERO */}
      <div style={{background:"#F4F7F6",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,#0A2A2A 0%,#0D6E6E 100%)",borderRadius:"14px",padding:".4rem .75rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,bottom:0,left:0,opacity:.15,borderRadius:"14px",overflow:"hidden"}}>
          <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
            {/* World map dots pattern */}
            {[...Array(40)].map((_,i)=>[...Array(80)].map((_,j)=>(
              <circle key={`${i}-${j}`} cx={j*15+7} cy={i*10+5} r="1.2" fill="#fff" opacity={Math.random()>0.65?"0.8":"0"} />
            )))}
          </svg>
        </div>
        {/* Airplane */}
        <div style={{position:"absolute",top:"1.5rem",right:"2rem",fontSize:"2rem",opacity:.4,transform:"rotate(45deg)"}}>✈</div>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:"300px"}}>
              <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Updated Daily · 2026</div>
              <h1 style={{fontSize:"1.4rem",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:".35rem",letterSpacing:"-0.02em"}}>Find Your <em style={{fontStyle:"normal",color:"#F5A623"}}>Scholarship</em><br/>As A Migrant!</h1>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",marginBottom:".5rem",lineHeight:1.4,maxWidth:"420px"}}>Verified fully funded awards open to refugees, asylum seekers, and forced migrants. Free to use, updated every single day.</p>
              <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
                <Link href="/blog" style={{background:"#F5A623",color:"#0A2A2A",padding:"8px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none",flex:"1",textAlign:"center"}}>Browse Scholarships</Link>
                <Link href="/alerts" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",padding:"8px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:600,textDecoration:"none",flex:"1",textAlign:"center"}}>Get Free Alerts</Link>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"nowrap",gap:".3rem",marginTop:".4rem",overflowX:"auto"}}>
              {[["🏛","70+","Universities"],["🎓",`${posts.length}+`,"Scholarships"],["🏆","£17k+","Top Award"],["🌐",`${totalCountries}+`,"Countries"],["🎁","Free","Always"]].map(([icon,val,label])=>(
                <div key={label} style={{textAlign:"center",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"8px",padding:".5rem .75rem",flex:"1 1 80px"}}>
                  <div style={{fontSize:"1rem",marginBottom:".15rem"}}>{icon}</div>
                  <strong style={{display:"block",fontSize:"1rem",fontWeight:800,color:"#fff"}}>{val}</strong>
                  <span style={{fontSize:"9px",color:"rgba(255,255,255,.65)",textTransform:"uppercase",letterSpacing:".05em"}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{background:"#E6F4F1",padding:"0 1rem 1rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,.08)",borderRadius:"12px",padding:"1.25rem"}}>
          <h2 style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>Find Scholarships</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:".75rem",alignItems:"end"}}>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem",textTransform:"uppercase"}}>Country</label>
              <select value={filterCountry} onChange={e=>{setFilterCountry(e.target.value);setVisible(6);}} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option>All Countries</option>
                {["UK","Germany","Canada","Australia","USA","Turkey"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem",textTransform:"uppercase"}}>Study Level</label>
              <select value={filterLevel} onChange={e=>setFilterLevel(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option>All Levels</option>
                {["Bachelor's","Master's","PhD","Postdoctoral","Diploma"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem",textTransform:"uppercase"}}>Funding Type</label>
              <select value={filterFunding} onChange={e=>setFilterFunding(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option>All Types</option>
                {["Fully Funded","Partially Funded","Tuition Waiver","Monthly Stipend"].map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem",textTransform:"uppercase"}}>Keyword</label>
              <input type="text" placeholder="e.g. DAAD, Chevening..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",outline:"none"}} />
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem",textTransform:"uppercase"}}>Nationality</label>
              <select style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option>All Nationalities</option>
                <option>Any country</option>
              </select>
            </div>
            <button onClick={()=>{setVisible(6); document.getElementById("results").scrollIntoView({behavior:"smooth"});}} style={{background:"#0D6E6E",color:"#fff",border:"none",borderRadius:"6px",padding:"9px 20px",fontSize:"12px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>🔍 Search</button>
          </div>
          <div style={{marginTop:".75rem",display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:"11px",color:"#9ca3af"}}>Popular:</span>
            {["Fully Funded","No IELTS","For Refugees","Master's","PhD","2026 Intake"].map(tag=>(
              <button key={tag} onClick={()=>setSearch(tag)} style={{fontSize:"11px",color:"#0D6E6E",background:"#E6F4F1",border:"none",borderRadius:"20px",padding:"3px 10px",cursor:"pointer"}}>{tag}</button>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>

        {/* COUNTRIES */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
          <div>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".4rem",textTransform:"uppercase",letterSpacing:".08em"}}>Browse by Country</div>
            <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>Countries We Cover</h2>
          </div>
          <Link href="/blog" style={{fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>View all countries →</Link>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
          {countries.map(([flag,name,desc,code])=>(
            <Link key={code} href={`/countries/${code}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block"}}>
              <div style={{height:"90px",backgroundImage:`url(${countryPhotos[code]})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)"}}></div>
                <span style={{position:"absolute",bottom:"6px",left:"8px",fontSize:"1.5rem"}}>{flag}</span>
              </div>
              <div style={{padding:".75rem"}}>
                <strong style={{display:"block",fontSize:".75rem",fontWeight:700,color:"#0A2A2A",marginBottom:".2rem"}}>{name}</strong>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{desc}</span>
                <div style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,marginTop:".4rem"}}>→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS ROW */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
          {/* Top Scholarships - static well-known awards */}
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
            <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>🏆 Top Scholarships</h3>
            {[
              ["Chevening Scholarship","UK","£18,000/yr","/universities/chevening"],
              ["DAAD Scholarship","Germany","€934/month","/universities/daad"],
              ["Vanier Scholarship","Canada","$50,000/yr","/universities/vanier"],
              ["Australia Awards","Australia","Full funding","/universities/australia-awards"],
              ["Türkiye Bursları","Turkey","Full funding","/universities/turkiye-burslari"],
              ["Fulbright Program","USA","Full funding","/universities/fulbright"],
            ].map(([name,country,amount,href])=>(
              <Link key={name} href={href} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".4rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"11px",textDecoration:"none"}}>
                <span style={{color:"#0A2A2A",fontWeight:600,flex:1}}>{name}</span>
                <div style={{display:"flex",gap:".35rem",alignItems:"center",flexShrink:0}}>
                  <span style={{fontSize:"9px",color:"#166534",background:"#F0FDF4",padding:"1px 6px",borderRadius:"10px",fontWeight:600}}>{amount}</span>
                  <span style={{fontSize:"9px",color:"#0D6E6E",fontWeight:700}}>{country}</span>
                </div>
              </Link>
            ))}
            <Link href="/universities" style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,textDecoration:"none",display:"block",marginTop:".5rem"}}>View all universities →</Link>
          </div>
          {/* Funding Overview - real data */}
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
            <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>Funding Overview</h3>
            {[[`${posts.length}+`,"Scholarships"],[`${totalCountries}+`,"Countries"],["6","Study Levels"],["Daily","New Posts"]].map(([val,label])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",padding:".35rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                <span style={{color:"#6b7280"}}>{label}</span>
                <strong style={{color:"#0D6E6E"}}>{val}</strong>
              </div>
            ))}
            <div style={{fontSize:"10px",color:"#9ca3af",marginTop:".5rem"}}>Updated Daily</div>
          </div>
        </div>

        {/* LATEST SCHOLARSHIPS */}
        <div id="results" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
          <div>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".4rem",textTransform:"uppercase",letterSpacing:".08em"}}>Latest Scholarships</div>
            <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>Today's Scholarship Opportunities</h2>
          </div>
          <Link href="/blog" style={{fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>View all scholarships →</Link>
        </div>
        {(filterCountry !== "All Countries" || filterLevel !== "All Levels" || filterFunding !== "All Types" || search) && (
          <div style={{background:"#E6F4F1",border:"1px solid #A7D4CC",borderRadius:"8px",padding:".75rem 1rem",marginBottom:"1rem",fontSize:"13px",color:"#0D6E6E",fontWeight:600}}>
            ✓ Showing {filtered.length} scholarships matching your search
            <button onClick={()=>{setSearch("");setFilterCountry("All Countries");setFilterLevel("All Levels");setFilterFunding("All Types");}} style={{marginLeft:"1rem",fontSize:"11px",color:"#6b7280",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Clear filters</button>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"1.5rem"}}>
          {showing.map(post=>{
            const c = countryColors[post.country]||{bg:"#0D6E6E"};
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
                <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",padding:"2px 8px",borderRadius:"4px",textTransform:"uppercase"}}>{post.country}</span>
                  <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
                </div>
                <div style={{padding:"1rem"}}>
                  <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                  <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #f0faf9",paddingTop:".625rem"}}>
                    <span style={{fontSize:"10px",color:"#9ca3af"}}>{formatDate(post.date)}</span>
                    <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>View Details →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {filtered.length > visible && (
          <div style={{textAlign:"center",marginBottom:"2rem"}}>
            <button onClick={()=>setVisible(v=>v+6)} style={{background:"#fff",border:"1.5px solid #0D6E6E",borderRadius:"8px",padding:".75rem 2rem",fontSize:"13px",color:"#0D6E6E",fontWeight:700,cursor:"pointer"}}>
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}

        {/* WHY CHOOSE US + SUCCESS STORIES */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",marginBottom:"2.5rem"}}>
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem"}}>
            <h3 style={{fontSize:".95rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Why Choose Us?</h3>
            {["100% Verified Opportunities","Updated Daily","Official Sources Only","No Registration Required","Free & Accessible for Everyone"].map(item=>(
              <div key={item} style={{display:"flex",alignItems:"center",gap:".5rem",padding:".4rem 0",fontSize:"12px",color:"#374151"}}>
                <span style={{color:"#0D6E6E",fontWeight:700}}>✓</span>{item}
              </div>
            ))}
            <Link href="/about" style={{display:"inline-block",marginTop:".75rem",fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>Learn more about us →</Link>
          </div>



          <div style={{background:"#0D6E6E",borderRadius:"10px",padding:"1.5rem"}}>
            <h3 style={{fontSize:".95rem",fontWeight:800,color:"#fff",marginBottom:".5rem"}}>Stay Updated</h3>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.8)",marginBottom:"1rem",lineHeight:1.55}}>Get the latest scholarships and deadlines in your inbox.</p>
            <Link href="/alerts" style={{display:"block",background:"#F5A623",color:"#0A2A2A",textAlign:"center",padding:"10px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",marginBottom:"1rem"}}>Get Free Alerts →</Link>
            <p style={{fontSize:"10px",color:"rgba(255,255,255,.6)",textAlign:"center"}}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{marginBottom:"2.5rem"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
            <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>Frequently Asked Questions</h2>
            <Link href="/blog" style={{fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>View all FAQs →</Link>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:".75rem"}}>
            {faqs.map(([q,a],i)=>(
              <div key={i} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",textAlign:"left",padding:"1rem 1.25rem",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
                  <span style={{fontSize:"13px",fontWeight:600,color:"#0A2A2A"}}>{q}</span>
                  <span style={{color:"#0D6E6E",fontWeight:700,flexShrink:0}}>{openFaq===i?"−":"+"}</span>
                </button>
                {openFaq===i && (
                  <div style={{padding:"0 1.25rem 1rem",fontSize:"12px",color:"#374151",lineHeight:1.7}}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA BANNER */}
      <div style={{background:"#F4F7F6",padding:"0 2rem 1.5rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
            <div>
              <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>NEVER MISS A DEADLINE AGAIN!</h2>
              <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new scholarships open for migrants, refugees, and asylum seekers.</p>
            </div>
            <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>GET FREE ALERTS</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const countries = getAllCountries();
  // Get trending = most recent post per country
  const seen = {};
  const trending = posts.filter(p => {
    if (!seen[p.country]) { seen[p.country] = true; return true; }
    return false;
  }).slice(0, 5);
  return { props: { posts, totalCountries: countries.length, trending }, revalidate: 3600 };
}
