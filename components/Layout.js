import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [scholOpen, setScholOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  return (
    <nav style={{background:"#fff",borderBottom:"0.5px solid #BFDBFE",padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:"48px",position:"sticky",top:0,zIndex:100}}>
      <Link href="/" style={{fontSize:".9rem",fontWeight:600,color:"#1E3A8A",display:"flex",alignItems:"center",gap:"6px",textDecoration:"none"}}>
        <div style={{width:"18px",height:"18px",background:"#1E40AF",borderRadius:"4px",flexShrink:0}}></div>
        MigrantScholar
      </Link>

      <div style={{display:"flex",alignItems:"center",gap:".25rem"}}>
        <Link href="/" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",borderRadius:"6px"}}>Home</Link>

        {/* Scholarships dropdown */}
        <div style={{position:"relative"}} onMouseEnter={()=>setScholOpen(true)} onMouseLeave={()=>setScholOpen(false)}>
          <div style={{display:"flex",alignItems:"center",gap:"4px",padding:".5rem .75rem",fontSize:"13px",color:"#374151",cursor:"pointer",borderRadius:"6px",background:scholOpen?"#EFF6FF":"transparent"}}>
            Scholarships
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{transform:scholOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {scholOpen && (
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",minWidth:"200px",padding:".4rem",boxShadow:"0 8px 24px rgba(30,64,175,.08)",zIndex:200}}>
              {[["Fully Funded","/blog?type=fully-funded"],["Partially Funded","/blog?type=partial"],["Undergraduate","/blog?level=undergraduate"],["Master's","/blog?level=masters"],["PhD","/blog?level=phd"]].map(([label,href])=>(
                <Link key={label} href={href} style={{display:"block",padding:".5rem .75rem",borderRadius:"6px",fontSize:"12px",color:"#374151",textDecoration:"none"}
                } onMouseEnter={e=>{e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.color="#1E40AF"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#374151"}}>{label}</Link>
              ))}
              <div style={{height:"0.5px",background:"#DBEAFE",margin:".3rem .75rem"}}></div>
              <Link href="/blog" style={{display:"block",padding:".5rem .75rem",borderRadius:"6px",fontSize:"11px",color:"#1D4ED8",fontWeight:500,textDecoration:"none"}}>Latest Scholarships →</Link>
            </div>
          )}
        </div>

        {/* Countries dropdown */}
        <div style={{position:"relative"}} onMouseEnter={()=>setCountryOpen(true)} onMouseLeave={()=>setCountryOpen(false)}>
          <div style={{display:"flex",alignItems:"center",gap:"4px",padding:".5rem .75rem",fontSize:"13px",color:"#374151",cursor:"pointer",borderRadius:"6px",background:countryOpen?"#EFF6FF":"transparent"}}>
            Countries
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{transform:countryOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {countryOpen && (
            <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",minWidth:"180px",padding:".4rem",boxShadow:"0 8px 24px rgba(30,64,175,.08)",zIndex:200}}>
              {[["🇬🇧 UK","UK"],["🇩🇪 Germany","Germany"],["🇨🇦 Canada","Canada"],["🇦🇺 Australia","Australia"],["🇺🇸 USA","USA"],["🇹🇷 Turkey","Turkey"]].map(([label,country])=>(
                <Link key={country} href={`/blog?country=${country}`} style={{display:"block",padding:".5rem .75rem",borderRadius:"6px",fontSize:"12px",color:"#374151",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.color="#1E40AF"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#374151"}}>{label}</Link>
              ))}
              <div style={{height:"0.5px",background:"#DBEAFE",margin:".3rem .75rem"}}></div>
              <Link href="/blog" style={{display:"block",padding:".5rem .75rem",borderRadius:"6px",fontSize:"11px",color:"#1D4ED8",fontWeight:500,textDecoration:"none"}}>View All Countries →</Link>
            </div>
          )}
        </div>

        <Link href="/blog" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",borderRadius:"6px"}}>Guides</Link>
        <Link href="/about" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",borderRadius:"6px"}}>About</Link>
      </div>

      <Link href="/#alerts" style={{background:"#1E40AF",color:"#fff",border:"none",padding:"5px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:500,textDecoration:"none"}}>Get Alerts</Link>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{background:"#fff",borderTop:"0.5px solid #BFDBFE",marginTop:"1rem"}}>
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"1.5rem 2rem"}}>

        {/* CTA strip */}
        <div style={{background:"#DBEAFE",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".75rem",marginBottom:"1.5rem"}}>
          <div>
            <h3 style={{fontSize:".85rem",fontWeight:500,color:"#1E3A8A",marginBottom:".15rem"}}>Never miss a scholarship deadline</h3>
            <p style={{fontSize:"11px",color:"#3B82F6"}}>Free alerts when new awards open for migrants, refugees, and asylum seekers.</p>
          </div>
          <div style={{display:"flex",gap:".35rem"}}>
            <input type="email" placeholder="your@email.com" style={{background:"#fff",border:"0.5px solid #BFDBFE",color:"#1E3A8A",padding:"6px 10px",borderRadius:"6px",fontSize:"12px",outline:"none",minWidth:"160px"}} />
            <button style={{background:"#1E40AF",color:"#fff",border:"none",padding:"6px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>Get free alerts</button>
          </div>
        </div>

        {/* Footer grid */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2rem",marginBottom:"1.25rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:".5rem"}}>
              <div style={{width:"16px",height:"16px",background:"#1E40AF",borderRadius:"4px"}}></div>
              <span style={{fontSize:".85rem",fontWeight:600,color:"#1E3A8A"}}>MigrantScholar</span>
            </div>
            <p style={{fontSize:"11px",color:"#93C5FD",lineHeight:1.6,maxWidth:"220px"}}>Free, verified scholarship guides for migrants, refugees, and asylum seekers worldwide. Updated every day.</p>
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:600,color:"#1E3A8A",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Scholarships</h4>
            {[["Fully Funded","/blog"],["Partially Funded","/blog"],["Undergraduate","/blog"],["Master's","/blog"],["PhD","/blog"],["Latest","/blog"]].map(([label,href])=>(
              <Link key={label} href={href} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:600,color:"#1E3A8A",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Countries</h4>
            {[["🇬🇧 UK","UK"],["🇩🇪 Germany","Germany"],["🇨🇦 Canada","Canada"],["🇦🇺 Australia","Australia"],["🇺🇸 USA","USA"],["🇹🇷 Turkey","Turkey"]].map(([label,country])=>(
              <Link key={country} href={`/blog?country=${country}`} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:600,color:"#1E3A8A",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Company</h4>
            {[["About","/about"],["Guides","/blog"],["Contact","/contact"],["Privacy Policy","/privacy"],["Terms","/terms"],["Sitemap","/sitemap.xml"]].map(([label,href])=>(
              <Link key={label} href={href} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{borderTop:"0.5px solid #DBEAFE",paddingTop:"1rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
          <p style={{fontSize:"11px",color:"#93C5FD"}}>© 2026 MigrantScholar.com — Free, independent scholarship resource</p>
          <div style={{display:"flex",gap:"1rem"}}>
            {[["Privacy","/privacy"],["Terms","/terms"],["Sitemap","/sitemap.xml"]].map(([label,href])=>(
              <Link key={label} href={href} style={{fontSize:"11px",color:"#93C5FD",textDecoration:"none"}}>{label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export function AdBanner({label="Advertisement"}) {
  return (
    <div style={{background:"#fff",border:"0.5px dashed #BFDBFE",borderRadius:"8px",height:"52px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#BFDBFE",margin:"1rem 0"}}>
      {label}
    </div>
  );
}
