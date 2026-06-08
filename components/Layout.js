import Link from "next/link";
export function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">Migrant<span>Scholar</span></Link>
      <ul className="nav-links">
        <li><Link href="/blog">Scholarships</Link></li>
        <li><Link href="/blog?country=UK">UK</Link></li>
        <li><Link href="/blog?country=Germany">Germany</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
      <Link href="/#alerts" className="nav-cta">Get Alerts</Link>
    </nav>
  );
}
export function Footer() {
  return (
    <footer style={{borderTop:"1px solid var(--border)",marginTop:"4rem"}}>
      <div className="footer">
        <div>
          <div className="footer-logo">Migrant<span>Scholar</span></div>
          <p style={{marginTop:".35rem",fontSize:"12px",color:"var(--muted)"}}>© {new Date().getFullYear()} MigrantScholar.com — Free scholarship resource</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
export function AdBanner({label="Advertisement"}) {
  return <div className="ad-banner">{label}</div>;
}
