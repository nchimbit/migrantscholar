import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const listsData = {
  "top-10-fully-funded-scholarships-refugees": {
    title: "Top 10 Fully Funded Scholarships for Refugees 2026",
    description: "The 10 best fully funded scholarships for refugees worldwide covering full tuition, living costs, travel and health insurance. Verified and updated for 2026.",
    intro: "These are the 10 best fully funded scholarships specifically available to refugees. Each covers full tuition fees, a monthly living allowance, travel costs and health insurance — meaning you pay nothing.",
    scholarships: [
      { rank:1, name:"Chevening Scholarship", country:"🇬🇧 UK", funding:"Full tuition + £1,236/month", deadline:"November", link:"/universities/chevening", note:"UK government flagship scholarship. Open to refugees and migrants with leadership potential." },
      { rank:2, name:"DAAD Scholarship", country:"🇩🇪 Germany", funding:"Full tuition + €934/month", deadline:"October–November", link:"/universities/daad", note:"Germany's largest scholarship. Explicitly open to refugees and asylum seekers." },
      { rank:3, name:"Vanier Canada Graduate Scholarship", country:"🇨🇦 Canada", funding:"$50,000 CAD/year", deadline:"November", link:"/universities/vanier", note:"Canada's most prestigious PhD scholarship. Open to international students including migrants." },
      { rank:4, name:"Türkiye Bursları", country:"🇹🇷 Turkey", funding:"Full tuition + accommodation + flights", deadline:"February", link:"/universities/turkiye-burslari", note:"Open to 180+ nationalities. No IELTS required. Accommodation included." },
      { rank:5, name:"Australia Awards", country:"🇦🇺 Australia", funding:"Full tuition + living costs + travel", deadline:"April–June", link:"/universities/australia-awards", note:"Australian government scholarship. Covers full costs for students from developing countries." },
      { rank:6, name:"Oxford Sanctuary Scholarship", country:"🇬🇧 UK", funding:"Full tuition + £17,635/year", deadline:"March", link:"/universities/oxford", note:"University of Oxford scholarship specifically for refugees and asylum seekers." },
      { rank:7, name:"Fulbright Foreign Student Program", country:"🇺🇸 USA", funding:"Full tuition + living costs", deadline:"October", link:"/universities/fulbright", note:"US government scholarship for graduate students worldwide including migrants." },
      { rank:8, name:"Edinburgh Sanctuary Scholarship", country:"🇬🇧 UK", funding:"Full tuition + maintenance", deadline:"April", link:"/universities/university-of-edinburgh", note:"University of Edinburgh scholarship for asylum seekers and refugees in Scotland." },
      { rank:9, name:"Harvard Griffin GSAS Fellowship", country:"🇺🇸 USA", funding:"Full tuition + $45,000+/year", deadline:"December", link:"/universities/harvard", note:"Harvard provides full funding for all admitted PhD students including refugees." },
      { rank:10, name:"McGill Refugee Scholarship", country:"🇨🇦 Canada", funding:"Full tuition + CAD $15,000", deadline:"February", link:"/universities/mcgill", note:"McGill University dedicated scholarship for refugee students in Canada." },
    ]
  },
  "top-10-germany-scholarships-migrants": {
    title: "Top 10 Germany Scholarships for Migrants & Refugees 2026",
    description: "The 10 best scholarships in Germany for migrants, refugees and asylum seekers. Fully funded awards covering tuition, living costs and health insurance.",
    intro: "Germany is one of the most welcoming countries for migrant students, offering free tuition at public universities plus generous scholarship funding. These are the 10 best options for migrants and refugees.",
    scholarships: [
      { rank:1, name:"DAAD Development Scholarships", country:"🇩🇪 Germany", funding:"Full tuition + €934/month + health + travel", deadline:"October–November", link:"/universities/daad", note:"Germany's largest scholarship provider. Specifically open to refugees and displaced students." },
      { rank:2, name:"Deutschlandstipendium", country:"🇩🇪 Germany", funding:"€300/month for 1 year", deadline:"Varies by university", link:"/countries/Germany", note:"National scholarship funded by universities and private donors. Open to all students in Germany." },
      { rank:3, name:"Heinrich Böll Foundation Scholarship", country:"🇩🇪 Germany", funding:"€934/month + tuition support", deadline:"March and September", link:"/countries/Germany", note:"Green/social justice focused. Open to international students and refugees." },
      { rank:4, name:"Friedrich Ebert Foundation", country:"🇩🇪 Germany", funding:"€934/month + study allowance", deadline:"January and July", link:"/countries/Germany", note:"Social democratic values focus. Open to international students including migrants." },
      { rank:5, name:"Konrad Adenauer Foundation", country:"🇩🇪 Germany", funding:"€934/month + study support", deadline:"January and July", link:"/countries/Germany", note:"Open to international students with strong academic record." },
      { rank:6, name:"TUM Global Incentive Fund", country:"🇩🇪 Germany", funding:"Full tuition + monthly stipend", deadline:"January and July", link:"/universities/tu-munich", note:"Technical University of Munich scholarship for outstanding international students." },
      { rank:7, name:"Humboldt Refugee Scholarship", country:"🇩🇪 Germany", funding:"Full tuition + €750/month", deadline:"March", link:"/universities/humboldt-berlin", note:"Dedicated to refugee students at Humboldt University Berlin." },
      { rank:8, name:"DAAD Helmut Schmidt Programme", country:"🇩🇪 Germany", funding:"Full tuition + €934/month", deadline:"November", link:"/countries/Germany", note:"For public policy and good governance students from developing countries." },
      { rank:9, name:"Rosa Luxemburg Foundation", country:"🇩🇪 Germany", funding:"€934/month + project funding", deadline:"April and October", link:"/countries/Germany", note:"Left/progressive focus. Open to international students and activists." },
      { rank:10, name:"Avicenna Foundation", country:"🇩🇪 Germany", funding:"€300–€600/month", deadline:"Rolling", link:"/countries/Germany", note:"Specifically for Muslim students in Germany. Open to refugees and migrants." },
    ]
  },
  "top-10-usa-scholarships-migrants": {
    title: "Top 10 USA Scholarships for Migrants & Refugees 2026",
    description: "The 10 best scholarships in the USA for migrants, refugees, asylum seekers and international students. Fully funded awards at top American universities.",
    intro: "The USA offers some of the world's most generous scholarship funding for migrants and refugees. These top 10 awards provide full funding at America's leading universities.",
    scholarships: [
      { rank:1, name:"Fulbright Foreign Student Program", country:"🇺🇸 USA", funding:"Full tuition + living costs + health", deadline:"October", link:"/universities/fulbright", note:"US government's flagship scholarship. Open to graduate students from 160+ countries." },
      { rank:2, name:"Harvard Griffin GSAS Fellowship", country:"🇺🇸 USA", funding:"Full tuition + $45,000+/year", deadline:"December", link:"/universities/harvard", note:"Harvard provides full funding for all admitted PhD students including refugees." },
      { rank:3, name:"MIT Presidential Fellowship", country:"🇺🇸 USA", funding:"Full tuition + $45,000+/year", deadline:"December–January", link:"/universities/mit", note:"MIT fully funds all admitted PhD students through fellowships and assistantships." },
      { rank:4, name:"Columbia Scholarship for Displaced Students", country:"🇺🇸 USA", funding:"Full tuition + living costs", deadline:"January", link:"/universities/columbia", note:"Dedicated scholarship for displaced students and refugees at Columbia University." },
      { rank:5, name:"Joint Japan/World Bank Graduate Scholarship", country:"🇺🇸 USA", funding:"Full tuition + living costs + travel", deadline:"April", link:"/countries/USA", note:"For students from developing countries pursuing development-related Master's degrees." },
      { rank:6, name:"Aga Khan Foundation International Scholarship", country:"🇺🇸 USA", funding:"50% grant + 50% loan", deadline:"March", link:"/countries/USA", note:"For outstanding students from developing countries with no other funding sources." },
      { rank:7, name:"OAS Academic Scholarships", country:"🇺🇸 USA", funding:"Full tuition + stipend", deadline:"March", link:"/countries/USA", note:"Organization of American States scholarship for students from OAS member states." },
      { rank:8, name:"AAUW International Fellowship", country:"🇺🇸 USA", funding:"$20,000–$30,000/year", deadline:"November", link:"/countries/USA", note:"For women who are not US citizens pursuing graduate study in the USA." },
      { rank:9, name:"Hubert Humphrey Fellowship", country:"🇺🇸 USA", funding:"Full funding + living costs", deadline:"October", link:"/countries/USA", note:"For mid-career professionals from developing countries. Non-degree programme." },
      { rank:10, name:"Rotary Peace Fellowship", country:"🇺🇸 USA", funding:"Full tuition + living costs + travel", deadline:"November", link:"/countries/USA", note:"For peace and development professionals. 2-year Master's at partner universities." },
    ]
  },
  "top-10-women-scholarships-migrants": {
    title: "Top 10 Scholarships for Women Migrants & Refugees 2026",
    description: "The 10 best scholarships specifically for women migrants, refugees and asylum seekers. Fully funded awards worldwide covering tuition, living costs and more.",
    intro: "These scholarships are specifically designed for women migrants, refugees and asylum seekers — or prioritize women applicants. All are fully or partially funded.",
    scholarships: [
      { rank:1, name:"Chevening Women in STEM Scholarship", country:"🇬🇧 UK", funding:"Full tuition + £1,236/month", deadline:"November", link:"/universities/chevening", note:"Chevening prioritizes women applicants in STEM fields from developing countries." },
      { rank:2, name:"AAUW International Fellowship", country:"🇺🇸 USA", funding:"$20,000–$30,000/year", deadline:"November", link:"/countries/USA", note:"Exclusively for women who are not US citizens pursuing graduate study in the USA." },
      { rank:3, name:"L'Oréal-UNESCO For Women in Science", country:"🌍 International", funding:"€15,000–€100,000", deadline:"Varies by country", link:"/by-eligibility/without-ielts", note:"For women scientists at postdoctoral level. Available in 110+ countries." },
      { rank:4, name:"DAAD Scholarship — Women Priority", country:"🇩🇪 Germany", funding:"Full tuition + €934/month", deadline:"October–November", link:"/universities/daad", note:"DAAD actively encourages women applicants, especially in STEM and social sciences." },
      { rank:5, name:"Türkiye Bursları Women's Programme", country:"🇹🇷 Turkey", funding:"Full tuition + accommodation + stipend", deadline:"February", link:"/universities/turkiye-burslari", note:"Turkey's government scholarship is open to women from 180+ countries." },
      { rank:6, name:"Australian Awards — Women Focus", country:"🇦🇺 Australia", funding:"Full tuition + living costs + travel", deadline:"April–June", link:"/universities/australia-awards", note:"Australia Awards prioritizes women applicants from developing countries in all fields." },
      { rank:7, name:"Wellcome Trust Fellowships", country:"🇬🇧 UK", funding:"Full research costs + salary", deadline:"Rolling", link:"/countries/UK", note:"For women researchers in biomedical sciences including those from refugee backgrounds." },
      { rank:8, name:"OFID Scholarship Award", country:"🌍 International", funding:"$50,000 total", deadline:"June", link:"/by-funding/fully-funded", note:"OPEC Fund scholarship for students from developing countries. Women encouraged." },
      { rank:9, name:"Soroptimist Live Your Dream Award", country:"🇺🇸 USA", funding:"$1,000–$10,000", deadline:"November", link:"/countries/USA", note:"For women who are the primary financial support for themselves and their dependents." },
      { rank:10, name:"Google Women Techmakers Scholarship", country:"🌍 International", funding:"$10,000", deadline:"December", link:"/by-eligibility/without-ielts", note:"For women pursuing computer science or related technical degrees worldwide." },
    ]
  },
  "top-10-stem-scholarships-migrants": {
    title: "Top 10 STEM Scholarships for Migrants & Refugees 2026",
    description: "The 10 best STEM scholarships for migrants, refugees and asylum seekers in engineering, science, technology and mathematics worldwide.",
    intro: "STEM scholarships for migrants and refugees offer some of the highest funding amounts globally. These top 10 awards support migrants pursuing science, technology, engineering and mathematics degrees.",
    scholarships: [
      { rank:1, name:"MIT Presidential Fellowship (STEM)", country:"🇺🇸 USA", funding:"Full tuition + $45,000+/year", deadline:"December–January", link:"/universities/mit", note:"MIT fully funds all STEM PhD students. World's top engineering university." },
      { rank:2, name:"TUM Global Incentive Fund", country:"🇩🇪 Germany", funding:"Full tuition + monthly stipend", deadline:"January and July", link:"/universities/tu-munich", note:"TU Munich is Germany's top technical university. Strong engineering and computer science." },
      { rank:3, name:"DAAD STEM Scholarships", country:"🇩🇪 Germany", funding:"Full tuition + €934/month", deadline:"October–November", link:"/universities/daad", note:"DAAD prioritizes STEM subjects especially engineering, natural sciences and agriculture." },
      { rank:4, name:"Vanier Canada (STEM Priority)", country:"🇨🇦 Canada", funding:"$50,000 CAD/year for 3 years", deadline:"November", link:"/universities/vanier", note:"Vanier scholarship prioritizes STEM research. Canada's top doctoral award." },
      { rank:5, name:"Google PhD Fellowship", country:"🌍 International", funding:"Full tuition + $35,000/year", deadline:"December", link:"/countries/USA", note:"For outstanding PhD students in computer science and related STEM fields." },
      { rank:6, name:"Microsoft Research PhD Fellowship", country:"🌍 International", funding:"Full tuition + $42,000/year", deadline:"October", link:"/countries/USA", note:"For exceptional PhD students in computer science, engineering and mathematics." },
      { rank:7, name:"Fulbright STEM Scholarship", country:"🇺🇸 USA", funding:"Full tuition + living costs", deadline:"October", link:"/universities/fulbright", note:"Fulbright prioritizes STEM applicants. Open to graduate students from 160+ countries." },
      { rank:8, name:"RWTH Aachen STEM Scholarship", country:"🇩🇪 Germany", funding:"Full tuition + €800/month", deadline:"March", link:"/countries/Germany", note:"Germany's top engineering university. Dedicated scholarships for international STEM students." },
      { rank:9, name:"Australia Awards (STEM Focus)", country:"🇦🇺 Australia", funding:"Full tuition + living costs + travel", deadline:"April–June", link:"/universities/australia-awards", note:"Australia prioritizes STEM applicants especially from Pacific and Southeast Asian countries." },
      { rank:10, name:"Chevening STEM Scholarship", country:"🇬🇧 UK", funding:"Full tuition + £1,236/month", deadline:"November", link:"/universities/chevening", note:"Chevening actively recruits STEM students from developing countries and migrant backgrounds." },
    ]
  },
};

export default function ListPage({ list, info, relatedPosts }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>{info.title} — MigrantScholar</title>
        <meta name="description" content={info.description} />
        <link rel="canonical" href={`https://migrantscholar.com/lists/${list}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"ItemList",
          "name":info.title,
          "description":info.description,
          "numberOfItems":info.scholarships.length,
          "itemListElement":info.scholarships.map((s,i)=>({
            "@type":"ListItem",
            "position":s.rank,
            "name":s.name,
            "description":`${s.funding} — ${s.note}`
          }))
        })}} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>Top 10 List · 2026</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem",lineHeight:1.3}}>{info.title}</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{info.intro}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          <Link href="/guides" style={{color:"#0D6E6E",textDecoration:"none"}}>Guides</Link> ›{" "}
          Top 10 Lists
        </div>

        {/* Scholarship list */}
        <div style={{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"2rem"}}>
          {info.scholarships.map(s=>(
            <Link key={s.rank} href={s.link} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",textDecoration:"none",display:"flex",gap:"1rem",alignItems:"flex-start",color:"inherit"}}>
              <div style={{width:"40px",height:"40px",background:"#0D6E6E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"1rem",fontWeight:800,flexShrink:0}}>#{s.rank}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".25rem",flexWrap:"wrap"}}>
                  <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A"}}>{s.name}</h2>
                  <span style={{fontSize:"11px",color:"#6b7280"}}>{s.country}</span>
                </div>
                <p style={{fontSize:"12px",color:"#374151",lineHeight:1.6,marginBottom:".5rem"}}>{s.note}</p>
                <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
                  <span style={{fontSize:"11px",fontWeight:700,color:"#166534",background:"#F0FDF4",padding:"3px 10px",borderRadius:"20px"}}>💰 {s.funding}</span>
                  <span style={{fontSize:"11px",color:"#6b7280",background:"#f3f4f6",padding:"3px 10px",borderRadius:"20px"}}>📅 {s.deadline}</span>
                </div>
              </div>
              <span style={{fontSize:"12px",color:"#0D6E6E",fontWeight:700,flexShrink:0}}>View →</span>
            </Link>
          ))}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <>
            <h2 style={{fontSize:"1rem",fontWeight:700,color:"#0A2A2A",marginBottom:"1rem"}}>Related Scholarship Guides</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
              {relatedPosts.map(post=>(
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
                  <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                    <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
                  </div>
                  <div style={{padding:"1rem"}}>
                    <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                    <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".5rem"}}>{post.excerpt.slice(0,100)}...</p>
                    <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Never miss a deadline</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when these scholarships open for applications.</p>
          </div>
          <Link href="/alerts" style={{background:"#0D6E6E",color:"#fff",padding:"10px 24px",borderRadius:"6px",fontSize:"13px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>Get Free Alerts</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      "top-10-fully-funded-scholarships-refugees",
      "top-10-germany-scholarships-migrants",
      "top-10-usa-scholarships-migrants",
      "top-10-women-scholarships-migrants",
      "top-10-stem-scholarships-migrants",
    ].map(list=>({params:{list}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = listsData[params.list];
  if (!info) return { notFound: true };
  const relatedPosts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return text.includes("fully funded") || text.includes("refugee") || text.includes("scholarship");
  }).slice(0, 3);
  return { props: { list: params.list, info, relatedPosts }, revalidate: 3600 };
}
