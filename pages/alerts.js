import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";

const FORMSPREE_URL = "https://formspree.io/f/xvznenzj";

export default function Alerts() {
  const [form, setForm] = useState({ name:"", email:"", countries:[], types:[], status:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const toggleArr = (key, val) => {
    setForm(f => ({...f, [key]: f[key].includes(val) ? f[key].filter(x=>x!==val) : [...f[key], val]}));
  };

  const countries = [["🇬🇧","United Kingdom","UK"],["🇩🇪","Germany","Germany"],["🇨🇦","Canada","Canada"],["🇦🇺","Australia","Australia"],["🇺🇸","USA","USA"],["🇹🇷","Turkey","Turkey"]];
  const types = [["⭐","Fully Funded"],["🎓","Undergraduate"],["📚","Master's"],["🔬","PhD"],["🛡️","Refugee Specific"],["💰","Partially Funded"]];

  const inp = {width:"100%",background:"#E6F4F1",border:"1px solid #A7D4CC",borderRadius:"6px",padding:"9px 12px",fontSize:"13px",color:"#0A2A2A",outline:"none",fontFamily:"inherit",marginBottom:".75rem"};
  const lbl = {display:"block",fontSize:"11px",fontWeight:700,color:"#0A2A2A",marginBottom:".3rem"};

  async function handleSubmit() {
    if (!form.email) { setError("Please enter your email address"); return; }
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          countries: form.countries.join(", "),
          scholarship_types: form.types.join(", "),
          immigration_status: form.status,
          source: "MigrantScholar Alerts Page",
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Head>
        <title>Get Free Scholarship Alerts — MigrantScholar</title>
        <meta name="description" content="Subscribe to free scholarship alerts for migrants, refugees, and asylum seekers. Get notified the moment new awards open." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/alerts" />
      </Head>
      <Navbar />

      {/* Hero */}
      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>100% Free · No Spam</div>
        <h1 style={{fontSize:"1.85rem",fontWeight:900,color:"#fff",lineHeight:1.25,marginBottom:".75rem",letterSpacing:"-0.02em"}}>
          Never Miss a <span style={{color:"#F5A623"}}>Scholarship Deadline</span> Again
        </h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"520px",margin:"0 auto",lineHeight:1.7}}>Get free email alerts the moment new scholarships open for migrants, refugees, and asylum seekers — delivered straight to your inbox.</p>
        </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>

        {/* Benefits */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2rem"}}>
          {[["⚡","Instant alerts","Be first to know when new scholarships open — before deadlines fill up."],["🎯","Personalised","Choose your countries and scholarship types — only get alerts that matter to you."],["🔓","Always free","No cost, no subscription fee, no credit card. Unsubscribe anytime with one click."]].map(([icon,title,desc])=>(
            <div key={title} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",textAlign:"center"}}>
              <div style={{width:"44px",height:"44px",background:"#E6F4F1",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto .6rem",fontSize:"20px"}}>{icon}</div>
              <h3 style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",marginBottom:".3rem"}}>{title}</h3>
              <p style={{fontSize:"12px",color:"#6b7280",lineHeight:1.6}}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Form or success */}
        {sent ? (
          <div style={{background:"#0D6E6E",borderRadius:"10px",padding:"3rem",textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:".75rem"}}>🎉</div>
            <h2 style={{fontSize:"1.2rem",fontWeight:800,color:"#fff",marginBottom:".5rem"}}>You're subscribed!</h2>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",marginBottom:".5rem"}}>Thank you! We'll send you scholarship alerts as soon as new awards open.</p>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.6)",marginBottom:"1.5rem"}}>Check your inbox to confirm your subscription.</p>
            <Link href="/blog" style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse Scholarships →</Link>
          </div>
        ) : (
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.75rem",marginBottom:"1.5rem"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#F5A623",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Subscribe to Alerts</div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:"1.25rem"}}>Set up your free scholarship alerts</h2>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              <div>
                <label style={lbl}>First name</label>
                <input style={inp} type="text" placeholder="Your first name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              </div>
              <div>
                <label style={lbl}>Email address *</label>
                <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              </div>
            </div>

            <label style={lbl}>Which countries are you interested in?</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:".75rem"}}>
              {countries.map(([flag,label,val])=>(
                <label key={val} style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:"12px",color:"#374151",cursor:"pointer",padding:".5rem .75rem",borderRadius:"6px",background:form.countries.includes(val)?"#E6F4F1":"#f9fafb",border:`1px solid ${form.countries.includes(val)?"#0D6E6E":"#e5e7eb"}`}}>
                  <input type="checkbox" checked={form.countries.includes(val)} onChange={()=>toggleArr("countries",val)} style={{accentColor:"#0D6E6E",width:"14px",height:"14px"}} />
                  {flag} {label}
                </label>
              ))}
            </div>

            <label style={lbl}>What scholarship types interest you?</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:".75rem"}}>
              {types.map(([icon,label])=>(
                <label key={label} style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:"12px",color:"#374151",cursor:"pointer",padding:".5rem .75rem",borderRadius:"6px",background:form.types.includes(label)?"#E6F4F1":"#f9fafb",border:`1px solid ${form.types.includes(label)?"#0D6E6E":"#e5e7eb"}`}}>
                  <input type="checkbox" checked={form.types.includes(label)} onChange={()=>toggleArr("types",label)} style={{accentColor:"#0D6E6E",width:"14px",height:"14px"}} />
                  {icon} {label}
                </label>
              ))}
            </div>

            <label style={lbl}>Your immigration status (optional)</label>
            <select style={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="">Select your status</option>
              <option>Asylum seeker</option>
              <option>Refugee with documentation</option>
              <option>Humanitarian protection</option>
              <option>Forced migrant</option>
              <option>EU settled/pre-settled status</option>
              <option>Other migrant status</option>
              <option>Prefer not to say</option>
            </select>

            {error && <p style={{fontSize:"12px",color:"#A32D2D",marginBottom:".75rem"}}>{error}</p>}

            <button onClick={handleSubmit} disabled={sending}
              style={{background: sending ? "#FAC775" : "#F5A623",color:"#0A2A2A",border:"none",padding:"11px 28px",borderRadius:"6px",fontSize:"13px",fontWeight:700,cursor: sending ? "default" : "pointer",width:"100%"}}>
              {sending ? "Submitting..." : "Get My Free Alerts →"}
            </button>
            <p style={{fontSize:"10px",color:"#9ca3af",textAlign:"center",marginTop:".5rem"}}>No spam. Unsubscribe anytime. We never share your email.</p>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}
