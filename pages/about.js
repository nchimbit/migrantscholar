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

  return (
    <>
      <Head>
        <title>About MigrantScholar — Our Mission and Story</title>
        <meta name="description" content="MigrantScholar is a free scholarship resource built for migrants, refugees, and asylum seekers. Learn about our mission and how we can help." />
        <link rel="canonical" href="https://migrantscholar.vercel.app/about" />
      </Head>
      <Navbar />

      <div style={{background:"#EFF6FF",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Breadcrumb */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".5rem 1rem",marginBottom:"1rem",fontSize:"11px",color:"#93C5FD",display:"flex",alignItems:"center",gap:".35rem"}}>
            <Link href="/" style={{color:"#3B82F6",textDecoration:"none"}}>Home</Link>
            <span>›</span>
            <span>About</span>
          </div>

          {/* Hero */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.75rem",marginBottom:"1rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#EFF6FF",border:"0.5px solid #BFDBFE",color:"#1D4ED8",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",marginBottom:".75rem",fontWeight:500}}>Our mission</div>
            <h1 style={{fontSize:"1.35rem",fontWeight:500,color:"#1E3A8A",marginBottom:".5rem",lineHeight:1.3}}>Helping migrants find the education<br/>funding they deserve</h1>
            <p style={{fontSize:"13px",color:"#64748b",maxWidth:"520px",margin:"0 auto",lineHeight:1.7}}>MigrantScholar is a free, independent scholarship resource built specifically for migrants, refugees, and asylum seekers. We verify every award, track every deadline, and publish new guides every single day — so you never miss an opportunity.</p>
          </div>

          {/* Stats */}
          <div style={{background:"#DBEAFE",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem",marginBottom:"1rem",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",textAlign:"center"}}>
            {[["28+","Guides published"],["7","Countries covered"],["Daily","New posts"],["Free","Always, forever"]].map(([val,label])=>(
              <div key={label}>
                <strong style={{display:"block",fontSize:"1.25rem",fontWeight:500,color:"#1E3A8A"}}>{val}</strong>
                <span style={{fontSize:"11px",color:"#3B82F6"}}>{label}</span>
              </div>
            ))}
          </div>

          {/* Mission + Why */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem"}}>
              <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>What we do</div>
              <h2 style={{fontSize:".95rem",fontWeight:500,color:"#1E3A8A",marginBottom:".75rem"}}>Your dedicated scholarship guide</h2>
              <p style={{fontSize:"12px",color:"#64748b",lineHeight:1.7,marginBottom:".625rem"}}>Finding scholarships as a migrant is genuinely hard. Most scholarship databases are built for standard international students — not for people navigating asylum claims, protection visas, or humanitarian status.</p>
              <p style={{fontSize:"12px",color:"#64748b",lineHeight:1.7}}>MigrantScholar was built to fix that. Every guide on this site is written specifically for migrants, refugees, forced migrants, and asylum seekers. We explain eligibility in plain language, list real deadlines, and link directly to official application pages.</p>
            </div>
            <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem"}}>
              <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Why we built this</div>
              <h2 style={{fontSize:".95rem",fontWeight:500,color:"#1E3A8A",marginBottom:".75rem"}}>Education should not depend on where you were born</h2>
              <p style={{fontSize:"12px",color:"#64748b",lineHeight:1.7,marginBottom:".625rem"}}>Millions of displaced people around the world have the talent and ambition to pursue higher education — but lack access to clear, reliable information about the funding available to them.</p>
              <p style={{fontSize:"12px",color:"#64748b",lineHeight:1.7}}>We built MigrantScholar to be the resource we wish existed. No paywalls, no sign-up requirements. Just honest, verified scholarship information updated every day.</p>
            </div>
          </div>

          {/* Values */}
          <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Our values</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem",marginBottom:"1rem"}}>
            {[
              ["✓","Verified and accurate","Every scholarship is checked against official university and government pages before publishing. We never list awards we cannot verify."],
              ["🔓","Free forever","MigrantScholar will always be free to use. We are supported by advertising, not by charging users who need this information most."],
              ["📅","Updated daily","New scholarship guides are published every day. Deadlines, eligibility, and coverage amounts are reviewed and updated regularly."],
              ["🌍","Built for migrants","Unlike generic scholarship sites, every guide here is written with migrants and refugees specifically in mind — from eligibility to documentation."],
            ].map(([icon,title,desc])=>(
              <div key={title} style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:"1rem"}}>
                <div style={{width:"32px",height:"32px",background:"#EFF6FF",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:".6rem",fontSize:"16px"}}>{icon}</div>
                <h3 style={{fontSize:"12px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>{title}</h3>
                <p style={{fontSize:"11px",color:"#64748b",lineHeight:1.6}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>How it works</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".75rem",marginBottom:"1rem"}}>
            {[
              ["1","Browse by country","Use the Countries menu to find scholarships in the UK, Germany, Canada, Australia, USA, or Turkey."],
              ["2","Read the guide","Each guide covers eligibility, coverage, deadlines, application steps, and FAQs written for migrants."],
              ["3","Apply directly","Every guide links to the official scholarship application page — no middlemen, no sign-up required."],
            ].map(([num,title,desc])=>(
              <div key={num} style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:"1rem",textAlign:"center"}}>
                <div style={{width:"28px",height:"28px",background:"#1E40AF",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:600,margin:"0 auto .6rem"}}>{num}</div>
                <h3 style={{fontSize:"12px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>{title}</h3>
                <p style={{fontSize:"11px",color:"#64748b",lineHeight:1.6}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem",marginBottom:"1rem"}}>
            <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".5rem"}}>Get in touch</div>
            <h2 style={{fontSize:".95rem",fontWeight:500,color:"#1E3A8A",marginBottom:".25rem"}}>Contact us</h2>
            <p style={{fontSize:"12px",color:"#64748b",marginBottom:"1rem"}}>Have a question, found an error, or want to suggest a scholarship? We read every message.</p>

            {sent ? (
              <div style={{background:"#F0FDF4",border:"0.5px solid #BBF7D0",borderRadius:"8px",padding:"1rem",textAlign:"center"}}>
                <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>✓</div>
                <h3 style={{fontSize:".9rem",fontWeight:500,color:"#166534",marginBottom:".25rem"}}>Message sent!</h3>
                <p style={{fontSize:"12px",color:"#4B7C5A"}}>Thank you for reaching out. We will get back to you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem",marginBottom:".75rem"}}>
                  <div>
                    <label style={{display:"block",fontSize:"11px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>Your name</label>
                    <input type="text" required placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                      style={{width:"100%",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:"7px 10px",fontSize:"12px",color:"#1E3A8A",outline:"none"}} />
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:"11px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>Email address</label>
                    <input type="email" required placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                      style={{width:"100%",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:"7px 10px",fontSize:"12px",color:"#1E3A8A",outline:"none"}} />
                  </div>
                </div>
                <div style={{marginBottom:".75rem"}}>
                  <label style={{display:"block",fontSize:"11px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>Subject</label>
                  <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}
                    style={{width:"100%",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:"7px 10px",fontSize:"12px",color:"#1E3A8A",outline:"none"}}>
                    <option>General question</option>
                    <option>Report an error</option>
                    <option>Suggest a scholarship</option>
                    <option>Partnership inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{marginBottom:".75rem"}}>
                  <label style={{display:"block",fontSize:"11px",fontWeight:500,color:"#1E3A8A",marginBottom:".3rem"}}>Message</label>
                  <textarea required placeholder="Tell us how we can help..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                    style={{width:"100%",background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:"7px 10px",fontSize:"12px",color:"#1E3A8A",outline:"none",minHeight:"100px",resize:"vertical",fontFamily:"inherit"}} />
                </div>
                <button type="submit" style={{background:"#1E40AF",color:"#fff",border:"none",padding:"8px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:500,cursor:"pointer"}}>Send message</button>
              </form>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
