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
                <Link key={country} href={`/countries/${country}`} style={dropItem}
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
    <footer>
      {/* Alerts strip */}
      <div style={{background:"#E6F4F1",padding:"1.25rem 2rem",borderTop:"1px solid #A7D4CC"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
          <div>
            <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>Never miss a scholarship deadline</strong>
            <span style={{fontSize:"12px",color:"#6b7280"}}>Free alerts when new awards open for migrants, refugees, and asylum seekers.</span>
          </div>
          <div style={{display:"flex",gap:".5rem"}}>
            <input type="email" placeholder="your@email.com" style={{border:"1.5px solid #A7D4CC",borderRadius:"6px",padding:"7px 12px",fontSize:"12px",outline:"none",width:"200px"}} />
            <button style={{background:"#F5A623",color:"#0A2A2A",border:"none",borderRadius:"6px",padding:"7px 16px",fontSize:"12px",fontWeight:700,cursor:"pointer"}}>Get free alerts</button>
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
                <a key={item} href="/blog" style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",marginBottom:".4rem"}}>{item}</a>
              ))}
            </div>

            {/* Top Scholarships */}
            <div>
              <h4 style={{fontSize:"12px",fontWeight:700,color:"#fff",marginBottom:".875rem",textTransform:"uppercase",letterSpacing:".06em"}}>Top Scholarships</h4>
              {["DAAD Scholarships","Chevening Scholarships","Fulbright Scholarships","Vanier Scholarships","Türkiye Scholarships"].map(item=>(
                <a key={item} href="/blog" style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.6)",textDecoration:"none",marginBottom:".4rem"}}>{item}</a>
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
              <input type="email" placeholder="Enter your email" style={{width:"100%",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"6px",padding:"7px 10px",fontSize:"11px",color:"#fff",outline:"none",marginBottom:".5rem"}} />
              <button style={{width:"100%",background:"#F5A623",color:"#0A2A2A",border:"none",borderRadius:"6px",padding:"7px",fontSize:"11px",fontWeight:700,cursor:"pointer"}}>Subscribe</button>
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
