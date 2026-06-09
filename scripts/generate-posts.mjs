import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getTrendingTopics() {
  console.log("🔍 Finding trending topics...");
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: `Today is ${today}. Generate 5 blog post topics for a scholarship website targeting migrant students, refugees and asylum seekers. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 must be fully funded awards.

Respond ONLY with valid JSON, no markdown, no backticks:
{"topics":[{"title":"...","slug":"...","focus":"...","target":"...","country":"...","type":"..."}]}`
    }]
  });
  const raw = response.choices[0].message.content.trim().replace(/^```json\n?/,"").replace(/\n?```$/,"");
  return JSON.parse(raw).topics;
}

async function generatePost(topic) {
  console.log("✍️  Writing: " + topic.title);
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `Write a complete SEO blog post for MigrantScholar.com about: ${topic.title}
Focus: ${topic.focus}
Audience: ${topic.target}
Country: ${topic.country}
Date: ${today}

Include: direct answer opening, who qualifies, 4-6 real scholarships with coverage and deadlines, step-by-step application, documents checklist, 6 FAQ entries.

Respond ONLY with valid JSON, no markdown, no backticks:
{"title":"...","metaDescription":"...","excerpt":"...","content":"...","tags":["tag1","tag2"],"readingTime":6}`
    }]
  });
  const raw = response.choices[0].message.content.trim().replace(/^```json\n?/,"").replace(/\n?```$/,"");
  return JSON.parse(raw);
}

function savePost(topic, post) {
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
  const mdx = `---
title: "${post.title.replace(/"/g,'\\"')}"
date: "${today}"
slug: "${topic.slug}"
country: "${topic.country}"
type: "${topic.type}"
tags: ${JSON.stringify(post.tags)}
excerpt: "${post.excerpt.replace(/"/g,'\\"')}"
metaDescription: "${post.metaDescription.replace(/"/g,'\\"')}"
readingTime: ${post.readingTime}
---

${post.content}
`;
  const filename = today + "-" + topic.slug + ".mdx";
  fs.writeFileSync(path.join(postsDir, filename), mdx, "utf8");
  console.log("✅ Saved: " + filename);
  return filename;
}

async function main() {
  console.log("🚀 Starting post generation...\n");
  try {
    const topics = await getTrendingTopics();
    console.log("\n📌 Found " + topics.length + " topics\n");
    const saved = [];
    for (const topic of topics) {
      try {
        const post = await generatePost(topic);
        const file = savePost(topic, post);
        saved.push(file);
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error("❌ Failed: " + topic.title + " — " + err.message);
      }
    }
    console.log("\n🎉 Done! " + saved.length + "/5 posts generated.");
  } catch (err) {
    console.error("Fatal:", err);
    process.exit(1);
  }
}

main();
