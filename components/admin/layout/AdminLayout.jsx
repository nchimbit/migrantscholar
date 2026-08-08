cat > components/admin/layout/AdminLayout.jsx << 'LAYOUTEOF'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV = [
  { section: "Main" },
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/content", icon: "📝", label: "Content" },
  { href: "/admin/seo", icon: "🔍", label: "SEO Center" },
  { href: "/admin/automation", icon: "🤖", label: "Automation" },
  { href: "/admin/analytics", icon: "📈", label: "Analytics" },
  { section: "System" },
  { href: "/admin/logs", icon: "📋", label: "Logs" },
  { href: "/admin/ai", icon: "🧠", label: "AI Center" },
  { href: "/admin/security", icon: "🔐", label: "Security" },
  { href: "/admin/settings", icon: "⚙️", label: "Settings" },
];

const C = {
  bg: "#0F1117",
  sidebar: "#1A1D27",
  card: "#1E2130",
  border: "#2A2D3E",
  text: "#E2E8F0",
  muted: "#718096",
  accent: "#0D6E6E",
  yellow: "#F5A623",
  green: "#48BB78",
  red: "#FC8181",
  purple: "#B794F4",
};

export default function AdminLayout({ children, title = "Dashboard" }) {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* Sidebar */}
      <aside style={{ width: 240, background: C.sidebar, borderRight: `1px solid ${C.border}`, position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", zIndex: 100 }}>
        
        {/* Logo */}
        <div style={{ padding: "1rem", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".625rem" }}>
            <div style={{ width: 36, height: 36, background: C.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🌐</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>MigrantScholar</div>
              <div style={{ fontSize: 10, color: C.muted }}>Admin Console</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: ".5rem 0" }}>
          {NAV.map((item, i) =>
            item.section ? (
              <div key={i} style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".08em", padding: ".75rem 1.25rem .25rem", marginTop: ".5rem" }}>
                {item.section}
              </div>
            ) : (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: ".75rem",
                padding: ".625rem 1rem", margin: "1px 8px", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: router.pathname === item.href ? 700 : 500,
                color: router.pathname === item.href ? C.accent : C.muted,
                background: router.pathname === item.href ? "rgba(13,110,110,.15)" : "transparent",
                textDecoration: "none", transition: "all .15s"
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "1rem", borderTop: `1px solid ${C.border}` }}>
          <a href="https://migrantscholar.com" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: 12, color: C.muted, textDecoration: "none" }}>
            <span>🌐</span><span>View Live Site →</span>
          </a>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Topbar */}
        <header style={{ background: C.sidebar, borderBottom: `1px solid ${C.border}`, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: "monospace" }}>{time}</span>
            <span style={{ fontSize: 11, color: C.muted }}>migrantscholar.com</span>
            <a href="https://migrantscholar.com" target="_blank" rel="noreferrer"
              style={{ fontSize: 11, color: C.accent, background: "rgba(13,110,110,.15)", border: `1px solid ${C.accent}`, padding: "4px 10px", borderRadius: 6, textDecoration: "none", fontWeight: 600 }}>
              View Site →
            </a>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
