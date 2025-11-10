/* LEEWAY HEADER
TAG: UI.VISUAL.INDEX
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: list
ICON_SIG: CD534113
5WH: WHAT=Presentation index page listing all sections;
WHY=Provide roadmap of presentation structure for viewers;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Index.tsx;
WHEN=2025-11-08;
HOW=React component with section cards grid layout
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { DeckSection } from '../../types';

export const Index: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'index') return null;
    const { sections } = section.content;

    return (
        <div className="p-6 md:p-8 h-full flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                    Presentation Roadmap
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    {section.narrative}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto overflow-y-auto max-h-[calc(100vh-250px)]">
                {sections.map((sec) => (
                    <div 
                        key={sec.id} 
                        className="index-card bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 opacity-0"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {sec.id}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-base mb-2">
                                    {sec.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-snug">
                                    {sec.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                Use navigation arrows to explore each section in detail
            </div>
        </div>
    );
};
