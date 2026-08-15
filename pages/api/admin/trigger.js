export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { workflow, password } = req.body || {};

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({
        error: "ADMIN_PASSWORD is not configured",
      });
    }

    if (password !== adminPassword) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const allowedWorkflows = [
      "daily-posts.yml",
      "audit-posts.yml",
      "fix-posts.yml",
    ];

    if (!allowedWorkflows.includes(workflow)) {
      return res.status(400).json({
        error: "Invalid workflow",
      });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "GITHUB_TOKEN is not configured",
      });
    }

    const owner = "nchimbit";
    const repo = "migrantscholar";

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: "main",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("GitHub workflow error:", errorText);

      return res.status(response.status).json({
        error: "GitHub rejected the workflow trigger",
      });
    }

    return res.status(200).json({
      success: true,
      workflow,
      message: "Workflow triggered successfully",
    });
  } catch (error) {
    console.error("Workflow trigger error:", error);

    return res.status(500).json({
      error: "Failed to trigger workflow",
    });
  }
}
