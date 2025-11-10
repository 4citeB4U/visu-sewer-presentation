/* LEEWAY HEADER
TAG: UI.VISUAL.PROJECTS
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: briefcase
ICON_SIG: CD534113
5WH: WHAT=Case study visualization of flagship wastewater projects;
WHY=Demonstrate execution excellence with Gantt charts, revenue trends, infiltration data;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Projects.tsx;
WHEN=2025-11-08;
HOW=React + Recharts + LEEWAY compliant CSS animations (no inline styles)
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection, FlagshipProject, ProjectChartData } from '../../types';

const GanttChart: React.FC<{ data: { task: string, start: number, end: number }[], explanation?: string }> = ({ data, explanation }) => {
    // Transform data for horizontal bar chart (start-to-end duration visualization)
    const chartData = data.map(item => ({
        task: item.task.replace('Phase ', 'P').replace(':', ''),
        duration: item.end - item.start,
        start: item.start
    }));

    const totalDuration = Math.max(...data.map(d => d.end));
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={chartData} 
                layout="vertical"
                margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis 
                    type="number" 
                    domain={[0, totalDuration]}
                    tick={{ fontSize: 11, fill: '#4b5563' }}
                    label={{ value: 'Months', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#6b7280' }}
                />
                <YAxis 
                    type="category" 
                    dataKey="task" 
                    tick={{ fontSize: 10, fill: '#4b5563' }}
                    width={80}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    formatter={(value: number, name: string) => {
                        if (name === 'duration') return [`${value} months`, 'Duration'];
                        return [value, name];
                    }}
                />
                <Bar 
                    dataKey="duration" 
                    fill="#3b82f6" 
                    radius={[0, 8, 8, 0]}
                    animationDuration={1500}
                    animationBegin={0}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

const RevenueTrendChart: React.FC<{ data: { year: string, revenue: number, footage: number }[] }> = ({ data }) => {
    const chartData = data.map(d => ({
        year: d.year,
        'Revenue ($M)': d.revenue,
        'Footage (k)': d.footage / 1000
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#4b5563' }} />
                <YAxis tick={{ fontSize: 11, fill: '#4b5563' }} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Revenue ($M)" fill="#10b981" radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={0} />
                <Bar dataKey="Footage (k)" fill="#3b82f6" radius={[8, 8, 0, 0]} animationDuration={1500} animationBegin={200} />
            </BarChart>
        </ResponsiveContainer>
    );
}

const InfiltrationLineChart: React.FC<{ data: { year: string, mgd: number }[] }> = ({ data }) => {
    const chartData = data.map(d => ({
        year: d.year,
        'Infiltration (MGD)': d.mgd
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorInfiltration" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#4b5563' }} />
                <YAxis tick={{ fontSize: 11, fill: '#4b5563' }} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="Infiltration (MGD)" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorInfiltration)"
                    animationDuration={2000}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}


const ChartRenderer: React.FC<{ chart: ProjectChartData, explanation?: string }> = ({ chart, explanation }) => {
    switch (chart.type) {
        case 'gantt':
            return <GanttChart data={chart.data} explanation={explanation} />;
        case 'stacked-bar':
            return (
                <div className="h-full flex flex-col">
                    <div className="grow">
                        <RevenueTrendChart data={chart.data} />
                    </div>
                    {explanation && (
                        <p className="text-[9px] text-gray-700 mt-1 px-1">
                            <strong>Growth Impact:</strong> {explanation}
                        </p>
                    )}
                </div>
            );
        case 'line':
            return (
                <div className="h-full flex flex-col">
                    <div className="grow">
                        <InfiltrationLineChart data={chart.data} />
                    </div>
                    {explanation && (
                        <p className="text-[9px] text-gray-700 mt-1 px-1">
                            <strong>Engineering Outcome:</strong> {explanation}
                        </p>
                    )}
                </div>
            );
        default:
            return null;
    }
};

const ProjectCard: React.FC<{ project: FlagshipProject, index: number }> = ({ project, index }) => {
    // Generate explanation based on project title
    const getExplanation = () => {
        if (project.title.includes('Heart of Valley')) {
            return 'Monthly phases show sequential project execution from mobilization through closeout, demonstrating timeline management expertise and predictable milestone delivery.';
        } else if (project.title.includes('Fox Point')) {
            return '3-year program delivered consistent annual revenue ($1.2M → $1.5M → $1.3M) while rehabilitating 15,000 linear feet, showcasing multi-year partnership reliability.';
        } else if (project.title.includes('Wauwatosa')) {
            return '72% infiltration reduction (3.1 → 0.85 MGD) over 4 years through systematic lateral sealing, demonstrating measurable environmental and financial impact for client.';
        }
        return undefined;
    };

    return (
        <div 
            className={`bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden flex flex-col animate-fade-in-up opacity-0 project-card-${index % 3} h-full`}
        >
            <div className="p-2">
                <h4 className="text-sm font-bold text-blue-800 mb-1">{project.title}</h4>
                <ul className="space-y-0.5">
                    {project.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-[10px] text-gray-700">
                            <svg className="h-3 w-3 text-blue-500 mr-1 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {detail}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grow bg-gray-50 p-2 border-t min-h-0">
                <ChartRenderer chart={project.chart} explanation={getExplanation()} />
            </div>
        </div>
    );
};

export const Projects: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'projects') return null;
    const { projects } = section.content;

    return (
    <div className="p-4 h-full flex flex-col bg-linear-to-br from-gray-50 to-white">
            <div className="text-center mb-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
                <p className="text-sm text-gray-600 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: section.narrative }}></p>
            </div>
            <div className="grid grid-cols-3 gap-4 grow overflow-hidden">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </div>
    );
};