/* LEEWAY HEADER
TAG: UI.VISUAL.LOVE_STORY_OPS
DESC: Page 10 "Love Story #2: Falling in Love with Operational Excellence" with full-bleed background image
*/
import React from 'react';
import { DeckSection } from '../../types';

export const LoveStoryOps: React.FC<{ section: DeckSection }> = ({ section }) => {
  if (section.content.type !== 'summary') return null;

  return (
    <div className="h-full relative overflow-hidden">
      {/* Background image (absolute) */}
    <img
  src={`${(import.meta as any).env?.BASE_URL || '/'}images/finished-tunnel.png`}
        alt="Finished tunnel infrastructure"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover saturate-125 contrast-110 brightness-105"
      />
      {/* Subtle overlay for readability */}
  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/30" aria-hidden />

      {/* Foreground content panel */}
      <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/60 px-5 py-6 md:px-8 md:py-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 md:mb-4 text-center md:text-left">
            {section.title}
          </h2>
          <p
            className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 md:mb-5"
            dangerouslySetInnerHTML={{ __html: section.narrative }}
          />

          {/* Pull-quote simplified for story flow */}
          <blockquote className="text-gray-900 italic font-semibold mb-5 md:mb-6">
            “{section.content.message}”
          </blockquote>

          {/* Story-driven points, minimal chrome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {section.content.points.map((point: string, i: number) => (
              <div key={i} className="flex items-start">
                <svg className="h-5 w-5 text-gray-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-800 leading-snug text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
