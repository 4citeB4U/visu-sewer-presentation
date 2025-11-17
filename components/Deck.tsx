/* LEEWAY HEADER
TAG: UI.COMPONENT.DECK
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: layers
ICON_SIG: CD534113
5WH: WHAT=Slide deck renderer with section routing;
WHY=Display 16 presentation slides with transitions;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\Deck.tsx;
WHEN=2025-11-08;
HOW=React + TypeScript + content type switching
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import React from 'react';
import { DeckSection } from '../types';
import { Closing } from './visuals/Closing';
import { FourPillars } from './visuals/FourPillars';
import { FourTests } from './visuals/FourTests';
import { Index } from './visuals/Index';
import { LoveStoryCraft } from './visuals/LoveStoryCraft';
import { LoveStoryFuture } from './visuals/LoveStoryFuture';
import { LoveStoryLegacy } from './visuals/LoveStoryLegacy';
import { LoveStoryOps } from './visuals/LoveStoryOps';
import { Metrics } from './visuals/Metrics';
import { OrgChart } from './visuals/OrgChart';
import { Projects } from './visuals/Projects';
import { References } from './visuals/References';
import { ResilienceFramework } from './visuals/ResilienceFramework';
import { Roadmap } from './visuals/Roadmap';
import { ServiceStack } from './visuals/ServiceStack';
import { TechTransformation } from './visuals/TechTransformation';
import { Timeline } from './visuals/Timeline';
import { TowardHorizon } from './visuals/TowardHorizon';

interface DeckProps {
    section: DeckSection;
}

const visuSewerLogo = `${(import.meta as any).env?.BASE_URL || '/'}images/visu-sewer-logo.png`;

const renderContent = (section: DeckSection) => {
    const hasBg = Boolean(((section.content as any)?.image) || ((section.content as any)?.backgroundImage));
    switch (section.content.type) {
        case 'cover':
            return (
                 <div 
                    className="h-full flex flex-col justify-center items-center text-center p-8 animate-fade-in relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <img src={visuSewerLogo} alt="Visu-Sewer Logo" className="max-w-md md:max-w-lg mb-8 drop-shadow-2xl" />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-4">{section.content.title}</h1>
                        <p className="text-lg md:text-xl text-gray-100 font-medium drop-shadow-md">{section.content.subtitle}</p>
                    </div>
                </div>
            );
        case 'summary':
            // Use custom chart components for specific sections
            if (section.title === "The Four Pillars: Values as Competitive Advantage") {
                return <FourPillars section={section} />;
            }
            if (section.title === "Love Story #1: Falling in Love with the Craft") {
                return <LoveStoryCraft section={section} />;
            }
            if (section.title === "Love Story #3: Falling in Love with the Future") {
                return <LoveStoryFuture section={section} />;
            }
            if (section.title === "The Technology Transformation: Three-Phase Modernization") {
                return <TechTransformation section={section} />;
            }
            if (section.title === "The Resilience Framework: Shielding the Bottom Line") {
                return <ResilienceFramework section={section} />;
            }
            if (section.title === "Love Story #4: Falling in Love with Legacy") {
                return <LoveStoryLegacy section={section} />;
            }
            if (section.title === "Love Story #2: Falling in Love with Operational Excellence") {
                return <LoveStoryOps section={section} />;
            }
            if (section.title === "Toward the Horizon: 50 Years Underground, Infinite Years Ahead") {
                return <TowardHorizon section={section} />;
            }
            if (section.title === "The Four Tests of Transformation") {
                return <FourTests section={section} />;
            }
            // Default summary rendering for other sections (with special image for Executive Summary)
            if (section.title === "Executive Summary") {
                return (
                    <div className="p-6 md:p-8 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Left: content */}
                            <div className="order-2 md:order-1">
                                <h2 className={`text-3xl font-bold ${hasBg ? 'text-white' : 'text-gray-800'} mb-4`}>{section.title}</h2>
                                <p className={`${hasBg ? 'text-gray-100' : 'text-lg text-gray-700'} mb-6`} dangerouslySetInnerHTML={{ __html: section.narrative }}></p>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-md">
                                    <p className="text-xl font-bold text-blue-800 italic">"{section.content.message}"</p>
                                </div>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {section.content.points.map((point, i) => (
                                        <div key={i} className="flex items-start">
                                            <svg className="h-6 w-6 text-blue-500 mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="text-gray-800">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right: image ~1/2 page width */}
                            <div className="order-1 md:order-2 flex flex-col items-center">
                                <div className="w-full h-[50vh] md:h-[60vh] lg:h-[65vh] rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
                                    <img src={`${(import.meta as any).env?.BASE_URL || '/'}images/feild-technician.png`} alt="Field Technician" className="w-full h-full object-cover" />
                                </div>
                                <span className="mt-2 text-xs text-gray-600">Field Technician</span>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="p-6 md:p-8 h-full flex flex-col justify-center">
                    <h2 className={`text-3xl font-bold ${hasBg ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>{section.title}</h2>
                    <p className={`${hasBg ? 'text-gray-100' : 'text-lg text-gray-700'} mb-6 max-w-4xl mx-auto text-center`} dangerouslySetInnerHTML={{ __html: section.narrative }}></p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-md max-w-3xl mx-auto">
                        <p className="text-xl font-bold text-blue-800 italic">"{section.content.message}"</p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {section.content.points.map((point, i) => (
                            <div key={i} className="flex items-start">
                                <svg className="h-6 w-6 text-blue-500 mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-gray-800">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'index':
            return <Index section={section} />;
        case 'timeline':
            return <Timeline section={section} />;
        case 'org_chart':
            return <OrgChart section={section} />;
        case 'service_stack':
            return <ServiceStack section={section} />;
        case 'projects':
            return <Projects section={section} />;
        case 'people_metrics':
            return <Metrics section={section} />;
        case 'roadmap':
            return <Roadmap section={section} />;
        case 'references':
            return <References section={section} />;
        case 'closing':
            return <Closing section={section} />;
        default:
            return <div className="p-8">Content type not recognized.</div>;
    }
}


export const Deck: React.FC<DeckProps> = ({ section }) => {
    const base = (import.meta as any).env?.BASE_URL || '/';
    const bgImage = (section?.content as any)?.image || (section?.content as any)?.backgroundImage;
    const bgSrc = bgImage ? (bgImage.startsWith('/') ? `${base}${bgImage.replace(/^\//,'')}` : bgImage) : null;

    return (
        <div className="h-full animate-fade-in relative overflow-hidden">
            {bgSrc && (
                <>
                    <img src={bgSrc} alt="Slide background" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/45" aria-hidden />
                </>
            )}
            <div className="relative z-10 h-full">
                {renderContent(section)}
            </div>
        </div>
    );
};