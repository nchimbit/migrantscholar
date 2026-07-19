import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getTrendingTopics() {
  console.log("Finding trending topics...");
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  const existing = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).slice(-30).map(f => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/.mdx$/, '').replace(/-/g, ' ')).join(', ') : '';
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: "Today is " + today + ". Generate 5 UNIQUE blog post topics for MigrantScholar.com targeting migrants, refugees and asylum seekers. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 fully funded. Focus on specific angles like specific universities, visa types, nationalities, STEM, healthcare, women-only, emergency funding. Recent topics to avoid repeating: " + existing.slice(0, 200) + "\n\nRespond ONLY with valid JSON, no markdown:\n{\"topics\":[{\"title\":\"...\",\"slug\":\"...\",\"focus\":\"...\",\"target\":\"...\",\"country\":\"...\",\"type\":\"...\"}]}"
    }]
  });
  const raw = response.choices[0]?.message?.content || "{}";
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned).topics || [];
  } catch(e) {
    console.log("JSON parse error:", e.message);
    return [];
  }
}

async function generatePost(topic) {
  console.log("Writing: " + topic.title);
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 3000,
    messages: [{
      role: "user",
      content: "CRITICAL: Only write about REAL scholarships. Never invent fake programmes. Never start with Introduction to. First sentence must name a real scholarship and who qualifies.\n\nWrite a fully SEO-optimised blog post in MARKDOWN for MigrantScholar.com.\n\nTopic: " + topic.title + "\nFocus: " + topic.focus + "\nAudience: " + topic.target + "\nCountry: " + topic.country + "\nDate: " + today + "\n\nRules:\n- Title under 60 characters\n- First sentence states what real scholarship exists and who qualifies\n- Only list REAL scholarships with real official URLs\n\nInclude:\n1. Opening sentence stating real scholarship name, who qualifies, funding amount\n2. Who qualifies section with visa categories\n3. Five REAL scholarships with name, amount, eligibility, deadline, official URL\n4. Eight numbered application steps\n5. Documents checklist\n6. Eight FAQ entries specific to migrants\n7. Two external authority links\n8. Closing sentence linking to https://migrantscholar.vercel.app/blog\n\nINTERNAL LINKS: Add 5-10 natural internal links using descriptive anchor text like [Canada scholarships](https://migrantscholar.vercel.app/countries/Canada), [fully funded scholarships](https://migrantscholar.vercel.app/by-funding/fully-funded), [PhD scholarships](https://migrantscholar.vercel.app/by-level/phd), [scholarships for refugees](https://migrantscholar.vercel.app/by-eligibility/refugees), [DAAD scholarships](https://migrantscholar.vercel.app/universities/daad), [scholarship deadlines](https://migrantscholar.vercel.app/deadlines). End with ## Related Guides section with 4 relevant internal links.\n\nMinimum 1000 words. Use ## for headings, ### for scholarship names.\n\nReturn markdown only. No backticks. No code fences."
    }]
  });
  const result = response.choices[0]?.message?.content;
  if (!result) { console.log("Empty response, skipping..."); return null; }
  return result.trim();
}

function savePost(topic, content) {
  if (!content) return;
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
  let deadline = "Unknown";
  let funding = "";
  const dlMatch = content.match(/^DEADLINE:\s*(.+)$/m);
  const fnMatch = content.match(/^FUNDING:\s*(.+)$/m);
  const urlMatch = content.match(/https?:\/\/(?!migrantscholar)[^\s\)\"]+/);
  if (dlMatch) deadline = dlMatch[1].trim();
  if (fnMatch) funding = fnMatch[1].trim();
  const applicationUrl = urlMatch ? urlMatch[0] : "";
  content = content.replace(/^DEADLINE:.*$/mg, '').replace(/^FUNDING:.*$/mg, '').trim();
  const plainText = content.split("\n").filter(l => !l.startsWith("#") && l.trim().length > 20).join(" ").replace(/[#*\[\]`]/g, "").replace(/\(https?:\/\/[^\)]+\)/g, "").trim();
  const excerpt = plainText.slice(0, 160);
  const metaDescription = plainText.slice(0, 155);
  const readingTime = Math.max(3, Math.ceil(content.split(" ").length / 200));
  const slug = topic.slug || topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
  const filename = today + "-" + slug + ".mdx";
  const filepath = path.join(postsDir, filename);
  if (fs.existsSync(filepath)) { console.log("File exists, skipping: " + filename); return; }
  const frontmatter = `---
title: "${topic.title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString()}"
slug: "${slug}"
country: "${topic.country}"
type: "${topic.type || 'scholarship'}"
tags: ["${topic.country.toLowerCase()}", "scholarship", "migrant", "refugee"]
deadline: "${deadline}"
funding: "${funding.replace(/"/g, '\\"')}"
applicationUrl: "${applicationUrl}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
metaDescription: "${metaDescription.replace(/"/g, '\\"')}"
readingTime: ${readingTime}
---
`;
  fs.writeFileSync(filepath, frontmatter + content);
  console.log("Saved: " + filename + " (" + readingTime + " min read)");
}

async function main() {
  console.log("Starting post generation...");
  try {
    const topics = await getTrendingTopics();
    console.log("Found " + topics.length + " topics\n");
    let count = 0;
    for (const topic of topics) {
      try {
        const content = await generatePost(topic);
        if (content) {
          savePost(topic, content);
          count++;
        }
      } catch(e) {
        console.log("Failed:", topic.title, "-", e.message);
      }
    }
    console.log("\nDone! " + count + "/" + topics.length + " posts generated.");
  } catch(e) {
    console.log("Fatal:", e.message);
    process.exit(1);
  }
}

main();
