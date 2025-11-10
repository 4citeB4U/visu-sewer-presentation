/* LEEWAY HEADER
TAG: UI.APP.SURFACE
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: presentation
ICON_SIG: CD534113
5WH: WHAT=VisuSewer Strategic Asset & Growth Pitch Deck Application;
WHY=Present 16-slide investment thesis with AI narrator Agent Lee;
WHO=LeeWay Industries;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\App.tsx;
WHEN=2025-11-08;
HOW=React + TypeScript + Vite + Recharts + Agent Lee AI
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chatbot } from './components/Chatbot';
import { ConsentScreen } from './components/ConsentScreen';
import { Deck } from './components/Deck';
import { pitchDeckData } from './constants';
import { useTTS } from './hooks/useTTS';

type PresentationState = 'idle' | 'presenting' | 'paused';

const App: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [presentationState, setPresentationState] = useState<PresentationState>('idle');
    const [consentGiven, setConsentGiven] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);

    // Use refs to avoid stale closures in TTS callbacks
    const currentSectionRef = useRef(0);
    const presentationStateRef = useRef<PresentationState>('idle');
    
    // Keep refs in sync
    useEffect(() => {
        currentSectionRef.current = currentSection;
        presentationStateRef.current = presentationState;
    }, [currentSection, presentationState]);

    // Auto-open chatbot on page load after consent
    useEffect(() => {
        if (consentGiven && !hasInitialized) {
            console.log('Initializing app - setting up presentation at section 0');
            setCurrentSection(0);
            setIsChatbotOpen(true);
            setHasInitialized(true);
        }
    }, [consentGiven, hasInitialized]);


    const handleNext = useCallback(() => {
        setCurrentSection(prev => {
            const next = Math.min(prev + 1, pitchDeckData.length - 1);
            console.log(`Advancing from section ${prev} to ${next}`);
            return next;
        });
        // Trigger a resize after slight delay so Recharts recalculates dimensions
        setTimeout(() => window.dispatchEvent(new Event('resize')), 120);
    }, []);

    const handlePrev = () => {
        setPresentationState('paused'); // Manual navigation always pauses presentation
        setCurrentSection(prev => Math.max(prev - 1, 0));
        setTimeout(() => window.dispatchEvent(new Event('resize')), 120);
    };
    
    const startPresentation = useCallback(() => {
        console.log('Starting presentation from section 0');
        setCurrentSection(0);
        setPresentationState('presenting');
        setIsChatbotOpen(true); // Ensure chatbot is open to handle narration
    }, []);

    const { play, stop, isLoading, isPlaying } = useTTS({
      onEnded: () => {
        console.log(`TTS ended. Current section: ${currentSectionRef.current}, state: ${presentationStateRef.current}`);
        // Note: Chatbot handles auto-advancing through narration, not App.tsx
      }
    });

    // Remove the conflicting auto-narration from App.tsx - Chatbot handles all speaking
    useEffect(() => {
      console.log(`Section changed to ${currentSection}, state: ${presentationState}`);
      
            if (presentationState === 'presenting' && currentSection === 0) {
        setIsChatbotOpen(true);
      }
            // Always dispatch a resize when section changes to stabilize chart containers (-1 width bug fix)
            requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }, [currentSection, presentationState]);


    const pausePresentation = () => {
        stop();
        setPresentationState('paused');
    }

    const handleConsent = () => {
        setConsentGiven(true);
    };
    
    const handleStartPresentation = () => {
        setShowStartButton(false);
        startPresentation();
    };

    if (!consentGiven) {
        return <ConsentScreen onAccept={handleConsent} />;
    }

    const progress = ((currentSection + 1) / pitchDeckData.length) * 100;

    return (
        <div className="min-h-screen max-h-screen bg-gray-900 flex overflow-hidden font-sans">
            {/* Main Presentation Area - 75% */}
            <div className="w-3/4 flex flex-col p-4 min-h-0">
                <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-300 overflow-hidden flex flex-col h-full min-h-0">
                    <main className="grow overflow-hidden relative min-h-0">
                       <Deck section={pitchDeckData[currentSection]} key={currentSection} />
                       
                       {/* Start Presentation Button Overlay */}
                       {showStartButton && currentSection === 0 && (
                           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                               <button
                                   onClick={handleStartPresentation}
                                   className="group relative px-12 py-6 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                               >
                                   <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
                                   <span className="relative flex items-center gap-4">
                                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                           <path d="M8 5v14l11-7z"/>
                                       </svg>
                                       Start Presentation
                                   </span>
                               </button>
                           </div>
                       )}
                    </main>
                    
                    <footer className="flex justify-between items-center p-4 bg-gray-50 border-t-2 border-gray-200">
                        <button 
                            onClick={handlePrev} 
                            disabled={currentSection === 0}
                            className="flex flex-col items-center transition-transform transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <img src="/images/Visu-Sewer-Button.png" alt="Previous" className="h-20 w-20 object-contain" />
                            <div className="text-xs font-medium text-gray-600 mt-1">Previous</div>
                        </button>
                         <div className="flex-1 text-center px-8">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs mx-auto">
                                <div className="progress-indicator bg-blue-600 h-2.5 rounded-full" data-progress={progress}></div>
                            </div>
                             <span className="text-xs text-gray-500 font-semibold mt-1 block">{currentSection + 1} / {pitchDeckData.length}</span>
                        </div>
                        <button 
                            onClick={() => { pausePresentation(); handleNext(); }}
                            disabled={currentSection === pitchDeckData.length - 1}
                            className="flex flex-col items-center transition-transform transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <img src="/images/visu-sewer-logo-button.png" alt="Next" className="h-20 w-20 object-contain" />
                            <div className="text-xs font-medium text-gray-600 mt-1">Next</div>
                        </button>
                    </footer>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">© 2025 VISU-Sewer LLC. A Fort Point Capital portfolio company. Confidential and proprietary. Developed by Leeway Industries.</p>
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
                    isNarrating={isPlaying}
                    presentationState={presentationState}
                />
            </div>
        </div>
    );
};

export default App;