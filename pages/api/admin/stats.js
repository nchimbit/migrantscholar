import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const postsDir = path.join(process.cwd(), "content", "posts");

    let totalPosts = 0;

    if (fs.existsSync(postsDir)) {
      totalPosts = fs
        .readdirSync(postsDir)
        .filter(
          (file) => file.endsWith(".mdx") || file.endsWith(".md")
        )
        .length;
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = "nchimbit";
    const repo = "migrantscholar";

    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let runs = [];

    try {
      const runsResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=10`,
        { headers }
      );

      if (runsResponse.ok) {
        const runsData = await runsResponse.json();
        runs = runsData.workflow_runs || [];
      }
    } catch (error) {
      console.error("GitHub Actions error:", error.message);
    }

    let commits = [];

    try {
 


     const commitsResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
        { headers }
      );

      if (commitsResponse.ok) {
        commits = await commitsResponse.json();
      }
    } catch (error) {
      console.error("GitHub commits error:", error.message);
    }

    return res.status(200).json({
      totalPosts,
      runs,
      commits,
      githubConfigured: Boolean(token),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    return res.status(500).json({
      error: "Failed to load admin statistics",
      totalPosts: 0,
      runs: [],
      commits: [],
    });
  }
}
