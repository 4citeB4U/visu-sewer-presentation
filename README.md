<!-- LEEWAY HEADER
TAG: DOC.README
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: book-open
ICON_SIG: CD534113
5WH: WHAT=Project README with LeeWay v11 compliance documentation;
WHY=Document VisuSewer pitch deck structure, narrative, and governance standards;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\README.md;
WHEN=2025-11-08;
HOW=Markdown documentation with LEEWAY governance metadata
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
-->

# Github Setup & Contribution Guide
v 13
## Repository Structure
This repo contains all code, assets, and documentation for the VisuSewer Strategic Asset & Growth Deck. All files are LeeWay v11 compliant and ready for open-source or private deployment.

## How to Contribute
1. **Fork the repository** on Github.
2. **Clone your fork** and create a new branch for your changes.
3. **Make edits** and ensure:
   - All new/changed files have a LeeWay header (see examples in any `.ts` or `.tsx` file)
   - No inline styles (except for dynamic chart backgrounds)
   - All code passes `npm run build` and `leeway_frontend_audit.py`
4. **Commit and push** your branch.
5. **Open a pull request** with a clear description of your changes and compliance with LeeWay standards.

## Github Actions & CI/CD
- **Audit:** The included `audit.yml` runs header and profitability checks on every PR.
- **Batch Header Enforcement:** Use `Apply-LeewayHeaders.ps1` to add headers to new files before PR submission.
- **Frontend Audit:** Run `leeway_frontend_audit.py` locally before pushing.

## License
This project is licensed under MIT. See the SPDX-License-Identifier in every file header.

## Contact & Support
- For questions, open an issue or discussion on Github.
- For LeeWay compliance, see `LEEWAY_STANDARDS_v11_FULL.md`.
- For technical support, contact LeeWay Industries or VisuSewer project maintainers.

---

# From Roots to Resilience: The VisuSewer Story
## *A Financial Presentation That Reads Like a Legacy*

---

## **🧠 LeeWay Standards v11 Compliance**

This project adheres to **LeeWay Standards v11** for comprehensive governance, profitability, and ethics compliance. Static text throughout the deck uses collective voice (we / our / VisuSewer). Only the live AI narrator persona (Agent Lee) may use first‑person singular during interactive narration.

### **Governance**
- ✅ **LEEWAY Headers**: All 23+ project files include mandatory governance headers with TAG, COLOR_ONION_HEX, ICON_FAMILY/GLYPH, 5WH metadata, AGENTS, and SPDX-License-Identifier
- ✅ **No Inline Styles**: CSS externalized to `animations.css` per LeeWay v8 frontend standards (2 acceptable exceptions for data-driven dynamic styles: Deck.tsx cover background, Projects.tsx Gantt positioning)
- ✅ **Profitability by Default**: LTV:CAC ≥3, Gross Margin >55%, Active Engagement >40%, Retention ≥60%
- ✅ **Ethics Matrix**: AI behavior boundaries, data privacy (ConsentScreen.tsx), LLM agnosticism
- ✅ **Technical Stack**: React 19 + TypeScript + Vite 6, Tailwind CSS, <200KB bundle target, edge-first

### **Audit Requirements**
- Run `leeway_frontend_audit.py` before deployment
- CI/CD: `audit.yml` validates headers and profitability metrics
- Enforcement: `Apply-LeewayHeaders.ps1` for batch header application

### **File Coverage**
23 files with LEEWAY headers including:
- **Core**: App.tsx, index.tsx, index.html, constants.ts, types.ts, gemma.js, animations.css
- **Components**: Deck.tsx, Chatbot.tsx, ConsentScreen.tsx, Card.tsx, charts.tsx, Icons.tsx, DataTable.tsx, TTSPlayer.tsx, StatCard.tsx, ProjectDetails.tsx
- **Visuals**: Metrics.tsx, Projects.tsx, Roadmap.tsx, ServiceStack.tsx, OrgChart.tsx, Timeline.tsx
- **Hooks**: useTTS.ts
- **Utils**: audio.ts
- **Config**: vite.config.ts

---

## **Welcome to the Underground Revolution**

*In the beginning, there were pipes. Silent arteries beneath cities, carrying away what communities wished to forget. And there were people—founders who saw not just infrastructure, but a promise.*

This is the story of **VisuSewer**: a tale of love for craft, community, and the unseen systems that sustain civilization. It's a story of growth tempered by principle, expansion anchored in accountability, and a belief so fundamental it has survived half a century:

> **"We will give customers peace of mind that their jobs will be done right."**

---

## **What You're About to Experience**

This isn't a typical pitch deck. It is an **AI‑narrated financial story** presented by **Agent Lee**, the strategic analyst persona. Static content keeps a unified team voice; the AI may use "I" only while speaking dynamically. Over the next presentation, you'll witness:

### **Four Love Stories**
1. **Falling in Love with the Craft** (1970s-1990s) - Founders discovering the art of trenchless rehabilitation
2. **Falling in Love with Operational Excellence** (2000s-2020s) - Embedding values into systems and KPIs
3. **Falling in Love with the Future** (2020s-Present) - Digital transformation through Fort Point Capital partnership
4. **Falling in Love with Legacy** (2025-2045) - Building something that outlasts its founders

### **Five Acts**
- **Act I:** The Founding Covenant - Four pillars that became competitive advantages
- **Act II:** The Maturation Challenge - Scaling without losing soul
- **Act III:** The Digital Inflection Point - The wake-up call and strategic response
- **Act IV:** The Strategic Blueprint - Three-phase technology roadmap (2025-2027)
- **Act V:** The 20-Year Vision - From contractor to infrastructure intelligence platform (2025-2045)

### **The Numbers Behind the Narrative**
- **Year 1 ROI:** $1M technology investment → $2.1M benefits (110% return)
- **3-Year Impact:** $13.6M net financial benefit
- **Revenue Trajectory:** $37M (2024) → $85M (2030) → $300M (2045)
- **Valuation Uplift:** 6-8x EBITDA (contractor) → 10-15x EBITDA (SaaS-hybrid)
- **Values Advantage:** $25-30M annual financial benefit from "soft" values at $150M scale

---

## **The Covenant: Four Pillars as Financial Advantage**

### **1. Responsiveness**
- *Traditional:* "Answer the phone at 2 AM"
- *Digital-Age:* <2-hour response time; 24-48hr report delivery
- *Financial Impact:* 95% client retention vs 70% industry = **$15M revenue difference**

### **2. Integrity**
- *Traditional:* "Tell the truth about pipe condition"
- *Digital-Age:* 0% report revisions; 100% PACP compliance
- *Financial Impact:* 10-15% premium pricing = **$5-10M profit uplift**

### **3. Dedication**
- *Traditional:* "Show up in blizzards"
- *Digital-Age:* 98% on-time completion; 95% technician retention
- *Financial Impact:* High retention vs 60% industry = **$2M annual savings**

### **4. Reputation**
- *Traditional:* "Your last job is your next sales pitch"
- *Digital-Age:* NPS >70; 50%+ revenue from referrals
- *Financial Impact:* Word-of-mouth = **$3M marketing savings**

---

## **The Technology Transformation: 2025-2027**

### **Phase 1: AI Inspection - Responsiveness at Machine Speed** (Months 1-6)
- **Investment:** $200K
- **Technology:** SewerAI/WinCan AI (96-98% defect detection)
- **Impact:** 85% coding automation, 24-48hr delivery vs 5-7 day industry standard
- **ROI:** $140K annual labor savings

### **Phase 2: Field Service Management - Digital Dedication** (Months 4-9)
- **Investment:** $250K
- **Technology:** ServiceTitan FSM for 60+ field personnel
- **Impact:** 10-15% technician utilization improvement, 40% admin reduction
- **Client Benefit:** Real-time visibility, automated communications

### **Phase 3: ERP & Predictive Analytics - Intelligence as Reputation** (Year 2-3)
- **Investment:** $375-575K Year 1
- **Technology:** Procore ERP + Autodesk Info360 + Power BI portals
- **Impact:** Transform from "vendor" to "strategic infrastructure advisor"
- **Recurring Revenue:** $1-2M annually by Year 3

---

## **The Resilience Framework: Protecting the Bottom Line**

### **1. Political & Regulatory Shielding**
- AI compliance dashboards tracking federal/state/municipal requirements
- Active NASSCO/WEF/AWWA engagement
- Diversified municipal/commercial/private client base
- **Financial Impact:** Avoid $500K-1M fines; reduce bid risk 15%

### **2. Supply Chain Hardening**
- Dual-source critical materials (CIPP liners, epoxy, robotics)
- In-house manufacturing for proprietary formulations
- IoT inventory tracking with 90-day buffer
- **Financial Impact:** 20% delay reduction; avoid $300-500K expedited shipping

### **3. Weatherization & Emergency Response**
- Digital twin simulations for extreme weather
- Pre-staged mobile response units
- AR-enabled field response systems
- **Financial Impact:** Capture $2-4M emergency contracts; 40% faster mobilization

### **4. Safety & Training Excellence**
- VR/AR confined space simulators
- Smart helmets with gas detection and fatigue monitoring
- Technical college apprenticeship partnerships
- **Financial Impact:** 30% injury reduction = $150-200K savings; 25% recruitment improvement

---

## **The 20-Year Vision: Three Transformations**

### **2025-2030: Technology-Enabled National Platform**
- Geographic expansion (Southwest, Southeast, Pacific Northwest)
- Service diversification (stormwater, green infrastructure, IoT monitoring)
- **Targets:** $37M → $85M revenue; 18% → 24% EBITDA; 70% → 95% retention

### **2030-2035: Predictive Intelligence as Core Product**
- Platform shift to "infrastructure intelligence company"
- 40% recurring revenue from analytics subscriptions
- Proprietary 1M+ pipe segment database
- **Targets:** $85M → $150M revenue; 15% → 40% recurring; 10-15x EBITDA valuation

### **2035-2045: Climate Resilience Leadership**
- Carbon-neutral operations, biodegradable materials
- Global technology licensing
- 50% workforce in data science/engineering roles
- **Targets:** $150M → $300M revenue; 20% international; top decile ESG

---

## **Run This Story Locally**

**Prerequisites:** Node.js (v18+)

### **Installation**
```bash
# Clone or navigate to project directory
cd "Visu-Sewer Strategic Asset & Growth Deck"

# Install dependencies
npm install

# No external API key needed - uses:
# - Gemma JS model (browser-based AI)
# - SpeechSynthesis API (native TTS)
# - Recharts (data visualization)
```

### **Launch the Presentation**
```bash
npm run dev
```
The application will open at `http://localhost:5173/visu-sewer-presentation/` when running the dev server.

**Important:** Do NOT open `index.html` directly with the `file://` protocol. Modern browsers block module loading and cross-origin requests for local files, which causes errors like:

- "Access to script at 'file:///.../index.tsx' from origin 'null' has been blocked by CORS policy"
- "Failed to load resource: net::ERR_FAILED"

To view the built site locally, serve the `docs/` folder over HTTP. You can use the included convenience script or any static server:

```powershell
# Build the site (produces ./docs)
npm run build

# Serve the built site on http://localhost:8080
npm run serve-docs

# Or use a temporary static server (if you don't want to add the npm script)
npx http-server ./docs -p 8080 --cors
```

Then open `http://localhost:8080/visu-sewer-presentation/` (or `http://localhost:8080/`) in your browser.

The application will open at `http://localhost:5173/visu-sewer-presentation/` when running the dev server.

## Deploying to GitHub Pages (Docs folder)

This repository is configured to build a self-contained static site suitable for GitHub Pages. The production build outputs into the `docs/` folder so you can publish the `main` branch's `docs/` folder via GitHub Pages with no additional hosting.

Steps to publish:

1. Build the site:
```bash
npm run build
```

2. Commit the produced `docs/` folder to your `main` branch (the build command overwrites it).

3. In your GitHub repository settings → Pages, set the source to `Deploy from a branch` → `main` branch, `/docs` folder.

4. Wait a minute — your site will be available at `https://<your-org-or-user>.github.io/<repo-name>/`.

Notes:
- The build is self-contained: it does not rely on CDN import maps or server-side API keys.
- All asset paths are relative so the site works from a subpath (GitHub Pages) or a custom domain.
- If you prefer automated deployment, you can add a GitHub Action to run `npm ci` and `npm run build` and commit the `docs/` directory or use `peaceiris/actions-gh-pages` to publish `dist` instead.

Additional GitHub Pages tips:

- In the repository, go to **Settings → Pages** (or **Settings → Pages and deployments**). Select **Branch: main** and **Folder: /docs** then click **Save**. GitHub will validate and publish the folder.
- If your repo is private, enable Pages for private repos in the Pages settings and select the correct access option.
- If you want an automated workflow instead of committing `docs/`, add a GitHub Action that runs `npm ci` and `npm run build` and then deploys with `peaceiris/actions-gh-pages` (recommended for CI-driven sites).

Verify the published site by visiting `https://<your-org-or-user>.github.io/<repo-name>/` after a minute. If you see a 404, clear the browser cache and retry — GitHub sometimes needs a short propagation window.

### **Experience Features**
- **AI Narrator:** Agent Lee presents with a natural voice (prioritized high‑quality voices; chunked TTS with primer fallback for reliability)
- **Auto-Advance:** Presentation flows sequentially through all 8+ sections
- **Interactive Chat:** Ask Agent Lee questions about the company
- **Voice Commands:** Navigate using voice ("next page", "go to timeline")
- **Animated Charts:** Recharts-powered visualizations with smooth transitions
- **Company Images:** Real VisuSewer photos throughout the narrative

---

## **Project Architecture**

### **Core Technologies**
- **React 19.2.0** + **TypeScript** - UI framework
- **Vite 6.4.1** - Lightning-fast dev server
- **@xenova/transformers** - Browser-based AI (LaMini-Flan-T5-248M)
- **Recharts 2.x** - Financial-grade charts and graphs
- **Tailwind CSS** - Responsive, beautiful styling

### **File Structure**
```
├── App.tsx                 # Main presentation controller
├── constants.ts            # All story content and data
├── types.ts               # TypeScript interfaces
├── components/
│   ├── Deck.tsx           # Slide renderer with animations
│   ├── Chatbot.tsx        # AI Agent Lee interface
│   ├── ConsentScreen.tsx  # Voice/mic permission handler
│   └── visuals/
│       ├── Timeline.tsx   # 50-year journey visualization
│       ├── OrgChart.tsx   # Leadership structure with photos
│       ├── ServiceStack.tsx # Integrated service model
│       ├── Projects.tsx   # Case studies with Gantt/bar/line charts
│       ├── Metrics.tsx    # HR analytics with gauge charts
│       └── Roadmap.tsx    # Growth projections with combo charts
├── hooks/
│   └── useTTS.ts          # Text-to-speech engine
├── utils/
│   └── audio.ts           # Audio utility functions
└── public/images/         # Company images and photos
```

### **Key Implementation Details**
- **No API Keys Required** - Fully client-side, no external dependencies
- **Responsive Design** - Works on desktop, tablet, mobile
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Strict Mode** - Type-safe throughout
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

---

## **The Four Tests of Transformation**

As Agent Lee will narrate, VisuSewer's next 20 years will test whether they can:

1. **Automate without dehumanizing** - AI amplifies craftsmanship, doesn't replace it
2. **Scale without diluting** - 500+ employees, one cultural coherence
3. **Predict without arrogance** - Data-driven intelligence respects nature's unpredictability
4. **Profit without compromising** - Shareholder returns honor the covenant

---

## **For Investors, Operators, and Dreamers**

This presentation is designed for:

### **CFOs & Financial Leaders**
- Year 1 ROI: 110% return, 5.7-month payback
- SaaS-hybrid valuation: 10-15x EBITDA vs 6-8x contractor multiple
- Transparent financial modeling with sensitivity analysis

### **Asset Managers & Municipal Leaders**
- Predictive maintenance reduces emergency repairs 15-25%
- Digital twin platform extends asset life 50+ years
- NASSCO/PACP compliance ensures quality at scale

### **HR & Workforce Planners**
- VR/AR training accelerates onboarding 40%
- 95% retention vs 60% industry = $2M savings
- Values-based KPIs embedded in compensation

### **COOs & Operations Executives**
- 85% AI coding automation, 40% admin time reduction
- Pre-staged emergency kits = 40% faster response
- Dual-source suppliers = 20% delay reduction

---

## **Voice Governance Summary**
Static text: collective voice only (we / our / VisuSewer). Interactive narration: Agent Lee may use first‑person for storytelling while preserving factual integrity and avoiding overstatement. Quotes using "I" are reserved for spoken narration or cited testimony.

---

## **Start the Journey**

```bash
npm run dev
```

**Then open:** `http://localhost:3000`

**Let Agent Lee tell you the story of:**
- 50 years underground
- Infinite years ahead
- Peace of mind built one inspection at a time

---

*"Peace of mind is not given. It is built—one inspection, one value, one choice at a time."*

— **VisuSewer: Inspect. Maintain. Rehabilitate.**

---

## **Development & Deployment**

### **Environment Variables**
No external API keys needed! The `.env.local` file is optional and unused.

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Tech Stack**
- **AI:** Gemma LaMini-Flan-T5-248M (runs entirely in browser)
- **TTS:** Browser SpeechSynthesis API (no cloud dependencies)
- **Charts:** Recharts 2.x (animated, responsive, beautiful)
- **Styling:** Tailwind CSS + custom animations
- **Build:** Vite (lightning-fast HMR)

---

**View in AI Studio:** https://ai.studio/apps/drive/1CpLZ_PIPFVf4i67_xr75oVrnZK8w4kk4

---

*Built with love for craft, excellence, possibility, and legacy.*
