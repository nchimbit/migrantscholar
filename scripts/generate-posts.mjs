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
      content: "Today is " + today + ". Generate 5 blog post topics for a scholarship website targeting migrant students, refugees and asylum seekers. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 must be fully funded awards. Make each topic unique and specific.\n\nRespond ONLY with valid JSON, no markdown, no backticks:\n{\"topics\":[{\"title\":\"...\",\"slug\":\"...\",\"focus\":\"...\",\"target\":\"...\",\"country\":\"...\",\"type\":\"...\"}]}"
    }]
  });
  const raw = response.choices[0].message.content.trim().replace(/^```json\n?/,"").replace(/\n?```$/,"");
  return JSON.parse(raw).topics;
}

async function generatePost(topic) {
  console.log("Writing: " + topic.title);
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 3000,
    messages: [{
      role: "user",
      content: "CRITICAL: Never start with Introduction to. First sentence must name the scholarship and who qualifies.\n\nWrite a fully SEO-optimised blog post in MARKDOWN for MigrantScholar.com.\n\nTopic: " + topic.title + "\nFocus: " + topic.focus + "\nAudience: " + topic.target + "\nCountry: " + topic.country + "\nDate: " + today + "\n\nRules:\n- Title under 60 characters\n- First sentence: state what scholarship exists and who can apply\n- Never write Introduction to as opening\n\nInclude:\n1. Opening sentence stating scholarship name, who qualifies, and funding amount\n2. Who qualifies section with bullet list of visa categories\n3. Five real scholarships with name, amount, eligibility, deadline, official URL\n4. Eight numbered application steps\n5. Documents checklist\n6. Eight FAQ entries specific to migrants and asylum seekers\n7. Two external authority links\n8. Closing sentence linking to https://migrantscholar.vercel.app/blog\n\nMinimum 1000 words. Use ## for headings and ### for scholarship names.\n\nDEADLINE: [earliest deadline or Unknown]\nFUNDING: [one-line funding summary]\n\nReturn markdown only. No backticks. No code fences."
    }]
  });
  return response.choices[0].message.content.trim();
}

function savePost(topic, content) {
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  // Extract deadline and funding from top of AI response
  const responseLines = content.split("\n");
  let deadline = "Unknown";
  let funding = "";
  let skipLines = 0;
  for (let i = 0; i < Math.min(5, responseLines.length); i++) {
    if (responseLines[i].startsWith("DEADLINE:")) { deadline = responseLines[i].replace("DEADLINE:", "").trim(); skipLines = i + 1; }
    if (responseLines[i].startsWith("FUNDING:")) { funding = responseLines[i].replace("FUNDING:", "").trim(); skipLines = Math.max(skipLines, i + 1); }
  }
  if (skipLines > 0) content = responseLines.slice(skipLines).join("\n").trim();

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
