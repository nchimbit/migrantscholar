import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const SITE = "https://migrantscholar.com";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

const TODAY = new Date().toISOString().split("T")[0];

const POSTS_DIR = path.join(__dirname, "../content/posts");
const DATA_DIR = path.join(__dirname, "../data");
const SCHOLARSHIPS_FILE = path.join(DATA_DIR, "scholarships.json");

const MIN_WORDS = 1500;
const MAX_WORDS = 2400;
const TOPIC_COUNT = 5;
const DELAY_MS = 3000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeSlug(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function escapeYaml(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ")
    .trim();
}

function wordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function readJson(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback;

    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Could not read JSON file: ${filePath}`);
    console.error(error.message);
    return fallback;
  }
}

function loadScholarships() {
  const data = readJson(SCHOLARSHIPS_FILE, []);

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(
      "No scholarship records found. Create data/scholarships.json first."
    );
  }

  const valid = data.filter(item => {
    return (
      item.id &&
      item.name &&
      item.country &&
      item.countrySlug &&
      item.officialUrl &&
      item.verified === true &&
      /^https?:\/\//i.test(item.officialUrl)
    );
  });

  if (valid.length === 0) {
    throw new Error(
      "No valid verified scholarship records found in scholarships.json."
    );
  }

  return valid;
}

function getExistingPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith(".mdx"))
    .sort()
    .map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf8");

      return {
        filename: file,
        slug: file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx$/, ""),
        title: extractFrontmatterValue(content, "title") || file
      };
    });
}

function extractFrontmatterValue(content, field) {
  const match = String(content || "").match(
    new RegExp(`^${field}:\\s*"([^"]*)"`,"mi")
  );

  return match ? match[1].trim() : "";
}

function getRecentTopics(existingPosts) {
  return existingPosts
    .slice(-50)
    .map(post => post.title)
    .filter(Boolean)
    .join("; ");
}

function buildScholarshipContext(scholarships) {
  return scholarships.map(item => {
    return {
      id: item.id,
      name: item.name,
      country: item.country,
      countrySlug: item.countrySlug,
      officialUrl: item.officialUrl,
      levels: item.levels,
      notes: item.notes
    };
  });
}

async function callAI(messages, maxTokens = 4000, attempt = 0) {
  const maxRetries = 4;

  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: maxTokens,
      temperature: 0.2,
      messages
    });

    return response.choices?.[0]?.message?.content?.trim() || "";
  } catch (error) {
    const status = error?.status || error?.response?.status;
    const message = String(error?.message || "");

    const isRateLimit =
      status === 429 ||
      message.includes("429") ||
      message.toLowerCase().includes("rate limit");

    if (!isRateLimit || attempt >= maxRetries) {
      throw error;
    }

    const delayMs = 3000 * Math.pow(2, attempt);

    console.log(
      `Rate limit (429). Retrying in ${delayMs / 1000}s... ` +
      `(${attempt + 1}/${maxRetries})`
    );

    await new Promise(resolve => setTimeout(resolve, delayMs));

    return callAI(messages, maxTokens, attempt + 1);
  }
}

function parseJsonResponse(raw) {
  try {
    const cleaned = String(raw)
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    const match = String(raw).match(/\{[\s\S]*\}/);

    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

async function getTrendingTopics(scholarships, existingPosts) {
  console.log("Finding useful and non-duplicate topics...");

  const recentTopics = getRecentTopics(existingPosts);

  const prompt = `
You are an SEO content strategist for MigrantScholar.com.

Today: ${TODAY}

Audience:
- Migrants
- Refugees
- Asylum seekers
- International students
- Displaced learners

Generate exactly ${TOPIC_COUNT} unique article ideas.

SEO requirements:
1. Focus on a clear search intent.
2. Prefer specific, helpful, non-clickbait titles.
3. Avoid generic AI-generated topics.
4. At least two topics should concern real scholarships.
5. Include a mixture of:
   - Scholarship guides
   - Eligibility explanations
   - Application guidance
   - Refugee and migrant education access
   - Country-specific opportunities
6. Do not claim a scholarship is open unless verified elsewhere.
7. Do not invent deadlines, funding amounts or visa rules.
8. Avoid topics already covered.

Approved scholarship records:
${JSON.stringify(buildScholarshipContext(scholarships), null, 2)}

Recent titles to avoid:
${recentTopics.slice(0, 5000)}

Return ONLY valid JSON in this format:
{
  "topics": [
    {
      "title": "Specific useful SEO title",
      "slug": "unique-seo-slug",
      "focus": "The main question the article answers",
      "searchIntent": "informational",
      "audience": "refugees",
      "country": "United Kingdom",
      "countrySlug": "united-kingdom",
      "scholarshipId": "chevening",
      "contentType": "scholarship-guide",
      "primaryKeyword": "main search phrase",
      "secondaryKeywords": [
        "related search phrase 1",
        "related search phrase 2"
      ]
    }
  ]
}
`;

  const messages = [
    {
      role: "system",
      content:
        "You generate structured SEO topic ideas. Return ONLY valid JSON. No markdown, no code fences, no explanation."
    },
    {
      role: "user",
      content: prompt
    }
  ];

  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await callAI(messages, 2500);
    const parsed = parseJsonResponse(raw);

    if (parsed && Array.isArray(parsed.topics)) {
      return parsed.topics
        .filter(topic => topic.title && topic.slug && topic.countrySlug)
        .slice(0, TOPIC_COUNT);
    }

    console.error(
      `Invalid topics JSON received (attempt ${attempt + 1}/2).`
    );

    if (attempt === 0) {
      messages.push({
        role: "user",
        content:
          "Your previous response was not valid JSON. Return ONLY the JSON object with the topics array. Do not add markdown or explanations."
      });
    }
  }

  console.error("Could not generate valid topics JSON after 2 attempts.");
  return [];
}

function findScholarship(topic, scholarships) {
  if (!topic.scholarshipId) return null;

  return scholarships.find(item => item.id === topic.scholarshipId) || null;
}

function buildOfficialSourceBlock(scholarship) {
  if (!scholarship) {
    return `
The article must not invent official sources.
Use only official sources supplied by the editorial team.
If no official source is available, explain that readers should verify
the information with the relevant government or university website.
`;
  }

  return `
APPROVED SCHOLARSHIP RECORD:

Name: ${scholarship.name}
Country: ${scholarship.country}
Official website: ${scholarship.officialUrl}
Study levels: ${(scholarship.levels || []).join(", ")}
Editorial notes: ${scholarship.notes || "Verify current details officially."}

You may use the official website above as the primary source.
Do not invent exact funding amounts, deadlines, visa rules,
eligibility conditions or application procedures.
If a detail is not explicitly supported by the supplied record,
say that readers should check the official website.
`;
}

function buildArticlePrompt(topic, scholarship) {
  const sourceBlock = buildOfficialSourceBlock(scholarship);

  return `
You are a senior editorial writer for MigrantScholar.com.

Write a high-quality, useful, accurate article for migrants, refugees,
asylum seekers and international students.

ARTICLE TOPIC:
${topic.title}

MAIN FOCUS:
${topic.focus}

SEARCH INTENT:
${topic.searchIntent || "informational"}

AUDIENCE:
${topic.audience || "migrants and refugees"}

COUNTRY:
${topic.country}

COUNTRY SLUG:
${topic.countrySlug}

PRIMARY KEYWORD:
${topic.primaryKeyword || topic.title}

SECONDARY KEYWORDS:
${(topic.secondaryKeywords || []).join(", ")}

CONTENT TYPE:
${topic.contentType || "educational-guide"}

DATE:
${TODAY}

${sourceBlock}

STRICT ACCURACY RULES:
1. Never invent facts.
2. Never invent deadlines or funding amounts.
3. Never claim that a scholarship is currently open without verified data.
4. Never invent official URLs.
5. Never provide legal or immigration advice as a certainty.
6. Distinguish general information from programme-specific rules.
7. Use cautious wording when details may change.
8. Do not create fake testimonials, statistics or quotes.
9. Do not cite Wikipedia, random blogs or AI-generated sources as official.
10. Do not state that a source was checked today unless that actually happened.
11. If a detail is unknown, say: "Check the official website for the latest details."

SEO AND QUALITY RULES:
1. Write between ${MIN_WORDS} and ${MAX_WORDS} words.
2. Satisfy the reader's search intent immediately.
3. Start with a direct answer, not "Introduction to".
4. Use descriptive H2 and H3 headings.
5. Use short paragraphs and clear bullet points.
6. Include practical examples where appropriate.
7. Avoid keyword stuffing.
8. Use the primary keyword naturally.
9. Add related terms naturally.
10. Do not repeat the same information.
11. Do not use exaggerated claims such as "guaranteed scholarship".
12. Do not use fake urgency.
13. Include a useful FAQ section.
14. Include a clear last-reviewed statement.
15. Do not mention that an AI wrote the article.

REQUIRED MARKDOWN STRUCTURE:

Opening:
Write 2–4 direct sentences explaining what the reader will learn.
Do not make unsupported claims about eligibility or funding.

## Quick Facts

Use a table with relevant fields. For unknown information, write:
"Check the official website for current details."

Include:
- Programme or guide name
- Country
- Study level
- Funding information
- Eligibility overview
- Application deadline
- Official website

## Who This Guide Is For

Explain the intended audience and any important limitations.

## Eligibility and Important Requirements

Use accurate, cautious explanations.
Do not invent exact requirements.

## What Funding or Support May Be Available

Explain only what is supported by the supplied information.
Do not fabricate amounts.

## How to Prepare an Application

Give practical, general steps.
Clearly distinguish general preparation from official application instructions.

## Documents Applicants May Need

Explain common documents, and say that exact requirements vary.

## Common Mistakes to Avoid

Give useful, realistic mistakes without inventing statistics.

## Frequently Asked Questions

Include exactly 6 useful questions and answers.
Use H3 headings for each question.

## Official Sources

Include only supplied or clearly known official URLs.
Do not invent links.

## Related Guides

Use these internal links exactly:

- [Scholarships for refugees](${SITE}/by-eligibility/refugees)
- [Fully funded scholarships](${SITE}/by-funding/fully-funded)
- [${topic.country} scholarships](${SITE}/countries/${topic.countrySlug})
- [Scholarship deadlines 2026](${SITE}/deadlines)

Last Reviewed: ${TODAY}

FINAL CHECK:
- Minimum ${MIN_WORDS} words
- No invented facts
- No unsupported deadlines
- No unsupported funding amounts
- No fake official links
- Exactly 6 FAQ questions
- Clear headings
- Helpful to the target audience

Return Markdown only.
Do not use code fences.
`;
}

function validateArticle(content, topic, scholarship) {
  const errors = [];
  const text = String(content || "");
  const words = wordCount(text);

  if (words < MIN_WORDS) {
    errors.push(`Too short: ${words} words. Minimum is ${MIN_WORDS}.`);
  }

  if (words > MAX_WORDS + 500) {
    errors.push(`Article is unusually long: ${words} words.`);
  }

  if (!/^##\s+Quick Facts/im.test(text)) {
    errors.push("Missing Quick Facts heading.");
  }

  if (!/^##\s+Frequently Asked Questions/im.test(text)) {
    errors.push("Missing FAQ heading.");
  }

  if (!/^##\s+Official Sources/im.test(text)) {
    errors.push("Missing Official Sources heading.");
  }

  if (!/^##\s+Related Guides/im.test(text)) {
    errors.push("Missing Related Guides heading.");
  }

  const faqSection = text.match(
    /##\s+Frequently Asked Questions([\s\S]*?)(?=\n##\s+|$)/i
  );

  if (faqSection) {
    const faqCount = (faqSection[1].match(/^###\s+/gm) || []).length;

    if (faqCount !== 6) {
      errors.push(`Expected 6 FAQ questions, found ${faqCount}.`);
    }
  }

  if (scholarship) {
    if (!text.includes(scholarship.officialUrl)) {
      errors.push("Approved official scholarship URL is missing.");
    }
  }

  const externalUrls = text.match(/https?:\/\/[^\s)>"']+/gi) || [];

  for (const url of externalUrls) {
    if (!url.startsWith(SITE) && !url.startsWith("https://")) {
      errors.push(`Suspicious URL detected: ${url}`);
    }
  }

  const internalLinks = [
    `${SITE}/by-eligibility/refugees`,
    `${SITE}/by-funding/fully-funded`,
    `${SITE}/countries/${topic.countrySlug}`,
    `${SITE}/deadlines`
  ];

  for (const link of internalLinks) {
    if (!text.includes(link)) {
      errors.push(`Missing internal link: ${link}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    words
  };
}

function extractMetadata(content) {
  const deadline = content.match(
    /\|\s*Application Deadline\s*\|\s*([^|\n]+)/i
  );

  const funding = content.match(
    /\|\s*Funding(?: Information)?\s*\|\s*([^|\n]+)/i
  );

  return {
    deadline: deadline?.[1]?.trim() || "Check official website",
    funding: funding?.[1]?.trim() || "Check official website"
  };
}

function createExcerpt(content, fallbackTitle) {
  const lines = String(content || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => {
      return (
        line.length > 50 &&
        !line.startsWith("#") &&
        !line.startsWith("|") &&
        !line.startsWith("-") &&
        !line.startsWith("[")
      );
    });

  return (lines[0] || fallbackTitle)
    .replace(/[*`[\]]/g, "")
    .slice(0, 160)
    .trim();
}

function createMetaDescription(topic) {
  return (
    `${topic.title}. Learn about eligibility, preparation, ` +
    `funding information and how to find official application details.`
  ).slice(0, 155);
}

function buildFrontmatter(topic, content, scholarship) {
  const metadata = extractMetadata(content);
  const excerpt = createExcerpt(content, topic.title);

  const slug = normalizeSlug(topic.slug || topic.title);
  const readingTime = Math.max(7, Math.ceil(wordCount(content) / 200));

  const tags = [
    normalizeSlug(topic.country),
    "scholarship",
    "migrant",
    "refugee",
    topic.contentType || "education"
  ].filter(Boolean);

  const applicationUrl = scholarship?.officialUrl || "";

  return `---
title: "${escapeYaml(topic.title)}"
date: "${new Date().toISOString()}"
slug: "${escapeYaml(slug)}"
country: "${escapeYaml(topic.country)}"
countrySlug: "${escapeYaml(topic.countrySlug)}"
type: "${escapeYaml(topic.contentType || "scholarship-guide")}"
searchIntent: "${escapeYaml(topic.searchIntent || "informational")}"
primaryKeyword: "${escapeYaml(topic.primaryKeyword || topic.title)}"
tags: [${tags.map(tag => `"${escapeYaml(tag)}"`).join(", ")}]
deadline: "${escapeYaml(metadata.deadline)}"
funding: "${escapeYaml(metadata.funding)}"
applicationUrl: "${escapeYaml(applicationUrl)}"
excerpt: "${escapeYaml(excerpt)}"
metaDescription: "${escapeYaml(createMetaDescription(topic))}"
readingTime: ${readingTime}
lastReviewed: "${TODAY}"
---

`;
}

function slugAlreadyExists(slug, existingPosts) {
  return existingPosts.some(post => post.slug === slug);
}

function savePost(topic, content, scholarship, existingPosts) {
  const slug = normalizeSlug(topic.slug || topic.title);

  if (!slug) {
    console.log("Invalid slug. Skipping.");
    return false;
  }

  if (slugAlreadyExists(slug, existingPosts)) {
    console.log(`Duplicate slug detected. Skipping: ${slug}`);
    return false;
  }

  const filename = `${TODAY}-${slug}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`File already exists. Skipping: ${filename}`);
    return false;
  }

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const frontmatter = buildFrontmatter(topic, content, scholarship);

  fs.writeFileSync(
    filepath,
    frontmatter + content.trim() + "\n",
    "utf8"
  );

  console.log(`Saved: ${filename}`);

  return true;
}

async function expandArticle(content, topic, scholarship) {
  console.log("Article is too short. Asking AI to expand it...");

  const prompt = `
Expand the article below so that it reaches at least ${MIN_WORDS} words.

IMPORTANT:
- Preserve all existing facts and claims.
- Do not invent scholarship deadlines, eligibility rules, amounts, universities, statistics, or URLs.
- Keep the existing Official Sources section unchanged.
- Keep the existing Related Guides links unchanged.
- Keep the existing FAQ section and questions.
- Add useful explanatory detail, practical application guidance, context, and clarifications.
- Maintain the same topic and search intent.
- Keep the article SEO-friendly and helpful for readers.
- Return Markdown only.
- Do not use code fences.

Topic:
${topic.title}

Article to expand:
${content}
`;

  const expanded = await callAI([
    {
      role: "system",
      content:
        "You are a careful editorial writer. Expand content without inventing facts, sources, URLs, deadlines, or eligibility requirements."
    },
    {
      role: "user",
      content: prompt
    }
  ], 6500);

  return expanded?.trim() || content;
}

async function generatePost(topic, scholarships) {
  console.log(`\nWriting: ${topic.title}`);

  const scholarship = findScholarship(topic, scholarships);

  if (topic.scholarshipId && !scholarship) {
    console.log("Scholarship record not found. Skipping topic.");
    return null;
  }

  const content = await callAI([
    {
      role: "system",
      content:
        "You are a careful editorial writer. Accuracy is more important than making claims."
    },
    {
      role: "user",
      content: buildArticlePrompt(topic, scholarship)
    }
  ], 6500);

  if (!content) {
    console.log("Empty AI response. Skipping.");
    return null;
  }

  let finalContent = content;
  let validation = validateArticle(finalContent, topic, scholarship);

  console.log(`Generated ${validation.words} words.`);

  if (validation.words < MIN_WORDS) {
    try {
      finalContent = await expandArticle(finalContent, topic, scholarship);
      validation = validateArticle(finalContent, topic, scholarship);

      console.log(`After expansion: ${validation.words} words.`);
    } catch (error) {
      console.log("Article expansion failed:", error?.message || error);
    }
  }

  if (!validation.valid) {
    console.log("Validation failed:");

    for (const error of validation.errors) {
      console.log(`- ${error}`);
    }

    return null;
  }

  return {
    content: finalContent.trim(),
    scholarship
  };
}

async function main() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing.");
  }

  console.log("Starting MigrantScholar generator...");
  console.log("Date:", TODAY);
  console.log("Model:", MODEL);

  const scholarships = loadScholarships();
  const existingPosts = getExistingPosts();

  console.log(`Approved scholarships: ${scholarships.length}`);
  console.log(`Existing posts: ${existingPosts.length}`);

  const topics = await getTrendingTopics(
    scholarships,
    existingPosts
  );

  console.log(`Topics received: ${topics.length}`);

  let saved = 0;

  for (const topic of topics) {
    try {
      const generated = await generatePost(topic, scholarships);

      if (!generated) {
        await sleep(DELAY_MS);
        continue;
      }

      const success = savePost(
        topic,
        generated.content,
        generated.scholarship,
        existingPosts
      );

      if (success) {
        saved++;

        existingPosts.push({
          filename: `${TODAY}-${normalizeSlug(topic.slug)}.mdx`,
          slug: normalizeSlug(topic.slug),
          title: topic.title
        });
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`Failed: ${topic.title}`);
      console.error(error.message);
    }
  }

  console.log(`\nDone! ${saved}/${topics.length} posts saved.`);
}

main().catch(error => {
  console.error("Fatal error:", error.message);
  process.exit(1);
});
