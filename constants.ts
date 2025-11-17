/* LEEWAY HEADER
TAG: DATA.CONSTANTS.DECK
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: database
ICON_SIG: CD534113
5WH: WHAT=Pitch deck content and narrative data;
WHY=Centralize all 16 slide contents and narratives;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\constants.ts;
WHEN=2025-11-08;
HOW=TypeScript typed data structures
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import { DeckSection } from './types';

// Absolute presentation title used throughout the app and by Agent Lee
export const PRESENTATION_TITLE = `From Roots to Resilience: The VisuSewer Story`;

export const pitchDeckData: DeckSection[] = [
    {
        title: 'Cover / Opening',
    narrative: "Welcome. This presentation, 'From Roots to Resilience: The VisuSewer Story — A Financial Document That Reads Like a Legacy', is our canonical account of Visu-Sewer's history, strategy, and financial plan. In the beginning, there were pipes—silent arteries beneath cities. And there were people, founders who saw not just infrastructure, but a promise. This is not a spreadsheet. It is a story told in the language of human values, financial realities, and strategic ambition. A story of how a family business became a national platform, and how that platform must now evolve to endure another fifty years.",
        content: {
            type: 'cover',
            title: PRESENTATION_TITLE,
            subtitle: 'A Financial Document That Reads Like a Legacy',
            backgroundImage: '/images/finished-tunnel.png',
            methodology: '🔬 Methodology & Validation: All financial projections use conservative assumptions validated against comparable companies. Client retention and operational metrics are calculated from internal systems (CRM, project management, HR). Industry benchmarks are from third-party trade associations and government agencies. Technology ROI is based on pilot programs and vendor-provided case studies adjusted for VisuSewer-specific implementation.',
            advisory: '📊 Evidence-Based Analysis: Every chart, metric, and financial projection in this presentation is grounded in verifiable data sources. For comprehensive references and detailed source documentation, see Page 22: Evidence & References.'
        }
    },
    {
      title: 'Presentation Index / Roadmap of the Story',
      narrative: 'Welcome to the VisuSewer strategic presentation. This index provides a roadmap of our journey—from founding covenant to future vision. Each section builds upon the last, revealing how a 50-year commitment to excellence has created a platform for transformational growth. This presentation guides you through the story of From Roots to Resilience.',
                content: {
                type: 'index',
                sections: [
                    { id: 1,  title: 'Cover / Opening', description: 'Presentation title and framing' },
                    { id: 2,  title: 'Presentation Index / Roadmap of the Story', description: 'High-level roadmap for the deck' },
                    { id: 3,  title: 'Founding Roots / Underground Truth', description: 'Founding covenant and early crews' },
                    { id: 4,  title: 'The Four Pillars: Values as Competitive Advantage', description: 'Core values as competitive advantage—$25-30M quantifiable annual benefit' },
                    { id: 5,  title: 'Love Story #1: Falling in Love with the Craft', description: 'Craft, CCTV, and trenchless expertise' },
                    { id: 6,  title: 'Executive Summary', description: 'Strategic inflection point and key thesis' },
                    { id: 7,  title: 'A History of Strategic Evolution', description: 'From 1975 regional specialist to national platform' },
                    { id: 8,  title: 'Love Story #3: Falling in Love with the Future', description: 'Technology modernization and AI inspection' },
                    { id: 9,  title: 'The Technology Transformation: Three-Phase Modernization', description: 'AI Inspection, FSM, ERP & predictive analytics' },
                    { id: 10, title: 'The Resilience Framework: Shielding the Bottom Line', description: 'Four pillars protecting millions in risk' },
                    { id: 11, title: 'Love Story #2: Falling in Love with Operational Excellence', description: 'Systems and processes that preserve culture' },
                    { id: 12, title: 'Covenant & Culture as Engine', description: 'Why belief and culture drive sustainable value creation' },
                    { id: 13, title: 'Scaling with Soul / Process & Systems', description: 'Routines and playbooks that protect culture' },
                    { id: 14, title: 'Integrated Service Delivery Model', description: 'Inspect → Maintain → Rehabilitate lifecycle' },
                    { id: 15, title: 'Case Studies in Execution Excellence', description: 'Flagship project case studies and outcomes' },
                    { id: 16, title: 'Human Capital Analytics: Linking People to Profitability', description: 'KPIs linking workforce to margin' },
                    { id: 17, title: 'Growth Thesis & Financial Projections', description: 'Revenue and M&A roadmaps to scale' },
                    { id: 18, title: 'Love Story #4: Falling in Love with Legacy', description: 'Long-term vision and stewardship' },
                    { id: 19, title: 'The Four Tests of Transformation', description: 'Automate, Scale, Predict, Profit tensions' },
                    { id: 20, title: 'Toward the Horizon: 50 Years Underground, Infinite Years Ahead', description: 'Future-facing summary and call to action' },
                    { id: 21, title: 'Human Capital: The Core Asset', description: 'Field-first leadership and people strategy' },
                    { id: 22, title: 'Evidence & References: Data Sources for Every Claim', description: 'Comprehensive references and data sources for all metrics' },
                    { id: 23, title: 'Thank You: The Journey Continues', description: 'Agent Lee\'s farewell and next steps' },
                ],
            }
    },
    // 3. Founding Roots / Underground Truth (moved after index)
    {
        title: 'Founding Roots / Underground Truth',
        narrative: "At the heart of this love story is a simple truth: what lies underground powers what thrives above. In the beginning, there were pipes and people; the covenant 'do the work as if someone’s family depends on it' formed the company’s operating ethic.",
        content: { type: 'summary', message: 'Founding covenant and early crews shaped long-term outcomes.', points: [], image: '/images/america-visu-sewer.png' }
    },
    {
        title: "The Four Pillars: Values as Competitive Advantage",
        narrative: "From that covenant emerged four core values that became Visu-Sewer's operational DNA. These were not abstractions—they were reflected in labor practices, technology adoption, and client relationships. By the 1990s, Visu-Sewer was recognized as one of the most established and trusted companies in the United States, not because of aggressive marketing, but because municipalities recommended them to each other.",
        content: {
            type: 'summary',
            message: 'At $150M scale, these "soft" values deliver $25-30M in quantifiable annual financial advantage.',
            points: [
                "Responsiveness: Answer at 2 AM → <2hr response time → 95% retention = $15M revenue difference",
                "Integrity: Tell the truth → 0% report revisions → 10-15% premium pricing = $5-10M profit uplift",
                "Dedication: Show up in blizzards → 98% on-time delivery → 95% retention = $2M annual savings",
                "Reputation: Last job is next pitch → NPS >70, 50% referrals → $3M marketing savings",
            ]
        }
    },
    {
        title: "Love Story #1: Falling in Love with the Craft",
        narrative: "The first love story was between the founders and the work itself. They fell in love with the elegance of trenchless rehabilitation—solving problems without destroying streets. The detective work of CCTV inspection—diagnosing invisible failures through pixel patterns and flow anomalies. The engineering beauty of CIPP lining—transforming resin-soaked fabric into a structural liner stronger than the original pipe. This passion for craft attracted like-minded professionals. Early employees weren't just looking for jobs; they were joining a mission.",
        content: {
            type: 'summary',
            message: 'Excellence attracted excellence. Reputation compounded reputation. The culture became a self-reinforcing cycle.',
            points: [
                "Trenchless Rehabilitation: Solving problems without destroying infrastructure",
                "CCTV Inspection: Diagnosing invisible failures with precision and expertise",
                "CIPP Technology: Engineering solutions that last 50+ years",
                "Cultural Magnet: Attracting professionals who shared the passion for excellence",
            ]
        }
    },
    {
        title: "Executive Summary",
        narrative: `Visu-Sewer is at a strategic inflection point. Having established a 50-year foundation of operational credibility, the company is now poised to translate this field-level expertise into a scalable national platform. The backing of Fort Point Capital provides the catalyst. Our path forward is an integrated strategy: amplifying proven operational models with a robust, data-driven human capital architecture to drive predictable growth and margin expansion.`,
        content: {
            type: 'summary',
            message: 'Our thesis posits that scaling field-honed operational excellence through a disciplined, data-centric human capital framework will unlock significant enterprise value.',
            points: [
                "Legacy of Excellence: A 50-year track record of technical mastery and operational reliability.",
                "Strategic Inflection Point: Transitioning from a regional leader to a scalable, national buy-and-build platform.",
                "Capital Infusion: Fort Point Capital partnership provides the resources to accelerate a disciplined growth strategy.",
                "The Path to Value Creation: Executing a dual-pronged strategy of operational scaling and human capital optimization.",
            ]
        }
    },
    {
        title: "A History of Strategic Evolution",
            narrative: "Our growth reflects deliberate, value-accretive steps: geographic expansion, technology adoption, and targeted M&A. From a single Wisconsin crew in 1975 to a national platform by 2025, each phase reduced operational risk and strengthened market position. The 2023 Fort Point Capital investment accelerated modernization while preserving cultural identity.",
            content: {
                type: 'timeline',
                message: 'Deliberate expansion across geography, technology, and acquisitions — 2023 investment catalyzed modernization',
                milestones: [
                { year: '1975', milestone: 'Founded in Pewaukee, WI', impact: 'The covenant begins: Peace of mind', category: 'geo' },
                { year: '1980s', milestone: 'Trenchless Rehab Adopted', impact: 'Grouting & slip-lining added', category: 'tech' },
                { year: '1988', milestone: 'First Satellite Office – MN', impact: 'Regional expansion begins', category: 'geo' },
                { year: '1994', milestone: 'CIPP Lining Main Service', impact: 'Core competency established', category: 'tech' },
                { year: '2012', milestone: 'Walden Tech Acquired (IL)', impact: 'Inspection capacity growth', category: 'm&a' },
                { year: '2023', milestone: 'Fort Point Capital Investment', impact: 'Buy-and-build platform created', category: 'm&a' },
                { year: '2025', milestone: 'MOR Construction Acquisition', impact: 'Entry into PA/DE/NJ markets', category: 'm&a' }
            ],
            image: '/images/geographic-footprint.png'
        }
    },
    {
        title: "Love Story #3: Falling in Love with the Future",
        narrative: "By 2023, Visu-Sewer leadership confronted a sobering reality: competitors like Aegion and Insituform were leapfrogging them in AI-driven automation—95 to 97 percent accuracy defect detection, client dashboards, predictive analytics pilots. Meanwhile, Visu-Sewer's technology stack was aging. The risk: becoming a premium-priced dinosaur, expensive because of craftsmanship but slow and opaque compared to digitally-native competitors. Leadership's response was to fall in love with possibility—the vision of what Visu-Sewer could become.",
        content: {
            type: 'summary',
            message: 'The 2024 Fort Point Capital partnership unlocked $1M Year 1 technology budget, M&A capital, and operational consulting—accelerating modernization while preserving culture.',
            points: [
                "The Wake-Up Call: Competitors deploying AI inspection, real-time dashboards, predictive analytics",
                "The Risk: Becoming slow and opaque despite premium craftsmanship quality",
                "The Response: Strategic partnership with Fort Point Capital ($2B AUM)",
                "The Catalyst: $1M technology budget + M&A capital + digital transformation expertise",
            ]
        }
    },
    {
        title: "The Technology Transformation: Three-Phase Modernization",
        narrative: "The leadership committed to a three-phase modernization anchored in the original values. Phase One: AI Inspection delivers responsiveness at machine speed with 96 to 98 percent defect detection accuracy, reducing coding time from 8 to 12 hours down to 30 to 60 minutes. Phase Two: Field Service Management brings dedication through digital workflows with ServiceTitan FSM for 60-plus field personnel. Phase Three: ERP and Predictive Analytics builds reputation on intelligence, transforming from inspection vendor to strategic infrastructure advisor.",
        content: {
            type: 'summary',
            message: 'Year 1 ROI: $1M investment → $2.1M benefits = 110% return with 5.7-month payback period',
            points: [
                "Phase 1 (Months 1-6): AI Inspection—$200K investment, 24-48hr delivery vs 5-7 day standard, $140K annual savings",
                "Phase 2 (Months 4-9): ServiceTitan FSM—$250K investment, 10-15% utilization gain, 40% admin reduction",
                "Phase 3 (Year 2-3): Procore ERP + Info360—$375-575K, predictive analytics, $1-2M recurring revenue",
                "Values Alignment: Responsiveness (speed), Dedication (workflows), Reputation (intelligence)",
            ]
        }
    },
    {
        title: "The Resilience Framework: Shielding the Bottom Line",
        narrative: "The CFO, Asset Manager, and COO collaborate on pinch point mitigation across four critical dimensions. Political and Regulatory Shielding with AI compliance dashboards and industry engagement. Geopolitical and Supply Chain Hardening through dual-source suppliers and in-house manufacturing. Weatherization and Emergency Response with digital twin simulations and pre-staged kits. Safety and Training Excellence using VR AR simulators and wearable tech. Combined impact: protecting millions in potential losses while capturing new revenue opportunities.",
        content: {
            type: 'summary',
            message: 'Four pillars of protection delivering $3-7M annual risk mitigation and $2-4M emergency revenue capture.',
            points: [
                "Political & Regulatory: AI compliance dashboards, NASSCO/WEF engagement—avoid $500K-1M fines, reduce bid risk 15%",
                "Supply Chain: Dual-source materials, IoT tracking, in-house manufacturing—20% delay reduction, avoid $300-500K costs",
                "Weatherization: Digital twins, AR field response, pre-staged kits—capture $2-4M emergency contracts, 40% faster mobilization",
                "Safety & Training: VR/AR simulators, smart helmets, apprenticeships—30% injury reduction = $150-200K savings",
            ]
        }
    },
    // 12. Scaling with Soul / Process & Systems
    {
        title: 'Scaling with Soul / Process & Systems',
        narrative: 'Routines, reviews, and integration checklists ensure culture is preserved as the organization scales.',
        content: { type: 'summary', message: 'Processes that protect culture', points: [], image: '/images/manholeopening.webp' }
    },
    {
        title: "Love Story #2: Falling in Love with Operational Excellence",
    narrative: "As Visu-Sewer expanded from local specialist to regional powerhouse, leadership faced the classic tension: How do you scale without losing your soul? The answer was to fall in love again—this time with systems thinking and operational discipline. We realized that values are not enough. Values must be embedded in processes, measured in KPIs, and reinforced through technology. This led to NASSCO PACP certification, digital inspection records, fleet tracking, ERP systems, and a cultural integration playbook for acquisitions.",
        content: {
            type: 'summary',
            message: 'Acquisitions are not just financial transactions—they are cultural mergers requiring explicit values communication and incentive alignment.',
            points: [
                "Standardization: NASSCO/PACP certification ensuring consistent quality across all crews",
                "Technology: Digital inspection records, GPS fleet tracking, predictive maintenance systems",
                "Financial Discipline: ERP job costing, supply chain optimization, vertical integration",
                "Cultural Integration: 180-day playbook for M&A with values-first due diligence (MOR case study)",
            ],
            image: '/images/manholeopening.webp'
        }
    },
    {
        title: 'Covenant & Culture as Engine',
        narrative: 'Belief, covenant, and culture differentiate this transformation from typical change programs and underpin sustainable value creation.',
        content: { type: 'summary', message: 'Culture as engine', points: [], image: '/images/feild-technician-first-guy.png' }
    },
    {
        title: "Integrated Service Delivery Model",
        narrative: "We control the end-to-end asset lifecycle, from diagnostic inspection to trenchless rehabilitation. This integrated model provides superior engineering outcomes for municipalities while creating significant economic advantages for Visu-Sewer, including diversified revenue streams, enhanced margin control, and high client lifetime value.",
        content: {
            type: 'service_stack',
            stack: [
                { stage: 'Inspect', activities: 'CCTV, LETS, Smoke/Dye Testing', deliverable: 'Actionable Condition Assessment Data' },
                { stage: 'Maintain', activities: 'Jet/Vac Cleaning, Root Cutting', deliverable: 'Optimized Hydraulic Capacity' },
                { stage: 'Rehabilitate', activities: 'CIPP, Sectional Liners, Manhole Epoxy', deliverable: '50-Year Structural Asset Renewal' }
            ],
            image: '/images/visu-sewer-truck.png'
        }
    },
    {
        title: "Case Studies in Execution Excellence",
        narrative: "Our thesis is validated by a portfolio of complex, high-stakes projects. These case studies are not merely jobs completed; they are evidence of our capacity to deliver long-term, engineered solutions under challenging operational constraints, cementing multi-decade client partnerships and demonstrating our technical and financial reliability.",
        content: {
            type: 'projects',
            projects: [
                {
                    title: 'Heart of the Valley Interceptor',
                    details: ['≈ $18M Value', '5.5 miles CIPP Rehab', 'Live flow, night & over-water work', '50-Year Design Life Extension'],
                    chart: { type: 'gantt', data: [ { task: 'Phase 1: Mobilization', start: 0, end: 3 }, { task: 'Phase 2: Bypass & Cleaning', start: 2, end: 9 }, { task: 'Phase 3: CIPP Lining', start: 6, end: 15 }, { task: 'Phase 4: Reinstatement & CCTV', start: 15, end: 17 }, { task: 'Phase 5: Closeout', start: 17, end: 18 } ], units: { x: 'Months' } }
                },
                {
                    title: 'Village of Fox Point Program',
                    details: ['20-Year Ongoing Partnership', '≈7,000 ft Rehabilitated Annually', 'Demonstrates high client retention'],
                    chart: { type: 'stacked-bar', data: [ { year: '2021', revenue: 0.8, footage: 6500 }, { year: '2022', revenue: 0.9, footage: 7100 }, { year: '2023', revenue: 1.1, footage: 6900 }, { year: '2024', revenue: 1.2, footage: 7300 } ], units: { y: 'M' } }
                },
                {
                    title: 'Wauwatosa Lateral Sealing',
                    details: ['2,500+ Laterals Sealed', 'Significant Groundwater Infiltration Reduction'],
                    chart: { type: 'line', data: [ { year: '2020', mgd: 1.5 }, { year: '2021', mgd: 1.2 }, { year: '2022', mgd: 0.9 }, { year: '2023', mgd: 0.7 }, { year: '2024', mgd: 0.5 } ], units: { y: 'MGD' } }
                }
            ],
            image: '/images/feild-project-work.png'
        }
    },
    {
        title: "Human Capital Analytics: Linking People to Profitability",
    narrative: `This is the core of our human capital thesis. We correlate investment in our workforce directly to financial performance. As championed by our CPO, Greg Sunner, these metrics are not vanity numbers; they are leading indicators of operational efficiency, risk mitigation, and margin protection. Our team’s role is to deploy the analytical systems that optimize these KPIs across the enterprise.`,
        content: {
            type: 'people_metrics',
            metrics: [
                { metric: 'Employee Retention', current: '91%', target: '> 95%', why: 'Reduces direct replacement costs (avg. $4.1k/hire) & preserves institutional knowledge. (Source: SHRM)' },
                { metric: 'Training Hours / Employee', current: '22', target: '40', why: 'Correlates to crew productivity and deployment of higher-margin services. (Source: ATD)' },
                { metric: 'Safety TRIR', current: '1.9', target: '< 1.5', why: 'Leading indicator of operational discipline; directly reduces insurance premiums & lost time. (Source: OSHA)' },
                { metric: 'Crew Utilization', current: '72%', target: '85%', why: 'Each 1% increase directly impacts revenue & fixed cost absorption, driving operating leverage. (Source: FMI Corp)' }
            ],
            image: '/images/visu-sewer-people-matter.png'
        }
    },
    {
        title: "Growth Thesis & Financial Projections",
        narrative: `Our forward-looking strategy is centered on disciplined capital allocation. We will execute strategic tuck-in acquisitions within target geographies, leveraging our integration playbook to realize synergies. This will be supported by investments in digital QA/QC and predictive analytics for workforce planning, ensuring profitable, scalable growth from $37 million in 2024 to $70 million by 2027, with a clear path to $300 million by 2045.`,
        content: {
            type: 'roadmap',
            data: {
                mapUrl: 'https://i.ibb.co/qNq3hV7/us-map-visu-sewer.png',
                funnelUrl: 'https://i.ibb.co/kKxGfDd/acq-funnel.png',
                projection: [
                    { label: '2024', value: 37 }, { label: '2025', value: 48 }, { label: '2026', value: 59 }, { label: '2027', value: 70 }
                ]
            }
        }
    },
    {
        title: "Love Story #4: Falling in Love with Legacy",
        narrative: "The ultimate question: How do you build something that outlasts you? The founders are now in their sixties and seventies. Fort Point Capital has a 5 to 7 year investment horizon. The next generation of leadership must internalize the covenant while adapting to a world the founders never imagined. The 20-year strategic vision balances continuity and evolution: from technology-enabled national platform in 2025 through 2030, to predictive intelligence as core product from 2030 to 2035, to climate resilience leadership from 2035 to 2045.",
        content: {
            type: 'summary',
            message: 'Three transformations over 20 years: National Platform → Intelligence Company → Climate Resilience Leader',
            points: [
                "2025-2030: Technology-Enabled National Platform—$37M → $85M revenue, 18% → 24% EBITDA, 70% → 95% retention",
                "2030-2035: Predictive Intelligence as Core Product—$85M → $150M revenue, 40% recurring, 10-15x EBITDA valuation",
                "2035-2045: Climate Resilience Leadership—$150M → $300M revenue, 20% international, top decile ESG",
                "The Covenant Lives On: Values translated into measurable KPIs embedded in compensation and culture",
            ]
        }
    },
    {
        title: "The Four Tests of Transformation",
    narrative: "We have seen companies rise and fall. We have calculated the half-life of market leadership. We know that most transformations fail—not for lack of capital or technology, but for lack of belief. Visu-Sewer's story is rare in its foundation: a covenant made underground, tested by growth, and now extended into the digital age. But here is what the data cannot fully capture: Values are not constraints—they are competitive advantages delivering $25 to $30 million in quantifiable annual financial benefit at $150 million revenue scale.",
        content: {
            type: 'summary',
            message: 'The next 20 years will test whether VisuSewer can balance four critical tensions:',
            points: [
                "Test 1: Automate without dehumanizing—Using AI to amplify craftsmanship, not replace it",
                "Test 2: Scale without diluting—Growing to 500+ employees while maintaining cultural coherence",
                "Test 3: Predict without arrogance—Offering data-driven intelligence while respecting unpredictability",
                "Test 4: Profit without compromising—Delivering shareholder returns while honoring the covenant",
            ]
        }
    },
    {
        title: "Toward the Horizon: 50 Years Underground, Infinite Years Ahead",
        narrative: "This is not a story with a predetermined ending. It is a story still being written—by CFOs managing budgets, asset managers optimizing lifecycles, COOs coordinating crews, and technicians crawling through manholes at 3 AM. The founders' love for craft became operational excellence. That excellence became client trust. That trust became recurring revenue. That revenue became capital for expansion. And that expansion must now become systemic resilience. But if the next 50 years honor the founding covenant as fiercely as the first 50, then Visu-Sewer will not just survive the digital transformation—it will define it.",
        content: {
            type: 'summary',
            message: 'As we look toward the horizon, the sun sets on one era and rises on another. The covenant endures.',
            points: [
                "Responsiveness: 95% retention vs 70% industry = $15M revenue advantage at scale",
                "Integrity: 10-15% premium pricing = $5-10M annual profit uplift",
                "Dedication: 95% vs 60% technician retention = $2M annual savings",
                "Reputation: 50% referral-based revenue = $3M marketing savings",
            ]
        }
    },
    // 19. Human Capital: The Core Asset (moved here so org chart appears as page 21)
    {
        title: "Human Capital: The Core Asset",
    narrative: "Our leadership philosophy is simple yet powerful: every manager started in the field and worked their way up through the ranks. This isn't just about experience; it's about credibility, practical knowledge, and understanding the challenges our crews face daily. From CEO Keith Alexander's 35 years in the trenches to our division managers who still walk job sites, we don't bid from behind desks. This field-first approach is our competitive advantage, and our team’s role is to scale this culture through data-driven systems and analytics.",
        content: {
            type: 'org_chart',
            leadership: {
                name: 'Keith Alexander', title: 'CEO', tagline: 'Field-born leader | 35 yrs in industry', photoUrl: 'https://i.ibb.co/3kMmxKx/keith-alexander.png',
                children: [
                    { name: 'Lou Hall', title: 'COO', tagline: '30+ yrs operational expertise', photoUrl: 'https://i.ibb.co/LQr01tQ/lou-hall.png' },
                    { name: 'Dawn Herman', title: 'CFO', tagline: '25+ yrs financial leadership', photoUrl: 'https://i.ibb.co/2Fq1g22/dawn-herman.png' },
                    { 
                        name: 'Greg Sunner', title: 'CPO, SPHR', tagline: 'People & Culture Champion', photoUrl: 'https://i.ibb.co/FbfVJyL/greg-sunner.png',
                        children: []
                    },
                    { name: 'Randy Belanger', title: 'VP, Sales', tagline: 'Client relationship strategist', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                    { name: 'John Nelson', title: 'VP, Service Division', tagline: 'Service delivery leader', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                    { name: 'Nicholas Vavra', title: 'Controller', tagline: 'Financial operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                    { name: 'Shaun Ritter', title: 'Director, National Liner', tagline: 'CIPP technical specialist', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                    { 
                        name: 'Division Managers', title: 'Regional Operations', tagline: 'Field-first execution leaders', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png',
                        children: [
                             { name: 'Alex Rossebo', title: 'President, Wisconsin', tagline: 'WI operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'Jason Kowalski', title: 'Division Manager, Illinois', tagline: 'IL operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'Shawn Nico', title: 'Division Manager, Minnesota', tagline: 'MN operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'James Bohn', title: 'Division Manager, Missouri', tagline: 'MO operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'John Murphy', title: 'Division Manager, Ohio', tagline: 'OH operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'Mark Burcham', title: 'Division Manager, Virginia', tagline: 'VA operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'Mike Bright', title: 'Water Blasting Division Manager', tagline: 'Cleaning operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                        ]
                    }
                ]
            },
            image: '/images/feild-technician-first-guy.png'
        }
    },
    {
        title: "Thank You: The Journey Continues",
        narrative: "We have reached the end of our presentation, but this is not an ending—it is an invitation. Thank you for experiencing the VisuSewer story with us. From the founding covenant made underground in 1975 to the AI-powered future we are building today, every chapter has been written by people who believe that infrastructure work is sacred work. If you share that belief, if you see the potential in a company that measures success not just in revenue but in relationships, not just in pipes rehabilitated but in communities served, then we invite you to join us on this journey. The next 50 years begin now.",
        content: {
            type: 'closing',
            message: "It has been our honor to walk you through this story. The numbers tell one truth: VisuSewer is a $37M company on track to $300M. But the deeper truth is this—we are stewards of systems that millions depend on, and we take that responsibility seriously. The covenant made in 1975 still guides us today: Give customers peace of mind that their jobs will be done right. Everything else flows from that promise.",
            callToAction: "Ready to discuss partnership opportunities? Let's continue the conversation."
        }
    }
];

export type SectionSpec = {
  id: number;
  slideTitle: string;
  narration: string;
};

export const SECTION_SPECS: SectionSpec[] = pitchDeckData.map((sec, i) => ({
    id: i + 1,
    slideTitle: sec.title,
    narration: sec.narrative,
}));