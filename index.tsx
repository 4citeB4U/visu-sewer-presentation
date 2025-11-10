/* LEEWAY HEADER
TAG: UI.APP.ENTRY
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: zap
ICON_SIG: CD534113
5WH: WHAT=React application entry point with CSS imports;
WHY=Bootstrap React 19 + animations.css + ConsentScreen;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\index.tsx;
WHEN=2025-11-08;
HOW=ReactDOM createRoot + StrictMode
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './animations.css';
import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
