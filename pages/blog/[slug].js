import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../../components/Layout";
import { getAllPosts, getPostBySlug, formatDate } from "../../lib/posts";

const countryColors = {
  UK:{bg:"#DBEAFE",color:"#1E40AF"},
  Germany:{bg:"#EEF2FF",color:"#3730A3"},
  Canada:{bg:"#FFF7ED",color:"#9A3412"},
  Australia:{bg:"#F0FDF4",color:"#166534"},
  USA:{bg:"#FDF4FF",color:"#7E22CE"},
  Turkey:{bg:"#FFFBEB",color:"#92400E"},
};

function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm,"<h3 style='font-size:.95rem;font-weight:500;color:#1E3A8A;margin:1.25rem 0 .4rem'>$1</h3>")
    .replace(/^## (.+)$/gm,"<h2 style='font-size:1.05rem;font-weight:500;color:#1E3A8A;margin:1.75rem 0 .5rem;padding-bottom:.4rem;border-bottom:0.5px solid #DBEAFE'>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g,"<strong style='font-weight:500;color:#1E3A8A'>$1</strong>")
    .replace(/\*(.+?)\*/g,"<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:#1D4ED8;text-decoration:underline">$1</a>')
    .replace(/^- (.+)$/gm,"<li style='margin-bottom:.25rem;color:#374151'>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm,"<li style='margin-bottom:.25rem;color:#374151'>$2</li>")
    .replace(/(<li.*<\/li>\n?)+/g,m=>`<ul style='padding-left:1.25rem;margin:.5rem 0'>${m}</ul>`)
    .replace(/\n\n/g,"</p><p style='margin-bottom:.75rem;color:#374151;font-size:13px;line-height:1.65'>")
    .replace(/^(?!<[hup])(.+)$/gm,"<p style='margin-bottom:.75rem;color:#374151;font-size:13px;line-height:1.65'>$1</p>")
    .replace(/<p style[^>]+><\/p>/g,"");
}

export default function BlogPost({ post, related }) {
  if (!post) return null;
  const c = countryColors[post.country] || {bg:"#DBEAFE",color:"#1E40AF"};

  return (
    <>
      <Head>
        <title>{post.title} — MigrantScholar</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/blog/${post.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:post.title,datePublished:post.date,publisher:{"@type":"Organization",name:"MigrantScholar",url:"https://migrantscholar.vercel.app"}})}} />
      </Head>
      <Navbar />

      <div style={{background:"#EFF6FF",minHeight:"100vh",padding:"1rem 2rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>

          {/* Breadcrumb box */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".5rem 1rem",marginBottom:"1rem",fontSize:"11px",color:"#93C5FD",display:"flex",alignItems:"center",gap:.5}}>
            <Link href="/" style={{color:"#3B82F6",textDecoration:"none"}}>Home</Link>
            <span style={{margin:"0 .35rem"}}>›</span>
            <Link href="/blog" style={{color:"#3B82F6",textDecoration:"none"}}>Scholarships</Link>
            <span style={{margin:"0 .35rem"}}>›</span>
            <span>{post.country}</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:"1rem",alignItems:"start"}}>

            {/* Main content box */}
            <div>
              <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem 1.5rem",marginBottom:"1rem"}}>
                <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".75rem"}}>
                  <span style={{fontSize:"10px",fontWeight:500,padding:"2px 7px",borderRadius:"4px",background:c.bg,color:c.color}}>{post.country}</span>
                  {(post.tags||[]).slice(0,3).map(t=>(
                    <span key={t} style={{fontSize:"10px",padding:"2px 7px",borderRadius:"4px",background:"#F1F5F9",color:"#64748b"}}>{t}</span>
                  ))}
                </div>
                <h1 style={{fontSize:"1.1rem",fontWeight:500,color:"#1E3A8A",lineHeight:1.3,marginBottom:".75rem"}}>{post.title}</h1>
                <div style={{display:"flex",gap:"1rem",fontSize:"11px",color:"#93C5FD",paddingBottom:".75rem",borderBottom:"0.5px solid #DBEAFE",marginBottom:"1.25rem"}}>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <div style={{background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:".75rem",marginBottom:"1.25rem",fontSize:"11px",color:"#64748b"}}>Advertisement</div>
                <article dangerouslySetInnerHTML={{__html:mdToHtml(post.content)}} />
                <div style={{background:"#EFF6FF",border:"0.5px solid #BFDBFE",borderRadius:"6px",padding:".75rem",marginTop:"1.25rem",fontSize:"11px",color:"#64748b"}}>Advertisement</div>
              </div>

              {/* Back link */}
              <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".75rem 1rem"}}>
                <Link href="/blog" style={{fontSize:"12px",color:"#1D4ED8",fontWeight:500,textDecoration:"none"}}>← Back to all guides</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              {related && related.length > 0 && (
                <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1rem"}}>
                  <div style={{fontSize:"10px",fontWeight:600,color:"#3B82F6",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".75rem"}}>Related guides</div>
                  {related.map(p=>{
                    const rc = countryColors[p.country] || {bg:"#DBEAFE",color:"#1E40AF"};
                    return (
                      <Link key={p.slug} href={`/blog/${p.slug}`} style={{display:"block",padding:".75rem 0",borderBottom:"0.5px solid #EFF6FF",textDecoration:"none"}}
                        onMouseEnter={e=>e.currentTarget.style.opacity=".75"}
                        onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                      >
                        <span style={{fontSize:"9px",fontWeight:500,padding:"1px 6px",borderRadius:"4px",background:rc.bg,color:rc.color,display:"inline-block",marginBottom:".3rem"}}>{p.country}</span>
                        <div style={{fontSize:"11px",fontWeight:500,color:"#1E3A8A",lineHeight:1.4}}>{p.title}</div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* CTA sidebar */}
              <div style={{background:"#DBEAFE",border:"0.5px solid #BFDBFE",borderRadius:"10px",padding:"1rem"}}>
                <h3 style={{fontSize:".8rem",fontWeight:500,color:"#1E3A8A",marginBottom:".35rem"}}>Never miss a deadline</h3>
                <p style={{fontSize:"11px",color:"#3B82F6",marginBottom:".75rem"}}>Free alerts for new scholarships.</p>
                <input type="email" placeholder="your@email.com" style={{width:"100%",background:"#fff",border:"0.5px solid #BFDBFE",color:"#1E3A8A",padding:"6px 10px",borderRadius:"6px",fontSize:"11px",outline:"none",marginBottom:".4rem"}} />
                <button style={{width:"100%",background:"#1E40AF",color:"#fff",border:"none",padding:"6px",borderRadius:"6px",fontSize:"11px",fontWeight:500,cursor:"pointer"}}>Get free alerts</button>
              </div>
            </div>
          </div>

          {/* Footer box */}
          <div style={{background:"#fff",border:"0.5px solid #BFDBFE",borderRadius:"8px",padding:".875rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginTop:"1rem"}}>
            <p style={{fontSize:"11px",color:"#93C5FD"}}>© 2026 MigrantScholar.com — Free, independent scholarship resource</p>
            <div style={{display:"flex",gap:"1rem"}}>
              <Link href="/about" style={{fontSize:"11px",color:"#3B82F6",textDecoration:"none"}}>About</Link>
              <Link href="/sitemap.xml" style={{fontSize:"11px",color:"#3B82F6",textDecoration:"none"}}>Sitemap</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return { paths: posts.map(p=>({params:{slug:p.slug}})), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  const allPosts = getAllPosts();
  const related = allPosts.filter(p=>p.slug!==post.slug&&p.country===post.country).slice(0,4);
  return { props: { post, related }, revalidate: 3600 };
}
