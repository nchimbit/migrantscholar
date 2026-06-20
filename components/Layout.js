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
  const [scholOpen, setScholOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const dropStyle = {position:"absolute",top:"calc(100% + 4px)",left:0,background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"10px",minWidth:"200px",padding:".4rem",boxShadow:"0 8px 24px rgba(13,110,110,.1)",zIndex:200};
  const dropItem = {display:"block",padding:".5rem .75rem",borderRadius:"6px",fontSize:"12px",color:"#374151",textDecoration:"none",cursor:"pointer"};

  return (
    <nav style={{background:"#fff",borderBottom:"0.5px solid #A7D4CC",padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:"56px",position:"sticky",top:0,zIndex:100}}>
      <Link href="/" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"}}>
        <LogoMark size={36}/>
        <div style={{display:"flex",flexDirection:"column",lineHeight:1.1}}>
          <div style={{fontSize:".95rem",fontWeight:800,color:"#0A2A2A",letterSpacing:"-0.02em"}}>Migrant<span style={{color:"#0D6E6E"}}>Scholar</span></div>
          <div style={{fontSize:"9px",color:"#A7D4CC",fontWeight:500,letterSpacing:".04em",textTransform:"uppercase"}}>Find Your Scholarship</div>
        </div>
      </Link>

      <div style={{display:"flex",alignItems:"center",gap:".25rem"}}>
        <Link href="/" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",fontWeight:500}}>Home</Link>

        {/* Scholarships */}
        <div style={{position:"relative"}} onMouseEnter={()=>setScholOpen(true)} onMouseLeave={()=>setScholOpen(false)}>
          <div style={{display:"flex",alignItems:"center",gap:"4px",padding:".5rem .75rem",fontSize:"13px",color:"#374151",cursor:"pointer",fontWeight:500}}>
            Scholarships
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A7D4CC" strokeWidth="2" strokeLinecap="round" style={{transform:scholOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {scholOpen && (
            <div style={dropStyle}>
              {[["⭐ Fully Funded","/blog"],["💰 Partially Funded","/blog"],["🎓 Undergraduate","/blog"],["📚 Master's","/blog"],["🔬 PhD","/blog"]].map(([label,href])=>(
                <Link key={label} href={href} style={dropItem}
                  onMouseEnter={e=>{e.currentTarget.style.background="#E6F4F1";e.currentTarget.style.color="#0D6E6E"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#374151"}}
                >{label}</Link>
              ))}
              <div style={{height:"0.5px",background:"#E6F4F1",margin:".3rem .75rem"}}></div>
              <Link href="/blog" style={{...dropItem,color:"#F5A623",fontWeight:700,fontSize:"11px"}}
                onMouseEnter={e=>e.currentTarget.style.background="#E6F4F1"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >Latest Scholarships →</Link>
            </div>
          )}
        </div>

        {/* Countries */}
        <div style={{position:"relative"}} onMouseEnter={()=>setCountryOpen(true)} onMouseLeave={()=>setCountryOpen(false)}>
          <div style={{display:"flex",alignItems:"center",gap:"4px",padding:".5rem .75rem",fontSize:"13px",color:"#374151",cursor:"pointer",fontWeight:500}}>
            Countries
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A7D4CC" strokeWidth="2" strokeLinecap="round" style={{transform:countryOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {countryOpen && (
            <div style={dropStyle}>
              {[["🇬🇧 UK","UK"],["🇩🇪 Germany","Germany"],["🇨🇦 Canada","Canada"],["🇦🇺 Australia","Australia"],["🇺🇸 USA","USA"],["🇹🇷 Turkey","Turkey"]].map(([label,country])=>(
                <Link key={country} href={`/blog?country=${country}`} style={dropItem}
                  onMouseEnter={e=>{e.currentTarget.style.background="#E6F4F1";e.currentTarget.style.color="#0D6E6E"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#374151"}}
                >{label}</Link>
              ))}
              <div style={{height:"0.5px",background:"#E6F4F1",margin:".3rem .75rem"}}></div>
              <Link href="/blog" style={{...dropItem,color:"#F5A623",fontWeight:700,fontSize:"11px"}}
                onMouseEnter={e=>e.currentTarget.style.background="#E6F4F1"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >View All Countries →</Link>
            </div>
          )}
        </div>

        <Link href="/blog" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",fontWeight:500}}>Guides</Link>
        <Link href="/about" style={{padding:".5rem .75rem",fontSize:"13px",color:"#374151",textDecoration:"none",fontWeight:500}}>About</Link>
      </div>

      <Link href="/#alerts" style={{background:"#F5A623",color:"#0A2A2A",border:"none",padding:"6px 16px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>Get Alerts</Link>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{background:"#fff",borderTop:"0.5px solid #A7D4CC",marginTop:"1rem"}}>
      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"1.5rem 2rem"}}>

        {/* CTA strip */}
        <div style={{background:"#E6F4F1",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".75rem",marginBottom:"1.5rem"}}>
          <div>
            <h3 style={{fontSize:".85rem",fontWeight:600,color:"#0A2A2A",marginBottom:".15rem"}}>Never miss a scholarship deadline</h3>
            <p style={{fontSize:"11px",color:"#0D6E6E"}}>Free alerts when new awards open for migrants, refugees, and asylum seekers.</p>
          </div>
          <div style={{display:"flex",gap:".35rem"}}>
            <input type="email" placeholder="your@email.com" style={{background:"#fff",border:"0.5px solid #A7D4CC",color:"#0A2A2A",padding:"6px 10px",borderRadius:"6px",fontSize:"12px",outline:"none",minWidth:"160px"}}/>
            <button style={{background:"#F5A623",color:"#0A2A2A",border:"none",padding:"6px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Get free alerts</button>
          </div>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2rem",marginBottom:"1.25rem"}}>
          <div>
            <Link href="/" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none",marginBottom:".5rem"}}>
              <LogoMark size={28}/>
              <div style={{lineHeight:1.1}}>
                <div style={{fontSize:".85rem",fontWeight:800,color:"#0A2A2A"}}>Migrant<span style={{color:"#0D6E6E"}}>Scholar</span></div>
                <div style={{fontSize:"9px",color:"#A7D4CC",textTransform:"uppercase",letterSpacing:".04em"}}>Find Your Scholarship</div>
              </div>
            </Link>
            <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.6,maxWidth:"220px"}}>Free, verified scholarship guides for migrants, refugees, and asylum seekers worldwide. Updated every day.</p>
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Scholarships</h4>
            {[["Fully Funded","/blog"],["Partially Funded","/blog"],["Undergraduate","/blog"],["Master's","/blog"],["PhD","/blog"],["Latest","/blog"]].map(([label,href])=>(
              <Link key={label} href={href} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Countries</h4>
            {[["🇬🇧 UK","UK"],["🇩🇪 Germany","Germany"],["🇨🇦 Canada","Canada"],["🇦🇺 Australia","Australia"],["🇺🇸 USA","USA"],["🇹🇷 Turkey","Turkey"]].map(([label,country])=>(
              <Link key={country} href={`/blog?country=${country}`} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:"11px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".625rem"}}>Company</h4>
            {[["About","/about"],["Guides","/blog"],["Contact","/about"],["Privacy Policy","/privacy"],["Terms","/terms"],["Sitemap","/sitemap.xml"]].map(([label,href])=>(
              <Link key={label} href={href} style={{display:"block",fontSize:"12px",color:"#64748b",textDecoration:"none",marginBottom:".35rem"}}>{label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{borderTop:"0.5px solid #E6F4F1",paddingTop:"1rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
          <p style={{fontSize:"11px",color:"#A7D4CC"}}>© 2026 MigrantScholar.com — Free, independent scholarship resource</p>
          <div style={{display:"flex",gap:"1rem"}}>
            {[["Privacy","/privacy"],["Terms","/terms"],["Sitemap","/sitemap.xml"]].map(([label,href])=>(
              <Link key={label} href={href} style={{fontSize:"11px",color:"#A7D4CC",textDecoration:"none"}}>{label}</Link>
            ))}
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
