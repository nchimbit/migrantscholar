# MigrantScholar SEO Audit Report
**Date:** August 2026
**Site:** https://migrantscholar.com
**GSC Data:** ~30 clicks, ~2.3K impressions, ~1.3% CTR, avg position ~15.8

---

## 🔴 CRITICAL ISSUES (Fix Immediately)

### 1. Wrong Canonical URLs — 31 pages affected
**Problem:** 31 pages in /pages/ still use `migrantscholar.vercel.app` in canonical URLs, schema markup, and OG tags.
**Impact:** Google may index the wrong domain. Canonical confusion = ranking loss.
**Files affected:**
- pages/blog/[slug].js (4 instances)
- pages/index.js (6 instances)
- 21 other page files
**Risk:** HIGH — This is the #1 issue causing low CTR and ranking suppression.

### 2. Wrong Domain in Schema Markup
**Problem:** Article, BreadcrumbList, and WebSite schema all reference vercel.app URLs.
**Impact:** Rich results may not trigger. Google trust signals weakened.
**Files:** pages/blog/[slug].js lines 104, 115

### 3. Thin Post Titles — No Keyword in Title Tag
**Problem:** Post titles like "STEM Scholarships" are too generic. Title tag = post.title with no optimization.
**Impact:** Low CTR from search results. Missing target keywords.
**Example:** "Fully Funded STEM Scholarships for Syrian Refugees in the USA" → good title but shows as "# STEM Scholarships" in H1.

### 4. Empty Funding Field
**Problem:** Many posts have `funding: ""` in frontmatter.
**Impact:** Quick Facts box shows empty funding. Reduces trust and usefulness.

### 5. Deadline = "Unknown" on Most Posts
**Problem:** 90%+ of posts show deadline: "Unknown".
**Impact:** Users can't act on the information. High bounce rate likely.

---

## 🟡 MODERATE ISSUES

### 6. Meta Descriptions Too Short/Generic
**Problem:** Homepage meta description is only 130 chars and doesn't include target keywords like "refugee scholarships 2026" or "asylum seeker scholarships".
**Current:** "Find verified fully funded scholarships for migrants, refugees, and asylum seekers. Updated daily across UK, Germany, Canada, Australia, USA and Turkey."
**Missing:** Year (2026), specific scholarship names, urgency

### 7. H1 Mismatch on Posts
**Problem:** Post title tag says "Fully Funded STEM Scholarships for Syrian Refugees in the USA" but H1 in content says "# STEM Scholarships" — these must match.
**Impact:** Google uses H1 + title tag agreement as a ranking signal.

### 8. No robots.txt Disallow for Admin
**Problem:** /admin is publicly accessible and crawlable.
**Current robots.txt disallows /api/ but not /admin/
**Impact:** Admin pages may get indexed. Wastes crawl budget.

### 9. BreadcrumbList Schema Wrong URLs
**Problem:** All breadcrumb schema items use vercel.app URLs.
**Impact:** Rich breadcrumb results won't show in Google.

### 10. Internal Links Count Low in Old Posts
**Problem:** Posts generated before July 2026 have few internal links.
**Impact:** Link equity not flowing between pages. Topical authority diluted.

---

## 🟢 WHAT IS WORKING WELL

- ✅ robots.txt allows AI bots (GPTBot, ClaudeBot, PerplexityBot)
- ✅ Sitemap submitted and updating
- ✅ 301 redirect from vercel.app to migrantscholar.com
- ✅ FAQPage schema on homepage
- ✅ Open Graph + Twitter Card tags
- ✅ Google Analytics + Search Console connected
- ✅ Daily content automation running
- ✅ 419 unique posts
- ✅ 510+ total pages
- ✅ Programmatic SEO pages (60 country+filter combos)
- ✅ Nationality pages (29)
- ✅ University pages (15)

---

## GSC Opportunity Analysis

### High Impressions + Low Clicks (Priority targets)
Based on GSC data these queries show opportunity:

| Query | Est. Position | Est. Impressions | Action |
|-------|--------------|-----------------|--------|
| scholarships for refugees | ~15 | High | Improve /by-eligibility/refugees |
| fully funded scholarships refugees 2026 | ~18 | High | Add 2026 to titles |
| asylum seeker scholarship | ~16 | Medium | Improve /by-eligibility/asylum-seekers |
| DAAD scholarship | ~14 | Medium | Improve /universities/daad |
| DAAD scholarship Germany | ~12 | Medium | Add Germany to DAAD page H1 |
| Fulbright scholarship Turkey | ~20 | Low | Create dedicated page |

