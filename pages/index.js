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
  UK:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
  Germany:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
  Canada:"https://images.unsplash.com/photo-1560814304-4f05b62af116?w=400&q=80",
  Australia:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
  USA:"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
  Turkey:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80",
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

const trending = [
  ["DAAD Scholarships 2026","Germany","↑"],
  ["Chevening Scholarships 2026","UK","↑"],
  ["Fulbright Program 2026","USA","↑"],
  ["Vanier Canada Scholarships 2026","Canada","↑"],
  ["Türkiye Bursları 2026","Turkey","↑"],
];

export default function Home({ posts, totalCountries }) {
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
        <link rel="canonical" href="https://migrantscholar.vercel.app" />
      </Head>
      <Navbar />

      {/* HERO */}
      <div style={{background:"#F4F7F6",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,#0A2A2A 0%,#0D6E6E 100%)",borderRadius:"14px",padding:"2.5rem 2rem",position:"relative",overflow:"hidden"}}>
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
              <h1 style={{fontSize:"2.5rem",fontWeight:900,color:"#fff",lineHeight:1.15,marginBottom:".75rem",letterSpacing:"-0.02em"}}>Find Your <em style={{fontStyle:"normal",color:"#F5A623"}}>Scholarship</em><br/>As A Migrant!</h1>
              <p style={{fontSize:"14px",color:"rgba(255,255,255,.8)",marginBottom:"1.5rem",lineHeight:1.65,maxWidth:"420px"}}>Verified fully funded awards open to refugees, asylum seekers, and forced migrants. Free to use, updated every single day.</p>
              <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
                <Link href="/blog" style={{background:"#F5A623",color:"#0A2A2A",padding:"10px 22px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse Scholarships</Link>
                <Link href="/alerts" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1.5px solid rgba(255,255,255,.4)",padding:"10px 22px",borderRadius:"6px",fontSize:"13px",fontWeight:600,textDecoration:"none"}}>Get Free Alerts</Link>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:".5rem",marginTop:"1rem"}}>
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
      <div style={{background:"#F4F7F6",padding:"0 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,.08)",borderRadius:"0 0 14px 14px",padding:"1.5rem 2rem"}}>
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

        {/* AI SCHOLARSHIP SUGGESTIONS */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"12px",padding:"1.5rem",marginBottom:"2rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem",flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".25rem"}}>
                <h3 style={{fontSize:"1rem",fontWeight:800,color:"#0A2A2A"}}>AI Scholarship Suggestions</h3>
                <span style={{fontSize:"10px",background:"#E6F4F1",color:"#0D6E6E",padding:"2px 8px",borderRadius:"4px",fontWeight:700}}>BETA</span>
              </div>
              <p style={{fontSize:"12px",color:"#6b7280"}}>Get personalized scholarship recommendations powered by AI based on your profile.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:".75rem",alignItems:"end",marginBottom:"1rem"}}>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem"}}>I am a</label>
              <select value={aiStatus} onChange={e=>setAiStatus(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option value="">Select status</option>
                <option>Refugee</option>
                <option>Asylum Seeker</option>
                <option>Migrant</option>
                <option>International Student</option>
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem"}}>I want to study</label>
              <select value={aiLevel} onChange={e=>setAiLevel(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option value="">Select level</option>
                <option>Bachelor's</option>
                <option>Master's</option>
                <option>PhD</option>
                <option>Postdoctoral</option>
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem"}}>My field of interest</label>
              <select value={aiField} onChange={e=>setAiField(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option value="">Select field</option>
                <option>Engineering</option>
                <option>Medicine</option>
                <option>Business</option>
                <option>Arts & Humanities</option>
                <option>Sciences</option>
                <option>Law</option>
              </select>
            </div>
            <div>
              <label style={{display:"block",fontSize:"10px",fontWeight:600,color:"#6b7280",marginBottom:".25rem"}}>My nationality</label>
              <select value={aiNationality} onChange={e=>setAiNationality(e.target.value)} style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"6px",padding:"8px 10px",fontSize:"12px",color:"#0A2A2A",background:"#fff",outline:"none"}}>
                <option value="">Select nationality</option>
                <option>Any country</option>
                <option>African</option>
                <option>Asian</option>
                <option>Middle Eastern</option>
                <option>European</option>
              </select>
            </div>
            <button onClick={getAiSuggestions} disabled={aiLoading} style={{background:"#0D6E6E",color:"#fff",border:"none",borderRadius:"6px",padding:"9px 16px",fontSize:"12px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{aiLoading ? "Finding..." : "✨ Get AI Suggestions"}</button>
          </div>
          <div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap"}}>
            {[["🎯","Personalized Matches"],["⚡","Saves Time"],["🔓","100% Free"],["🔒","Privacy Protected"]].map(([icon,label])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:".35rem",fontSize:"11px",color:"#6b7280"}}>
                <span style={{color:"#0D6E6E"}}>{icon}</span>{label}
              </div>
            ))}
          </div>
          {aiResults.length > 0 && (
            <div style={{marginTop:"1rem",borderTop:"1px solid #e2f0f0",paddingTop:"1rem"}}>
              <p style={{fontSize:"12px",fontWeight:600,color:"#0A2A2A",marginBottom:".75rem"}}>✨ AI found {aiResults.length} matching scholarships for you:</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem"}}>
                {aiResults.map(post=>(
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#E6F4F1",border:"1.5px solid #A7D4CC",borderRadius:"8px",padding:".875rem",textDecoration:"none",display:"block"}}>
                    <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                    <h4 style={{fontSize:".8rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,margin:".3rem 0"}}>{post.title}</h4>
                    <span style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600}}>View details →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {aiLoading && (
            <div style={{marginTop:"1rem",textAlign:"center",fontSize:"13px",color:"#0D6E6E",fontWeight:600}}>✨ Finding best scholarships for your profile...</div>
          )}
        </div>

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
              <div style={{height:"80px",backgroundImage:`url(${countryPhotos[code]})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
                <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.3)"}}></div>
                <span style={{position:"absolute",bottom:"6px",left:"8px",fontSize:"1.25rem"}}>{flag}</span>
              </div>
              <div style={{padding:".75rem"}}>
                <strong style={{display:"block",fontSize:".75rem",fontWeight:700,color:"#0A2A2A",marginBottom:".2rem"}}>{name}</strong>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{desc}</span>
                <div style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,marginTop:".4rem"}}>→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* BROWSE PANELS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
          {[
            ["🎓","Popular Scholarships",["DAAD Scholarships","Chevening Scholarships","Fulbright Scholarships","Vanier Canada Scholarships","Türkiye Scholarships"],"View all scholarships"],
            ["📚","Browse by Study Level",["Bachelor's","Master's","PhD","Postdoctoral","Diploma","Exchange Programs"],"View all levels"],
            ["🛡️","Browse by Eligibility",["For Refugees","For Asylum Seekers","For Migrants","International Students","Without IELTS","For Women"],"View all eligibility"],
            ["💰","Browse by Funding",["Fully Funded","Partial Funding","Tuition Waiver","Monthly Stipend","Research Grants","Emergency Funding"],"View all funding"],
          ].map(([icon,title,items,cta])=>(
            <div key={title} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".875rem"}}>
                <span style={{fontSize:"1.1rem"}}>{icon}</span>
                <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A"}}>{title}</h3>
              </div>
              <ul style={{listStyle:"none",padding:0,marginBottom:".75rem"}}>
                {items.map(item=>(
                  <li key={item} style={{fontSize:"12px",color:"#374151",padding:".3rem 0",borderBottom:"1px solid #f6f9f8",cursor:"pointer"}} onClick={()=>{setSearch(item);setVisible(6);document.getElementById("results").scrollIntoView({behavior:"smooth"});}}>• {item}</li>
                ))}
              </ul>
              <button onClick={()=>{setSearch("");setVisible(6);document.getElementById("results").scrollIntoView({behavior:"smooth"});}} style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:0}}>{cta} →</button>
            </div>
          ))}
        </div>

        {/* STATS ROW */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
          {[
            ["Upcoming Deadlines", [["DAAD Scholarships","31 Aug 2026"],["Chevening Scholarships","05 Nov 2026"],["Fulbright Program","15 Oct 2026"],["Australia Awards","30 Apr 2026"],["Vanier Scholarships","01 Nov 2026"]]],
            ["Trending Scholarships", trending.map(([name,country])=>[name,country])],
          ].map(([title, items])=>(
            <div key={title} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
              <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>{title}</h3>
              {items.map(([name,meta])=>(
                <div key={name} onClick={()=>{setSearch(name.replace(" 2026","").replace(" Scholarships","").replace(" Program",""));setVisible(6);document.getElementById("results").scrollIntoView({behavior:"smooth"});}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".4rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"11px",cursor:"pointer"}}>
                  <span style={{color:"#0D6E6E",textDecoration:"underline"}}>{name}</span>
                  <span style={{color:"#DC2626",fontWeight:600,flexShrink:0,marginLeft:".5rem"}}>{meta}</span>
                </div>
              ))}
              <button onClick={()=>{document.getElementById("results").scrollIntoView({behavior:"smooth"});}} style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:"0.5rem 0 0",display:"block"}}>View all →</button>
            </div>
          ))}

          {/* Applications Calendar */}
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
            <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>Applications Open Calendar</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".4rem",marginBottom:".75rem"}}>
              {[["Jan","32"],["Feb","28"],["Mar","45"],["Apr","61"],["May","38"],["Jun","27"]].map(([m,n])=>(
                <div key={m} style={{textAlign:"center",background:"#E6F4F1",borderRadius:"6px",padding:".4rem"}}>
                  <strong style={{display:"block",fontSize:".85rem",color:"#0D6E6E"}}>{n}</strong>
                  <span style={{fontSize:"9px",color:"#6b7280"}}>{m}</span>
                </div>
              ))}
            </div>
            <button style={{fontSize:"11px",color:"#0D6E6E",fontWeight:600,background:"none",border:"none",cursor:"pointer",padding:0}}>View full calendar →</button>
          </div>

          {/* Funding Overview */}
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
            <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>Funding Overview</h3>
            {[["£17M+","Total Funding"],["101+","Scholarships"],[`${totalCountries}+`,"Countries"],["400+","Deadlines"]].map(([val,label])=>(
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

        {/* LATEST GUIDES & RESOURCES */}
        <div style={{marginBottom:"2.5rem"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A"}}>Latest Guides & Resources</h2>
            <Link href="/blog" style={{fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>View all guides →</Link>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
            {[
              ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&q=70","How to Write a Winning Motivation Letter","A complete guide with examples and tips."],
              ["https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=200&q=70","Student Visa Guide by Country","Step-by-step visa application guides for international students."],
              ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&q=70","How to Apply for Fully Funded Scholarships","A complete application roadmap for success."],
              ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&q=70","Top 100 Scholarships Without IELTS","Study abroad opportunities without IELTS requirement."],
            ].map(([img,title,desc])=>(
              <Link key={title} href="/blog" style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"flex",gap:".75rem",padding:".875rem",alignItems:"flex-start",color:"inherit"}}>
                <img src={img} alt={title} style={{width:"64px",height:"64px",borderRadius:"6px",objectFit:"cover",flexShrink:0}} />
                <div>
                  <h3 style={{fontSize:".8rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".25rem"}}>{title}</h3>
                  <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.5}}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US + SUCCESS STORIES */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.5rem",marginBottom:"2.5rem"}}>
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem"}}>
            <h3 style={{fontSize:".95rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Why Choose Us?</h3>
            {["100% Verified Opportunities","Updated Daily","Official Sources Only","No Registration Required","Free & Accessible for Everyone"].map(item=>(
              <div key={item} style={{display:"flex",alignItems:"center",gap:".5rem",padding:".4rem 0",fontSize:"12px",color:"#374151"}}>
                <span style={{color:"#0D6E6E",fontWeight:700}}>✓</span>{item}
              </div>
            ))}
            <Link href="/about" style={{display:"inline-block",marginTop:".75rem",fontSize:"12px",color:"#0D6E6E",fontWeight:600,textDecoration:"none"}}>Learn more about us →</Link>
          </div>

          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem"}}>
            <h3 style={{fontSize:".95rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Student Success Stories</h3>
            {[
              ["AK","Ahmed K.","DAAD Scholar","Germany","The platform helped me find the perfect scholarship and change my life."],
              ["FA","Fatima A.","Chevening Scholar","UK","I got into a top UK university with full funding."],
              ["MS","Maria S.","Vanier Scholar","Canada","Grateful for this platform. Everything I needed was in one place."],
            ].map(([initials,name,title,country,quote])=>(
              <div key={name} style={{display:"flex",gap:".75rem",marginBottom:".875rem",paddingBottom:".875rem",borderBottom:"1px solid #f0faf9"}}>
                <div style={{width:"36px",height:"36px",background:"#0D6E6E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"11px",fontWeight:700,flexShrink:0}}>{initials}</div>
                <div>
                  <strong style={{display:"block",fontSize:"12px",color:"#0A2A2A"}}>{name}</strong>
                  <span style={{fontSize:"10px",color:"#0D6E6E"}}>{title} · {country}</span>
                  <p style={{fontSize:"11px",color:"#6b7280",marginTop:".25rem",lineHeight:1.5}}>"{quote}"</p>
                </div>
              </div>
            ))}
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
  return { props: { posts, totalCountries: countries.length }, revalidate: 3600 };
}
