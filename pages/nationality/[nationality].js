import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, formatDate } from "../../lib/posts";

const nationalityData = {
  "syrian": { name:"Syrian", adjective:"Syrian", region:"Middle East", population:"6.8M+ displaced", note:"Syrian refugees are among the most widely supported by scholarship programmes worldwide. DAAD, Chevening, and many UK Sanctuary Scholarships explicitly welcome Syrian applicants." },
  "afghan": { name:"Afghan", adjective:"Afghan", region:"South Asia", population:"5.7M+ displaced", note:"Afghan refugees and asylum seekers can access scholarships in Germany, UK, Canada and Australia. Many programmes have specific provisions for Afghan students." },
  "sudanese": { name:"Sudanese", adjective:"Sudanese", region:"Africa", population:"3.7M+ displaced", note:"Sudanese students and refugees can access Australia Awards, DAAD scholarships and UK Sanctuary Scholarships. Many programmes welcome applicants from Sudan." },
  "somali": { name:"Somali", adjective:"Somali", region:"East Africa", population:"3.0M+ displaced", note:"Somali refugees can access scholarships across the UK, Germany, Canada and Australia. Several programmes specifically target East African displaced students." },
  "congolese": { name:"Congolese", adjective:"Congolese", region:"Central Africa", population:"5.5M+ displaced", note:"Congolese refugees are eligible for Australia Awards, DAAD and many UK university Sanctuary Scholarships covering full tuition and living costs." },
  "venezuelan": { name:"Venezuelan", adjective:"Venezuelan", region:"Latin America", population:"7.7M+ displaced", note:"Venezuelan migrants and refugees can access Fulbright scholarships in the USA, Canada scholarships and other awards for Latin American displaced students." },
  "ukrainian": { name:"Ukrainian", adjective:"Ukrainian", region:"Eastern Europe", population:"6.0M+ displaced", note:"Ukrainian refugees can access emergency scholarships at UK, German, Canadian and Australian universities. Many institutions created specific Ukrainian refugee scholarship programmes." },
  "rohingya": { name:"Rohingya", adjective:"Rohingya", region:"Southeast Asia", population:"1.1M+ displaced", note:"Rohingya refugees can access scholarships through UNHCR-partnered programmes, Australian Awards and UK Sanctuary Scholarships for stateless and refugee students." },
  "iraqi": { name:"Iraqi", adjective:"Iraqi", region:"Middle East", population:"3.9M+ displaced", note:"Iraqi refugees and asylum seekers can access DAAD scholarships in Germany, UK Sanctuary Scholarships, and Australia Awards. Many programmes have specific provisions for Iraqi displaced students." },
  "eritrean": { name:"Eritrean", adjective:"Eritrean", region:"East Africa", population:"570,000+ displaced", note:"Eritrean refugees are among the most supported in Europe. UK, Germany and Canada offer specific scholarships for Eritrean asylum seekers and refugees." },
  "south-sudanese": { name:"South Sudanese", adjective:"South Sudanese", region:"East Africa", population:"2.3M+ displaced", note:"South Sudanese refugees can access Australia Awards, DAAD scholarships and UK Sanctuary Scholarships. Several East African displacement programmes specifically welcome South Sudanese applicants." },
  "myanmar": { name:"Myanmar", adjective:"Myanmar", region:"Southeast Asia", population:"1.5M+ displaced", note:"Myanmar refugees and displaced students can access Australia Awards, DAAD scholarships and several UK university Sanctuary Scholarships specifically for Southeast Asian displaced students." },
  "ethiopian": { name:"Ethiopian", adjective:"Ethiopian", region:"East Africa", population:"1.2M+ displaced", note:"Ethiopian refugees and migrants can access Australia Awards covering full tuition and living costs, DAAD scholarships in Germany, and UK Sanctuary Scholarships at over 70 universities." },
  "nigerian": { name:"Nigerian", adjective:"Nigerian", region:"West Africa", population:"1.8M+ displaced", note:"Nigerian students and refugees can access Commonwealth Scholarships, Chevening, DAAD and Australia Awards. Nigeria has one of the largest scholarship-eligible student populations globally." },
  "pakistani": { name:"Pakistani", adjective:"Pakistani", region:"South Asia", population:"3.3M+ displaced", note:"Pakistani students and refugees can access Commonwealth Scholarships, Chevening, DAAD and Fulbright scholarships. Many programmes are open to Pakistani nationals and displaced persons." },
  "kenyan": { name:"Kenyan", adjective:"Kenyan", region:"East Africa", population:"480,000+ displaced", note:"Kenyan students and refugees can access Australia Awards, Chevening, DAAD and Commonwealth Scholarships. Kenya has one of the strongest scholarship ecosystems in East Africa." },
  "bangladeshi": { name:"Bangladeshi", adjective:"Bangladeshi", region:"South Asia", population:"900,000+ displaced", note:"Bangladeshi students and refugees can access Commonwealth Scholarships, DAAD, Chevening and Australia Awards. Many programmes specifically welcome Bangladeshi applicants." },
  "zimbabwean": { name:"Zimbabwean", adjective:"Zimbabwean", region:"Southern Africa", population:"580,000+ displaced", note:"Zimbabwean refugees and students can access Australia Awards, DAAD scholarships and UK Sanctuary Scholarships. Several Southern African displacement programmes welcome Zimbabwean applicants." },
  "yemeni": { name:"Yemeni", adjective:"Yemeni", region:"Middle East", population:"4.5M+ displaced", note:"Yemeni refugees are among the most supported globally. DAAD, UK Sanctuary Scholarships and many emergency funding programmes specifically welcome Yemeni displaced students." },
  "libyan": { name:"Libyan", adjective:"Libyan", region:"North Africa", population:"200,000+ displaced", note:"Libyan students and refugees can access DAAD scholarships in Germany, UK Sanctuary Scholarships and several North African displacement programmes." },
  "burundian": { name:"Burundian", adjective:"Burundian", region:"East Africa", population:"400,000+ displaced", note:"Burundian refugees can access Australia Awards, DAAD scholarships and UK Sanctuary Scholarships. Several East African refugee programmes specifically welcome Burundian applicants." },
};

export default function NationalityPage({ nationality, posts, info }) {
  if (!info) return null;
  return (
    <>
      <Head>
        <title>Scholarships for {info.adjective} Students & Refugees — MigrantScholar</title>
        <meta name="description" content={`Verified scholarships for ${info.adjective} students, refugees and migrants. Find fully funded awards in UK, Germany, Canada, Australia and USA.`} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/nationality/${nationality}`} />
      </Head>
      <Navbar />

      <div style={{background:"#E6F4F1",padding:"1.5rem 2rem 0"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{background:"linear-gradient(135deg,#0D6E6E 0%,#0A5555 100%)",borderRadius:"14px",padding:"2rem",textAlign:"center"}}>
            <div style={{display:"inline-block",background:"#F5A623",color:"#0A2A2A",fontSize:"11px",fontWeight:700,padding:"4px 12px",borderRadius:"4px",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:".08em"}}>
              {info.region} · {info.population}
            </div>
            <h1 style={{fontSize:"1.75rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>Scholarships for {info.adjective} Students & Refugees</h1>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.8)",maxWidth:"560px",margin:"0 auto"}}>{info.note}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"#0D6E6E",textDecoration:"none"}}>Home</Link> ›{" "}
          Scholarships for {info.adjective} Students
        </div>

        {/* Best scholarships for this nationality */}
        <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem",marginBottom:"1.5rem"}}>
          <h2 style={{fontSize:".95rem",fontWeight:700,color:"#0A2A2A",marginBottom:".875rem"}}>Best Scholarships for {info.adjective} Refugees & Migrants</h2>
          {[
            ["🇬🇧 UK Sanctuary Scholarships","Full tuition + maintenance","Open to asylum seekers and refugees","/countries/UK"],
            ["🇩🇪 DAAD Germany","Full tuition + €934/month","Open to refugees and displaced students","/countries/Germany"],
            ["🇨🇦 Vanier Canada","$50,000/year for 3 years","PhD scholarships for international students","/countries/Canada"],
            ["🇦🇺 Australia Awards","Full tuition + living costs","For students from developing countries","/countries/Australia"],
            ["🇺🇸 Fulbright USA","Full tuition + living costs","For graduate students worldwide","/countries/USA"],
          ].map(([name,funding,elig,href])=>(
            <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".625rem 0",borderBottom:"1px solid #f6f9f8",gap:"1rem",flexWrap:"wrap"}}>
              <div>
                <strong style={{fontSize:"13px",color:"#0A2A2A",display:"block"}}>{name}</strong>
                <span style={{fontSize:"11px",color:"#6b7280"}}>{elig}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",flexShrink:0}}>
                <span style={{fontSize:"11px",color:"#166534",fontWeight:600,background:"#F0FDF4",padding:"3px 10px",borderRadius:"20px"}}>{funding}</span>
                <Link href={href} style={{fontSize:"11px",color:"#0D6E6E",fontWeight:700,textDecoration:"none"}}>View →</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Related posts */}
        <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:"1rem"}}>Related Scholarship Guides</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {posts.length > 0 ? posts.map(post=>(
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",overflow:"hidden",textDecoration:"none",display:"block",color:"inherit"}}>
              <div style={{background:"#E6F4F1",padding:".75rem 1rem",display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase"}}>{post.country}</span>
                <span style={{fontSize:"10px",color:"#6b7280"}}>{post.readingTime} min read</span>
              </div>
              <div style={{padding:"1rem"}}>
                <h3 style={{fontSize:".85rem",fontWeight:700,color:"#0A2A2A",lineHeight:1.4,marginBottom:".4rem"}}>{post.title}</h3>
                <p style={{fontSize:"11px",color:"#6b7280",lineHeight:1.55,marginBottom:".625rem"}}>{post.excerpt.slice(0,100)}...</p>
                <span style={{display:"inline-block",background:"#0D6E6E",color:"#fff",fontSize:"11px",fontWeight:700,padding:"5px 12px",borderRadius:"6px"}}>Read More →</span>
              </div>
            </Link>
          )) : (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"2rem",color:"#6b7280"}}>
              <p>Browse our full scholarship database for options available to {info.adjective} students.</p>
              <Link href="/blog" style={{color:"#0D6E6E",fontWeight:600}}>Browse all scholarships →</Link>
            </div>
          )}
        </div>

        <div style={{background:"#F5A623",borderRadius:"12px",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#0A2A2A",marginBottom:".25rem"}}>Get alerts for new scholarships</h2>
            <p style={{fontSize:"13px",color:"rgba(10,42,42,.7)"}}>Free alerts when new scholarships open for {info.adjective} refugees and migrants.</p>
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
    paths: ["syrian","afghan","sudanese","somali","congolese","venezuelan","ukrainian","rohingya","iraqi","eritrean","south-sudanese","myanmar","ethiopian","nigerian","pakistani","kenyan","bangladeshi","zimbabwean","yemeni","libyan","burundian"].map(nationality=>({params:{nationality}})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const info = nationalityData[params.nationality];
  if (!info) return { notFound: true };
  const posts = allPosts.filter(p => {
    const text = (p.title + " " + p.excerpt).toLowerCase();
    return text.includes("refugee") || text.includes("asylum") || text.includes("migrant");
  }).slice(0, 6);
  return { props: { nationality: params.nationality, posts, info }, revalidate: 3600 };
}
