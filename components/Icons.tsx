/* LEEWAY HEADER
TAG: UI.COMPONENT.ICONS
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: smile
ICON_SIG: CD534113
5WH: WHAT=SVG icon components (LightBulb, Shield, Rocket, etc.);
WHY=Provide consistent iconography across service stack;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\Icons.tsx;
WHEN=2025-11-08;
HOW=React functional components with SVG paths
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`h-6 w-6 ${className || ''}`}>{children}</div>
);

export const ChatBubbleLeftRightIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.14c-1.13.042-2.093-.84-2.193-1.98v-1.146a2.121 2.121 0 00-2.121-2.121H6.75a2.121 2.121 0 00-2.121 2.121v1.146c-.101 1.14.863 2.022 1.993 1.98l3.72-.14a2.097 2.097 0 002.193-1.98V15.25a2.121 2.121 0 00-2.121-2.121H6.75a2.121 2.121 0 00-2.121 2.121v4.286c0 .97.616 1.813 1.5 2.097m0 0A48.205 48.205 0 0112 22.5c-2.78 0-5.462-.312-8.13-1.041m0 0A48.253 48.253 0 013 12c0-1.34.156-2.653.44-3.919m16.82 1.041A48.381 48.381 0 0121 12c0 2.78-.312 5.462-1.041 8.13m0 0A48.381 48.381 0 0112 22.5c2.78 0 5.462.312 8.13 1.041M3.37 9.461A48.253 48.253 0 0112 4.5c1.34 0 2.653.156 3.919.44M3.37 9.461L2.097 12m18.806-2.539l1.273 2.539" /></svg></IconWrapper>
);

export const XMarkIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></IconWrapper>
);

export const PaperAirplaneIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg></IconWrapper>
);

export const SpeakerWaveIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg></IconWrapper>
);

export const ArrowPathIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-3.181-4.991v4.99" /></svg></IconWrapper>
);

export const ChartBarIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
    </IconWrapper>
);

export const LightBulbIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.25 6.01 6.01 0 00-3 0 6.01 6.01 0 001.5 11.25zM9 15.75a3 3 0 116 0 3 3 0 01-6 0z" />
        </svg>
    </IconWrapper>
);

export const MegaphoneIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg></IconWrapper>
);

{/* FIX: Added missing MicrophoneIcon component */}
export const MicrophoneIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg></IconWrapper>
);

export const ExclamationTriangleIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
        </svg>
    </IconWrapper>
);

export const ClipboardDocumentListIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    </IconWrapper>
);

export const RocketLaunchIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.18a14.98 14.98 0 00-2.18 12.12c0 3.94 1.59 7.5 4.18 10.12a14.98 14.98 0 005.84-2.58zM12 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </IconWrapper>
);

export const CurrencyDollarIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></IconWrapper>
);

export const LinkIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg></IconWrapper>
);

export const ChevronLeftIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></IconWrapper>
);

export const ChevronRightIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></IconWrapper>
);

export const ShieldCheckIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.016h-.008v-.016z" /></svg></IconWrapper>
);

export const TrophyIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.316-5.033 9.75 9.75 0 011.316-5.033h6.736c.492 0 .978.044 1.452.131a9.75 9.75 0 011.316 5.033 9.75 9.75 0 01-1.316 5.033A11.25 11.25 0 0116.5 18.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v5.25m0 0a3.75 3.75 0 00-3.75 3.75h7.5A3.75 3.75 0 0012 6.75z" /></svg></IconWrapper>
);

export const UsersIcon = ({className}: {className?: string}) => (
    <IconWrapper className={className}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0112 12.75a3 3 0 01-1.059 2.261m-6.33 2.185A3 3 0 013 15.75a3 3 0 012.26-1.059m6.33-2.185a3.003 3.003 0 00-3.33-2.185 3 3 0 00-2.26 1.059 3 3 0 00-1.06 2.26 3 3 0 002.185 3.33m6.33-2.185a3 3 0 003.33-2.185 3 3 0 00-1.059-2.26 3 3 0 00-2.261-1.059 3.003 3.003 0 00-2.185 3.33" /></svg></IconWrapper>
);