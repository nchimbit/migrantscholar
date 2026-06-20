import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../components/Layout";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use — MigrantScholar</title>
        <meta name="description" content="MigrantScholar terms of use. Read our terms before using our scholarship resource." />
      </Head>
      <Navbar />
      <div style={{background:"#E6F4F1",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Breadcrumb */}
          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"8px",padding:".5rem 1rem",marginBottom:"1rem",fontSize:"11px",color:"#A7D4CC",display:"flex",alignItems:"center",gap:".35rem"}}>
            <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link>
            <span>›</span><span>Terms of Use</span>
          </div>

          <div style={{background:"#fff",border:"0.5px solid #A7D4CC",borderRadius:"10px",padding:"2rem",marginBottom:"1rem"}}>
            <div style={{display:"inline-block",background:"#E6F4F1",border:"0.5px solid #A7D4CC",color:"#0D6E6E",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",marginBottom:".75rem",fontWeight:600}}>Legal</div>
            <h1 style={{fontSize:"1.35rem",fontWeight:700,color:"#0A2A2A",marginBottom:".25rem"}}>Terms of Use</h1>
            <p style={{fontSize:"11px",color:"#A7D4CC",marginBottom:"2rem"}}>Last updated: 10 June 2026</p>

            {[
              ["1. Acceptance of terms","By accessing and using MigrantScholar (migrantscholar.com), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our site."],
              ["2. About MigrantScholar","MigrantScholar is a free, independent scholarship information resource. We publish scholarship guides for migrants, refugees, and asylum seekers. We are not a scholarship provider, educational institution, or government body."],
              ["3. Information accuracy","We make every effort to ensure the scholarship information on this site is accurate and up to date. However, scholarship eligibility, deadlines, and coverage amounts can change without notice. Always verify information directly with the official scholarship provider before applying. MigrantScholar is not responsible for errors or omissions in our content."],
              ["4. No guarantee of results","Using MigrantScholar does not guarantee that you will receive any scholarship. We provide information only. Scholarship decisions are made entirely by the awarding institution or government body. We have no influence over scholarship outcomes."],
              ["5. External links","Our guides contain links to official university and government websites. These links are provided for convenience. We are not responsible for the content, accuracy, or availability of external websites. Linking to an external site does not imply endorsement."],
              ["6. Intellectual property","All content on MigrantScholar — including text, guides, and design — is owned by MigrantScholar or its content providers. You may share links to our content and quote brief excerpts with attribution. You may not reproduce our guides in full without written permission."],
              ["7. Advertising","MigrantScholar displays advertisements through Google AdSense. Advertisements are clearly marked. We do not endorse any advertised products or services. Advertisers have no influence over our editorial content."],
              ["8. Email alerts","If you subscribe to our scholarship alerts, you agree to receive periodic emails about new scholarship opportunities. You can unsubscribe at any time using the link in any email. We will not share your email address with third parties."],
              ["9. Limitation of liability","MigrantScholar is provided on an as-is basis. To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of this site or reliance on its content, including missed scholarship deadlines or unsuccessful applications."],
              ["10. Changes to terms","We may update these terms from time to time. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance of the updated terms."],
              ["11. Governing law","These terms are governed by the laws of Tanzania. Any disputes will be resolved under Tanzanian jurisdiction."],
              ["12. Contact","For any questions about these terms: contact@migrantscholar.com"],
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
              <Link href="/privacy" style={{fontSize:"11px",color:"#0D6E6E",textDecoration:"none"}}>Privacy Policy</Link>
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
