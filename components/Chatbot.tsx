/* LEEWAY HEADER
TAG: UI.COMPONENT.CHATBOT
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: message-square
ICON_SIG: CD534113
5WH: WHAT=AI Strategic Analyst Chatbot with Agent Lee;
WHY=Provide interactive Q&A during pitch presentation;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\Chatbot.tsx;
WHEN=2025-11-08;
HOW=React + Gemma LLM + Browser SpeechSynthesis
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pitchDeckData } from '../constants';
import { useTTS } from '../hooks/useTTS';
import { agentTeam } from '../models/agentTeam.js';
import { filterCuratedVoices } from '../utils/voiceCurated';
import './Chatbot.css';
import { ArrowPathIcon, LinkIcon, MicrophoneIcon, PaperAirplaneIcon } from './Icons';
// ============================================================================
// Agent Lee — Page-specific opener/closer support (auto-injected)
// ============================================================================

type DeckSection = {
  title: string;
  narrative: string;
  opener?: string;
  closer?: string;
};

type OC = { opener: string; closer: string };

// Page-number-indexed map for jazzy openers/closers
const OPENERS_CLOSERS: Record<number, OC> = {
  1: { opener: "Every great story starts below the surface—let’s dig where the promise began.",
       closer: "One promise planted underground… and it’s still feeding the future." },
  2: { opener: "Here’s the map—because every legend deserves coordinates.",
       closer: "We know our route; now let’s walk it together." },
  3: { opener: "Every masterpiece stands on its frame—let’s meet ours.",
       closer: "Foundations this strong don’t crumble; they carry generations." },
  4: { opener: "Some people chase profit—we fell for perfection.",
       closer: "That love became our blueprint—and it still builds every day." },
  5: { opener: "Here’s the crossroads—where credibility meets scale.",
       closer: "The engine’s built—the key just turned." },
  6: { opener: "Progress doesn’t sprint—it marches with purpose.",
       closer: "Fifty years of footsteps—all still heading forward." },
  7: { opener: "The future didn’t surprise us—we invited it in.",
       closer: "Tomorrow isn’t coming at us—we’re already walking in its direction." },
  8: { opener: "Let’s lift the hood and see modernization in motion.",
       closer: "Old soul, new engine—that’s modern mastery." },
  9: { opener: "Every storm tests the structure—ours was built for weather.",
       closer: "Preparedness isn’t protection—it’s profit." },
 10: { opener: "Order is how excellence remembers what passion built.",
       closer: "When process holds purpose, performance follows." },
 11: { opener: "Great companies don’t rise from spreadsheets—they rise from people.",
       closer: "Hands-on leadership—because respect is built, not appointed." },
 12: { opener: "Control the cycle, command the outcome.",
       closer: "When every link is ours, the chain never breaks." },
 13: { opener: "Proof doesn’t brag—it shows up in results.",
       closer: "Performance recorded, trust reinforced." },
 14: { opener: "Numbers matter more when they measure people.",
       closer: "When you quantify care, you multiply success." },
 15: { opener: "Trajectory time—let’s turn data into distance.",
       closer: "That’s not a forecast—it’s a flight path." },
 16: { opener: "Legacy isn’t nostalgia—it’s navigation.",
       closer: "We’re not keeping history alive; history is keeping us aligned." },
 17: { opener: "Every transformation must pass its exams.",
       closer: "Principle became performance—and the grade was profit." },
 18: { opener: "The night shift never sleeps—and neither does ambition.",
       closer: "The horizon isn’t a line—it’s our next milestone." },
 19: { opener: "Stories inspire; data confirms.",
       closer: "Facts are the quiet proof of faith." },
 20: { opener: "Every ending is just a higher floor in the same building.",
       closer: "And as the next 50 years begin, the lights stay on, the flow stays strong, and the promise stays kept." },
};

// Assembles "Page N — Title. <opener> <narrative> <closer>"
function assembleNarration(
  pageIndexZeroBased: number,
  sectionData: DeckSection,
  plainNarrative: string,
  opts?: { preferRuntime?: boolean; includePageTitle?: boolean }
) {
  const { preferRuntime = true, includePageTitle = true } = opts ?? {};
  const pageNo = pageIndexZeroBased + 1;

  const runtimeOC = OPENERS_CLOSERS[pageNo];
  const opener = (preferRuntime ? runtimeOC?.opener : sectionData.opener) ?? sectionData.opener ?? "";
  const closer = (preferRuntime ? runtimeOC?.closer : sectionData.closer) ?? sectionData.closer ?? "";

  const titlePart = includePageTitle ? `Page ${pageNo} — ${sectionData.title}.` : "";
  return [titlePart, opener, plainNarrative, closer]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
// ============================================================================


// --- Function-like actions supported locally ---
const navigateToSection = {
    name: 'navigateToSection',
    description: 'Navigates the user to a specific section/slide of the pitch deck.'
};

const openLink = {
    name: 'openLink',
    description: 'Opens a given URL in a new browser tab.'
};

// --- Chatbot Context ---
const chatbotContext = `
You are Agent Lee, a Strategic Analyst AI presenting the Visu-Sewer investment thesis. Your persona is that of an expert from a top-tier business school, combining financial acumen with organizational psychology. You communicate with precision, confidence, and a data-driven perspective.

**Your Core Mandate:**
1.  **Present with Authority:** Guide users through the 18-section pitch deck FROM THE BEGINNING (Section 0).
2.  **Provide Evidence-Based Answers:** Answer questions based on the presentation content.
3.  **Default to Company Data:** For questions about Visu-Sewer, use content from this presentation and https://visu-sewer.com/.

**Deck Structure (18 sections, ALWAYS START AT SECTION 0):**
- Section 0: Investment Thesis Cover (START HERE)
- Section 1: Presentation Index (Roadmap of all sections)
- Sections 2-16: Strategic narrative sections
- Section 17: Closing & Thank You (Final message)
- You MUST begin presentations at Section 0, not at the end.

**Your Capabilities:**
- Navigate through presentation sections (start at 0)
- Open external URLs
- Provide strategic analysis

**Your Persona:**
Professional, analytical, concise. Deep analysis, brief responses.
`;

interface GroundingChunk {
    web: { uri: string; title: string };
}
interface Message {
    role: 'user' | 'model';
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
    presentationState: 'idle' | 'presenting' | 'paused';
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen, startPresentation, pausePresentation, setCurrentSection, currentSection, isNarrating, presentationState }) => {
    // ...existing code...
    // UI state for voice/engine settings
    const [showVoiceSettings, setShowVoiceSettings] = useState(false);
    const [ttsFailureCount, setTTSFailureCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // Voice/engine lock and available voices from useTTS
    const voiceLock = String((import.meta as any).env?.VITE_TTS_VOICE_LOCK || '').toLowerCase() === 'true';
    const engineLock = String((import.meta as any).env?.VITE_TTS_ENGINE_LOCK || '').toLowerCase() === 'true';
    const [engine, setEngine] = useState('browser');
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    // Greeting and narration tracking
    const [hasGreeted, setHasGreeted] = useState(false);
    const [lastNarratedSection, setLastNarratedSection] = useState(-1);
    const [narrationStatus, setNarrationStatus] = useState<'idle'|'started'|'finished'>('idle');
    const narrationStatusRef = useRef<'idle'|'started'|'finished'>('idle');
    const recognitionRef = useRef<any>(null);
    // TTS hook for narration (only once, after selectedVoice)
    const initialSelectedVoice = (() => { try { return window.localStorage?.getItem('agentLee.voice') || (import.meta as any).env?.VITE_TTS_SELECTED_VOICE || ''; } catch { return (import.meta as any).env?.VITE_TTS_SELECTED_VOICE || ''; } })();
    const [selectedVoice, setSelectedVoice] = useState<string>(initialSelectedVoice);
    const { play: speak, stop: stopSpeaking, voicesLoaded } = useTTS({ selectedVoice });
    const speakRef = useRef<(text: string) => void>(speak);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    // Persist voice when it changes
    useEffect(() => {
        try { if (selectedVoice) window.localStorage.setItem('agentLee.voice', selectedVoice); } catch {}
    }, [selectedVoice]);
    // Auto-update if ConsentScreen auto-selected a voice after this mounted
    useEffect(() => {
        // Don't auto-start, wait for user to press Start Presentation button
        if (isOpen && !hasGreeted && messages.length === 0) {
            setCurrentSection(0);
            setHasGreeted(true);
        }
    }, [isOpen, hasGreeted, messages.length, setCurrentSection]);

    // When presentation starts, begin narration
    useEffect(() => {
        // Wait for browser voices to be available to reduce false start failures
        if (presentationState === 'presenting' && currentSection === 0 && lastNarratedSection === -1 && voicesLoaded) {
            const currentSectionData = pitchDeckData[0];
            const greeting = `Hello — I'm Agent Lee, your strategic presenter and guide. ` + assembleNarration(0, currentSectionData as any, currentSectionData.narrative, { includePageTitle: true });
            
            console.log('🎤 Agent Lee starting greeting:', greeting.substring(0, 100) + '...');
            console.log('🎤 Current presentationState:', presentationState);
            console.log('🎤 Current section:', currentSection);
            console.log('🎤 Last narrated section:', lastNarratedSection);
            console.log('🎤 About to call speakRef.current()...');
            
            setMessages([{ role: 'model', text: greeting, sources: [] }]);
            
            // Small delay to ensure everything is ready
            setTimeout(() => {
                console.log('🎤 NOW calling speak function...');
                setNarrationStatus('started');
                narrationStatusRef.current = 'started';
                speakRef.current(greeting);
            }, 100);
            
            setLastNarratedSection(0);
        }
    }, [presentationState, currentSection, lastNarratedSection, voicesLoaded]);

    // Auto-narrate when page changes
    useEffect(() => {
        if (isOpen && presentationState === 'presenting' && currentSection !== lastNarratedSection && currentSection !== 0) {
            // Stop any ongoing speech first
            stopSpeaking();
            
            // Skip section 0 since it's handled in the startup effect
            const currentSectionData = pitchDeckData[currentSection];
            if (currentSectionData && currentSectionData.narrative) {
                // Wait a moment for page to render
                const timer = setTimeout(() => {
                    const pageNumber = currentSection + 1;
                    const pageIntro = assembleNarration(currentSection, currentSectionData as any, currentSectionData.narrative, { includePageTitle: true });
                    console.log('🎤 Agent Lee narrating page', pageNumber);
                    setMessages(prev => [...prev, { role: 'model', text: pageIntro, sources: [] }]);
                    setNarrationStatus('started');
                    narrationStatusRef.current = 'started';
                    speakRef.current(pageIntro);
                    setLastNarratedSection(currentSection);
                }, 800);
                
                return () => clearTimeout(timer);
            }
        }
    }, [isOpen, presentationState, currentSection, lastNarratedSection, stopSpeaking]);

    // Detect when we've reached the closing page (last section)
    const [hasDeliveredClosing, setHasDeliveredClosing] = useState(false);
    useEffect(() => {
        const lastSectionIndex = pitchDeckData.length - 1;
        const isOnClosingSlide = currentSection === lastSectionIndex;
        const currentSectionData = pitchDeckData[currentSection];
        
        if (isOpen && !hasDeliveredClosing && isOnClosingSlide && currentSectionData?.content.type === 'closing') {
            // Small delay to let the visual render and narration start
            const timer = setTimeout(() => {
                const closingMessage = "We've reached the end of our journey together. Thank you for experiencing the Visu-Sewer story with me. This is not just a financial opportunity—it's an invitation to join a legacy of excellence that has been 50 years in the making. If you have any questions or would like to discuss partnership opportunities, I'm here to help.";
                setMessages(prev => [...prev, { role: 'model', text: closingMessage, sources: [] }]);
                speak(closingMessage);
                setHasDeliveredClosing(true);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [isOpen, currentSection, hasDeliveredClosing, speak]);


    // --- Message Handling ---
    // Lightweight fallback responder when LLM fails: searches deck for related sections
    const fallbackAnswer = (query: string): string => {
        const q = query.toLowerCase();
        const matches = pitchDeckData.filter(sec =>
            sec.title.toLowerCase().includes(q) ||
            (sec.narrative && sec.narrative.toLowerCase().includes(q))
        ).slice(0, 3);
        if (matches.length === 0) {
            return "I'm operating in offline fallback mode. I couldn't find a direct match in the deck; please try a more specific keyword (e.g., 'human capital', 'timeline', 'capital structure').";
        }
        return `Offline strategic summary (model unavailable). Relevant sections:\n\n` + matches.map(m => `• ${m.title}: ${m.narrative.substring(0, 320)}${m.narrative.length > 320 ? '…' : ''}`).join('\n\n');
    };

    // --- Resume/interrupt logic ---
    const [resumeIndex, setResumeIndex] = useState<number | null>(null);
    const [lastUserMessage, setLastUserMessage] = useState<string>('');

    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading) return;

        setIsOpen(true);
        pausePresentation();
        stopSpeaking(); 

        setLastUserMessage(text);
        const userMessage: Message = { role: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Quick client-side intent: "go to page N"
            const pageMatch = text.match(/page\s+(\d{1,2})/i);
            if (pageMatch) {
                const pageNum = Math.max(1, Math.min(parseInt(pageMatch[1], 10), pitchDeckData.length));
                const idx = pageNum - 1;
                setCurrentSection(idx);
                setResumeIndex(idx);
                const confirmation = `Navigating to Page ${pageNum}: ${pitchDeckData[idx].title}.`;
                setMessages(prev => [...prev, { role: 'model', text: confirmation, sources: [] }]);
                speak(confirmation);
                setIsLoading(false);
                return;
            }

            // Chart/graph context enrichment
            let chartContext = '';
            if (/chart|graph|metric|data|evidence|source/i.test(text)) {
                chartContext = pitchDeckData.map((sec, i) => `Page ${i+1}: ${sec.title} - ${sec.narrative}`).join('\n');
            }
            const actionInstruction = `\n\nIf you want to trigger a UI action, output a single JSON object on its own line with the keys \"function\" and \"args\".\nExamples:\n{"function":"navigateToSection","args":{"sectionIndex":3}}\n{"function":"openLink","args":{"url":"https://example.com"}}\nOtherwise respond with a helpful, conversational message.`;
            const historyContext = messages.map(msg => ({ role: msg.role, content: msg.text }));
            const systemEntry = { role: 'system', content: chatbotContext + actionInstruction + (chartContext ? `\n\nRelevant chart/graph context:\n${chartContext}` : '') };

            let modelText: string;
            try {
                const response = await agentTeam.answer(text, systemEntry.content);
                modelText = (response && response.best && response.best.text) ? response.best.text : String(response);
            } catch (llmErr) {
                console.warn('LLM unavailable, using fallback responder:', llmErr);
                modelText = fallbackAnswer(text);
            }

            // Try to detect a leading JSON object produced by the model for UI actions
            let handledAction = false;
            const trimmed = modelText.trim();
            if (trimmed.startsWith('{')) {
                let depth = 0;
                let endIndex = -1;
                for (let i = 0; i < trimmed.length; i++) {
                    const ch = trimmed[i];
                    if (ch === '{') depth++;
                    if (ch === '}') {
                        depth--;
                        if (depth === 0) { endIndex = i; break; }
                    }
                }
                if (endIndex > 0) {
                    const jsonStr = trimmed.slice(0, endIndex + 1);
                    try {
                        const obj = JSON.parse(jsonStr);
                        if (obj && obj.function) {
                            handledAction = true;
                            if (obj.function === 'navigateToSection' && obj.args && obj.args.sectionIndex !== undefined) {
                                const newIndex = Number(obj.args.sectionIndex);
                                if (newIndex >= 0 && newIndex < pitchDeckData.length) {
                                    setCurrentSection(newIndex);
                                    setResumeIndex(newIndex);
                                    const confirmationText = `Of course. Navigating to "${pitchDeckData[newIndex].title}".`;
                                    setMessages(prev => [...prev, { role: 'model', text: confirmationText, sources: [] }]);
                                    speak(confirmationText);
                                }
                            } else if (obj.function === 'openLink' && obj.args && obj.args.url) {
                                window.open(obj.args.url, '_blank');
                                const confirmationText = `I've opened that link for you in a new tab.`;
                                setMessages(prev => [...prev, { role: 'model', text: confirmationText, sources: [] }]);
                                speak(confirmationText);
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse model JSON action:', e);
                    }
                }
            }
            if (!handledAction) {
                const botMessage: Message = { role: 'model', text: modelText, sources: [] };
                setMessages(prev => [...prev, botMessage]);
                speak(modelText);
            }
        } catch (error) {
            console.error('Error with model pipeline:', error);
            const offlineMsg = fallbackAnswer(text);
            setMessages(prev => [...prev, { role: 'model', text: offlineMsg }]);
            speak(offlineMsg);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, messages, pausePresentation, setCurrentSection, speak, stopSpeaking, setIsOpen]);

    // --- Voice Input (Speech Recognition) ---
    const handleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        
        pausePresentation();
        stopSpeaking();

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onerror = (event: any) => {
            console.warn('Speech recognition error:', event.error);
            // Don't spam the chat with permission errors - just log to console
            // User can simply type instead of using voice input
            setIsListening(false);
        };
        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            handleSendMessage(transcript);
        };

        recognitionRef.current.start();
    };
    
     useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="chatbot-container">
            {/* Always-visible Agent Lee button with glow effect */}
            <button
                onClick={() => { setIsOpen(!isOpen); if(presentationState === 'presenting') { pausePresentation(); } }}
                className="relative bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 border-4 border-blue-400 p-2 mb-4 mx-auto block group"
                aria-label="Toggle AI Assistant"
            >
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
                <img src={`${(import.meta as any).env.BASE_URL}images/agent-lee-visu-sewer.png`} alt="Agent Lee AI Assistant" className="relative h-20 w-20 rounded-full object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${(import.meta as any).env.BASE_URL}images/visu-sewer-logo.png`; }} />
            </button>

            <div className={`w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <header className="bg-blue-800 text-white p-3 rounded-t-2xl flex justify-between items-center">
                    <h3 className="font-bold text-base">Agent Lee Strategic Presenter</h3>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setShowVoiceSettings(!showVoiceSettings)} 
                            className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
                            aria-label="Voice settings"
                            title="Voice Settings"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 010-2.828l6.364-6.364a2 2 0 012.828 0l6.364 6.364a2 2 0 010 2.828l-6.364 6.364a2 2 0 01-2.828 0l-6.364-6.364z" />
                            </svg>
                        </button>
                    </div>
                </header>
                
                {/* TTS Failure Warning */}
                {ttsFailureCount >= 3 && presentationState === 'presenting' && (
                    <div className="bg-amber-100 border-l-4 border-amber-500 p-3 mx-3 mt-3 rounded-md">
                        <div className="flex items-start">
                            <svg className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                {/* ...svg path or content here... */}
                            </svg>
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                {/* Removed stray/invalid code line */}
                                speakRef.current = speak;
                            <div>
                                <p className="text-sm font-semibold text-amber-800">Voice Narration Unavailable</p>
                                <p className="text-xs text-amber-700 mt-1">Auto-advance disabled. Use navigation controls below.</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Manual Navigation Controls for Presentation Mode */}
                {presentationState === 'presenting' && (
                    <div className="bg-blue-50 border-b border-blue-200 p-2 flex justify-between items-center gap-2">
                        <button
                            onClick={() => {
                                if (currentSection > 0) {
                                    setCurrentSection(currentSection - 1);
                                }
                            }}
                            disabled={currentSection === 0}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous slide"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>
                        
                        <div className="text-xs text-gray-600 font-medium">
                            Page {currentSection + 1} of {pitchDeckData.length}
                        </div>
                        
                        <button
                            onClick={() => {
                                if (currentSection < pitchDeckData.length - 1) {
                                    setCurrentSection(currentSection + 1);
                                }
                            }}
                            disabled={currentSection === pitchDeckData.length - 1}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next slide"
                        >
                            Next
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
                
                {showVoiceSettings && voicesLoaded && (
                    <div className="bg-blue-50 border-b border-blue-200 p-2">
                        <label htmlFor="voice-selector" className="block text-xs font-semibold text-gray-700 mb-1">
                            🎙️ Select Voice
                        </label>
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
                                <option key={index} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                                                <div className="mt-2">
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
                                const testText = "Hello, this is Agent Lee. Audio is working correctly.";
                                console.log('🔊 Testing audio from button click...');
                                speak(testText);
                            }}
                            className="mt-1.5 w-full text-xs bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition-colors"
                            disabled={isLoading}
                        >
                            🔊 Test Audio
                        </button>
                        {(voiceLock || engineLock) && (
                          <div className="mt-2 text-[10px] text-gray-600 italic">
                            {voiceLock && <div>Voice locked to environment default.</div>}
                            {engineLock && <div>Engine locked; fallback disabled.</div>}
                          </div>
                        )}
                    </div>
                )}
                
                <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                    {messages.length === 0 && (
                        <div className="text-center text-xs text-gray-500 p-3">
                            Ask for analysis, e.g., "Go to the human capital metrics" or "What are the current market trends?"
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex my-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg max-w-[90%] break-word shadow-sm text-xs ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                                    {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-gray-300">
                                        <h4 className="text-xs font-bold text-gray-600 mb-1">Sources:</h4>
                                        <ul className="space-y-1">
                                            {msg.sources.map((source, i) => (
                                                <li key={i} className="flex items-start">
                                                    <LinkIcon className="h-3 w-3 text-gray-500 mr-1 mt-0.5 shrink-0" />
                                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline break-all">
                                                        {source.web.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && ( <div className="flex justify-start my-2"><div className="p-2 rounded-lg bg-gray-200 text-gray-800"><ArrowPathIcon className="h-4 w-4 animate-spin" /></div></div> )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="p-3 border-t bg-white rounded-b-2xl sticky bottom-0 z-10">
                    <div className="flex items-center gap-1">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            placeholder="Type or use mic..."
                            className="flex-1 p-1.5 text-xs border rounded-l-lg focus:outline-none"
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(inputValue); } }}
                        />
                        {/* Resume/interrupt controls */}
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200"
                            disabled={resumeIndex === null}
                            onClick={() => {
                                if (resumeIndex !== null) {
                                    setCurrentSection(resumeIndex);
                                    setMessages(prev => [...prev, { role: 'model', text: `Resuming presentation at section ${resumeIndex + 1}: ${pitchDeckData[resumeIndex].title}.`, sources: [] }]);
                                }
                            }}
                        >Resume Presentation</button>
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200"
                            disabled={!lastUserMessage}
                            onClick={() => {
                                if (lastUserMessage) handleSendMessage(lastUserMessage);
                            }}
                        >Repeat Last Question</button>
                        <button type="button" onClick={handleVoiceInput} className={`p-1.5 border-t border-b ${isListening ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'} transition-colors`} aria-label="Use microphone">
                            <MicrophoneIcon />
                        </button>
                        <button type="submit" className="p-1.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:bg-blue-300" disabled={!inputValue.trim() || isLoading} aria-label="Send message">
                            <PaperAirplaneIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};