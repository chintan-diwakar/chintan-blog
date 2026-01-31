# CopyBrewery: How I Built an AI Agent That Brews Marketing Copy From the Web

*Learn from the best, generate the rest — an open-source tool for marketers, founders, and developers*

---

Ever stared at a blank page trying to write the perfect headline? Or wondered how companies like Stripe, Notion, or Linear craft such compelling copy?

I built **CopyBrewery** to solve this problem. It's an AI-powered agent that crawls websites, extracts their marketing copy patterns, and generates fresh content inspired by what works.

Let me show you how it works and how you can use it.

---

## The Problem: Writer's Block at Scale

Writing marketing copy is hard. You need to:
- Capture attention in seconds
- Communicate value clearly
- Sound unique while following proven patterns
- Create dozens of variations for A/B testing

Most people solve this by manually browsing competitor websites, copying snippets into documents, and trying to reverse-engineer what makes them work.

**That's slow, tedious, and inconsistent.**

---

## The Solution: CopyBrewery

CopyBrewery automates the entire process:

1. **Crawl** — Point it at any website, and it scrapes all the marketing copy
2. **Extract** — AI categorizes every headline, tagline, CTA, and description
3. **Store** — Everything goes into a searchable database
4. **Generate** — Create new copy inspired by the patterns it learned

Think of it as a copywriting research assistant that never sleeps.

---

## How It Works

### The Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI / REST API                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   LangGraph Agent                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Start   │→ │  Crawl   │→ │  Extract │→ │  Store   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                     │       │
│  ┌──────────┐  ┌──────────┐                        │       │
│  │ Generate │← │  Query   │←───────────────────────┘       │
│  └──────────┘  └──────────┘                                │
└─────────────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    SQLite Database                          │
│  Tables: websites, pages, copy_elements, generated_content  │
└─────────────────────────────────────────────────────────────┘
```

### The Tech Stack

- **LangGraph** — Orchestrates the AI agent workflow
- **Playwright** — Handles JavaScript-rendered pages (no more missing content)
- **GPT-4o** — Extracts and categorizes copy elements intelligently
- **SQLite** — Stores everything locally for fast querying
- **FastAPI** — REST API for integrations
- **Typer** — Clean CLI interface

---

## Use Cases: Who Is This For?

### 1. Startup Founders

**The Problem:** You're launching a new product and need landing page copy. You know what you want to say, but not *how* to say it.

**The Solution:**

```bash
# Crawl successful companies in your space
cbrew crawl https://linear.app --depth 2
cbrew crawl https://notion.so --depth 2
cbrew crawl https://figma.com --depth 2

# Generate copy inspired by their patterns
cbrew generate marketing --source linear --count 5
cbrew generate taglines --source notion --count 10
```

**Result:** Instead of starting from scratch, you get AI-generated copy that follows proven patterns from successful companies.

---

### 2. Marketing Teams

**The Problem:** You need to create A/B test variations for your landing page, but coming up with 10+ headline variations is exhausting.

**The Solution:**

```bash
# Build a library of competitor copy
cbrew crawl https://competitor1.com
cbrew crawl https://competitor2.com
cbrew crawl https://competitor3.com

# Generate headline variations
cbrew generate headlines --source competitor1 --count 20

# Generate CTA variations
cbrew generate cta --source competitor2 --count 15
```

**Result:** 35 headline and CTA variations in minutes, not hours.

---

### 3. Copywriters & Content Creators

**The Problem:** You're hired to write copy for a client in an industry you don't know well. You need to understand the language and tone quickly.

**The Solution:**

```bash
# Research the industry
cbrew crawl https://industry-leader-1.com --depth 3
cbrew crawl https://industry-leader-2.com --depth 3

# Export for analysis
cbrew export 1 --format json --output leader1_copy.json
cbrew export 2 --format json --output leader2_copy.json

# Generate descriptions in that style
cbrew generate descriptions --source industry-leader-1 --count 10
```

**Result:** You understand the industry's messaging patterns and have a head start on drafts.

---

### 4. Product Managers

**The Problem:** You're writing product specs and need to describe features in a way that resonates with users.

**The Solution:**

```bash
# Study how similar products describe their features
cbrew crawl https://similar-product.com

# List what was extracted
cbrew show 1

# Generate feature descriptions
cbrew generate descriptions --source similar-product --count 5
```

**Result:** Feature descriptions that sound polished and user-focused.

---

### 5. Agencies

**The Problem:** You handle multiple clients across different industries. Each needs unique copy that fits their brand voice.

**The Solution:**

Use the REST API to integrate CopyBrewery into your workflow:

```bash
# Start the API server
uvicorn copybrewery.api:app --host 0.0.0.0 --port 8000

# Crawl via API
curl -X POST http://localhost:8000/crawl \
  -H "Content-Type: application/json" \
  -d '{"url": "https://client-competitor.com", "depth": 2}'

# Generate via API
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"source": "client-competitor", "content_type": "marketing", "count": 5}'
```

**Result:** Scalable copy research and generation across all your clients.

---

### 6. Developers Building AI Tools

**The Problem:** You're building a content generation tool and need a reliable way to gather training data or examples.

**The Solution:**

```python
# Use CopyBrewery as a library
from copybrewery.scraper import crawl_website
from copybrewery.generator import generate_content

# Crawl and extract
data = crawl_website("https://example.com", depth=2)

# Generate new content
content = generate_content(
    source="example",
    content_type="taglines",
    count=10
)
```

**Result:** A modular system you can integrate into your own applications.

---

## Getting Started

### Installation

```bash
# Clone the repo
git clone https://github.com/ChintanDiwakar/copybrewery.git
cd copybrewery

# Install
pip install -e .

# Install Playwright browser
playwright install chromium

# Set up environment
cp .env.example .env
# Add your OPENAI_API_KEY to .env
```

### Your First Crawl

```bash
# Crawl Stripe's website
cbrew crawl https://stripe.com --depth 1

# See what was extracted
cbrew show 1

# Generate new taglines inspired by Stripe
cbrew generate taglines --source stripe --count 5
```

### Example Output

When you run `cbrew show 1`, you'll see:

```
Website: stripe.com
Pages crawled: 5
Copy elements extracted: 47

Headlines (12):
  - "Financial infrastructure for the internet"
  - "Start accepting payments today"
  - "Built for developers"
  ...

Taglines (8):
  - "Payments infrastructure for the internet"
  - "The new standard in online payments"
  ...

CTAs (15):
  - "Start now"
  - "Contact sales"
  - "Read the docs"
  ...

Descriptions (12):
  - "Stripe builds the most powerful and flexible tools..."
  ...
```

When you run `cbrew generate taglines --source stripe --count 5`:

```
Generated Taglines:

1. "The backbone of modern commerce"
2. "Where transactions meet innovation"
3. "Powering the future of payments"
4. "Commerce infrastructure, simplified"
5. "Built for businesses that scale"
```

---

## Content Types You Can Generate

| Type | What It Creates | Best For |
|------|-----------------|----------|
| `marketing` | Full marketing copy with headlines, descriptions, and CTAs | Landing pages |
| `headlines` | Attention-grabbing headers | Blog posts, ads |
| `taglines` | Short, memorable phrases | Brand messaging |
| `descriptions` | Product/service descriptions | Feature sections |
| `cta` | Call-to-action button text | Conversion optimization |

---

## Deployment Options

### Local Development

```bash
cbrew crawl https://example.com
```

### Docker

```bash
docker-compose up api
```

### Cloud Platforms

CopyBrewery can be deployed to:
- **Railway** — One-click deploy
- **Fly.io** — Global edge deployment
- **Render** — Free tier available
- **AWS/GCP/Azure** — Container services

---

## Best Practices

### 1. Crawl Multiple Sources

Don't rely on a single website. Crawl 3-5 competitors or industry leaders to get diverse patterns:

```bash
cbrew crawl https://site1.com
cbrew crawl https://site2.com
cbrew crawl https://site3.com
```

### 2. Use Depth Wisely

- `--depth 1` — Homepage only (fast, focused)
- `--depth 2` — Homepage + linked pages (balanced)
- `--depth 3` — Deep crawl (comprehensive, slower)

### 3. Export and Analyze

Export your data for manual analysis or to share with your team:

```bash
cbrew export 1 --format json --output analysis.json
```

### 4. Iterate on Generations

Generate multiple batches and cherry-pick the best:

```bash
cbrew generate headlines --source stripe --count 20
cbrew generate headlines --source linear --count 20
```

### 5. Use as a Starting Point

AI-generated copy is a draft, not a final product. Use it to overcome writer's block, then refine with your brand voice.

---

## Ethical Considerations

CopyBrewery is designed for **inspiration**, not plagiarism:

- It extracts patterns and styles, not verbatim copy
- Generated content is original, influenced by what works
- Always add your unique voice and brand personality
- Respect robots.txt and crawl responsibly

---

## What's Next?

I'm actively developing CopyBrewery. Planned features include:

- **Brand voice training** — Teach it your specific tone
- **Multi-language support** — Generate copy in different languages
- **Chrome extension** — Analyze any page with one click
- **Team collaboration** — Share libraries across your organization

---

## Try It Yourself

CopyBrewery is open source and free to use:

**GitHub:** [github.com/ChintanDiwakar/copybrewery](https://github.com/ChintanDiwakar/copybrewery)

Star the repo if you find it useful, and feel free to contribute!

---

## Conclusion

Writing marketing copy doesn't have to start from a blank page. With CopyBrewery, you can:

1. **Learn from the best** — See exactly how successful companies craft their messaging
2. **Generate variations** — Create dozens of options in minutes
3. **Stay inspired** — Never run out of ideas

Whether you're a founder, marketer, copywriter, or developer, CopyBrewery gives you a head start on every piece of copy you write.

**Stop staring at blank pages. Start brewing.**

---

*If you found this article helpful, follow me for more on AI tools, development, and building in public.*

---

**Connect with me:**
- Twitter: [@ChintanDiwakar1](https://x.com/ChintanDiwakar1)
- LinkedIn: [chintandiwakar](https://www.linkedin.com/in/chintandiwakar/)
- Medium: [@chintandiwakar](https://chintandiwakar.medium.com/)

---

*CopyBrewery is built with LangGraph, Playwright, and GPT-4. Licensed under MIT.*
