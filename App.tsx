/* LEEWAY HEADER
TAG: UI.APP.SURFACE
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: presentation
ICON_SIG: CD534113
5WH: WHAT=VisuSewer Strategic Asset & Growth Pitch Deck Application;
WHY=Present 21-slide investment thesis with AI narrator Agent Lee;
WHO=LeeWay Industries;
WHERE=a:\Visu-Sewer Strategic Asset & Growth Deck\App.tsx;
WHEN=2025-11-16;
HOW=React + TypeScript + Vite + Recharts + Agent Lee AI
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import { Chatbot } from "./components/Chatbot";
import { ConsentScreen } from "./components/ConsentScreen";
import { Deck } from "./components/Deck";
import { pitchDeckData, SECTION_SPECS } from "./constants";

type PresentationState = "idle" | "presenting" | "paused";

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [presentationState, setPresentationState] =
    useState<PresentationState>("idle");

  const sectionSpec = SECTION_SPECS[currentSection];
    // Determine initial consent state.
    // Accept VITE_BYPASS_CONSENT in several common forms (true/1/yes), and
    // also respect import.meta.env.DEV so developer runs auto-open the chat.
    const parseBool = (v: any) => {
        if (typeof v === 'boolean') return v;
        if (typeof v === 'number') return v !== 0;
        if (!v) return false;
        try {
            const s = String(v).trim().toLowerCase();
            return ['1', 'true', 'yes', 'on'].includes(s);
        } catch {
            return false;
        }
    };

    const envBypassRaw = (import.meta as any).env?.VITE_BYPASS_CONSENT ?? (typeof process !== 'undefined' ? (process.env?.VITE_BYPASS_CONSENT as any) : undefined);
    const envBypass = parseBool(envBypassRaw);
    const devFlag = Boolean((import.meta as any).env?.DEV);

  // Always require consent on first load (do not auto-bypass)
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] =
    useState(false);
  const [hasInitialized, setHasInitialized] =
    useState(false);
  const [showStartButton, setShowStartButton] =
    useState(true);

  // Auto-open chatbot when consent is given, and initialize at page 0
  useEffect(() => {
    if (consentGiven && !hasInitialized) {
      console.log(
        "Initializing app - setting up presentation at section 0"
      );
      setCurrentSection(0);
      setIsChatbotOpen(true);
      setHasInitialized(true);
    }
  }, [consentGiven, hasInitialized]);

  const handleNext = useCallback(() => {
    setCurrentSection((prev) => {
      const next = Math.min(
        prev + 1,
        pitchDeckData.length - 1
      );
      console.log(
        `Advancing from section ${prev} to ${next}`
      );
      return next;
    });

    // Trigger a resize so Recharts can recalc dimensions
    setTimeout(
      () =>
        window.dispatchEvent(new Event("resize")),
      120
    );
  }, []);

  const handlePrev = () => {
    // Manual navigation always pauses presentation
    setPresentationState("paused");
    setCurrentSection((prev) =>
      Math.max(prev - 1, 0)
    );
    setTimeout(
      () =>
        window.dispatchEvent(new Event("resize")),
      120
    );
  };

  const startPresentation = useCallback(() => {
    console.log(
      "Starting presentation from section 0"
    );
    setCurrentSection(0);
    setPresentationState("presenting");
    setIsChatbotOpen(true); // Ensure chatbot is open to handle narration
  }, []);

  const pausePresentation = () => {
    setPresentationState("paused");
  };

  // React to section changes (layout + ensure chatbot visible on page 1)
  useEffect(() => {
    console.log(
      `Section changed to ${currentSection}, state: ${presentationState}`
    );

    if (
      presentationState === "presenting" &&
      currentSection === 0
    ) {
      setIsChatbotOpen(true);
    }

    // Always dispatch a resize when section changes
    requestAnimationFrame(() =>
      window.dispatchEvent(new Event("resize"))
    );
  }, [currentSection, presentationState]);

  const handleConsent = () => {
    setConsentGiven(true);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "vsw.consent",
          JSON.stringify({ agreed: true })
        );
      }
    } catch {
      // ignore storage failure
    }
  };

  const handleStartPresentation = () => {
    setShowStartButton(false);
    // Dispatch unlock event so Chatbot can initialize audio in the context of this user gesture
    try { window.dispatchEvent(new Event('agentLee.unlock')); } catch {}
    startPresentation();
  };

  if (!consentGiven) {
    return <ConsentScreen onAccept={handleConsent} />;
  }

  const progress =
    ((currentSection + 1) /
      pitchDeckData.length) *
    100;

  // Map current section to a CSS class instead of inline style
  // Define these widths in your CSS for .progress-step-1 ... .progress-step-21
  const stepIndex = currentSection + 1;
  const progressStepClass = `progress-indicator progress-step-${stepIndex}`;

  const baseUrl =
    (import.meta as any).env.BASE_URL || "/";

  return (
    <div className="min-h-screen max-h-screen bg-gray-900 flex overflow-hidden font-sans">
      {/* Main Presentation Area - 75% */}
      <div className="w-3/4 flex flex-col p-4 min-h-0">
        <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-300 overflow-hidden flex flex-col h-full min-h-0">
          <main className="grow overflow-hidden relative min-h-0">
            {/* Only render the current section, lazy-load visuals for performance */}
            <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Loading slide...</div>}>
              <Deck section={pitchDeckData[currentSection]} key={currentSection} />
            </React.Suspense>

            {/* Start Presentation Button Overlay */}
            {showStartButton &&
              currentSection === 0 && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                  <button
                    onClick={
                      handleStartPresentation
                    }
                    className="group relative px-12 py-6 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
                    <span className="relative flex items-center gap-4">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Start Presentation
                    </span>
                  </button>
                </div>
              )}
          </main>

          <footer className="flex justify-between items-center p-4 bg-gray-50 border-t-2 border-gray-200">
            {/* Previous button */}
            <button
              onClick={handlePrev}
              disabled={currentSection === 0}
              className="flex flex-col items-center transition-transform transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <img
                src={`${baseUrl}images/Visu-Sewer-Button.png`}
                alt="Previous"
                className="h-20 w-20 object-contain"
              />
              <div className="text-xs font-medium text-gray-600 mt-1">
                Previous
              </div>
            </button>

            {/* Progress indicator */}
            <div className="flex-1 text-center px-8">
              <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs mx-auto">
                <div
                  className={progressStepClass}
                  data-progress={progress}
                ></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold mt-1 block">
                {currentSection + 1} /{" "}
                {pitchDeckData.length}
              </span>
            </div>

            {/* Next button */}
            <button
              onClick={() => {
                pausePresentation();
                handleNext();
              }}
              disabled={
                currentSection ===
                pitchDeckData.length - 1
              }
              className="flex flex-col items-center transition-transform transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <img
                src={`${baseUrl}images/visu-sewer-logo-button.png`}
                alt="Next"
                className="h-20 w-20 object-contain"
              />
              <div className="text-xs font-medium text-gray-600 mt-1">
                Next
              </div>
            </button>
          </footer>
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          © 2025 VISU-Sewer LLC. A Fort Point
          Capital portfolio company. Confidential
          and proprietary. Developed by Leeway
          Industries.
        </p>
      </div>

      {/* Agent Lee Chatbot Area - 25% */}
      <div className="w-1/4 flex flex-col p-4 pl-0 min-h-0 overflow-hidden">
        <Chatbot
          isOpen={isChatbotOpen}
          setIsOpen={setIsChatbotOpen}
          startPresentation={startPresentation}
          pausePresentation={pausePresentation}
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
          isNarrating={
            presentationState === "presenting"
          }
          presentationState={presentationState}
          sectionSpec={sectionSpec}
        />
      </div>
    </div>
  );
};

export default App;
