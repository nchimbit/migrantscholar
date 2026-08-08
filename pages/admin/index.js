import { useState, useEffect } from "react";
import Head from "next/head";
import AdminLayout from "../../components/admin/layout/AdminLayout";

const ADMIN_PASSWORD = "migrant2026";

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#1A1D27", border: "1px solid #2A2D3E", borderRadius: 14, padding: "2.5rem", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ width: 60, height: 60, background: "#0D6E6E", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 1.25rem" }}>🌐</div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#E2E8F0", marginBottom: ".25rem" }}>MigrantScholar</h1>
        <p style={{ fontSize: 13, color: "#718096", marginBottom: "1.5rem" }}>Admin Console — Enter password to continue</p>
        <input type="password" placeholder="Admin password" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (pw === ADMIN_PASSWORD ? onLogin() : setError("Wrong password"))}
          style={{ width: "100%", background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#E2E8F0", outline: "none", marginBottom: ".75rem" }}
        />
        {error && <p style={{ color: "#FC8181", fontSize: 12, marginBottom: ".5rem" }}>{error}</p>}
        <button onClick={() => pw === ADMIN_PASSWORD ? onLogin() : setError("Wrong password")}
          style={{ width: "100%", background: "#0D6E6E", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Login →
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_authed")) setAuthed(true);
  }, []);

  useEffect(() => { if (authed) fetchStats(); }, [authed]);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  async function triggerWorkflow(workflow, label) {
    setActionMsg(`⏳ Triggering ${label}...`);
    try {
      const res = await fetch("/api/admin/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflow, password: ADMIN_PASSWORD })
      });
      const data = await res.json();
      setActionMsg(data.success ? `✅ ${label} triggered! Check GitHub Actions.` : `❌ ${data.error}`);
    } catch (e) { setActionMsg("❌ " + e.message); }
    setTimeout(() => setActionMsg(""), 8000);
  }

  function handleLogin() { sessionStorage.setItem("admin_authed", "1"); setAuthed(true); }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const systemHealth = [
    ["GitHub", "✅", "green"],
    ["Vercel", "✅", "green"],
    ["Groq API", "✅", "green"],
    ["Supabase", "✅", "green"],
    ["AdSense", "⏳", "yellow"],
    ["Search Console", "✅", "green"],
  ];

  const quickLinks = [
    ["🐙 GitHub", "https://github.com/nchimbit/migrantscholar"],
    ["⚡ Vercel", "https://vercel.com/ismailnchimbi-5136s-projects/migrantscholar"],
    ["📊 Analytics", "https://analytics.google.com"],
    ["🔍 Search Console", "https://search.google.com/search-console"],
    ["💰 AdSense", "https://www.google.com/adsense"],
    ["🤖 Groq", "https://console.groq.com"],
    ["⚙️ Actions", "https://github.com/nchimbit/migrantscholar/actions"],
    ["📧 Formspree", "https://formspree.io/forms/xvznenzj/submissions"],
  ];

  return (
    <>
      <Head>
        <title>Dashboard — MigrantScholar Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout title="Dashboard">

        {actionMsg && (
          <div style={{ background: actionMsg.startsWith("✅") ? "rgba(72,187,120,.1)" : actionMsg.startsWith("⏳") ? "rgba(245,166,35,.1)" : "rgba(252,129,129,.1)", border: `1px solid ${actionMsg.startsWith("✅") ? "#48BB78" : actionMsg.startsWith("⏳") ? "#F5A623" : "#FC8181"}`, borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.5rem", fontSize: 13, fontWeight: 600, color: actionMsg.startsWith("✅") ? "#48BB78" : actionMsg.startsWith("⏳") ? "#F5A623" : "#FC8181" }}>
            {actionMsg}
          </div>
        )}

        {/* Stats row */}
        <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
          {[
            ["📝", "Blog Posts", loading ? "..." : stats?.totalPosts || 0, "#0D6E6E"],
            ["🗂️", "Total Pages", "510+", "#B794F4"],
            ["🌍", "Countries", "6", "#48BB78"],
            ["🎓", "Universities", "15", "#F5A623"],
          ].map(([icon, label, val, color]) => (
            <div key={label} className="admin-card">
              <div style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>{icon}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: 12, color: "var(--admin-muted)", marginTop: ".25rem" }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid-3" style={{ marginBottom: "1.5rem" }}>

          {/* Live Activity */}
          <div className="admin-card" style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700 }}>⚡ Live Activity</h2>
              <button onClick={fetchStats} className="btn btn-secondary" style={{ fontSize: 11, padding: "4px 10px" }}>🔄 Refresh</button>
            </div>
            {loading ? <p style={{ color: "var(--admin-muted)", fontSize: 13 }}>Loading...</p> :
              stats?.runs?.slice(0, 5).map((r, i) => (
                <div key={i} className="activity-item">
                  <div className={`activity-dot`} style={{ background: r.conclusion === "success" ? "var(--admin-green)" : r.conclusion === "failure" ? "var(--admin-red)" : "var(--admin-yellow)", boxShadow: `0 0 6px ${r.conclusion === "success" ? "var(--admin-green)" : "var(--admin-red)"}` }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name} #{r.run_number}</div>
                    <div style={{ fontSize: 11, color: "var(--admin-muted)" }}>{new Date(r.created_at).toLocaleString()} · {r.event}</div>
                  </div>
                  <span className={`badge badge-${r.conclusion === "success" ? "green" : r.conclusion === "failure" ? "red" : "yellow"}`}>
                    {r.conclusion === "success" ? "✅ Success" : r.conclusion === "failure" ? "❌ Failed" : "⏳ Running"}
                  </span>
                </div>
              ))
            }
          </div>

          {/* System Health */}
          <div className="admin-card">
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: "1rem" }}>🟢 System Health</h2>
            {systemHealth.map(([label, status, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".5rem 0", borderBottom: "1px solid var(--admin-border)", fontSize: 13 }}>
                <span style={{ color: "var(--admin-muted)" }}>{label}</span>
                <span className={`badge badge-${color}`}>{status} {color === "green" ? "OK" : "Pending"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: "1.5rem" }}>

          {/* GitHub Actions */}
          <div className="admin-card">
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: "1rem" }}>🤖 GitHub Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: ".625rem" }}>
              {[
                ["daily-posts.yml", "🤖 Run Daily Post Generator", "#0D6E6E"],
                ["audit-posts.yml", "🔍 Run Content Audit", "#3730A3"],
                ["fix-posts.yml", "🔧 Fix Old Posts", "#D97706"],
              ].map(([wf, label, color]) => (
                <button key={wf} onClick={() => triggerWorkflow(wf, label)} className="btn"
                  style={{ background: color, color: "#fff", width: "100%", justifyContent: "flex-start" }}>
                  {label}
                </button>
              ))}
              <a href="https://github.com/nchimbit/migrantscholar/actions" target="_blank" rel="noreferrer"
                className="btn btn-secondary" style={{ textDecoration: "none", justifyContent: "center" }}>
                📋 View All Runs →
              </a>
            </div>
          </div>

          {/* Recent Commits */}
          <div className="admin-card">
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: "1rem" }}>📦 Recent Commits</h2>
            {loading ? <p style={{ color: "var(--admin-muted)", fontSize: 13 }}>Loading...</p> :
              stats?.commits?.slice(0, 5).map((c, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: "var(--admin-purple)", boxShadow: "0 0 6px var(--admin-purple)" }}></div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{c.commit?.message?.slice(0, 55)}...</div>
                    <div style={{ fontSize: 11, color: "var(--admin-muted)" }}>{new Date(c.commit?.author?.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Quick Links */}
        <div className="admin-card">
          <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: "1rem" }}>🔗 Quick Links</h2>
          <div style={{ display: "flex", gap: ".625rem", flexWrap: "wrap" }}>
            {quickLinks.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="btn btn-secondary"
                style={{ textDecoration: "none", fontSize: 12 }}>{label} →</a>
            ))}
          </div>
        </div>

      </AdminLayout>
    </>
  );
}
