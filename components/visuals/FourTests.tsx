/* LEEWAY HEADER
TAG: UI.VISUAL.FOUR_TESTS
DESC: Page 17 "The Four Tests of Transformation" with full-bleed background image
*/
import React from 'react';
import { DeckSection } from '../../types';

export const FourTests: React.FC<{ section: DeckSection }> = ({ section }) => {
  if (section.content.type !== 'summary') return null;

  return (
    <div className="h-full relative overflow-hidden">
      {/* Full background image without inline styles to satisfy lint rules */}
      <img
        src={`${(import.meta as any).env?.BASE_URL || '/'}images/feild-project-work.png`}
        onError={(e: any) => { e.currentTarget.src = `${(import.meta as any).env?.BASE_URL || '/'}images/visu-sewer-truck.png`; }}
        alt="Background - Field project work"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover saturate-125 contrast-110 brightness-105"
      />
      {/* Readability overlay */}
  <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/55 to-white/40" aria-hidden />

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
        <header className="mb-4">
          <h2 className="text-3xl font-bold text-amber-900 drop-shadow-sm text-center md:text-left">{section.title}</h2>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative max-w-4xl w-full mb-6">
            <div className="absolute inset-0 rounded-lg bg-white/85 backdrop-blur-sm shadow-md" aria-hidden />
            <p
              className="relative text-lg leading-relaxed text-gray-900 font-medium px-6 py-5 drop-shadow-sm"
              dangerouslySetInnerHTML={{ __html: section.narrative }}
            />
          </div>

          <div className="bg-blue-50/95 border-l-4 border-blue-600 p-5 rounded-r-lg shadow-lg max-w-3xl w-full backdrop-blur-sm">
            <p className="text-lg font-bold text-blue-900 italic">"{section.content.message}"</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
            {section.content.points.map((point: string, i: number) => (
              <div key={i} className="flex items-start bg-white/90 rounded-md p-4 shadow backdrop-blur-sm">
                <svg className="h-5 w-5 text-amber-600 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-900 leading-relaxed text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
