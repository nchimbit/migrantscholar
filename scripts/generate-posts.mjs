import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

async function getTrendingTopics() {
  console.log("Finding trending topics...");
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: (() => {
        const postsDir = path.join(__dirname, "../content/posts");
        const existing = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).slice(-50).map(f => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/.mdx$/, '').replace(/-/g, ' ')).join(', ') : '';
        return "Today is " + today + ". Generate 5 UNIQUE blog post topics for MigrantScholar.com. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 fully funded. Avoid topics similar to: " + existing.slice(0, 300) + ". Focus on specific angles: specific universities, visa types, nationalities, STEM, healthcare, women-only, emergency funding.\n\nRespond ONLY with valid JSON:\n{\"topics\":[{\"title\":\"...\",\"slug\":\"...\",\"focus\":\"...\",\"target\":\"...\",\"country\":\"...\",\"type\":\"...\"}]}";
      })()
    }]
  });
  const raw = response.choices[0].message.content.trim().replace(/^```json\n?/,"").replace(/\n?```$/,"");
  return JSON.parse(raw).topics;
}

async function generatePost(topic) {
  // Skip if similar post already exists
  const postsDir = path.join(__dirname, "../content/posts");
  const existing = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
  const titleWords = topic.title.toLowerCase().split(" ").slice(0,4).join(" ");
  const isDupe = existing.some(f => {
    try {
      const lines = fs.readFileSync(path.join(postsDir, f), 'utf8').split("\n");
      const titleLine = lines.find(l => l.startsWith('title:')) || '';
      return titleLine.toLowerCase().includes(titleWords);
    } catch { return false; }
  });
  if (isDupe) { console.log("SKIP duplicate:", topic.title); return null; }
  console.log("Writing: " + topic.title);
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 3000,
    messages: [{
      role: "user",
      content: "CRITICAL: Only write about REAL scholarships. Never invent fake joint programmes. Never start with Introduction to. First sentence must name a real scholarship and who qualifies.\n\nWrite a fully SEO-optimised blog post in MARKDOWN for MigrantScholar.com.\n\nTopic: " + topic.title + "\nFocus: " + topic.focus + "\nAudience: " + topic.target + "\nCountry: " + topic.country + "\nDate: " + today + "\n\nRules:\n- Title under 60 characters\n- First sentence states what real scholarship exists and who qualifies\n- Only list REAL scholarships with real official URLs\n- Never invent fake scholarship programmes\n\nInclude:\n1. Opening sentence stating real scholarship name, who qualifies, funding amount\n2. Who qualifies section with visa categories\n3. Five REAL scholarships with name, amount, eligibility, deadline, official URL\n4. Eight numbered application steps\n5. Documents checklist\n6. Eight FAQ entries specific to migrants\n7. Two external authority links\n8. Closing sentence linking to https://migrantscholar.vercel.app/blog\n\nMinimum 1000 words. Use ## for headings, ### for scholarship names.\n\nReturn markdown only. No backticks. No code fences."
    }]
  });
  return response.choices[0].message.content.trim();
}

function savePost(topic, content) {
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  // Extract deadline and funding from anywhere in response
  let deadline = "Unknown";
  let funding = "";
  const dlMatch = content.match(/^DEADLINE:\s*(.+)$/m);
  const fnMatch = content.match(/^FUNDING:\s*(.+)$/m);
  if (dlMatch) deadline = dlMatch[1].trim();
  if (fnMatch) funding = fnMatch[1].trim();
  // Remove DEADLINE/FUNDING lines from content
  content = content.replace(/^DEADLINE:.*$/mg, '').replace(/^FUNDING:.*$/mg, '').trim();
  
  const readingTime = calculateReadingTime(content);
  const plainText = content.replace(/[#*[\]`]/g, "").replace(/\n+/g, " ").trim();
  const excerpt = plainText.slice(0, 160);
  const metaDesc = plainText.slice(0, 155);

  const mdx = `---
title: "${topic.title.replace(/"/g,'\\"')}"
date: "${new Date().toISOString()}"
slug: "${topic.slug}"
country: "${topic.country}"
type: "${topic.type}"
tags: ["${topic.country.toLowerCase()}", "scholarship", "migrant", "refugee"]
deadline: "${deadline}"
funding: "${funding.replace(/"/g,'\\"')}"
excerpt: "${excerpt.replace(/"/g,'\\"')}"
metaDescription: "${metaDesc.replace(/"/g,'\\"')}"
readingTime: ${readingTime}
---

${content}
`;

  const filename = today + "-" + topic.slug + ".mdx";
  const filepath = path.join(postsDir, filename);
  fs.writeFileSync(filepath, mdx, "utf8");
  console.log("Saved: " + filename + " (" + readingTime + " min read)");
  return filename;
}

async function main() {
  console.log("Starting post generation...\n");
  try {
    const topics = await getTrendingTopics();
    console.log("Found " + topics.length + " topics\n");
    const saved = [];
    for (const topic of topics) {
      try {
        const content = await generatePost(topic);
        const file = savePost(topic, content);
        saved.push(file);
        await new Promise(r => setTimeout(r, 1500));
      } catch (err) {
        console.error("Failed: " + topic.title + " - " + err.message);
      }
    }
    console.log("\nDone! " + saved.length + "/5 posts generated.");
  } catch (err) {
    console.error("Fatal:", err);
    process.exit(1);
  }
}

main();
