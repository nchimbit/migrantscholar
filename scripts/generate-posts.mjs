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
    max_tokens: 3000,
    messages: [{
      role: "user",
      content: `Write a fully SEO-optimised blog post for MigrantScholar.com.

Topic: ${topic.title}
Focus: ${topic.focus}
Audience: ${topic.target}
Country: ${topic.country}
Date: ${today}

STRICT REQUIREMENTS:
1. Opening paragraph: directly answer the main question in 2-3 sentences. Google AI pulls this.
2. "Who qualifies" section: bullet list of exact visa/status categories
3. List 5-6 real scholarships each with: full name, coverage amount, who can apply, deadline, official website URL
4. Step-by-step numbered application process (8 steps minimum)
5. Documents checklist as bullet points
6. 8 FAQ entries — write questions exactly how migrants search them e.g. "Can I apply without settled status?" each with a detailed answer of 2-3 sentences
7. External authority links: include 2-3 links to official government or university pages
8. Closing paragraph encouraging action
9. Total length: minimum 900 words
10. Use ## for main headings, ### for scholarship names, **bold** for key terms

Respond ONLY with valid JSON, no markdown fences, no backticks:
{"title":"...","metaDescription":"150 char SEO description","excerpt":"2 sentence summary","content":"full markdown content here minimum 900 words","tags":["tag1","tag2","tag3"],"readingTime":8,"faqs":[{"question":"...","answer":"..."}]}`
    }]
  });
  const raw = response.choices[0].message.content.trim().replace(/^```json\n?/,"").replace(/\n?```$/,"");
  return JSON.parse(raw);
}

function savePost(topic, post) {
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  const faqSection = post.faqs && post.faqs.length > 0
    ? "\n\n## Frequently asked questions\n\n" + post.faqs.map(f => `### ${f.question}\n${f.answer}`).join("\n\n")
    : "";

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

${post.content}${faqSection}

---

*Found this guide helpful? Share it with someone who needs it. Browse more [scholarship guides for migrants](https://migrantscholar.vercel.app/blog) on MigrantScholar.*
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
        await new Promise(r => setTimeout(r, 1500));
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
