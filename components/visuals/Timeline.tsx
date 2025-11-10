/* LEEWAY HEADER
TAG: UI.VISUAL.TIMELINE
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: clock
ICON_SIG: CD534113
5WH: WHAT=Timeline visualization of company evolution and milestones;
WHY=Show growth trajectory with tech, geographic, and M&A events;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Timeline.tsx;
WHEN=2025-11-08;
HOW=React with sequential milestone cards and LEEWAY compliant animations
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, { useEffect, useRef } from 'react';
import { DeckSection, TimelineMilestone } from '../../types';

interface TimelineProps {
    section: DeckSection;
}

const getCategoryColor = (category: TimelineMilestone['category']) => {
    switch (category) {
        case 'tech': return 'bg-blue-500';
        case 'geo': return 'bg-green-500';
        case 'm&a': return 'bg-orange-500';
        default: return 'bg-gray-500';
    }
};

export const Timeline: React.FC<TimelineProps> = ({ section }) => {
    if (section.content.type !== 'timeline') return null;
    const { milestones } = section.content;

    // Parallax state driven by the vertical timeline scroll on md+ screens
    const vScrollRef = useRef<HTMLDivElement | null>(null);
    const imgWrapRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    // Parallax removed for viewport-fit mode
    useEffect(() => {}, []);

    return (
        <div className="p-6 md:p-8 h-full flex flex-col overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">{section.title}</h2>
            <p className="text-base text-gray-600 mb-6 max-w-4xl mx-auto text-center" dangerouslySetInnerHTML={{ __html: section.narrative }}></p>

            {/* Responsive layout: image + timeline side-by-side on md+, stacked on mobile */}
            <div className="grow grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Prominent image column */}
                <div className="relative rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
                    <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
                        <img
                            src={section.content.image || '/images/geographic-footprint.png'}
                            alt="Geographic footprint"
                            className="w-full h-full object-cover saturate-125 contrast-110 brightness-105"
                        />
                        <div className="absolute inset-0 ring-1 ring-gray-300/50 pointer-events-none" />
                    </div>
                    <div className="relative z-10 p-3 text-center bg-linear-to-t from-white/60 via-white/20 to-transparent">
                        <span className="text-xs font-medium text-gray-700">Geographic Footprint</span>
                    </div>
                </div>

                {/* Timeline column: vertical on md+, horizontal on mobile */}
                <div className="relative">
                    {/* Vertical variant (md and up) */}
                    <div ref={vScrollRef} className="hidden md:flex flex-col h-full pr-2">
                        <div className="relative h-full">
                            {/* Vertical rail */}
                            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
                            <div className="relative pl-12 h-full flex flex-col justify-between">
                                {milestones.map((milestone, index) => {
                                    const depth = 0; // no parallax when fitting to viewport
                                    return (
                                    <div key={index} className="relative group opacity-100 will-change-transform" data-depth={depth}>
                                        {/* Dot */}
                                        <div className={`absolute -left-8 top-2 w-3.5 h-3.5 ${getCategoryColor(milestone.category)} rounded-full border-4 border-white shadow`} />
                                        {/* Year */}
                                        <div className="absolute -left-16 pr-3 top-1 text-[11px] font-bold text-gray-700 whitespace-nowrap">
                                            {milestone.year}
                                        </div>
                                        {/* Card */}
                                        <div className="bg-white/95 border border-gray-200 rounded-lg shadow p-3">
                                            <p className="font-bold text-gray-800 text-[13px] leading-snug">{milestone.milestone}</p>
                                            <p className="text-[11px] text-gray-600 mt-1 leading-tight">{milestone.impact}</p>
                                        </div>
                                    </div>
                                );})}
                            </div>
                        </div>
                    </div>

                    {/* Horizontal variant (mobile) */}
                    <div className="md:hidden flex items-center px-4 py-6">
                        <div className="relative w-full">
                            {/* The timeline bar */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>

                            {/* Milestone points */}
                            <div className="relative flex justify-between w-full">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className={`relative flex flex-col items-center group z-10 animate-fade-in-up opacity-0 timeline-event-${index % 5}`}>
                                        <div className={`absolute ${index % 2 === 0 ? 'bottom-8' : 'top-8'} w-36 p-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl text-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                                            <p className="font-bold text-gray-800 text-xs">{milestone.milestone}</p>
                                            <p className="text-xs text-gray-600 mt-1 leading-tight">{milestone.impact}</p>
                                            <div className={`absolute ${index % 2 === 0 ? 'top-full' : 'bottom-full'} left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent ${index % 2 === 0 ? 'border-t-8 border-t-gray-300' : 'border-b-8 border-b-gray-300'}`}></div>
                                        </div>
                                        <div className={`w-4 h-4 ${getCategoryColor(milestone.category)} rounded-full z-10 border-4 border-white shadow-md`}></div>
                                        <p className="absolute top-1/2 mt-5 font-bold text-gray-700 text-xs">{milestone.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-600">
                <div className="flex items-center"><span className="h-3 w-3 rounded-sm bg-blue-500 mr-2"></span>Technical Evolution</div>
                <div className="flex items-center"><span className="h-3 w-3 rounded-sm bg-green-500 mr-2"></span>Geographic Growth</div>
                <div className="flex items-center"><span className="h-3 w-3 rounded-sm bg-orange-500 mr-2"></span>M&A</div>
            </div>
        </div>
    );
};