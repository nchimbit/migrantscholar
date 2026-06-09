import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getTrendingTopics() {
  console.log("Finding trending topics...");
  const today = new Date().toISOString().split("T")[0];
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: "Today is " + today + ". Generate 5 blog post topics for a scholarship website targeting migrant students, refugees and asylum seekers. Mix countries: UK, USA, Germany, Canada, Turkey, Australia. At least 2 must be fully funded awards.\n\nRespond ONLY with valid JSON, no markdown, no backticks:\n{\"topics\":[{\"title\":\"...\",\"slug\":\"...\",\"focus\":\"...\",\"target\":\"...\",\"country\":\"...\",\"type\":\"...\"}]}"
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
      content: "Write a fully SEO-optimised blog post in MARKDOWN for MigrantScholar.com.\n\nTopic: " + topic.title + "\nFocus: " + topic.focus + "\nAudience: " + topic.target + "\nCountry: " + topic.country + "\nDate: " + today + "\n\nInclude:\n1. Opening paragraph directly answering the main question\n2. Who qualifies section with bullet list of visa categories\n3. Five real scholarships each with name, coverage amount, eligibility, deadline, official website URL\n4. Eight numbered application steps\n5. Documents checklist\n6. Eight FAQ entries written as questions migrants actually search\n7. Two external authority links to official government or university pages\n8. Closing sentence with internal link to https://migrantscholar.vercel.app/blog\n\nMinimum 900 words. Use ## for headings and ### for scholarship names.\n\nReturn ONLY the raw markdown text. No JSON. No backticks. No code fences. Just the markdown content starting with the first paragraph."
    }]
  });
  return response.choices[0].message.content.trim();
}

function savePost(topic, content) {
  const today = new Date().toISOString().split("T")[0];
  const postsDir = path.join(__dirname, "../content/posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  const excerpt = content.split("\n").find(l => l.trim().length > 80) || content.slice(0, 160);
  const metaDesc = excerpt.replace(/[#*[\]]/g,"").slice(0, 155);

  const mdx = `---
title: "${topic.title.replace(/"/g,'\\"')}"
date: "${today}"
slug: "${topic.slug}"
country: "${topic.country}"
type: "${topic.type}"
tags: ["${topic.country.toLowerCase()}", "scholarship", "migrant", "refugee"]
excerpt: "${metaDesc.replace(/"/g,'\\"')}"
metaDescription: "${metaDesc.replace(/"/g,'\\"')}"
readingTime: 8
---

${content}
`;

  const filename = today + "-" + topic.slug + ".mdx";
  const filepath = path.join(postsDir, filename);
  fs.writeFileSync(filepath, mdx, "utf8");
  console.log("Saved: " + filename);
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
