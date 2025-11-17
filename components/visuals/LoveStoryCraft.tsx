/* LEEWAY HEADER
TAG: UI.VISUAL.LOVE_STORY_CRAFT
DESC: Page 4 "Love Story #1: Falling in Love with the Craft" with large top hero image and stacked content
*/
import React from 'react';
import { DeckSection } from '../../types';

export const LoveStoryCraft: React.FC<{ section: DeckSection }> = ({ section }) => {
  if (section.content.type !== 'summary') return null;

  return (
    <div className="h-full flex flex-col">
      {/* Content with right-side image (no top hero, fits viewport) */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start h-full">
          {/* Left content (spans 3 columns on desktop) */}
          <div className="md:col-span-3 h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 text-center md:text-left">{section.title}</h2>
            <p
              className="text-base md:text-lg text-gray-700 mb-4 md:mb-5"
              dangerouslySetInnerHTML={{ __html: section.narrative }}
            />

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 md:p-5 rounded-r-lg shadow-md">
              <p className="text-lg md:text-xl font-bold text-amber-800 italic">"{section.content.message}"</p>
            </div>

            <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {section.content.points.map((point: string, i: number) => (
                <div key={i} className="flex items-start bg-white rounded-lg p-3 md:p-4 shadow border border-gray-200">
                  <svg className="h-6 w-6 text-amber-600 mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-800 leading-snug text-sm md:text-base">{point}</p>
                </div>
              ))}
            </div>
            {/* Spacer to push content but keep within height */}
            <div className="mt-auto" />
          </div>

          {/* Right-hand image to fill open space */}
          <div className="md:col-span-1 h-full flex flex-col items-center">
            <div className="w-full h-full rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
              <img
                src={(section.content as any).image?.startsWith('/') ? `${(import.meta as any).env?.BASE_URL || '/'}${(section.content as any).image.replace(/^\//,'')}` : (section.content as any).image || `${(import.meta as any).env?.BASE_URL || '/'}images/feild-technician-top-man.png`}
                alt="Field Technician – top man"
                className="w-full h-full object-cover saturate-125 contrast-110 brightness-105"
              />
            </div>
            <span className="mt-2 text-xs text-gray-600">Field Technician</span>
          </div>
        </div>
      </div>
    </div>
  );
};
