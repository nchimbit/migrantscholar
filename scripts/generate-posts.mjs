import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const TODAY = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
const SITE = "https://migrantscholar.com";

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
      content: "Today is " + today + ". Generate 5 UNIQUE blog post topics for MigrantScholar.com targeting migrants, refugees and asylum seekers. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 fully funded. Focus on specific angles: specific universities, visa types, nationalities, STEM, healthcare, women-only, emergency funding. Avoid repeating: " + existing.slice(0, 200) + "\n\nRespond ONLY with valid JSON:\n{\"topics\":[{\"title\":\"...\",\"slug\":\"...\",\"focus\":\"...\",\"target\":\"...\",\"country\":\"...\",\"type\":\"...\"}]}"
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
    max_tokens: 4000,
    messages: [{
      role: "user",
      content: `You are writing for MigrantScholar.com, a trusted scholarship platform for migrants, refugees, asylum seekers, and international students.

CRITICAL RULES:
1. ACCURACY FIRST — Never invent scholarship names, eligibility, funding amounts, deadlines, visa requirements, or target groups
2. Only write about REAL scholarships with verifiable official sources
3. If information is unavailable write: "Please check the official scholarship website for the latest information."
4. Never start with "Introduction to" — first sentence must directly state what scholarship exists and who qualifies
5. Title must be under 65 characters

TOPIC: ${topic.title}
FOCUS: ${topic.focus}
AUDIENCE: ${topic.target}
COUNTRY: ${topic.country}
DATE: ${today}

CONTENT REQUIREMENTS:
- Write 1,500-2,000 words minimum
- Use clear ## H2 and ### H3 headings
- Write naturally for humans while optimizing for SEO
- Include all sections below

REQUIRED SECTIONS:
1. Opening paragraph (2-3 sentences) — directly state what scholarship exists, who qualifies, and funding amount
2. ## Quick Facts (table with: Award Name, Funding Amount, Deadline, Eligibility, Study Level, IELTS Required, Official Website)
3. ## Who Qualifies — bullet list of exact visa categories and eligibility criteria
4. ## What the Scholarship Covers — detailed funding breakdown
5. ## How to Apply — 8 numbered steps
6. ## Required Documents — bullet checklist
7. ## Frequently Asked Questions — 6 Q&As that migrants actually search for
8. ## Official Sources — 2-3 links to official government or university pages
9. ## Related Guides — 4 internal links using descriptive anchor text from these URLs:
   - [Canada scholarships for migrants](${SITE}/countries/Canada)
   - [Germany scholarships](${SITE}/countries/Germany)
   - [UK scholarships](${SITE}/countries/UK)
   - [Australia scholarships](${SITE}/countries/Australia)
   - [USA scholarships](${SITE}/countries/USA)
   - [Turkey scholarships](${SITE}/countries/Turkey)
   - [Fully funded scholarships](${SITE}/by-funding/fully-funded)
   - [PhD scholarships](${SITE}/by-level/phd)
   - [Masters scholarships](${SITE}/by-level/masters)
   - [Scholarships for refugees](${SITE}/by-eligibility/refugees)
   - [Scholarships for asylum seekers](${SITE}/by-eligibility/asylum-seekers)
   - [Without IELTS scholarships](${SITE}/by-eligibility/without-ielts)
   - [DAAD scholarships](${SITE}/universities/daad)
   - [Chevening scholarships](${SITE}/universities/chevening)
   - [Scholarship deadlines](${SITE}/deadlines)

FINAL LINE: "Last Reviewed: ${TODAY}"

FINAL CHECK BEFORE WRITING:
✓ No invented facts
✓ No fake eligibility or visa rules  
✓ No fake funding amounts or deadlines
✓ Official sources included
✓ Helpful, trustworthy, SEO-friendly content

Return markdown only. No backticks. No code fences.`
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
  const plainText = content.split("\n").filter(l => !l.startsWith("#") && !l.startsWith("|") && l.trim().length > 20).join(" ").replace(/[#*\[\]`|]/g, "").replace(/\(https?:\/\/[^\)]+\)/g, "").trim();
  const excerpt = plainText.slice(0, 160);
  const metaDescription = plainText.slice(0, 155);
  const readingTime = Math.max(5, Math.ceil(content.split(" ").length / 200));
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
lastReviewed: "${TODAY}"
---
`;
  fs.writeFileSync(filepath, frontmatter + content);
  console.log("Saved: " + filename + " (" + readingTime + " min read)");
}

async function main() {
  console.log("Starting post generation for MigrantScholar.com...");
  console.log("Date: " + TODAY);
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
