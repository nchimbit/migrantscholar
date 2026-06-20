import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";

export default function Alerts() {
  const [form, setForm] = useState({ name:"", email:"", countries:[], types:[], status:"" });
  const [sent, setSent] = useState(false);

  const toggleArr = (key, val) => {
    setForm(f => ({...f, [key]: f[key].includes(val) ? f[key].filter(x=>x!==val) : [...f[key], val]}));
  };

  const countries = [["🇬🇧","United Kingdom","UK"],["🇩🇪","Germany","Germany"],["🇨🇦","Canada","Canada"],["🇦🇺","Australia","Australia"],["🇺🇸","USA","USA"],["🇹🇷","Turkey","Turkey"]];
  const types = [["⭐","Fully Funded"],["🎓","Undergraduate"],["📚","Master's"],["🔬","PhD"],["🛡️","Refugee Specific"],["💰","Partially Funded"]];

  const box = {background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"10px",padding:"1.75rem",marginBottom:"1rem"};
  const inp = {width:"100%",background:"#E6F4F1",border:"0.5px solid #A7D4CC",borderRadius:"6px",padding:"9px 12px",fontSize:"13px",color:"#0A2A2A",outline:"none",fontFamily:"inherit",marginBottom:".75rem"};
  const lbl = {display:"block",fontSize:"11px",fontWeight:600,color:"#0A2A2A",marginBottom:".3rem"};

  return (
    <>
      <Head>
        <title>Get Free Scholarship Alerts — MigrantScholar</title>
        <meta name="description" content="Subscribe to free scholarship alerts for migrants, refugees, and asylum seekers. Get notified the moment new awards open." />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Breadcrumb */}
          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".5rem 1rem",marginBottom:"1rem",fontSize:"11px",color:"#A7D4CC",display:"flex",alignItems:"center",gap:".35rem"}}>
            <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link>
            <span>›</span><span>Get Free Alerts</span>
          </div>

          {/* Hero */}
          <div style={{background:"#0D6E6E",borderRadius:"10px",padding:"2rem",textAlign:"center",marginBottom:"1rem"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"10px",padding:"2px 10px",borderRadius:"20px",marginBottom:".75rem",fontWeight:700}}>100% Free · No spam</div>
            <h1 style={{fontSize:"1.4rem",fontWeight:700,color:"#fff",marginBottom:".5rem",lineHeight:1.3}}>
              Never Miss a <em style={{fontStyle:"normal",color:"#F5A623"}}>Scholarship Deadline</em> Again
            </h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.75)",maxWidth:"480px",margin:"0 auto"}}>Get free email alerts the moment new scholarships open for migrants, refugees, and asylum seekers — delivered straight to your inbox.</p>
          </div>

          {/* Benefits */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".75rem",marginBottom:"1rem"}}>
            {[["⚡","Instant alerts","Be first to know when new scholarships open — before deadlines fill up."],["🎯","Personalised","Choose your countries and scholarship types — only get alerts that matter to you."],["🔓","Always free","No cost, no subscription fee, no credit card. Unsubscribe anytime with one click."]].map(([icon,title,desc])=>(
              <div key={title} style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:"1rem",textAlign:"center"}}>
                <div style={{width:"40px",height:"40px",background:"#E6F4F1",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto .6rem",fontSize:"20px"}}>{icon}</div>
                <h3 style={{fontSize:"12px",fontWeight:700,color:"#0A2A2A",marginBottom:".3rem"}}>{title}</h3>
                <p style={{fontSize:"11px",color:"#64748b",lineHeight:1.55}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Form or Success */}
          {sent ? (
            <div style={{background:"#E6F4F1",border:"0.5px solid #A7D4CC",borderRadius:"10px",padding:"3rem",textAlign:"center",marginBottom:"1rem"}}>
              <div style={{fontSize:"3rem",marginBottom:".75rem"}}>🎉</div>
              <h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#0D6E6E",marginBottom:".5rem"}}>You're subscribed!</h2>
              <p style={{fontSize:"13px",color:"#374151",marginBottom:".5rem"}}>Thank you! We'll send you scholarship alerts as soon as new awards open.</p>
              <p style={{fontSize:"12px",color:"#A7D4CC",marginBottom:"1.5rem"}}>Check your inbox for a confirmation email.</p>
              <Link href="/blog" style={{display:"inline-block",background:"#0D6E6E",color:"#fff",padding:"9px 22px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>Browse Scholarships →</Link>
            </div>
          ) : (
            <div style={box}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Subscribe to alerts</div>
              <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1.25rem"}}>Set up your free scholarship alerts</h2>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem",marginBottom:".75rem"}}>
                <div>
                  <label style={lbl}>First name</label>
                  <input style={inp} type="text" placeholder="Your first name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                </div>
                <div>
                  <label style={lbl}>Email address</label>
                  <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
              </div>

              <label style={lbl}>Which countries are you interested in?</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".4rem",marginBottom:".75rem"}}>
                {countries.map(([flag,label,val])=>(
                  <label key={val} style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:"12px",color:"#374151",cursor:"pointer",padding:".4rem .6rem",borderRadius:"6px",background:form.countries.includes(val)?"#E6F4F1":"transparent",border:`0.5px solid ${form.countries.includes(val)?"#0D6E6E":"transparent"}`}}>
                    <input type="checkbox" checked={form.countries.includes(val)} onChange={()=>toggleArr("countries",val)} style={{accentColor:"#0D6E6E",width:"14px",height:"14px"}} />
                    {flag} {label}
                  </label>
                ))}
              </div>

              <label style={lbl}>What scholarship types interest you?</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".4rem",marginBottom:".75rem"}}>
                {types.map(([icon,label])=>(
                  <label key={label} style={{display:"flex",alignItems:"center",gap:".5rem",fontSize:"12px",color:"#374151",cursor:"pointer",padding:".4rem .6rem",borderRadius:"6px",background:form.types.includes(label)?"#E6F4F1":"transparent",border:`0.5px solid ${form.types.includes(label)?"#0D6E6E":"transparent"}`}}>
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

              <button
                onClick={()=>{ if(form.email) setSent(true); }}
                style={{background:"#F5A623",color:"#0A2A2A",border:"none",padding:"10px 28px",borderRadius:"6px",fontSize:"13px",fontWeight:700,cursor:"pointer",width:"100%"}}>
                Get My Free Alerts →
              </button>
              <p style={{fontSize:"10px",color:"#A7D4CC",textAlign:"center",marginTop:".5rem"}}>No spam. Unsubscribe anytime. We never share your email.</p>
            </div>
          )}

          {/* Footer box */}
          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
            <p style={{fontSize:"11px",color:"#A7D4CC"}}>© 2026 MigrantScholar.com</p>
            <div style={{display:"flex",gap:"1rem"}}>
              <Link href="/privacy" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>Privacy</Link>
              <Link href="/terms" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>Terms</Link>
              <Link href="/about" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>About</Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
