/* LEEWAY HEADER
TAG: DATA.TYPES
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: code
ICON_SIG: CD534113
5WH: WHAT=TypeScript type definitions for all deck entities;
WHY=Ensure type safety across pitch presentation components;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\types.ts;
WHEN=2025-11-08;
HOW=TS interfaces for DeckSection, FlagshipProject, OrgChart, etc.
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

export interface TimelineMilestone {
    year: string;
    milestone: string;
    impact: string;
    category: 'tech' | 'geo' | 'm&a';
}

export interface OrgChartMember {
    name: string;
    title: string;
    tagline: string;
    photoUrl: string;
    children?: OrgChartMember[];
}

export interface ServiceStackItem {
    stage: 'Inspect' | 'Maintain' | 'Rehabilitate';
    activities: string;
    deliverable: string;
}

export interface ProjectChartData {
    type: 'gantt' | 'stacked-bar' | 'line';
    data: any[];
    units?: {
        y?: string;
        x?: string;
    }
}

export interface FlagshipProject {
    title: string;
    details: string[];
    chart: ProjectChartData;
}

export interface PeopleMetric {
    metric: string;
    current: string;
    target: string;
    why: string;
}

export interface RoadmapData {
    mapUrl: string;
    funnelUrl: string;
    projection: { label: string; value: number }[];
}

export interface IndexSection {
    id: number;
    title: string;
    description: string;
}

export interface ReferenceClaim {
    claim: string;
    sources: string[];
    filePaths?: string[];
    visibility?: 'Public' | 'AO-Request' | 'Confidential';
}

export interface PageReference {
    pageNumber: number;
    pageTitle: string;
    claims: ReferenceClaim[];
}

export interface GeneralSource {
    category: string;
    sources: string[];
}

export type SectionContentData = 
    | { type: 'cover'; title: string; subtitle: string; backgroundImage?: string; methodology?: string; advisory?: string; }
    | { type: 'index'; sections: IndexSection[]; }
    | { type: 'summary'; message: string; points: string[]; image?: string; }
    | { type: 'timeline'; milestones: TimelineMilestone[]; image?: string; }
    | { type: 'org_chart'; leadership: OrgChartMember; image?: string; }
    | { type: 'service_stack'; stack: ServiceStackItem[]; image?: string; }
    | { type: 'projects'; projects: FlagshipProject[]; image?: string; }
    | { type: 'people_metrics'; metrics: PeopleMetric[]; image?: string; }
    | { type: 'roadmap'; data: RoadmapData }
    | { type: 'references'; pageReferences: PageReference[]; generalSources: GeneralSource[]; methodology: string; }
    | { type: 'closing'; message: string; callToAction: string; };


export interface DeckSection {
    title: string;
    narrative: string;
    content: SectionContentData;
}