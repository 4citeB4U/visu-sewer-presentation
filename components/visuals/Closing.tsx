/* LEEWAY HEADER
TAG: UI.VISUAL.CLOSING
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: flag
ICON_SIG: CD534113
5WH: WHAT=Presentation closing page with Agent Lee farewell;
WHY=Provide proper conclusion and call-to-action for presentation;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Closing.tsx;
WHEN=2025-11-08;
HOW=React component with centered message and CTA
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { DeckSection } from '../../types';

export const Closing: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'closing') return null;
    const { message, callToAction } = section.content;

    return (
            <div className="p-4 md:p-6 h-full flex items-center justify-center bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-6 items-center">
                {/* Left side - Flag image */}
                <div className="closing-message opacity-0 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <img 
                            src={`${(import.meta as any).env.BASE_URL}images/america-visu-sewer.png`} 
                            alt="VisuSewer America" 
                            className="w-full h-auto object-contain drop-shadow-2xl" 
                        />
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="closing-message opacity-0 space-y-4">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3">
                            Thank You
                        </h2>
                        <p className="text-lg md:text-xl text-blue-200 mb-4">
                            From Roots to Resilience: The Journey Continues
                        </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <p className="text-sm md:text-base leading-relaxed text-blue-50">
                            {message}
                        </p>
                    </div>

                    <div className="closing-cta opacity-0">
                        <div className="bg-blue-500 hover:bg-blue-600 rounded-xl p-4 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            <p className="text-xl font-bold mb-1">
                                {callToAction}
                            </p>
                            <p className="text-sm text-blue-100">
                                Contact us to explore how VisuSewer can serve your infrastructure needs
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/20 text-center">
                        <p className="text-xs text-blue-300">
                            VisuSewer • 50 Years of Excellence • 1975-2025
                        </p>
                        <p className="text-xs text-blue-400 mt-1">
                            Powered by Agent Lee Strategic Analysis AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
