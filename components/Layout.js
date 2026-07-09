import React from 'react';
import Link from "next/link";
import { useState } from "react";

const LogoMark = ({size=36}) => (
  <div style={{width:size,height:size,background:"#0D6E6E",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <svg width={size*0.6} height={size*0.6} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#fff" strokeWidth="1.5"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="#fff" strokeWidth="1.5"/>
      <path d="M10 8h4v4" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8l-5 5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scholOpen, setScholOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);

  const countries = [["🇬🇧 UK","UK"],["🇩🇪 Germany","Germany"],["🇨🇦 Canada","Canada"],["🇦🇺 Australia","Australia"],["🇺🇸 USA","USA"],["🇹🇷 Turkey","Turkey"]];
  const schols = [["Fully Funded",""],["Partially Funded",""],["Undergraduate",""],["Master's",""],["PhD",""],["Latest",""]];

  const navStyle = {position:"sticky",top:0,zIndex:1000,background:"#fff",borderBottom:"1px solid #e2f0f0",boxShadow:"0 1px 4px rgba(0,0,0,.06)"};
  const linkStyle = {color:"#374151",textDecoration:"none",fontSize:"13px",fontWeight:500};
  const dropItem = {display:"block",padding:".5rem 1rem",fontSize:"12px",color:"#374151",textDecoration:"none",borderBottom:"1px solid #f6f9f8"};

  return (
    <nav style={navStyle}>
      <style>{`
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
          .desktop-links { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
      {/* Main bar */}
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"0 1rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:"56px"}}>
        
        {/* Logo */}
        <Link href="/" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"}}>
          <div style={{width:"36px",height:"36px",background:"#0D6E6E",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>🌐</div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <span style={{fontSize:".9rem",fontWeight:700,color:"#0A2A2A",lineHeight:1}}>MigrantScholar</span>
            <span style={{fontSize:"8px",color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".05em"}}>Find Your Scholarship</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-links" style={{alignItems:"center",gap:"1.5rem",display:"none"}}>
          <Link href="/" style={linkStyle}>Home</Link>
          <div style={{position:"relative"}}>
            <button onClick={()=>setScholOpen(!scholOpen)} style={{...linkStyle,background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"}}>
              Scholarships <span style={{fontSize:"10px"}}>▾</span>
            </button>
            {scholOpen && (
              <div style={{position:"absolute",top:"100%",left:0,background:"#fff",border:"1px solid #e2f0f0",borderRadius:"8px",boxShadow:"0 4px 20px rgba(0,0,0,.1)",minWidth:"160px",zIndex:100}}>
                {schols.map(([label])=>(
                  <Link key={label} href="/blog" style={dropItem}>{label}</Link>
                ))}
              </div>
            )}
          </div>
          <div style={{position:"relative"}}>
            <button onClick={()=>setCountryOpen(!countryOpen)} style={{...linkStyle,background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"}}>
              Countries <span style={{fontSize:"10px"}}>▾</span>
            </button>
            {countryOpen && (
              <div style={{position:"absolute",top:"100%",left:0,background:"#fff",border:"1px solid #e2f0f0",borderRadius:"8px",boxShadow:"0 4px 20px rgba(0,0,0,.1)",minWidth:"160px",zIndex:100}}>
                {countries.map(([label,code])=>(
                  <Link key={code} href={`/countries/${code}`} style={dropItem}>{label}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/blog" style={linkStyle}>Guides</Link>
          <Link href="/about" style={linkStyle}>About</Link>
        </div>

        {/* Right side */}
        <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
          <Link href="/alerts" style={{background:"#F5A623",color:"#0A2A2A",padding:"8px 16px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Alerts</Link>
          {/* Hamburger */}
          <button className="hamburger-btn" onClick={()=>setOpen(!open)} style={{background:"none",border:"1px solid #e2f0f0",borderRadius:"6px",padding:"6px 8px",cursor:"pointer",flexDirection:"column",gap:"4px",display:"flex"}}>
            <span style={{display:"block",width:"18px",height:"2px",background:"#374151",transition:"all .2s",transform:open?"rotate(45deg) translate(4px,4px)":"none"}}></span>
            <span style={{display:"block",width:"18px",height:"2px",background:"#374151",opacity:open?0:1,transition:"all .2s"}}></span>
            <span style={{display:"block",width:"18px",height:"2px",background:"#374151",transition:"all .2s",transform:open?"rotate(-45deg) translate(4px,-4px)":"none"}}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{background:"#fff",borderTop:"1px solid #e2f0f0",padding:"1rem",maxHeight:"80vh",overflowY:"auto"}}>
          <Link href="/" onClick={()=>setOpen(false)} style={{display:"block",padding:".75rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"14px",fontWeight:600,color:"#0A2A2A",textDecoration:"none"}}>Home</Link>
          
          <div>
            <button onClick={()=>setScholOpen(!scholOpen)} style={{width:"100%",textAlign:"left",padding:".75rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"14px",fontWeight:600,color:"#0A2A2A",background:"none",border:"none",borderBottom:"1px solid #f6f9f8",cursor:"pointer",display:"flex",justifyContent:"space-between"}}>
              Scholarships <span>{scholOpen?"▲":"▼"}</span>
            </button>
            {scholOpen && (
              <div style={{paddingLeft:"1rem",background:"#f9fafb"}}>
                {schols.map(([label])=>(
                  <Link key={label} href="/blog" onClick={()=>setOpen(false)} style={{display:"block",padding:".5rem 0",fontSize:"13px",color:"#374151",textDecoration:"none",borderBottom:"1px solid #f0f4f3"}}>{label}</Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button onClick={()=>setCountryOpen(!countryOpen)} style={{width:"100%",textAlign:"left",padding:".75rem 0",fontSize:"14px",fontWeight:600,color:"#0A2A2A",background:"none",border:"none",borderBottom:"1px solid #f6f9f8",cursor:"pointer",display:"flex",justifyContent:"space-between"}}>
              Countries <span>{countryOpen?"▲":"▼"}</span>
            </button>
            {countryOpen && (
              <div style={{paddingLeft:"1rem",background:"#f9fafb"}}>
                {countries.map(([label,code])=>(
                  <Link key={code} href={`/countries/${code}`} onClick={()=>setOpen(false)} style={{display:"block",padding:".5rem 0",fontSize:"13px",color:"#374151",textDecoration:"none",borderBottom:"1px solid #f0f4f3"}}>{label}</Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" onClick={()=>setOpen(false)} style={{display:"block",padding:".75rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"14px",fontWeight:600,color:"#0A2A2A",textDecoration:"none"}}>Guides</Link>
          <Link href="/about" onClick={()=>setOpen(false)} style={{display:"block",padding:".75rem 0",borderBottom:"1px solid #f6f9f8",fontSize:"14px",fontWeight:600,color:"#0A2A2A",textDecoration:"none"}}>About</Link>
          <Link href="/alerts" onClick={()=>setOpen(false)} style={{display:"block",marginTop:"1rem",background:"#F5A623",color:"#0A2A2A",padding:"10px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",textAlign:"center"}}>Get Free Alerts →</Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const [email1, setEmail1] = React.useState("");
  const [email2, setEmail2] = React.useState("");
  const [sent1, setSent1] = React.useState(false);
  const [sent2, setSent2] = React.useState(false);

  async function submitEmail(email, setSent) {
    if (!email) return;
    try {
      const res = await fetch("https://formspree.io/f/xvznenzj", {
        method: "POST",
        headers: {"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({email, source:"Footer signup"})
      });
      if (res.ok) setSent(true);
    } catch(e) {}
  }

  return (
    <footer>
      {/* Alerts strip */}
      <div style={{background:"#F4F7F6",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
        <div style={{background:"#E6F4F1",borderRadius:"12px",padding:"1.25rem 2rem",border:"1px solid #A7D4CC",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
          <div>
            <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>Never miss a scholarship deadline</strong>
            <span style={{fontSize:"12px",color:"#6b7280"}}>Free alerts when new awards open for migrants, refugees, and asylum seekers.</span>
          </div>
          <div style={{display:"flex",gap:".5rem"}}>
            {sent1 ? (
              <span style={{fontSize:"12px",color:"#0D6E6E",fontWeight:600}}>✓ You're subscribed!</span>
            ) : (
              <>
                <input type="email" placeholder="your@email.com" value={email1} onChange={e=>setEmail1(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitEmail(email1,setSent1)} style={{border:"1.5px solid #A7D4CC",borderRadius:"6px",padding:"7px 12px",fontSize:"12px",outline:"none",width:"200px"}} />
                <button onClick={()=>submitEmail(email1,setSent1)} style={{background:"#F5A623",color:"#0A2A2A",border:"none",borderRadius:"6px",padding:"7px 16px",fontSize:"12px",fontWeight:700,cursor:"pointer"}}>Get free alerts</button>
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{background:"#0A2A2A",padding:"2.5rem 2rem 1.5rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr",gap:"2rem",marginBottom:"2rem"}}>
            
            {/* Brand */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".75rem"}}>
                <div style={{width:"32px",height:"32px",background:"#0D6E6E",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>🌐</div>
                <div>
                  <strong style={{display:"block",fontSize:".9rem",color:"#fff"}}>Scholarship</strong>
                  <span style={{fontSize:"10px",color:"rgba(255,255,255,.6)"}}>For Migrants</span>
                </div>
              </div>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.6)",lineHeight:1.65,marginBottom:"1rem"}}>Find verified scholarships for migrants, refugees, asylum seekers, and international students.</p>
              <div style={{display:"flex",gap:".5rem"}}>
                {["f","t","in","ig","yt"].map(s=>(
                  <div key={s} style={{width:"28px",height:"28px",background:"rgba(255,255,255,.1)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"rgba(255,255,255,.7)",cursor:"pointer"}}>{s}</div>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 style={{fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:".875rem",textTransform:"uppercase",letterSpacing:".06em"}}>Explore</h4>
              {["Latest Scholarships","Countries","Universities","Study Levels","Guides & Resources"].map(item=>(
                <a key={item} href={item==="Latest Scholarships"?"/blog":item==="Countries"?"/blog":item==="Universities"?"/blog":item==="Study Levels"?"/by-level/masters":"/blog"} style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",marginBottom:".4rem"}}>{item}</a>
              ))}
            </div>

            {/* Top Scholarships */}
            <div>
              <h4 style={{fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:".875rem",textTransform:"uppercase",letterSpacing:".06em"}}>Top Scholarships</h4>
              {["DAAD Scholarships","Chevening Scholarships","Fulbright Scholarships","Vanier Scholarships","Türkiye Scholarships"].map(item=>(
                <a key={item} href={item==="Latest Scholarships"?"/blog":item==="Countries"?"/blog":item==="Universities"?"/blog":item==="Study Levels"?"/by-level/masters":"/blog"} style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",marginBottom:".4rem"}}>{item}</a>
              ))}
            </div>

            {/* Help */}
            <div>
              <h4 style={{fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:".875rem",textTransform:"uppercase",letterSpacing:".06em"}}>Help</h4>
              {[["FAQ","/blog"],["Contact Us","/about"],["Privacy Policy","/privacy"],["Terms of Use","/terms"],["About Us","/about"]].map(([item,href])=>(
                <a key={item} href={href} style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",marginBottom:".4rem"}}>{item}</a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:".875rem",textTransform:"uppercase",letterSpacing:".06em"}}>Newsletter</h4>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.6)",lineHeight:1.6,marginBottom:".875rem"}}>Stay updated with the latest scholarships and opportunities.</p>
              {sent2 ? (
                <div style={{fontSize:"12px",color:"#F5A623",fontWeight:600,textAlign:"center",padding:".5rem 0"}}>✓ Subscribed! Thank you.</div>
              ) : (
                <>
                  <input type="email" placeholder="Enter your email" value={email2} onChange={e=>setEmail2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitEmail(email2,setSent2)} style={{width:"100%",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"6px",padding:"7px 10px",fontSize:"11px",color:"#fff",outline:"none",marginBottom:".5rem"}} />
                  <button onClick={()=>submitEmail(email2,setSent2)} style={{width:"100%",background:"#F5A623",color:"#0A2A2A",border:"none",borderRadius:"6px",padding:"7px",fontSize:"11px",fontWeight:700,cursor:"pointer"}}>Subscribe</button>
                </>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.5)"}}>© 2026 Scholarship for Migrants. All rights reserved.</span>
            <div style={{display:"flex",gap:"1rem"}}>
              {[["Privacy Policy","/privacy"],["Terms of Use","/terms"],["Sitemap","/sitemap.xml"]].map(([label,href])=>(
                <a key={label} href={href} style={{fontSize:"11px",color:"rgba(255,255,255,.5)",textDecoration:"none"}}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


export function AdBanner({label="Advertisement"}) {
  return (
    <div style={{background:"#fff",border:"0.5px dashed #A7D4CC",borderRadius:"8px",height:"52px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#A7D4CC",margin:"1rem 0"}}>
      {label}
    </div>
  );
}
