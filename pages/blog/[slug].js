import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer, AdBanner } from "../../components/Layout";
import { getAllPosts, getPostBySlug, formatDate } from "../../lib/posts";

function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm,"<h3>$1</h3>")
    .replace(/^## (.+)$/gm,"<h2>$1</h2>")
    .replace(/^# (.+)$/gm,"<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/\*(.+?)\*/g,"<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^- (.+)$/gm,"<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm,"<li>$2</li>")
    .replace(/\n\n/g,"</p><p>")
    .replace(/^(?!<[hul])(.+)$/gm,"<p>$1</p>")
    .replace(/<p><\/p>/g,"");
}

export default function BlogPost({ post, related }) {
  if (!post) return null;
  return (
    <>
      <Head>
        <title>{post.title} — MigrantScholar</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={`https://migrantscholar.com/blog/${post.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:post.title,datePublished:post.date,publisher:{"@type":"Organization",name:"MigrantScholar",url:"https://migrantscholar.com"}})}} />
      </Head>
      <Navbar />
      <main style={{maxWidth:"720px",margin:"0 auto",padding:"2.5rem 2rem 4rem"}}>
        <div style={{fontSize:"13px",color:"var(--muted)",marginBottom:"1.5rem"}}>
          <Link href="/" style={{color:"var(--muted)"}}>Home</Link>{" / "}
          <Link href="/blog" style={{color:"var(--muted)"}}>Scholarships</Link>{" / "}
          <span>{post.country}</span>
        </div>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"1rem"}}>
          <span style={{fontSize:"11px",background:"var(--accent-light)",color:"#0B5E47",padding:"3px 9px",borderRadius:"20px",fontWeight:500}}>{post.country}</span>
          {(post.tags||[]).slice(0,3).map(t=>(<span key={t} style={{fontSize:"11px",background:"var(--surface)",color:"var(--slate)",padding:"3px 9px",borderRadius:"20px"}}>{t}</span>))}
        </div>
        <h1 style={{fontFamily:"var(--ff-display)",fontSize:"clamp(1.5rem,4vw,2.25rem)",fontWeight:600,lineHeight:1.2,letterSpacing:"-0.02em",marginBottom:"1rem"}}>{post.title}</h1>
        <div style={{display:"flex",gap:"1.25rem",fontSize:"13px",color:"var(--muted)",marginBottom:"2rem",borderBottom:"1px solid var(--border)",paddingBottom:"1.25rem"}}>
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime} min read</span>
        </div>
        <AdBanner label="Advertisement" />
        <article className="prose" dangerouslySetInnerHTML={{__html:mdToHtml(post.content)}} />
        <AdBanner label="Advertisement" />
        {related && related.length > 0 && (
          <div style={{marginTop:"3rem"}}>
            <h2 style={{fontFamily:"var(--ff-display)",fontSize:"1.4rem",fontWeight:600,marginBottom:"1rem"}}>Related guides</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
              {related.map(p=>(
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{display:"block",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"1.25rem",color:"inherit"}}>
                  <span style={{fontSize:"10px",background:"var(--accent-light)",color:"#0B5E47",padding:"2px 8px",borderRadius:"20px",fontWeight:500,display:"inline-block",marginBottom:".5rem"}}>{p.country}</span>
                  <div style={{fontSize:"14px",fontWeight:500,lineHeight:1.35}}>{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div style={{marginTop:"3rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border)"}}>
          <Link href="/blog" style={{fontSize:"14px",color:"var(--accent)",fontWeight:500}}>← Back to all guides</Link>
        </div>
      </main>
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
  const related = allPosts.filter(p=>p.slug!==post.slug&&p.country===post.country).slice(0,3);
  return { props: { post, related }, revalidate: 3600 };
}
