import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../components/Layout";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — MigrantScholar</title>
        <meta name="description" content="MigrantScholar privacy policy. Learn how we collect, use, and protect your information." />
      </Head>
      <Navbar />
      <div style={{background:"#E6F4F1",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Breadcrumb */}
          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".5rem 1rem",marginBottom:"1rem",fontSize:"11px",color:"#A7D4CC",display:"flex",alignItems:"center",gap:".35rem"}}>
            <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link>
            <span>›</span><span>Privacy Policy</span>
          </div>

          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"10px",padding:"2rem",marginBottom:"1rem"}}>
            <div style={{display:"inline-block",background:"#E6F4F1",border:"0.5px solid #A7D4CC",color:"#0D6E6E",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",marginBottom:".75rem",fontWeight:600}}>Legal</div>
            <h1 style={{fontSize:"1.35rem",fontWeight:700,color:"#0A2A2A",marginBottom:".25rem"}}>Privacy Policy</h1>
            <p style={{fontSize:"11px",color:"#A7D4CC",marginBottom:"2rem"}}>Last updated: 10 June 2026</p>

            {[
              ["1. Who we are","MigrantScholar (migrantscholar.com) is a free, independent scholarship resource for migrants, refugees, and asylum seekers. We are committed to protecting your privacy and being transparent about how we handle your data."],
              ["2. Information we collect","We collect minimal information to provide our service. This includes: email addresses you voluntarily submit to receive scholarship alerts; anonymous usage data collected through Google Analytics (pages visited, time on site, general location); and technical data such as browser type and device information collected automatically when you visit our site."],
              ["3. How we use your information","Your email address is used solely to send scholarship deadline alerts and updates you have requested. You can unsubscribe at any time. Anonymous analytics data helps us understand which scholarship guides are most useful so we can improve our content. We do not sell, rent, or share your personal information with third parties for marketing purposes."],
              ["4. Cookies","We use cookies to operate Google Analytics and Google AdSense. These cookies collect anonymous data about how visitors use our site. You can disable cookies in your browser settings at any time. Our site will continue to function without cookies, though some features may be limited."],
              ["5. Google AdSense","We display advertisements through Google AdSense. Google may use cookies to show you relevant ads based on your browsing history. You can opt out of personalised advertising at google.com/settings/ads. We do not have access to or control over the cookies used by Google AdSense."],
              ["6. Data retention","We retain your email address for as long as you are subscribed to our alerts. You can request deletion at any time by emailing contact@migrantscholar.com. Anonymous analytics data is retained for 26 months as per Google Analytics default settings."],
              ["7. Your rights","You have the right to access, correct, or delete any personal data we hold about you. You can unsubscribe from alerts at any time using the unsubscribe link in any email we send. For any data requests, contact us at contact@migrantscholar.com."],
              ["8. Third party links","Our scholarship guides contain links to official university and government websites. We are not responsible for the privacy practices of these external sites. We recommend reviewing their privacy policies before submitting any personal information."],
              ["9. Children's privacy","MigrantScholar is not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately."],
              ["10. Changes to this policy","We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance of the updated policy."],
              ["11. Contact","For any privacy questions or requests: contact@migrantscholar.com"],
            ].map(([title, text]) => (
              <div key={title} style={{marginBottom:"1.5rem"}}>
                <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0D6E6E",marginBottom:".4rem"}}>{title}</h2>
                <p style={{fontSize:"13px",color:"#374151",lineHeight:1.75}}>{text}</p>
              </div>
            ))}
          </div>

          {/* Footer box */}
          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
            <p style={{fontSize:"11px",color:"#A7D4CC"}}>© 2026 MigrantScholar.com</p>
            <div style={{display:"flex",gap:"1rem"}}>
              <Link href="/terms" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>Terms</Link>
              <Link href="/about" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>About</Link>
              <Link href="/sitemap.xml" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>Sitemap</Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
