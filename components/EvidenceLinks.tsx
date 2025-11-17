
import React from 'react';
import type { WebSource } from '../types';

type EvidenceLinksProps = {
  webSources?: WebSource[];
};

export const EvidenceLinks: React.FC<EvidenceLinksProps> = ({ webSources }) => {
  if (!webSources || webSources.length === 0) return null;

  return (
    <div className="mt-2 rounded bg-slate-50 border border-slate-200 p-2">
      <p className="text-[10px] font-semibold text-slate-700 mb-1">Evidence &amp; References:</p>
      <ul className="flex flex-wrap gap-2">
        {webSources.map((src) => (
          <li key={src.id}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-700 underline decoration-dotted hover:text-blue-900"
            >
              {src.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvidenceLinks;
