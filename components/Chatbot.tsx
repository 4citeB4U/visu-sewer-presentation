/* LEEWAY HEADER
TAG: UI.COMPONENT.CHATBOT
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: message-square
ICON_SIG: CD534113
5WH: WHAT=AI Strategic Analyst Chatbot with Agent Lee;
WHY=Provide interactive Q&A during pitch presentation;
WHO=LeeWay Industries + VisuSewer;
WHERE=a:\Visu-Sewer Strategic Asset & Growth Deck\components\Chatbot.tsx;
WHEN=2025-11-16;
HOW=React + LLM + Browser SpeechSynthesis + Browser SpeechRecognition
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { pitchDeckData, SECTION_SPECS, SectionSpec } from "../constants";
import { useTTS } from "../hooks/useTTS";
import { agentTeam } from "../models/agentTeam.js";
import { filterCuratedVoices } from "../utils/voiceCurated";
import "./Chatbot.css";
import {
    ArrowPathIcon,
    LinkIcon,
    PaperAirplaneIcon,
} from "./Icons";

/* -----------------------------
 * Presentation Title + Script
 * --------------------------- */

const PRESENTATION_TITLE =
  "From Roots to Resilience: The VisuSewer Story — A Financial Document That Reads Like a Legacy";

/**
 * 21 page-level chunks.
 * Index 0 = Slide 1, Index 1 = Slide 2, …, Index 20 = Thank You / Q&A slide.
 * The full title is spoken ONLY on page 0.
 */
const PRESENTATION_PAGE_SCRIPTS: string[] = [
  // 0 — Cover / Opening (sets love story + Q&A ground rules)
  `
Hello, I'm Agent Lee — your strategic analyst and guide for the next few minutes. Welcome to "${PRESENTATION_TITLE}."

On screen, you’ll see the deck. Here, you have an interactive console — you can type questions into the box below or, if microphone mode is enabled, speak to me live. To keep the story flowing, I’ll walk straight through the presentation first and then open a dedicated Q&A. I’d encourage you to jot questions down or drop them into the chat as we go, and we’ll circle back to them at the end. If something truly can’t wait, you can still ask it in the input box and I’ll pick it up between sections.

What you’re about to hear is, on the surface, a financial story: a thirty-seven million dollar platform with a clear line of sight toward three hundred million. But underneath the charts and models, it’s a love story — about loyalty, stewardship, and the invisible systems that keep communities moving.

My job is simple: connect those two threads. We’ll move from founding promises to balance sheets, from manholes and mainlines to AI inspection, field automation, and predictive analytics. I’ll show how the values that built this company now compound into competitive advantage, EBITDA, and enterprise value — without losing the soul of the business.
  `.trim(),

  // 1 — Founding Roots / Underground Truth
  `
At the heart of this love story is a simple truth: what lies underground powers what thrives above.

In the beginning, there were pipes — silent, unseen, and often ignored — and there were people: founders, craftsmen, and early crews who treated every line as if it ran under their own street. They weren’t chasing the next municipal bid; they were protecting neighborhoods, schools, and hospitals.

That mindset became a covenant: do the work as if someone’s family is depending on it — because they are. Over decades, that covenant translated into repeat work, long-tenured relationships, and referral-driven growth. Long before there were dashboards and KPIs, the numbers were already telling the story: low churn, resilient margins, and customers who simply didn’t leave.
  `.trim(),

  // 2 — Roadmap / Index of the Story
  `
To understand where Visu-Sewer is going, we have to understand how the story is structured.

Think of this deck as four chapters of one continuous narrative. First, the roots: the covenant, the craft, and the early decisions that still shape behavior today. Second, the operating system: the values, processes, and human capital that turned belief into repeatable performance. Third, the modernization: AI, field automation, and integrated data that unlock the next wave of growth. And finally, the horizon: the evidence, projections, and partnership invitation that tie mission to long-term value.

Each section builds on the last. We move from “why this company exists” to “why this company scales,” and from “what we’ve already proven” to “what we’re now ready to compound with technology and capital.”
  `.trim(),

  // 3 — Values as Competitive Advantage
  `
Out of that original covenant, four core values took root. They were never wall décor; they were operating instructions.

Those values shaped who was hired, who was promoted, and which projects were accepted or walked away from. Over time, they hardened into culture, and culture hardened into a measurable edge: higher retention than peers, safer crews, lower rework, and a customer base that renews on trust rather than price.

That’s the first key point of this story: before a single AI model is deployed, Visu-Sewer already behaves like a disciplined, values-driven operator. The love story begins as loyalty — loyalty to standards, to each other, and to the communities served — and that loyalty quietly shows up in the financials.
  `.trim(),

  // 4 — Love Story #1: Craft
  `
The first love story is about craft.

Early crews fell in love with the engineering elegance of trenchless technology. They learned to read CCTV footage like radiologists read scans, diagnosing invisible problems with precision. They treated cured-in-place pipe not as a commodity, but as structural surgery — something that had to be done right the first time.

That obsession with doing the job beautifully created an internal standard: low failure rates, low call-backs, and pride in workmanship. When your field teams care that much about the work, your warranty reserve, reputation risk, and customer acquisition costs all move in the right direction. Craft wasn’t just emotional; it was economic.
  `.trim(),

  // 5 — Strategic Inflection Point / Executive Summary
  `
Today, that foundation meets a strategic inflection point.

After fifty years of field-proven credibility, Visu-Sewer is positioned to evolve from a highly respected contractor into a digitally enabled, nationally scaled platform. Fort Point Capital doesn’t just bring capital; it brings alignment around a simple thesis: if we keep the covenant and upgrade the system, the next phase of growth can be both faster and safer.

The path forward is clear: integrate fragmented systems, deepen human capital, and inject data and AI where they create measurable lift — more throughput, tighter schedules, cleaner close-outs, and stronger risk control. This isn’t change for its own sake. It’s change designed to convert the existing love story into durable, compounding cash flow.
  `.trim(),

  // 6 — History of Strategic Evolution
  `
The evolution to this point has never been reckless; it has been paced and intentional.

From a single-market operator in Wisconsin in 1975, Visu-Sewer expanded region by region, adding capabilities and markets in deliberate steps. Each acquisition brought not just equipment and backlog, but local relationships and know-how. Each system upgrade — from basic reporting to modern field tools — was tested, refined, and adopted, not forced.

By the time Fort Point Capital joined in 2023, this wasn’t a turnaround; it was a platform entering its next phase. That continuity matters. It means we’re not betting on a story that has to be invented. We’re scaling a story that’s already working.
  `.trim(),

  // 7 — Love Story #2: Operational Excellence
  `
The second love story is the love of operational excellence.

As the footprint grew, leadership refused to let scale dilute standards. They translated values into structures: clear KPIs, documented standard operating procedures, and integration plans that protected people as much as performance. New markets weren’t “bolt-ons”; they were brought into a shared rhythm of planning, execution, and review.

That discipline shows up in the numbers: predictable project delivery, strong safety performance, and margin stability through cycles. Operational excellence became a form of care — for crews, for customers, and for investors who need reliability, not volatility.
  `.trim(),

  // 8 — Love Story #3: Falling in Love with the Future
  `
By the early 2020s, a new reality emerged.

Competitors were leaning heavily into AI, automation, and predictive systems. The risk was not that Visu-Sewer would suddenly fail; the risk was that it would slowly fall behind — respected, but outpaced. Leadership had a choice: defend the past or fall in love with the future.

They chose the future.

The mandate was clear: keep the covenant, but modernize the tools. Use AI to accelerate what humans already do well, not replace what makes them special. That decision reframed technology from a cost line item to a strategic partner in the love story — one that protects crews, enhances decision-making, and multiplies the impact of every hour in the field.
  `.trim(),

  // 9 — Technology Transformation: Three-Phase Modernization
  `
The technology transformation that followed is structured, sequenced, and grounded in ROI.

Phase one: AI inspection. By automating coding of CCTV footage, we can reduce eight to twelve hours of manual review to under an hour, with accuracy that’s consistent and auditable. The impact is immediate: more footage reviewed per day, faster engineering decisions, and a higher-margin mix of work.

Phase two: field service management. Tools like ServiceTitan orchestrate scheduling, routing, and job costing across more than sixty field technicians. That means fewer idle hours, better crew utilization, and cleaner data at the job level.

Phase three: ERP and predictive analytics. Here, AI doesn’t just look backward at what happened; it helps forecast what should happen next — from asset lifecycles and stocking levels to staffing plans and risk scenarios. Together, these three phases turn technology from a necessary expense into a flywheel for growth and resilience.
  `.trim(),

  // 10 — Resilience Framework
  `
On top of modernization sits a resilience framework — a four-part shield around the bottom line.

Regulatory shielding uses AI-powered dashboards to keep the company ahead of evolving standards rather than reacting after the fact. Supply chain hardening combines dual-sourcing, in-house fabrication, and data-driven inventory planning to absorb shocks that would stall less prepared competitors.

Weatherization leverages digital twins and scenario modeling to pre-stage crews and materials before storms, floods, or freeze events. And workforce safety and training — supported by AR, VR, and wearable data — lowers injury rates, workers’ comp exposure, and unplanned downtime.

Each element supports the others. Together, they turn “what if” events into managed scenarios, converting resilience from a cost center into a margin protector.
  `.trim(),

  // 11 — Scaling with Soul / Process & Systems
  `
Scaling with soul means systems that protect culture rather than erode it.

As the platform grows, leadership leans on routines: weekly field reviews, quarterly operating reviews, and post-project retrospectives that actually change behavior. Integration checklists ensure new markets plug into common safety standards, reporting structures, and training paths.

The result is a company that feels consistent — whether you’re on a crew in Wisconsin or on a job site several states away. Processes aren’t bureaucracy for its own sake; they’re the rails that keep the covenant on track while the train accelerates.
  `.trim(),

  // 12 — Human Capital: Field-First Leadership
  `
At the center of all of this is human capital.

Every leader in this story has spent time in the field. They know what it feels like to pull a manhole cover in sub-zero weather, to troubleshoot a camera head deep underground, or to explain a complex repair plan to a city engineer.

That field-first experience creates credibility. It means that when we ask crews to adopt new tools — AI coding, digital forms, or new scheduling systems — the message is coming from people who understand the real constraints of the work. Data doesn’t replace judgment; it strengthens it. That’s a critical distinction when you’re asking hundreds of people to trust both a covenant and a roadmap.
  `.trim(),

  // 13 — Integrated Service Delivery
  `
One of the structural advantages in this story is integrated service delivery.

Visu-Sewer owns the lifecycle from inspection to rehab. That means fewer hand-offs, fewer vendors, and more control over quality and schedule. For customers, it feels like simplicity. For the platform, it feels like margin expansion, better risk control, and tighter feedback loops between diagnosis and solution.

When AI inspection is linked directly to in-house engineering and in-house crews, every improvement in accuracy or throughput propagates through the entire value chain. We’re not just selling discrete services; we’re selling outcomes — fewer failures, longer asset life, and less disruption for the communities we serve.
  `.trim(),

  // 14 — Execution Excellence: Proof, Not Promises
  `
Execution excellence here is proof, not promises.

The story is backed by performance: high-stakes municipal projects, emergency timelines, and multi-phase implementations delivered successfully, again, and again. These aren’t lucky wins. They’re the result of aligned systems, experienced people, and a culture of precision.

When something is promised, it is delivered. That reliability has become part of the brand. For customers, it reduces perceived risk. For investors, it reduces surprise. In both cases, it increases the value of every contract signed.
  `.trim(),

  // 15 — Human Capital Analytics
  `
Human capital analytics connect workforce investment directly to profitability.

Led by Chief People Officer Greg Sunner, the company has built tools to track engagement, retention, productivity, and risk exposure. These measurements aren’t vanity metrics; they are leading indicators of margin, stability, and long-term value.

By understanding the people side of performance — who is thriving, where risk is building, and which investments change outcomes — the organization can invest wisely and protect what makes it special.
  `.trim(),

  // 16 — Growth Strategy & Long-Term Projections
  `
The growth strategy and financial projections are mapped and methodical.

The focus is on tuck-in acquisitions in underpenetrated markets, guided by a proven integration playbook. There is deliberate investment in quality assurance and quality control systems, as well as workforce forecasting.

The trajectory runs from roughly thirty-seven million dollars in 2024 to seventy million in 2027, with a clear track toward three hundred million by 2045. That arc is not based on hope. It’s based on execution, discipline, and a platform that knows how to grow without losing its identity.
  `.trim(),

  // 17 — Love Story #4: Legacy as Leadership
  `
Another love story runs through this narrative: legacy as leadership.

The founding generation is still here — not winding down, but lifting others up. They’re not stepping back; they’re stepping forward, passing down institutional wisdom while embracing new tools, new minds, and new markets.

They are reinforcing one unshakable principle: loyalty. Loyalty to the people in the field. Loyalty to the communities served. Loyalty to the legacy they began building five decades ago. That loyalty isn’t demanded; it’s modeled — and it calls on every employee to contribute, uphold, and pass forward what they’ve been given.
  `.trim(),

  // 18 — Covenant & Culture as Engine
  `
Most transformations fail — not because of a lack of money, but because of a lack of belief.

Visu-Sewer is different. It has a covenant — not a tagline, but a backbone. That covenant can deliver significant annual value at scale. Culture here isn’t a constraint; it’s the engine.

After fifty years underground, the next fifty years are about what happens above — how the company shows up as a partner, an innovator, and a steward of critical infrastructure. The same loyalty that once held a small team together is now the engine for a scaled, technology-enabled platform.
  `.trim(),

  // 19 — Horizon, Evidence, and Invitation
  `
Every day, people at Visu-Sewer make choices: to crawl into manholes, to troubleshoot systems, to protect communities. That commitment becomes trust. That trust becomes revenue. That revenue becomes investment. And now, investment must become resilience.

Behind every statement in this story, there is evidence and reference. Every data point, every chart, every claim — verified, traceable, transparent. This isn’t fiction. This is reality.

So this isn’t really an ending — it’s a horizon. If you see what we see — a company that blends craftsmanship with ambition, tradition with innovation — then this story is an invitation.

If you believe in loyalty — not just as an idea, but as a leadership principle — then you’re exactly the kind of partner this narrative was written for. The legacy is still being built. The mission is still alive. The question is how we design the next chapter together.
  `.trim(),

  // 20 — Thank You / Journey Continues / Open Q&A
  `
As we come to this final page, I want to leave you with a simple thought: the journey doesn’t end here — it changes chapters.

The numbers tell one story: Visu-Sewer is a thirty-seven million dollar company on a clear path toward three hundred million. But the deeper truth is this — we are stewards of systems that millions of people depend on every single day. The covenant made in 1975 still guides every decision: give customers peace of mind that their jobs will be done right. Everything else flows from that promise.

For fifty years, that mindset has carried crews into the field before sunrise, kept standards high when no one is watching, and earned the trust of cities, engineers, and communities across the map. The next fifty years are about protecting and growing that trust together, with stronger data, smarter tools, and deeper resilience.

If you’re ready to discuss partnership opportunities, this is the moment to continue the conversation. On your screen, you can use the input box to ask any question — about the numbers, the technology roadmap, the human capital strategy, or the evidence behind a specific slide. If microphone mode is enabled in your browser, you can tap the mic icon next to the input and speak to me live. I can jump to any page, unpack any chart, or walk through any assumption in more detail.

Thank you for your time, your attention, and your consideration.

The formal presentation is complete. We are now fully open for questions.
  `.trim(),
];

/* -----------------------------
 * Chatbot context for LLM
 * --------------------------- */

const chatbotContext = `
You are Agent Lee, a Strategic Analyst AI presenting the deck titled "${PRESENTATION_TITLE}".

Persona:
- Expert from a top-tier business school
- Blends financial acumen with organizational psychology
- Speaks with precision, confidence, and a data-driven perspective

Your core mandate:
1. Present "${PRESENTATION_TITLE}" with authority.
2. Provide evidence-based answers rooted in this deck.
3. Default to Visu-Sewer data from this presentation and https://visu-sewer.com/ when needed.

Deck structure:
- Section 0: Cover / Story Intro (start here)
- Subsequent sections: strategic narrative sections
- Final section: closing, thank you, and open Q&A

You answer concisely, with deep analysis. You may reference specific pages or themes from the story when helpful.
`.trim();

/* -----------------------------
 * Types
 * --------------------------- */

interface GroundingChunk {
  web: { uri: string; title: string };
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
  sources?: GroundingChunk[];
}

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  startPresentation: () => void;
  pausePresentation: () => void;
  setCurrentSection: (index: number) => void;
  currentSection: number;
  isNarrating: boolean;
  presentationState: "idle" | "presenting" | "paused";
  sectionSpec: SectionSpec;
}

/* -----------------------------
 * Fallback answer if LLM fails
 * --------------------------- */

const fallbackAnswer = (query: string): string => {
  const q = query.toLowerCase();
  const matches = pitchDeckData
    .filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        (sec.narrative &&
          sec.narrative.toLowerCase().includes(q))
    )
    .slice(0, 3);

  if (matches.length === 0) {
    return "I couldn't find an exact match in the deck content. Try asking about a specific page (for example: 'Go to page 9') or a theme like 'human capital' or 'growth projections'.";
  }

  return (
    "Here are some sections that speak directly to your question:\n\n" +
    matches
      .map(
        (m) =>
          `• ${m.title}: ${m.narrative.substring(0, 320)}${
            m.narrative.length > 320 ? "…" : ""
          }`
      )
      .join("\n\n")
  );
};

/**
 * Generate a local page explanation derived from `pitchDeckData`.
 */
const generatePageExplanation = (
  index: number | null | undefined
): string => {
  if (index === null || index === undefined)
    return "Which page would you like me to explain? You can say something like 'Explain page 7' or 'Walk me through the resilience framework.'";
  const i = Number(index);
  if (isNaN(i) || i < 0 || i >= pitchDeckData.length)
    return `Page ${index} is out of range.`;
  const sec = pitchDeckData[i];
  const lines: string[] = [];
  lines.push(`Page ${i + 1}: ${sec.title}`);
  if (sec.narrative) lines.push(`Summary: ${sec.narrative}`);

  const points =
    (sec.content && (sec.content as any).points) ||
    (sec.content && (sec.content as any).metrics) ||
    null;
  if (points && Array.isArray(points)) {
    lines.push(`Key points:`);
    for (const p of points) {
      if (typeof p === "string") lines.push(`- ${p}`);
      else if ((p as any).metric)
        lines.push(
          `- ${(p as any).metric}: ${(p as any).current || ""} (${(p as any).why || ""})`
        );
      else if ((p as any).title)
        lines.push(
          `- ${(p as any).title}: ${
            (p as any).details ? (p as any).details.join(", ") : ""
          }`
        );
    }
  }

  if (sec.content && (sec.content as any).projects) {
    lines.push(`Charts and data in this section:`);
    for (const proj of (sec.content as any).projects) {
      if (proj.chart) {
        const c = proj.chart;
        lines.push(`- ${proj.title} (${c.type}):`);
        if (c.type === "gantt") {
          lines.push(
            `  Gantt representation of project phases; read the x-axis as months and observe critical path phases where tasks overlap.`
          );
        } else if (c.type === "stacked-bar") {
          lines.push(
            `  Stacked bar showing revenue vs footage over time; look for trend increases and composition changes.`
          );
        } else if (c.type === "line") {
          lines.push(
            `  Line chart showing temporal trend; check slope direction for improvement or decline.`
          );
        } else {
          lines.push(
            `  ${c.type} chart — interpret by looking for trends, distribution, and outliers.`
          );
        }
      }
    }
  } else {
    lines.push(
      `Suggested visualizations: time series for trend analysis, bar charts for categorical comparisons, and a risk matrix for the resilience pillars.`
    );
  }

  return lines.join("\n\n");
};

/**
 * Build the spoken text for a given page index.
 */
const buildPageSpeech = (index: number): string => {
  const sec = pitchDeckData[index];

  let base: string;
  if (index >= 0 && index < PRESENTATION_PAGE_SCRIPTS.length) {
    base = PRESENTATION_PAGE_SCRIPTS[index];
  } else {
    base = `${sec.title}.\n\n${sec.narrative}`.trim();
  }

  // Strip any visual-only header fragments if needed (primarily for page 0)
  if (index === 0) {
    base = base
      .replace(/Visu[-\s]?Sewer Logo\s*/gi, "")
      .replace(
        /From Roots to Resilience: The VisuSewer Story\s*/gi,
        ""
      )
      .replace(
        /A Financial Document That Reads Like a Legacy\.?\s*/gi,
        ""
      );
  }

  return base.replace(/\n{3,}/g, "\n\n").trim();
};

/* -----------------------------
 * Component
 * --------------------------- */

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  setIsOpen,
  startPresentation,
  pausePresentation,
  setCurrentSection,
  currentSection,
  isNarrating,
  presentationState,
  sectionSpec,

}) => {
  // UI + voice settings
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [ttsFailureCount, setTTSFailureCount] = useState(0);
  const [engine, setEngine] = useState<
    "browser" | "azure" | "gemini" | "orpheus"
  >("browser");
  // Remove local availableVoices state, use from useTTS instead
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const voiceLock =
    String(
      (import.meta as any).env?.VITE_TTS_VOICE_LOCK || ""
    )
      .toLowerCase()
      .trim() === "true";
  const engineLock =
    String(
      (import.meta as any).env?.VITE_TTS_ENGINE_LOCK || ""
    )
      .toLowerCase()
      .trim() === "true";

  // Selected voice
  const initialSelectedVoice = (() => {
    try {
      return (
        window.localStorage?.getItem("agentLee.voice") ||
        (import.meta as any).env?.VITE_TTS_SELECTED_VOICE ||
        "Microsoft EmmaMultilingual Online (Natural) - English (United States) • en-US"
      );
    } catch {
      return (
        (import.meta as any).env?.VITE_TTS_SELECTED_VOICE ||
        "Microsoft EmmaMultilingual Online (Natural) - English (United States) • en-US"
      );
    }
  })();

  const [selectedVoice, setSelectedVoice] =
    useState<string>(initialSelectedVoice);

  // Diagnostics: track last TTS status and available voices
  const [ttsStatus, setTTSStatus] = useState<string>("");
  const [ttsError, setTTSError] = useState<string>("");

  // TTS hook
  const onTTSFailure = useCallback(() => {
    setTTSFailureCount((c: number) => c + 1);
    setTTSError("TTS failed to start or play.");
  }, []);

  const onTTSError = useCallback((e: unknown) => {
    setTTSError(String(e));
  }, []);

  const onTTSEnded = useCallback(() => {
    setTTSStatus("Playback ended.");
  }, []);

  const ttsOptions = React.useMemo(() => ({
    selectedVoice,
    onFailure: onTTSFailure,
    onError: onTTSError,
    onEnded: onTTSEnded,
  }), [selectedVoice, onTTSFailure, onTTSError, onTTSEnded]);

  const {
    play: speak,
    stop: stopSpeaking,
    voicesLoaded,
    unlock,
    availableVoices,
    ttsEvents,
  } = useTTS(ttsOptions);

  // Listen for unlock events (dispatched from Start Presentation button in App)
  useEffect(() => {
    const handler = () => { try { unlock?.(); } catch {} };
    window.addEventListener('agentLee.unlock', handler);
    return () => window.removeEventListener('agentLee.unlock', handler);
  }, [unlock]);

  // Populate available voices from browser (independent of useTTS)
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    const synth = window.speechSynthesis;
    const load = () => {
      const voices = synth.getVoices();
      // No longer setAvailableVoices here; use availableVoices from useTTS
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  // Messages + input
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mic / speech recognition state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Presentation control refs
  const presentingCancelRef = useRef(false);

  // Resume/interrupt helpers
  const [resumeIndex, setResumeIndex] = useState<number | null>(
    null
  );
  const [lastUserMessage, setLastUserMessage] =
    useState<string>("");

  // Persist selected voice
  useEffect(() => {
    try {
      if (selectedVoice) {
        window.localStorage.setItem(
          "agentLee.voice",
          selectedVoice
        );
      }
    } catch {
      // ignore
    }
  }, [selectedVoice]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current && recognitionRef.current.stop) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Start section 0 when chat opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSection(0);
    }
  }, [isOpen, setCurrentSection]);

  // Narrate deck when in "presenting" mode
  useEffect(() => {
    let cancelled = false;
    presentingCancelRef.current = false;

    const presentFrom = async (startIndex: number) => {
      for (let i = startIndex; i < pitchDeckData.length; i++) {
        if (cancelled) break;
        if (!isOpen || presentationState !== "presenting")
          break;

        const pageText = SECTION_SPECS[i].narration;

        setCurrentSection(i);
        setMessages((prev) => [
          ...prev.filter((m) => m.role === "user"),
          { role: "model", text: pageText, sources: [] },
        ]);
        setInputValue("");

        try {
          const maybePromise = speak(pageText);
          if (
            maybePromise &&
            typeof (maybePromise as any).then === "function"
          ) {
            const ok = await (maybePromise as Promise<boolean>);
            if (!ok) break;
          }
        } catch (e) {
          console.warn("Presentation narration failed:", e);
          break;
        }

        await new Promise((r) => setTimeout(r, 300));
      }
    };

    if (isOpen && presentationState === "presenting") {
      const startAt = resumeIndex ?? currentSection ?? 0;
      presentFrom(startAt);
    } else {
      cancelled = true;
      presentingCancelRef.current = true;
    }

    return () => {
      cancelled = true;
      presentingCancelRef.current = true;
      stopSpeaking();
    };
  }, [
    isOpen,
    presentationState,
    voicesLoaded,
    resumeIndex,
    currentSection,
    stopSpeaking,
    setCurrentSection,
    speak,
  ]);

  // Auto-scroll transcript
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  // --- Handle microphone toggle ---
  const handleToggleMic = useCallback(() => {
    if (isListening) {
      const recog = recognitionRef.current;
      if (recog && typeof recog.stop === "function") {
        recog.stop();
      }
      setIsListening(false);
      return;
    }

    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Live microphone Q&A is not supported in this browser. You can still type your question in the box."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognitionRef.current = recognition;
    setIsListening(true);

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      const combined = (finalTranscript + interim).trim();
      setInputValue(combined);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isListening]);

  // --- Handle chat send ---
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setIsOpen(true);
      pausePresentation();
      stopSpeaking();

      setLastUserMessage(text);
      const userMessage: ChatMessage = {
        role: "user",
        text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        // Quick "go to page N"
        const pageMatch = text.match(
          /page\s+(\d{1,2})/i
        );
        let navText = "";
        if (pageMatch) {
          const pageNum = Math.max(
            1,
            Math.min(
              parseInt(pageMatch[1], 10),
              pitchDeckData.length
            )
          );
          const idx = pageNum - 1;
          setCurrentSection(idx);
          setResumeIndex(idx);
          navText = `Navigating to page ${pageNum}: ${pitchDeckData[idx].title}.`;
        }

        // Chart/data context
        let chartContext = "";
        if (
          /chart|graph|metric|data|evidence|source/i.test(
            text
          )
        ) {
          chartContext = pitchDeckData
            .map(
              (sec, i) =>
                `Page ${i + 1}: ${sec.title} - ${sec.narrative}`
            )
            .join("\n");
        }

        const actionInstruction = `
If you want to trigger a UI action, output a single JSON object on its own line with the keys "function" and "args".
Examples:
{"function":"navigateToSection","args":{"sectionIndex":3}}
{"function":"openLink","args":{"url":"https://example.com"}}
Otherwise respond with a helpful, conversational message.
`.trim();

        const systemEntry = {
          role: "system",
          content:
            chatbotContext +
            "\n\n" +
            actionInstruction +
            (chartContext
              ? `\n\nRelevant chart/graph context:\n${chartContext}`
              : ""),
        };

        let modelText: string;
        try {
          if (chartContext) {
            const response = await agentTeam.explainChart(
              text,
              systemEntry.content
            );
            modelText =
              response &&
              (response as any).best &&
              (response as any).best.text
                ? (response as any).best.text
                : String(response);
          } else {
            const response = await agentTeam.answer(
              text,
              systemEntry.content
            );
            modelText =
              response &&
              (response as any).best &&
              (response as any).best.text
                ? (response as any).best.text
                : String(response);
          }
        } catch (err) {
          console.warn(
            "LLM unavailable, using fallback responder:",
            err
          );
          const pageExpl = generatePageExplanation(
            resumeIndex ?? currentSection
          );
          modelText =
            pageExpl && pageExpl.length > 20
              ? pageExpl
              : fallbackAnswer(text);
        }

        // Detect model-issued JSON action
        let handledAction = false;
        const trimmed = modelText.trim();
        if (trimmed.startsWith("{")) {
          let depth = 0;
          let endIndex = -1;
          for (let i = 0; i < trimmed.length; i++) {
            const ch = trimmed[i];
            if (ch === "{") depth++;
            if (ch === "}") {
              depth--;
              if (depth === 0) {
                endIndex = i;
                break;
              }
            }
          }
          if (endIndex > 0) {
            const jsonStr = trimmed.slice(0, endIndex + 1);
            try {
              const obj = JSON.parse(jsonStr);
              if (obj && obj.function) {
                handledAction = true;
                if (
                  obj.function ===
                    "navigateToSection" &&
                  obj.args &&
                  obj.args.sectionIndex !==
                    undefined
                ) {
                  const newIndex = Number(
                    obj.args.sectionIndex
                  );
                  if (
                    newIndex >= 0 &&
                    newIndex < pitchDeckData.length
                  ) {
                    setCurrentSection(newIndex);
                    setResumeIndex(newIndex);
                    const confirmationText = `Of course. Navigating to "${pitchDeckData[newIndex].title}".`;
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "model",
                        text: confirmationText,
                        sources: [],
                      },
                    ]);
                    speak(confirmationText);
                  }
                } else if (
                  obj.function === "openLink" &&
                  obj.args &&
                  obj.args.url
                ) {
                  window.open(
                    obj.args.url,
                    "_blank"
                  );
                  const confirmationText =
                    "I’ve opened that link for you in a new tab.";
                  setMessages((prev) => [
                    ...prev,
                    {
                      role: "model",
                      text: confirmationText,
                      sources: [],
                    },
                  ]);
                  speak(confirmationText);
                }
              }
            } catch (e) {
              console.warn(
                "Failed to parse model JSON action:",
                e
              );
            }
          }
        }

        if (!handledAction) {
          const combined = navText
            ? `${navText}\n\n${modelText}`
            : modelText;
          const botMessage: ChatMessage = {
            role: "model",
            text: combined,
            sources: [],
          };
          setMessages((prev) => [
            ...prev,
            botMessage,
          ]);
          speak(combined);
        }
      } catch (error) {
        console.error(
          "Error with model pipeline:",
          error
        );
        const offlineMsg = fallbackAnswer(text);
        setMessages((prev) => [
          ...prev,
          { role: "model", text: offlineMsg },
        ]);
        speak(offlineMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [
      isLoading,
      pausePresentation,
      setCurrentSection,
      stopSpeaking,
      setIsOpen,
      resumeIndex,
      currentSection,
      speak,
    ]
  );

  return (
    <div className="chatbot-container">
      {/* Always-visible Agent Lee button with glow effect */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (presentationState === "presenting") {
            pausePresentation();
          }
        }}
        className="relative bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 border-4 border-blue-400 p-2 mb-4 mx-auto block group"
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
        <img
          src={`${(import.meta as any).env?.BASE_URL || '/'}images/agent-lee-visu-sewer.png`}
          alt="Agent Lee AI Assistant"
          className="relative h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-2xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/Visu-Sewer-Button.png";
          }}
        />
      </button>

      <div
        className={`w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <header className="bg-blue-800 text-white p-3 rounded-t-2xl flex justify-between items-center">
          <h3 className="font-bold text-base">Agent Lee Strategic Presenter</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVoiceSettings((v) => !v)}
              className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
              aria-label="Voice settings"
              title="Voice Settings"
            >
              {/* Gear / settings icon (clear) */}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06c.26-.5.36-1.02.33-1.57-.03-.47-.16-1.02-.36-1.57-.23-.5-.59-1.24-.33-1.82l1.12-1.94a1 1 0 001.03-.41l2.09-.39c.52-.45 1.04-.83 1.6-.93l.31-2.2A1 1 0 0012 3h0a1 1 0 00.99.83h2.24c.49 0 .97-.28 1.09-.83l.31 2.2c.56.2 1.08.48 1.6.93l2.09.39a1 1 0 001.03.41l1.12 1.94c.26.5.36 1.02.33 1.57-.03.47-.16 1.02-.36 1.57z" />
              </svg>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
              aria-label="Close chat"
              title="Close"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Voice settings panel (toggle) */}
        {showVoiceSettings && voicesLoaded && (
          <div className="bg-blue-50 border-b border-blue-200 p-2 space-y-2">
            <div>
              <label htmlFor="voice-selector" className="block text-xs font-semibold text-gray-700 mb-1">🎙️ Select Voice</label>
              <select
                id="voice-selector"
                value={selectedVoice}
                onChange={(e) => { if (!voiceLock) setSelectedVoice(e.target.value); }}
                className="w-full p-1.5 border border-blue-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                aria-label="Select voice for AI assistant"
                disabled={voiceLock}
              >
                <option value="">🎯 Auto-select (Curated)</option>
                {filterCuratedVoices(availableVoices).map((voice: SpeechSynthesisVoice, index: number) => (
                  <option key={index} value={voice.name}>{voice.name} ({voice.lang})</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="engine-selector" className="block text-xs font-semibold text-gray-700 mb-1">🛠️ TTS Engine</label>
              <select
                id="engine-selector"
                value={engine}
                onChange={(e) => { if (!engineLock) setEngine(e.target.value as any); }}
                className="w-full p-1.5 border border-blue-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                aria-label="Select TTS engine"
                disabled={engineLock}
              >
                <option value="browser">Browser (Local)</option>
                <option value="azure">Azure Cloud</option>
                <option value="gemini">Gemini Cloud</option>
                <option value="orpheus">Orpheus (Backend)</option>
              </select>
            </div>

            <button
              onClick={() => {
                setTTSStatus("");
                setTTSError("");
                unlock?.();
                speak("Hello, this is Agent Lee. Audio is working correctly.")
                  .then((ok) => setTTSStatus(ok ? "Playback started." : "Playback failed."))
                  .catch((e) => setTTSError(String(e)));
              }}
              className="mt-1.5 w-full text-xs bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              🔊 Test Audio
            </button>
        {/* TTS Diagnostics Panel */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-2 mt-2 text-xs">
          <div><strong>Current Voice:</strong> {selectedVoice}</div>
          <div><strong>Available Voices:</strong> {availableVoices.map(v => v.name).join(", ") || "(none)"}</div>
          <div><strong>TTS Status:</strong> {ttsStatus}</div>
          {ttsError && <div className="text-red-600"><strong>TTS Error:</strong> {ttsError}</div>}
          <div className="mt-2">
            <strong>Recent TTS Events:</strong>
            <ul className="text-[11px] list-disc ml-4 mt-1 max-h-28 overflow-auto">
              {ttsEvents && ttsEvents.length > 0 ? ttsEvents.map((e, i) => (
                <li key={i}>{new Date(e.ts).toLocaleTimeString()} — <em>{e.type}</em>{e.info ? `: ${e.info}` : ''}</li>
              )) : <li className="text-gray-500">(no events)</li>}
            </ul>
          </div>
        </div>

            {(voiceLock || engineLock) && (
              <div className="mt-1 text-[10px] text-gray-600 italic space-y-0.5">
                {voiceLock && <div>Voice locked to environment default.</div>}
                {engineLock && <div>Engine locked; fallback disabled.</div>}
              </div>
            )}
          </div>
        )}

        {/* TTS Failure Warning */}
        {ttsFailureCount >= 3 &&
          presentationState === "presenting" && (
            <div className="bg-amber-100 border-l-4 border-amber-500 p-3 mx-3 mt-3 rounded-md">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Voice narration may be limited
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    If audio is unstable, you can
                    still use the chat box below
                    to ask questions and navigate
                    pages — or tap the mic to speak
                    your question when supported.
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Main chat body */}
        <main className="flex-1 flex flex-col">
          {/* Transcript */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-xs text-gray-500 p-3">
                When the deck is running, Agent Lee
                will present "
                {PRESENTATION_TITLE}" as one
                continuous story. As questions come
                up, type them in the box below — or,
                if microphone mode is enabled in your
                browser, tap the mic button to speak
                them live. At the final slide, the
                presentation will formally open
                into Q&amp;A.
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={`p-2 rounded-lg max-w-[90%] text-xs shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  {msg.sources &&
                    msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <h4 className="text-[11px] font-semibold text-gray-600 mb-1">
                          Sources:
                        </h4>
                        <ul className="space-y-1">
                          {msg.sources.map(
                            (source, i) => (
                              <li
                                key={i}
                                className="flex items-start"
                              >
                                <LinkIcon className="h-3 w-3 text-gray-500 mr-1 mt-0.5 shrink-0" />
                                <a
                                  href={
                                    source.web.uri
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-blue-700 hover:underline break-all"
                                >
                                  {
                                    source.web
                                      .title
                                  }
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start my-1">
                <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-800">
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Controls + input */}
          <footer className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded text-xs font-medium border bg-green-50 border-green-300 text-green-700"
                  onClick={() => {
                    const target = resumeIndex ?? currentSection ?? 0;
                    if (typeof target === "number") {
                      setCurrentSection(target);
                      setResumeIndex(target);
                      const msg = `Resuming presentation at page ${target + 1}: ${pitchDeckData[target].title}.`;
                      setMessages((prev) => [
                        ...prev,
                        { role: "model", text: msg, sources: [] },
                      ]);
                      // ensure narration resumes
                      startPresentation();
                      speak(msg);
                    }
                  }}
                >
                  Resume Presentation
                </button>
                
                    <button
                      type="button"
                      className="px-3 py-1 rounded text-xs font-medium border bg-blue-50 border-blue-300 text-blue-700"
                      onClick={async () => {
                        // Ask about the current page using agentTeam.explainChart
                        try {
                          const idx = Number(currentSection ?? resumeIndex ?? 0);
                          const pagePrompt = `Explain page ${idx + 1}: ${pitchDeckData[idx].title}`;
                          setIsLoading(true);
                          const response = await agentTeam.explainChart(
                            pagePrompt,
                            chatbotContext
                          );
                          let text = "";
                          if (response && (response as any).best && (response as any).best.text) {
                            text = (response as any).best.text;
                          } else if (typeof response === "string") {
                            text = response;
                          } else {
                            text = generatePageExplanation(idx);
                          }

                          // Add model message and speak
                          const botMessage: ChatMessage = { role: "model", text, sources: [] };
                          setMessages((prev) => [...prev, botMessage]);
                          try { await speak(text); } catch (e) { console.warn('TTS speak failed', e); }
                        } catch (e) {
                          console.warn('explainChart failed', e);
                          const fallback = generatePageExplanation(currentSection ?? resumeIndex ?? 0);
                          setMessages((prev) => [...prev, { role: 'model', text: fallback, sources: [] }]);
                          try { await speak(fallback); } catch (e) {}
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      Ask About This Page
                    </button>

                    <button
                      type="button"
                      className="px-3 py-1 rounded text-xs font-medium border bg-indigo-50 border-indigo-300 text-indigo-700"
                      onClick={() => {
                        // Continue narration from currentSection
                        const target = currentSection ?? resumeIndex ?? 0;
                        setResumeIndex(target);
                        setCurrentSection(target);
                        const msg = `Continuing presentation from page ${Number(target) + 1}: ${pitchDeckData[Number(target)].title}.`;
                        setMessages((prev) => [...prev, { role: 'model', text: msg, sources: [] }]);
                        startPresentation();
                        try { speak(msg); } catch (e) { console.warn('TTS continue failed', e); }
                      }}
                    >
                      Continue From Here
                    </button>
              </div>

            <div className="flex gap-2 items-stretch">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Type a question for Agent Lee (or tap the mic to speak)..."
                value={inputValue}
                onChange={(e) =>
                  setInputValue(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    if (
                      inputValue.trim().length >
                      0
                    ) {
                      handleSendMessage(
                        inputValue.trim()
                      );
                    }
                  }
                }}
              />

              {/* Microphone button */}
              <button
                type="button"
                className={`px-2 py-1 rounded-lg border text-sm flex items-center justify-center ${
                  isListening
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-gray-50 border-gray-300 text-gray-700"
                }`}
                onClick={handleToggleMic}
                title={
                  isListening
                    ? "Stop listening"
                    : "Speak your question"
                }
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10a7 7 0 0 1-14 0" />
                  <line x1="12" y1="17" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>

              <button
                type="button"
                className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                disabled={
                  isLoading ||
                  inputValue.trim().length === 0
                }
                onClick={() => {
                  if (
                    inputValue.trim().length >
                    0
                  ) {
                    handleSendMessage(
                      inputValue.trim()
                    );
                  }
                }}
              >
                {isLoading ? (
                  "Thinking..."
                ) : (
                  <PaperAirplaneIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="mt-1 text-[10px] text-gray-500 text-right">
              Ask questions at any time — type in the box, or tap the mic
              when your browser supports live voice input. Now that the
              formal presentation is complete, this space is fully open
              for Q&amp;A.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;
