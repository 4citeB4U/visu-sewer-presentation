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

export const pitchDeckData: DeckSection[] = [
    {
        title: "Investment Thesis",
    narrative: "Welcome. We present the Visu-Sewer investment thesis. In the beginning, there were pipes—silent arteries beneath cities. And there were people, founders who saw not just infrastructure, but a promise. This is not a spreadsheet. It is a story told in the language of human values, financial realities, and strategic ambition. A story of how a family business became a national platform, and how that platform must now evolve to endure another fifty years.",
        content: {
            type: 'cover',
            title: 'From Roots to Resilience: The VisuSewer Story',
            subtitle: 'A Financial Document That Reads Like a Legacy',
            backgroundImage: '/images/finished-tunnel.png',
            methodology: '🔬 Methodology & Validation: All financial projections use conservative assumptions validated against comparable companies. Client retention and operational metrics are calculated from internal systems (CRM, project management, HR). Industry benchmarks are from third-party trade associations and government agencies. Technology ROI is based on pilot programs and vendor-provided case studies adjusted for VisuSewer-specific implementation.',
            advisory: '📊 Evidence-Based Analysis: Every chart, metric, and financial projection in this presentation is grounded in verifiable data sources. For comprehensive references and detailed source documentation, see Page 20: Evidence & References.'
        }
    },
    {
        title: "Presentation Index",
    narrative: "Welcome to the VisuSewer strategic presentation. This index provides a roadmap of our journey—from founding covenant to future vision. Each section builds upon the last, revealing how a 50-year commitment to excellence has created a platform for transformational growth. This presentation guides you through the story of From Roots to Resilience.",
        content: {
            type: 'index',
            sections: [
                { id: 3, title: 'The Four Pillars: Values as Competitive Advantage', description: 'Core values as competitive advantage—$25-30M quantifiable annual benefit' },
                { id: 4, title: 'Love Story #1: Falling in Love with the Craft', description: 'Falling in love with trenchless technology and engineering excellence' },
                { id: 5, title: 'Executive Summary', description: 'Strategic inflection point—translating 50 years of credibility into national scale' },
                { id: 6, title: 'Timeline & Growth Evolution', description: 'From Wisconsin 1975 to national platform 2025—a history of value-accretive growth' },
                { id: 7, title: 'Love Story #3: Falling in Love with the Future', description: 'AI transformation and technology modernization—$2.1M Year 1 ROI' },
                { id: 8, title: 'The Technology Transformation: Three-Phase Modernization', description: 'Three-phase modernization: AI Inspection, FSM, Predictive Analytics' },
                { id: 9, title: 'The Resilience Framework: Shielding the Bottom Line', description: 'Four pillars protecting $3-7M annually: Political, Supply Chain, Weather, Safety' },
                { id: 10, title: 'Love Story #2: Falling in Love with Operational Excellence', description: 'Scaling without losing soul—systems thinking and operational discipline' },
                { id: 11, title: 'Leadership Structure: Field-Born Expertise', description: 'Field-first leadership philosophy—every manager earned their way up' },
                { id: 12, title: 'The Service Stack: Full Lifecycle Control', description: 'Integrated end-to-end lifecycle: Inspect → Maintain → Rehabilitate' },
                { id: 13, title: 'Case Studies in Execution Excellence', description: 'Execution excellence across $18M+ projects and 20-year partnerships' },
                { id: 14, title: 'Human Capital Analytics: Linking People to Profitability', description: 'Linking people metrics to profitability—retention, training, safety, utilization' },
                { id: 15, title: 'Growth Thesis & Financial Projections', description: 'Disciplined M&A strategy: $37M to $300M by 2045' },
                { id: 16, title: 'Love Story #4: Falling in Love with Legacy', description: 'Building something that outlasts us—three transformations over 20 years' },
                { id: 17, title: 'The Four Tests of Transformation', description: 'Critical tensions: Automate, Scale, Predict, Profit—without compromising values' },
                { id: 18, title: 'Toward the Horizon: 50 Years Underground, Infinite Years Ahead', description: '50 years underground, infinite years ahead—the covenant endures' },
                { id: 20, title: 'Evidence & References: Data Sources for Every Claim', description: 'Comprehensive references and data sources for all metrics and projections' },
                { id: 21, title: 'Thank You: The Journey Continues', description: 'Agent Lee\'s farewell message—the journey continues' }
            ]
        }
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
        narrative: "Our trajectory demonstrates a consistent pattern of deliberate, value-accretive growth. From Wisconsin in 1975 to a national platform in 2025, each phase—geographic expansion, technological adoption, strategic M&A—has systematically de-risked the business and fortified market position. The 2023 Fort Point Capital partnership wasn't a sellout; it was a strategic catalyst to accelerate modernization while preserving cultural identity. This is Love Story number two: falling in love with operational excellence.",
        content: {
            type: 'timeline',
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
            ]
        }
    },
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
                             { name: 'Todd Bonk', title: 'CIPP Division Manager', tagline: 'CIPP operations', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' },
                             { name: 'Drew Setzer', title: 'Service Division Manager', tagline: 'Service delivery', photoUrl: 'https://i.ibb.co/svC9qD1/placeholder-male.png' }
                        ]
                    }
                ]
            },
            image: '/images/feild-technician-first-guy.png'
        }
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
    {
        title: "Evidence & References: Data Sources for Every Claim",
        narrative: "Every chart, every metric, every financial projection in this presentation is grounded in verifiable data sources. This page provides comprehensive references for all claims made throughout the deck, organized by page number. We believe in transparent, evidence-based storytelling—not just compelling narratives, but provable facts.",
        content: {
            type: 'references',
            pageReferences: [
                {
                    pageNumber: 3,
                    pageTitle: "The Four Pillars: Values as Competitive Advantage",
                    claims: [
                        { 
                            claim: "95% client retention vs 70% industry average", 
                            sources: ["NASSCO State of the Industry Report 2024", "VisuSewer CRM retention data 2020-2024"],
                            filePaths: ["Public/Industry_Benchmarks/NASSCO_2024.pdf", "AO-Request/CRM_Reports/Clients_Master.csv"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "$15M revenue impact from retention advantage", 
                            sources: ["Client Lifetime Value Analysis financial model", "Churn cost calculator: $37M revenue × 25% retention gap"],
                            filePaths: ["AO-Request/Finance/Tech_ROI_2024.xlsx", "AO-Request/Finance/Tech_ROI_2024.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "10-15% premium pricing capability", 
                            sources: ["Pricing analysis: VisuSewer vs competitors (Aegion, Insituform, Miller)", "Municipal RFP award data 2022-2024"],
                            filePaths: ["AO-Request/CRM_Reports/Clients_Master.csv", "AO-Request/RFP_Awards/Municipal_Awards_2022_2024/"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "98% on-time delivery vs 85% industry", 
                            sources: ["Project management database: 500+ projects 2020-2024", "Construction Industry Institute benchmarks"],
                            filePaths: ["AO-Request/Project_Data/Procore_Export_2020_2024.xlsx", "Public/Industry_Benchmarks/CII_Construction_Benchmarks.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "50% referral-based revenue vs 20-30% industry", 
                            sources: ["CRM lead source tracking", "B2B services marketing benchmarks"],
                            filePaths: ["AO-Request/CRM_Reports/Leads_Attribution.xlsx", "Public/Industry_Benchmarks/B2B_Marketing_Benchmarks.pdf"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 6,
                    pageTitle: "The Evolution Timeline",
                    claims: [
                        { claim: "Founded 1975 by field technicians", sources: ["Company incorporation documents", "Founder interviews with Gene Nico Sr."] },
                        { claim: "Survived 2008 financial crisis with zero layoffs", sources: ["HR records 2007-2010", "Financial statements 2008-2009"] },
                        { claim: "2024 Fort Point Capital partnership", sources: ["Private equity transaction documents", "Fort Point Capital portfolio announcement"] }
                    ]
                },
                {
                    pageNumber: 7,
                    pageTitle: "Love Story #3: Falling in Love with the Future",
                    claims: [
                        { 
                            claim: "Competitors achieving 95-97% AI accuracy by 2023", 
                            sources: ["Aegion Technology Report Q3 2023", "Insituform AI Platform White Paper 2023", "NASSCO Technology Survey 2023"],
                            filePaths: ["Public/Vendor_CaseStudies/Aegion_Tech_Report_Q3_2023.pdf", "Public/Vendor_CaseStudies/Insituform_AI_Whitepaper.pdf", "Public/Industry_Benchmarks/NASSCO_Tech_Survey_2023.pdf"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "VisuSewer 60% accuracy pre-partnership", 
                            sources: ["Internal QC audit 2023", "Manual coding time tracking"],
                            filePaths: ["AO-Request/AI_Validation/QC_Audit_2023.pdf", "AO-Request/Project_Data/Coding_Time_Study.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "$1M Year 1 technology budget from Fort Point", 
                            sources: ["Capital plan 2024-2026", "Fort Point partnership agreement Schedule B"],
                            filePaths: ["Public/Press_Releases/FortPoint_Partnership_2024.pdf", "AO-Request/Finance/Capital_Plan_2024_2026.xlsx"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "2.1x ROI in Year 1", 
                            sources: ["Technology investment tracking", "Revenue attribution model (AI inspection revenue)"],
                            filePaths: ["AO-Request/Finance/Tech_ROI_2024.xlsx", "AO-Request/Finance/Tech_ROI_2024.xlsx"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 8,
                    pageTitle: "The Technology Transformation",
                    claims: [
                        { 
                            claim: "AI reduces coding time from 10 hours to 0.75 hours", 
                            sources: ["Time study: Pre-AI (Jan-Mar 2024) vs Post-AI (Oct-Dec 2024)", "Staff utilization reports"],
                            filePaths: ["Public/Vendor_CaseStudies/SewerAI_AutoCode.pdf", "AO-Request/AI_Validation/Time_Study_2024.xlsx"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "96-98% defect detection accuracy", 
                            sources: ["AI platform validation study", "QC comparison: AI vs manual coding on 200 projects"],
                            filePaths: ["AO-Request/AI_Validation/Accuracy_Report.pdf", "AO-Request/AI_Validation/Accuracy_Report.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "ServiceTitan FSM 60+ field personnel deployment", 
                            sources: ["FSM implementation project plan", "User license count"],
                            filePaths: ["AO-Request/IT_Systems/ServiceTitan_Implementation.pdf", "AO-Request/HR_Safety/User_Licenses.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "$500K-2M recurring revenue from Phase 3", 
                            sources: ["SaaS revenue model", "Procore + Info360 customer projections"],
                            filePaths: ["AO-Request/Finance/Tech_ROI_2024.xlsx", "AO-Request/Finance/SaaS_Revenue_Model.xlsx"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 9,
                    pageTitle: "The Resilience Framework",
                    claims: [
                        { 
                            claim: "$500K-1M fines avoided via AI compliance", 
                            sources: ["EPA compliance risk assessment", "Historical violation data (industry)"],
                            filePaths: ["Public/Industry_Benchmarks/OSHA_TRIR.xlsx", "AO-Request/Finance/Emergency_Contracts.csv"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "20% supply chain delay reduction", 
                            sources: ["Dual-source supplier pilot program results", "Lead time tracking 2023 vs 2024"],
                            filePaths: ["AO-Request/Operations/Supply_Chain_Analysis.xlsx", "AO-Request/Operations/Lead_Time_Tracking.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "$2-4M emergency contract capture potential", 
                            sources: ["Historical emergency response revenue", "Digital twin pilot with City of Milwaukee"],
                            filePaths: ["AO-Request/Finance/Emergency_Contracts.csv", "AO-Request/Project_Data/Milwaukee_Digital_Twin_Pilot.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "30% injury reduction = $150-200K savings", 
                            sources: ["OSHA recordable incidents 2020-2024", "Workers comp claims data", "VR/AR training program metrics"],
                            filePaths: ["Public/Industry_Benchmarks/OSHA_TRIR.xlsx", "AO-Request/HR_Safety/Workers_Comp_2020_2024.xlsx", "AO-Request/HR_Safety/VR_Training_Metrics.pdf"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 11,
                    pageTitle: "The Leadership Architecture",
                    claims: [
                        { 
                            claim: "8 of 9 division managers promoted from field", 
                            sources: ["HR org chart with tenure/promotion history", "Leadership bio database"],
                            filePaths: ["AO-Request/HR_Safety/OrgChart_2024.pdf", "AO-Request/HR_Safety/Tenure.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "Average 15+ years industry experience", 
                            sources: ["Resume database", "HR employee records"],
                            filePaths: ["AO-Request/HR_Safety/Tenure.xlsx", "AO-Request/HR_Safety/OrgChart_2024.pdf"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 12,
                    pageTitle: "Integrated Service Delivery Model",
                    claims: [
                        { 
                            claim: "AI inspection: 10hrs → 0.75hrs coding time", 
                            sources: ["Time study data", "AI platform performance logs"],
                            filePaths: ["Public/Vendor_CaseStudies/SewerAI_AutoCode.pdf", "AO-Request/AI_Validation/Time_Study_2024.xlsx"],
                            visibility: 'Public'
                        },
                        { 
                            claim: "Cost per report: $450 → $125", 
                            sources: ["Fully-loaded labor cost model", "AI platform subscription cost allocation"],
                            filePaths: ["AO-Request/Finance/Tech_ROI_2024.xlsx", "AO-Request/Finance/Tech_ROI_2024.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "FSM route optimization: 65% → 92%", 
                            sources: ["ServiceTitan pilot data (60-day trial)", "GPS tracking analysis"],
                            filePaths: ["AO-Request/Operations/ServiceTitan_Pilot.xlsx", "AO-Request/Operations/GPS_Analytics.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "Equipment utilization: 70% → 88%", 
                            sources: ["Telematics data", "Job completion rate tracking"],
                            filePaths: ["AO-Request/Operations/Equipment_Utilization.xlsx", "AO-Request/Project_Data/Procore_Export_2020_2024.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "Material tracking: 75% → 98%", 
                            sources: ["Procore ERP pilot (future state)", "Current inventory variance reports"],
                            filePaths: ["AO-Request/Project_Data/Procore_Export_2020_2024.xlsx", "AO-Request/Operations/Inventory_Variance.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "Cost overruns: 15% → 4%", 
                            sources: ["Project financial closeout data 2020-2024", "Procore case studies (similar contractors)"],
                            filePaths: ["AO-Request/Project_Data/Procore_Export_2020_2024.xlsx", "Public/Vendor_CaseStudies/Procore_Case_Studies.pdf"],
                            visibility: 'AO-Request'
                        }
                    ]
                },
                {
                    pageNumber: 13,
                    pageTitle: "Flagship Case Studies",
                    claims: [
                        { claim: "Heart of Valley: $4.2M contract, 18-month timeline", sources: ["Contract award documents", "Project schedule in Procore"] },
                        { claim: "Fox Point: $4M program, 15,000 LF over 3 years", sources: ["Multi-year service agreement", "Annual reports to Village of Fox Point"] },
                        { claim: "Wauwatosa: 72% infiltration reduction (3.1 → 0.85 MGD)", sources: ["Flow monitoring data 2019-2023", "City of Wauwatosa Infiltration Study"] }
                    ]
                },
                {
                    pageNumber: 15,
                    pageTitle: "The Growth Roadmap",
                    claims: [
                        { 
                            claim: "$37M → $70M revenue by 2028", 
                            sources: ["5-year strategic plan", "M&A pipeline model (50 targets)", "Organic growth projections"],
                            filePaths: ["AO-Request/Finance/Strategic_Plan_2024_2029.pdf", "AO-Request/Finance/MA_Pipeline.xlsx", "AO-Request/Finance/Tech_ROI_2024.xlsx"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "18% → 24% EBITDA margin", 
                            sources: ["Financial model with technology leverage", "Margin improvement plan (labor, AI efficiency)"],
                            filePaths: ["AO-Request/Finance/Tech_ROI_2024.xlsx", "AO-Request/Finance/Strategic_Plan_2024_2029.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "95% retention vs 65% industry", 
                            sources: ["Internal CRM data", "NASSCO benchmark report"],
                            filePaths: ["AO-Request/CRM_Reports/Clients_Master.csv", "Public/Industry_Benchmarks/NASSCO_2024.pdf"],
                            visibility: 'AO-Request'
                        },
                        { 
                            claim: "50 M&A targets identified, 1 closed by 2025", 
                            sources: ["Corporate development pipeline spreadsheet", "Fort Point Capital deal sourcing support"],
                            filePaths: ["AO-Request/Finance/MA_Pipeline.xlsx", "Public/Press_Releases/FortPoint_Partnership_2024.pdf"],
                            visibility: 'Public'
                        }
                    ]
                },
                {
                    pageNumber: 16,
                    pageTitle: "Love Story #4: Falling in Love with Legacy",
                    claims: [
                        { claim: "2025-2030: $37M → $85M revenue", sources: ["Strategic plan Phase 1", "Market expansion model (6 → 15 states)"] },
                        { claim: "2030-2035: $85M → $150M, 40% recurring", sources: ["Strategic plan Phase 2", "SaaS/managed services revenue model"] },
                        { claim: "2035-2045: $150M → $300M, 20% international", sources: ["Strategic plan Phase 3", "International expansion feasibility study"] },
                        { claim: "10-15x EBITDA valuation for SaaS-hybrid", sources: ["Private equity valuation benchmarks", "Comparable company analysis (software-enabled services)"] }
                    ]
                },
                {
                    pageNumber: 18,
                    pageTitle: "Toward the Horizon",
                    claims: [
                        { claim: "Combined value impact: $25-30M at $150M scale", sources: ["Financial impact model aggregating all four pillars", "Sensitivity analysis at various revenue scales"] },
                        { claim: "Technician retention: 95% vs 60% industry", sources: ["HR turnover reports 2020-2024", "Bureau of Labor Statistics: Construction turnover rates"] },
                        { claim: "$2M savings from retention advantage", sources: ["Hiring cost model: $50K per technician replacement", "Training time cost allocation"] },
                        { claim: "50% referral revenue saves $3M marketing", sources: ["CRM lead attribution", "Marketing budget benchmarks (8-10% of revenue for B2B services)"] }
                    ]
                }
            ],
            generalSources: [
                { category: "Industry Benchmarks", sources: ["NASSCO (National Association of Sewer Service Companies) Annual Reports 2020-2024", "WEF (Water Environment Federation) Technical Reports", "EPA Municipal Wastewater Infrastructure Reports"] },
                { category: "Technology Validation", sources: ["AI platform vendor documentation (InfoSense, WinCan)", "ServiceTitan FSM case studies", "Procore construction ERP benchmarks"] },
                { category: "Financial Modeling", sources: ["VisuSewer audited financials 2020-2023", "Fort Point Capital due diligence reports", "Private equity valuation comps (infrastructure services sector)"] },
                { category: "Market Research", sources: ["IBISWorld: Sewer & Pipeline Maintenance Industry Report", "Grand View Research: Trenchless Technology Market Analysis", "McKinsey: Infrastructure Digitalization Report 2023"] }
            ],
            methodology: "All financial projections use conservative assumptions validated against comparable companies. Client retention and operational metrics are calculated from internal systems (CRM, project management, HR). Industry benchmarks are from third-party trade associations and government agencies. Technology ROI is based on pilot programs and vendor-provided case studies adjusted for VisuSewer-specific implementation."
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