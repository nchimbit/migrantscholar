import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "../../components/Layout";
import { getAllPosts, getPostBySlug, formatDate } from "../../lib/posts";

const countryColors = {
  UK:{bg:"#0D6E6E"}, Germany:{bg:"#3730A3"}, Canada:{bg:"#9A3412"},
  Australia:{bg:"#166534"}, USA:{bg:"#7E22CE"}, Turkey:{bg:"#92400E"},
};

function extractFAQSchema(content) {
  try {
    const faqMatch = content.match(/Frequently Asked Questions[\s\S]*?(?=

[A-Z]|$)/i);
    if (!faqMatch) return null;
    const faqText = faqMatch[0];
    const pairs = [];
    const qaRegex = /Q:\s*(.+?)\s*A:\s*(.+?)(?=\s*Q:|$)/gs;
    let match;
    while ((match = qaRegex.exec(faqText)) !== null) {
      pairs.push({ question: match[1].trim(), answer: match[2].trim() });
    }
    if (pairs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": pairs.map(p => ({
        "@type": "Question",
        "name": p.question,
        "acceptedAnswer": { "@type": "Answer", "text": p.answer }
      }))
    };
  } catch(e) { return null; }
}

function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm,"<h3 style='font-size:1rem;font-weight:700;color:#0D6E6E;margin:1.5rem 0 .5rem'>$1</h3>")
    .replace(/^## (.+)$/gm,"<h2 style='font-size:1.15rem;font-weight:800;color:#0A2A2A;margin:2rem 0 .625rem;padding-bottom:.5rem;border-bottom:2px solid #E6F4F1'>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g,"<strong style='font-weight:700;color:#0A2A2A'>$1</strong>")
    .replace(/\*(.+?)\*/g,"<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:#0D6E6E;text-decoration:underline;font-weight:600">$1</a>')
    .replace(/^- (.+)$/gm,"<li style='margin-bottom:.35rem;color:#374151'>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm,"<li style='margin-bottom:.35rem;color:#374151'>$2</li>")
    .replace(/(<li.*<\/li>\n?)+/g,m=>`<ul style='padding-left:1.5rem;margin:.75rem 0'>${m}</ul>`)
    .replace(/\n\n/g,"</p><p style='margin-bottom:1rem;color:#374151;font-size:14px;line-height:1.75'>")
    .replace(/^(?!<[hup])(.+)$/gm,"<p style='margin-bottom:1rem;color:#374151;font-size:14px;line-height:1.75'>$1</p>")
    .replace(/<p style[^>]+><\/p>/g,"");
}

export default function BlogPost({ post, related }) {
  if (!post) return null;
  const c = countryColors[post.country] || {bg:"#0D6E6E"};

  return (
    <>
      <Head>
        <title>{post.title} — MigrantScholar</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={`https://migrantscholar.vercel.app/blog/${post.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:post.title,datePublished:post.date,publisher:{"@type":"Organization",name:"MigrantScholar",url:"https://migrantscholar.vercel.app"}})}} />
        {extractFAQSchema(post.content) && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(extractFAQSchema(post.content))}} />
        )}
      </Head>
      <Navbar />

      {/* Hero strip */}
      <div style={{background:c.bg,padding:"1.75rem 2rem"}}>
        <div style={{maxWidth:"1080px",margin:"0 auto"}}>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,.7)",marginBottom:".75rem"}}>
            <Link href="/" style={{color:"rgba(255,255,255,.85)",textDecoration:"none"}}>Home</Link> ›{" "}
            <Link href="/blog" style={{color:"rgba(255,255,255,.85)",textDecoration:"none"}}>Scholarships</Link> › {post.country}
          </div>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".75rem"}}>
            <span style={{fontSize:"10px",fontWeight:700,color:"#fff",background:"rgba(255,255,255,.2)",padding:"3px 10px",borderRadius:"4px",textTransform:"uppercase"}}>{post.country}</span>

          </div>
          <h1 style={{fontSize:"1.5rem",fontWeight:900,color:"#fff",lineHeight:1.3,marginBottom:".5rem",letterSpacing:"-0.01em"}}>{post.title}</h1>
          <div style={{display:"flex",gap:"1rem",fontSize:"12px",color:"rgba(255,255,255,.7)"}}>
            <span>Published {formatDate(post.date)}</span>
            <span>{post.readingTime} min read</span>
            <span>✓ Verified by MigrantScholar Team</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1080px",margin:"0 auto",padding:"2rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:"1.5rem",alignItems:"start"}}>

          {/* Main content */}
          <div>
            <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.75rem",marginBottom:"1rem"}}>
              <div style={{background:"#E6F4F1",border:"1px dashed #A7D4CC",borderRadius:"8px",padding:".75rem",marginBottom:"1.5rem",fontSize:"11px",color:"#6b7280",textAlign:"center"}}>Advertisement</div>
              <article dangerouslySetInnerHTML={{__html:mdToHtml(post.content)}} />
              <div style={{background:"#E6F4F1",border:"1px dashed #A7D4CC",borderRadius:"8px",padding:".75rem",marginTop:"1.5rem",fontSize:"11px",color:"#6b7280",textAlign:"center"}}>Advertisement</div>
            </div>
            <Link href="/blog" style={{display:"inline-block",background:"#fff",border:"1.5px solid #0D6E6E",borderRadius:"8px",padding:".625rem 1.25rem",fontSize:"13px",color:"#0D6E6E",fontWeight:700,textDecoration:"none"}}>← Back to all guides</Link>
          </div>

          {/* Sidebar */}
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {related && related.length > 0 && (
              <div style={{background:"#fff",border:"1.5px solid #e2f0f0",borderRadius:"10px",padding:"1.25rem"}}>
                <div style={{fontSize:"10px",fontWeight:700,color:"#0D6E6E",textTransform:"uppercase",letterSpacing:".08em",marginBottom:".75rem"}}>Related guides</div>
                {related.map(p=>{
                  const rc = countryColors[p.country] || {bg:"#0D6E6E"};
                  return (
                    <Link key={p.slug} href={`/blog/${p.slug}`} style={{display:"block",padding:".75rem 0",borderBottom:"1px solid #f0faf9",textDecoration:"none"}}>
                      <span style={{fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",background:rc.bg,color:"#fff",display:"inline-block",marginBottom:".4rem"}}>{p.country}</span>
                      <div style={{fontSize:"12px",fontWeight:700,color:"#0A2A2A",lineHeight:1.4}}>{p.title}</div>
                    </Link>
                  );
                })}
              </div>
            )}
            <div style={{background:"#0D6E6E",borderRadius:"10px",padding:"1.25rem"}}>
              <h3 style={{fontSize:".85rem",fontWeight:700,color:"#fff",marginBottom:".4rem"}}>Never miss a deadline</h3>
              <p style={{fontSize:"11px",color:"rgba(255,255,255,.75)",marginBottom:"1rem"}}>Free alerts for new scholarships.</p>
              <Link href="/alerts" style={{display:"block",textAlign:"center",background:"#F5A623",color:"#0A2A2A",padding:"8px",borderRadius:"6px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>Get free alerts →</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
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
  return { props: { post, related }, revalidate: 60 };
}
