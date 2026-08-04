import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const ADMIN_PASSWORD = "migrant2026";

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  return (
    <div style={{minHeight:"100vh",background:"#0A2A2A",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:"14px",padding:"2.5rem",width:"100%",maxWidth:"400px",textAlign:"center"}}>
        <div style={{width:"60px",height:"60px",background:"#0D6E6E",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",margin:"0 auto 1rem"}}>🌐</div>
        <h1 style={{fontSize:"1.25rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>MigrantScholar Admin</h1>
        <p style={{fontSize:"13px",color:"#6b7280",marginBottom:"1.5rem"}}>Enter your admin password to continue</p>
        <input
          type="password"
          placeholder="Admin password"
          value={pw}
          onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&(pw===ADMIN_PASSWORD?onLogin():setError("Wrong password"))}
          style={{width:"100%",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:"10px 14px",fontSize:"14px",outline:"none",marginBottom:".75rem",boxSizing:"border-box"}}
        />
        {error && <p style={{color:"#DC2626",fontSize:"12px",marginBottom:".5rem"}}>{error}</p>}
        <button
          onClick={()=>pw===ADMIN_PASSWORD?onLogin():setError("Wrong password")}
          style={{width:"100%",background:"#0D6E6E",color:"#fff",border:"none",borderRadius:"8px",padding:"10px",fontSize:"14px",fontWeight:700,cursor:"pointer"}}
        >
          Login →
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_authed")) {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchStats();
  }, [authed]);

  async function fetchStats() {
    setLoading(true);
    try {
      // Fetch GitHub repo data
      const repoRes = await fetch("https://api.github.com/repos/nchimbit/migrantscholar");
      const repoData = await repoRes.json();

      // Fetch latest commits
      const commitsRes = await fetch("https://api.github.com/repos/nchimbit/migrantscholar/commits?per_page=10");
      const commits = await commitsRes.json();

      // Fetch workflow runs
      const runsRes = await fetch("https://api.github.com/repos/nchimbit/migrantscholar/actions/runs?per_page=5");
      const runsData = await runsRes.json();

      // Fetch contents to count posts
      const postsRes = await fetch("https://api.github.com/repos/nchimbit/migrantscholar/contents/content/posts");
      const postsData = await postsRes.json();

      setStats({
        totalPosts: Array.isArray(postsData) ? postsData.length : 0,
        lastUpdated: repoData.updated_at,
        stars: repoData.stargazers_count,
        commits: Array.isArray(commits) ? commits : [],
        runs: runsData.workflow_runs || [],
        repoSize: repoData.size,
      });
    } catch(e) {
      setStats({ error: e.message });
    }
    setLoading(false);
  }

  function handleLogin() {
    sessionStorage.setItem("admin_authed", "1");
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
  }

  async function triggerWorkflow(workflowFile) {
    setActionMsg("Triggering workflow...");
    try {
      const token = prompt("Enter your GitHub Personal Access Token (repo scope):");
      if (!token) { setActionMsg("Cancelled"); return; }
      const res = await fetch(`https://api.github.com/repos/nchimbit/migrantscholar/actions/workflows/${workflowFile}/dispatches`, {
        method: "POST",
        headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ref: "main" })
      });
      if (res.status === 204) setActionMsg("✅ Workflow triggered! Check GitHub Actions.");
      else setActionMsg("❌ Failed. Check your token has repo scope.");
    } catch(e) {
      setActionMsg("❌ Error: " + e.message);
    }
    setTimeout(() => setActionMsg(""), 5000);
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const navStyle = { position:"sticky", top:0, zIndex:100, background:"#0A2A2A", borderBottom:"1px solid rgba(255,255,255,.1)", padding:"0 2rem" };
  const tabStyle = (active) => ({ padding:".875rem 1rem", fontSize:"13px", fontWeight:active?700:500, color:active?"#F5A623":"rgba(255,255,255,.6)", background:"none", border:"none", cursor:"pointer", borderBottom:active?"2px solid #F5A623":"2px solid transparent" });

  const pages = [
    { path:"/", label:"Homepage" },
    { path:"/blog", label:"All Scholarships" },
    { path:"/universities", label:"Universities" },
    { path:"/guides", label:"Guides" },
    { path:"/faq", label:"FAQ" },
    { path:"/glossary", label:"Glossary" },
    { path:"/deadlines", label:"Deadlines" },
    { path:"/alerts", label:"Alerts" },
    { path:"/countries/UK", label:"UK" },
    { path:"/countries/Germany", label:"Germany" },
    { path:"/countries/Canada", label:"Canada" },
    { path:"/countries/Australia", label:"Australia" },
    { path:"/countries/USA", label:"USA" },
    { path:"/countries/Turkey", label:"Turkey" },
    { path:"/by-eligibility/refugees", label:"Refugees Hub" },
    { path:"/by-eligibility/asylum-seekers", label:"Asylum Seekers Hub" },
    { path:"/by-level/masters", label:"Masters Hub" },
    { path:"/by-level/phd", label:"PhD Hub" },
    { path:"/by-funding/fully-funded", label:"Fully Funded Hub" },
    { path:"/universities/harvard", label:"Harvard" },
    { path:"/universities/mit", label:"MIT" },
    { path:"/universities/daad", label:"DAAD" },
    { path:"/universities/oxford", label:"Oxford" },
    { path:"/guides/study-in-germany-free", label:"Study Germany Free" },
    { path:"/guides/f1-visa-guide-migrants", label:"F1 Visa Guide" },
    { path:"/lists/top-10-fully-funded-scholarships-refugees", label:"Top 10 Fully Funded" },
    { path:"/nationality/syrian", label:"Syrian Nationality" },
    { path:"/compare/daad-vs-chevening", label:"DAAD vs Chevening" },
    { path:"/scholarships/uk/masters", label:"UK Masters" },
    { path:"/scholarships/germany/refugees", label:"Germany Refugees" },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard — MigrantScholar</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Top nav */}
      <div style={navStyle}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"52px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <span style={{fontSize:"16px",fontWeight:800,color:"#fff"}}>🌐 MigrantScholar Admin</span>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.4)"}}>migrantscholar.com</span>
          </div>
          <div style={{display:"flex",gap:".5rem"}}>
            <a href="https://migrantscholar.com" target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",padding:"6px 12px",borderRadius:"6px",border:"1px solid rgba(255,255,255,.2)"}}>View Site →</a>
            <button onClick={handleLogout} style={{fontSize:"12px",color:"rgba(255,255,255,.6)",background:"none",border:"1px solid rgba(255,255,255,.2)",borderRadius:"6px",padding:"6px 12px",cursor:"pointer"}}>Logout</button>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{background:"#0A2A2A",padding:"0 2rem",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",gap:"0",overflowX:"auto"}}>
          {[["overview","📊 Overview"],["content","📝 Content"],["automation","🤖 Automation"],["pages","🗂️ Pages"],["seo","🔍 SEO"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={tabStyle(activeTab===tab)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{background:"#F4F7F6",minHeight:"100vh",padding:"2rem"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>

          {/* Action message */}
          {actionMsg && (
            <div style={{background:actionMsg.startsWith("✅")?"#F0FDF4":"#FEF2F2",border:`1px solid ${actionMsg.startsWith("✅")?"#BBF7D0":"#FECACA"}`,borderRadius:"8px",padding:"1rem",marginBottom:"1.5rem",fontSize:"13px",color:actionMsg.startsWith("✅")?"#166534":"#DC2626"}}>
              {actionMsg}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              <h1 style={{fontSize:"1.5rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.5rem"}}>📊 Site Overview</h1>

              {/* Stats grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
                {[
                  ["📝","Blog Posts",loading?"...":stats?.totalPosts||0,"Updated daily","#0D6E6E"],
                  ["🗂️","Total Pages","510+","Live pages","#3730A3"],
                  ["🌍","Countries","6","UK, DE, CA, AU, USA, TR","#166534"],
                  ["🎓","Universities","15","With scholarship pages","#9A3412"],
                  ["🏳️","Nationalities","29","Nationality hub pages","#7E22CE"],
                  ["📅","Automation","Daily","9AM Tanzania time","#0D6E6E"],
                ].map(([icon,label,value,sub,color])=>(
                  <div key={label} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                    <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>{icon}</div>
                    <div style={{fontSize:"1.75rem",fontWeight:800,color}}>{value}</div>
                    <div style={{fontSize:"12px",fontWeight:600,color:"#0A2A2A"}}>{label}</div>
                    <div style={{fontSize:"11px",color:"#6b7280"}}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Status cards */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
                {/* Recent commits */}
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🔄 Recent Commits</h2>
                  {loading ? <p style={{color:"#6b7280",fontSize:"13px"}}>Loading...</p> :
                    stats?.commits?.slice(0,5).map((c,i)=>(
                      <div key={i} style={{padding:".5rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                        <div style={{color:"#0A2A2A",fontWeight:600}}>{c.commit?.message?.slice(0,50)}...</div>
                        <div style={{color:"#6b7280",fontSize:"11px"}}>{new Date(c.commit?.author?.date).toLocaleDateString()}</div>
                      </div>
                    ))
                  }
                </div>

                {/* Workflow runs */}
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🤖 Recent Automation Runs</h2>
                  {loading ? <p style={{color:"#6b7280",fontSize:"13px"}}>Loading...</p> :
                    stats?.runs?.slice(0,5).map((r,i)=>(
                      <div key={i} style={{padding:".5rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{color:"#0A2A2A",fontWeight:600}}>{r.name}</div>
                          <div style={{color:"#6b7280",fontSize:"11px"}}>{new Date(r.created_at).toLocaleDateString()}</div>
                        </div>
                        <span style={{fontSize:"11px",fontWeight:700,color:r.conclusion==="success"?"#166534":"#DC2626",background:r.conclusion==="success"?"#F0FDF4":"#FEF2F2",padding:"2px 8px",borderRadius:"10px"}}>
                          {r.conclusion==="success"?"✅ Success":"❌ Failed"}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Quick links */}
              <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🔗 Quick Links</h2>
                <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
                  {[
                    ["GitHub Repo","https://github.com/nchimbit/migrantscholar","#0A2A2A"],
                    ["Vercel Dashboard","https://vercel.com/ismailnchimbi-5136s-projects/migrantscholar","#0A2A2A"],
                    ["Google Analytics","https://analytics.google.com","#0A2A2A"],
                    ["Search Console","https://search.google.com/search-console","#0A2A2A"],
                    ["AdSense","https://www.google.com/adsense","#0A2A2A"],
                    ["Formspree","https://formspree.io/forms/xvznenzj/submissions","#0A2A2A"],
                    ["Groq Console","https://console.groq.com","#0A2A2A"],
                    ["GitHub Actions","https://github.com/nchimbit/migrantscholar/actions","#0A2A2A"],
                  ].map(([label,href,color])=>(
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"#0D6E6E",background:"#E6F4F1",border:"1px solid #A7D4CC",padding:"6px 14px",borderRadius:"6px",textDecoration:"none",fontWeight:600}}>{label} →</a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === "content" && (
            <div>
              <h1 style={{fontSize:"1.5rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.5rem"}}>📝 Content Management</h1>
              
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
                {/* Content health */}
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🏥 Content Health</h2>
                  {[
                    ["Total Posts","360","✅"],
                    ["Too Short (<600 words)","0","✅"],
                    ["Introduction to issues","0","✅"],
                    ["Duplicate slugs","0","✅"],
                    ["Missing Related Guides","0","✅"],
                    ["Missing Last Reviewed","0","✅"],
                    ["Vercel.app URLs remaining","3","⚠️"],
                  ].map(([label,val,status])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",padding:".4rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                      <span style={{color:"#374151"}}>{label}</span>
                      <span style={{fontWeight:700,color:status==="✅"?"#166534":"#D97706"}}>{status} {val}</span>
                    </div>
                  ))}
                  <div style={{marginTop:".875rem",fontSize:"11px",color:"#6b7280"}}>Last audit: Run Content Audit workflow</div>
                </div>

                {/* Content types */}
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📊 Content Breakdown</h2>
                  {[
                    ["Blog Posts","360","#0D6E6E"],
                    ["Country Pages","6","#3730A3"],
                    ["University Pages","15","#166534"],
                    ["Nationality Pages","29","#9A3412"],
                    ["Eligibility Hubs","5","#7E22CE"],
                    ["Level Hubs","4","#0D6E6E"],
                    ["Funding Hubs","3","#3730A3"],
                    ["Comparison Pages","10","#166534"],
                    ["Study Guides","5","#9A3412"],
                    ["Scholarship Lists","5","#7E22CE"],
                    ["Programmatic Pages","60","#0D6E6E"],
                  ].map(([label,val,color])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",padding:".4rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                      <span style={{color:"#374151"}}>{label}</span>
                      <strong style={{color}}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Run workflows */}
              <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>⚙️ Content Actions</h2>
                <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                  <a href="https://github.com/nchimbit/migrantscholar/actions/workflows/audit-posts.yml" target="_blank" rel="noreferrer" style={{background:"#E6F4F1",color:"#0D6E6E",border:"1px solid #A7D4CC",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>🔍 Run Content Audit</a>
                  <a href="https://github.com/nchimbit/migrantscholar/actions/workflows/fix-posts.yml" target="_blank" rel="noreferrer" style={{background:"#FFF7ED",color:"#D97706",border:"1px solid #FDE68A",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>🔧 Run Fix Posts</a>
                  <a href="https://github.com/nchimbit/migrantscholar/tree/main/content/posts" target="_blank" rel="noreferrer" style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0",padding:"10px 20px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>📁 Browse Posts</a>
                </div>
              </div>
            </div>
          )}

          {/* AUTOMATION TAB */}
          {activeTab === "automation" && (
            <div>
              <h1 style={{fontSize:"1.5rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.5rem"}}>🤖 Automation Control</h1>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📅 Schedule</h2>
                  {[
                    ["Cron time","6:00 AM UTC"],
                    ["Tanzania time","9:00 AM EAT"],
                    ["Posts per run","5 posts"],
                    ["Model","llama-3.3-70b-versatile"],
                    ["Min word count","1,500 words"],
                    ["Duplicate check","✅ Enabled"],
                    ["Internal links","✅ Enabled"],
                    ["Last Reviewed","✅ Added automatically"],
                  ].map(([label,val])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",padding:".4rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                      <span style={{color:"#374151"}}>{label}</span>
                      <strong style={{color:"#0D6E6E"}}>{val}</strong>
                    </div>
                  ))}
                </div>

                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🚀 Manual Controls</h2>
                  <p style={{fontSize:"12px",color:"#6b7280",marginBottom:"1rem"}}>Click to open GitHub Actions and run workflows manually.</p>
                  <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
                    <a href="https://github.com/nchimbit/migrantscholar/actions/workflows/daily-posts.yml" target="_blank" rel="noreferrer" style={{background:"#0D6E6E",color:"#fff",padding:"12px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center",display:"block"}}>🤖 Run Daily Post Generation</a>
                    <a href="https://github.com/nchimbit/migrantscholar/actions/workflows/audit-posts.yml" target="_blank" rel="noreferrer" style={{background:"#3730A3",color:"#fff",padding:"12px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center",display:"block"}}>🔍 Run Content Audit</a>
                    <a href="https://github.com/nchimbit/migrantscholar/actions/workflows/fix-posts.yml" target="_blank" rel="noreferrer" style={{background:"#D97706",color:"#fff",padding:"12px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center",display:"block"}}>🔧 Run Fix Old Posts</a>
                    <a href="https://github.com/nchimbit/migrantscholar/actions" target="_blank" rel="noreferrer" style={{background:"#166534",color:"#fff",padding:"12px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center",display:"block"}}>📋 View All Workflow Runs</a>
                  </div>
                </div>
              </div>

              {/* Recent runs */}
              <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📊 Recent Workflow Runs</h2>
                {loading ? <p style={{color:"#6b7280",fontSize:"13px"}}>Loading...</p> :
                  stats?.runs?.map((r,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".625rem 0",borderBottom:"1px solid #f6f9f8"}}>
                      <div>
                        <div style={{fontSize:"13px",fontWeight:600,color:"#0A2A2A"}}>{r.name} #{r.run_number}</div>
                        <div style={{fontSize:"11px",color:"#6b7280"}}>{r.event} · {new Date(r.created_at).toLocaleString()}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
                        <span style={{fontSize:"12px",color:r.conclusion==="success"?"#166534":"#DC2626",background:r.conclusion==="success"?"#F0FDF4":"#FEF2F2",padding:"3px 10px",borderRadius:"20px",fontWeight:700}}>
                          {r.conclusion==="success"?"✅ Success":r.conclusion==="failure"?"❌ Failed":"⏳ Running"}
                        </span>
                        <a href={r.html_url} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none",fontWeight:600}}>View →</a>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* PAGES TAB */}
          {activeTab === "pages" && (
            <div>
              <h1 style={{fontSize:"1.5rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.5rem"}}>🗂️ All Pages ({pages.length}+ shown)</h1>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:".75rem"}}>
                {pages.map(({path,label})=>(
                  <div key={path} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"8px",padding:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:"13px",fontWeight:600,color:"#0A2A2A"}}>{label}</div>
                      <div style={{fontSize:"11px",color:"#6b7280"}}>{path}</div>
                    </div>
                    <a href={`https://migrantscholar.com${path}`} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none",fontWeight:700,flexShrink:0}}>View →</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === "seo" && (
            <div>
              <h1 style={{fontSize:"1.5rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1.5rem"}}>🔍 SEO Status</h1>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>✅ SEO Checklist</h2>
                  {[
                    ["Sitemap submitted","✅"],
                    ["robots.txt","✅"],
                    ["FAQPage schema","✅"],
                    ["BreadcrumbList schema","✅"],
                    ["Article schema","✅"],
                    ["HowTo schema","✅"],
                    ["Speakable schema","✅"],
                    ["Open Graph tags","✅"],
                    ["Twitter Card tags","✅"],
                    ["Canonical URLs","✅"],
                    ["Google Analytics","✅"],
                    ["Search Console","✅"],
                    ["AdSense","⏳ Pending review"],
                    ["Google News","❌ Not applied"],
                    ["Core Web Vitals","⚠️ Not measured"],
                  ].map(([label,status])=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",padding:".35rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"12px"}}>
                      <span style={{color:"#374151"}}>{label}</span>
                      <span style={{fontWeight:600,color:status==="✅"?"#166534":status==="⏳ Pending review"?"#D97706":"#DC2626"}}>{status}</span>
                    </div>
                  ))}
                </div>

                <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>🎯 SEO Quick Actions</h2>
                  <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
                    <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" style={{background:"#E6F4F1",color:"#0D6E6E",border:"1px solid #A7D4CC",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>📊 Google Search Console</a>
                    <a href="https://analytics.google.com" target="_blank" rel="noreferrer" style={{background:"#E6F4F1",color:"#0D6E6E",border:"1px solid #A7D4CC",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>📈 Google Analytics</a>
                    <a href="https://migrantscholar.com/sitemap.xml" target="_blank" rel="noreferrer" style={{background:"#E6F4F1",color:"#0D6E6E",border:"1px solid #A7D4CC",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>🗺️ View Sitemap</a>
                    <a href="https://www.google.com/adsense" target="_blank" rel="noreferrer" style={{background:"#FFF7ED",color:"#D97706",border:"1px solid #FDE68A",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>💰 AdSense Dashboard</a>
                    <a href="https://pagespeed.web.dev/report?url=https://migrantscholar.com" target="_blank" rel="noreferrer" style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>⚡ PageSpeed Insights</a>
                    <a href="https://search.google.com/test/rich-results?url=https://migrantscholar.com" target="_blank" rel="noreferrer" style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0",padding:"10px 16px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"block",textAlign:"center"}}>🔬 Rich Results Test</a>
                  </div>
                </div>
              </div>

              {/* Content stats */}
              <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>📊 Site Architecture</h2>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"1rem"}}>
                  {[
                    ["510+","Total Pages"],
                    ["360","Blog Posts"],
                    ["60","Programmatic Pages"],
                    ["29","Nationality Pages"],
                    ["15","University Pages"],
                    ["10","Comparison Pages"],
                    ["5","Study Guides"],
                    ["5","Scholarship Lists"],
                  ].map(([val,label])=>(
                    <div key={label} style={{textAlign:"center",background:"#E6F4F1",borderRadius:"8px",padding:"1rem"}}>
                      <strong style={{display:"block",fontSize:"1.5rem",color:"#0D6E6E"}}>{val}</strong>
                      <span style={{fontSize:"11px",color:"#6b7280"}}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
