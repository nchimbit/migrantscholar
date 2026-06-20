import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Navbar, Footer } from "../components/Layout";

export default function About() {
  const [form, setForm] = useState({ name:"", email:"", subject:"General question", message:"" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const inp = {width:"100%",background:"#E6F4F1",border:"1px solid #A7D4CC",borderRadius:"6px",padding:"8px 12px",fontSize:"13px",color:"#0A2A2A",outline:"none",fontFamily:"inherit"};
  const lbl = {display:"block",fontSize:"11px",fontWeight:700,color:"#0A2A2A",marginBottom:".3rem"};

  return (
    <>
      <Head>
        <title>About MigrantScholar — Our Mission and Story</title>
        <meta name="description" content="MigrantScholar is a free scholarship resource built for migrants, refugees, and asylum seekers. Learn about our mission and how we can help." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/about" />
      </Head>
      <Navbar />

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",padding:"2.5rem 2rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Our Mission</div>
        <h1 style={{fontSize:"1.85rem",fontWeight:900,color:"#fff",lineHeight:1.25,marginBottom:".75rem",letterSpacing:"-0.02em"}}>Helping migrants find the<br/>education funding they deserve</h1>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"540px",margin:"0 auto",lineHeight:1.7}}>MigrantScholar is a free, independent scholarship resource built specifically for migrants, refugees, and asylum seekers. We verify every award, track every deadline, and publish new guides every single day.</p>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>

        {/* Stats */}
        <div style={{background:"#0D6E6E",borderRadius:"10px",padding:"1.5rem",marginBottom:"2rem",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",textAlign:"center"}}>
          {[["28+","Guides published"],["7","Countries covered"],["Daily","New posts"],["Free","Always, forever"]].map(([val,label])=>(
            <div key={label}>
              <strong style={{display:"block",fontSize:"1.5rem",fontWeight:800,color:"#fff"}}>{val}</strong>
              <span style={{fontSize:"11px",color:"rgba(255,255,255,.75)",textTransform:"uppercase",letterSpacing:".05em"}}>{label}</span>
            </div>
          ))}
        </div>

        {/* What we do / Why */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem",marginBottom:"2rem"}}>
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#F5A623",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>What we do</div>
            <h2 style={{fontSize:"1.05rem",fontWeight:800,color:"#0D6E6E",marginBottom:".875rem"}}>Your dedicated scholarship guide</h2>
            <p style={{fontSize:"13px",color:"#374151",lineHeight:1.75,marginBottom:".75rem"}}>Finding scholarships as a migrant is genuinely hard. Most scholarship databases are built for standard international students — not for people navigating asylum claims, protection visas, or humanitarian status.</p>
            <p style={{fontSize:"13px",color:"#374151",lineHeight:1.75}}>MigrantScholar was built to fix that. Every guide is written specifically for migrants, refugees, forced migrants, and asylum seekers — with plain-language eligibility, real deadlines, and direct application links.</p>
          </div>
          <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#F5A623",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Why we built this</div>
            <h2 style={{fontSize:"1.05rem",fontWeight:800,color:"#0D6E6E",marginBottom:".875rem"}}>Education shouldn't depend on where you were born</h2>
            <p style={{fontSize:"13px",color:"#374151",lineHeight:1.75,marginBottom:".75rem"}}>Millions of displaced people around the world have the talent and ambition to pursue higher education — but lack access to clear, reliable information about funding.</p>
            <p style={{fontSize:"13px",color:"#374151",lineHeight:1.75}}>We built MigrantScholar to be the resource we wish existed. No paywalls, no sign-up requirements — just honest, verified information updated every day.</p>
          </div>
        </div>

        {/* Values */}
        <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>Our Values</div>
          <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>What We Stand For</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
          {[
            ["✓","Verified and accurate","Every scholarship is checked against official university and government pages before publishing.","#E6F4EF"],
            ["🔓","Free forever","MigrantScholar will always be free to use, supported by advertising — not by charging users.","#FEF3C7"],
            ["📅","Updated daily","New guides published every day, with deadlines and coverage amounts reviewed regularly.","#EEF2FF"],
            ["🌍","Built for migrants","Every guide is written with migrants and refugees specifically in mind — eligibility to documentation.","#FDF4FF"],
          ].map(([icon,title,desc,bg])=>(
            <div key={title} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
              <div style={{width:"40px",height:"40px",background:bg,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{icon}</div>
              <div>
                <h3 style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",marginBottom:".3rem"}}>{title}</h3>
                <p style={{fontSize:"12px",color:"#6b7280",lineHeight:1.6}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"3px 12px",borderRadius:"4px",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".08em"}}>How It Works</div>
          <h2 style={{fontSize:"1.4rem",fontWeight:800,color:"#0D6E6E"}}>Three Simple Steps</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2rem"}}>
          {[
            ["1","Browse by country","Use the Countries menu to find scholarships in the UK, Germany, Canada, Australia, USA, or Turkey."],
            ["2","Read the guide","Each guide covers eligibility, coverage, deadlines, application steps, and FAQs written for migrants."],
            ["3","Apply directly","Every guide links to the official scholarship application page — no middlemen, no sign-up required."],
          ].map(([num,title,desc])=>(
            <div key={num} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.5rem",textAlign:"center"}}>
              <div style={{width:"36px",height:"36px",background:"#0D6E6E",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:800,margin:"0 auto .75rem"}}>{num}</div>
              <h3 style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",marginBottom:".4rem"}}>{title}</h3>
              <p style={{fontSize:"12px",color:"#6b7280",lineHeight:1.6}}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.75rem",marginBottom:"2rem"}}>
          <div style={{fontSize:"10px",fontWeight:700,color:"#F5A623",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Get in Touch</div>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0D6E6E",marginBottom:".4rem"}}>Contact Us</h2>
          <p style={{fontSize:"13px",color:"#6b7280",marginBottom:"1.25rem"}}>Have a question, found an error, or want to suggest a scholarship? We read every message.</p>

          {sent ? (
            <div style={{background:"#E6F4EF",border:"1.5px solid #9FE1CB",borderRadius:"8px",padding:"1.5rem",textAlign:"center"}}>
              <div style={{fontSize:"2rem",marginBottom:".5rem"}}>✓</div>
              <h3 style={{fontSize:"1rem",fontWeight:800,color:"#085041",marginBottom:".25rem"}}>Message sent!</h3>
              <p style={{fontSize:"12px",color:"#0F6E56"}}>Thank you for reaching out. We will get back to you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                <div>
                  <label style={lbl}>Your name</label>
                  <input type="text" required placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Email address</label>
                  <input type="email" required placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp} />
                </div>
              </div>
              <div style={{marginBottom:"1rem"}}>
                <label style={lbl}>Subject</label>
                <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} style={inp}>
                  <option>General question</option>
                  <option>Report an error</option>
                  <option>Suggest a scholarship</option>
                  <option>Partnership inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{marginBottom:"1.25rem"}}>
                <label style={lbl}>Message</label>
                <textarea required placeholder="Tell us how we can help..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{...inp,minHeight:"110px",resize:"vertical"}} />
              </div>
              <button type="submit" style={{background:"#F5A623",color:"#0A2A2A",border:"none",padding:"10px 28px",borderRadius:"6px",fontSize:"13px",fontWeight:700,cursor:"pointer"}}>Send message</button>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}
