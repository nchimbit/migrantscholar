export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "scholar2026";
  if (password === adminPassword) {
    res.setHeader("Set-Cookie", `ms_admin=1; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`);
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: "Invalid password" });
}
