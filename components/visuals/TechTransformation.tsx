/* LEEWAY HEADER
TAG: UI.VISUAL.TECH_TRANSFORMATION
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: cpu
ICON_SIG: CD534113
5WH: WHAT=Technology transformation visualization with investment ROI charts;
WHY=Show three-phase modernization with visual metrics and financial returns;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\TechTransformation.tsx;
WHEN=2025-11-08;
HOW=React + Recharts with phase-based charts showing ROI and impact
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const TechTransformation: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    // Phase 1: AI Inspection - Time savings
    const phase1Data = [
        { metric: 'Before AI', hours: 10, color: '#ef4444' },
        { metric: 'With AI', hours: 0.75, color: '#10b981' }
    ];

    // Phase 2: FSM - Efficiency gains
    const phase2Data = [
        { metric: 'Utilization', before: 72, after: 85 },
        { metric: 'Admin Time', before: 100, after: 60 }
    ];

    // Phase 3: Revenue impact
    const phase3Data = [
        { year: 'Year 1', revenue: 0.5 },
        { year: 'Year 2', revenue: 1.2 },
        { year: 'Year 3', revenue: 2.0 }
    ];

    // Overall ROI
    const roiData = [
        { category: 'Investment', value: 1.0, color: '#ef4444' },
        { category: 'Benefits', value: 2.1, color: '#10b981' }
    ];

    return (
    <div className="p-6 md:p-8 h-full flex flex-col justify-center bg-linear-to-br from-blue-50 to-white overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">{section.title}</h2>
            <p className="text-sm text-gray-600 mb-4 max-w-4xl mx-auto text-center">{section.narrative}</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg shadow-md max-w-4xl mx-auto mb-4">
                <p className="text-base font-bold text-blue-800 italic text-center">{section.content.message}</p>
            </div>

            {/* Ensure charts have a stable height to avoid ResponsiveContainer -1 warnings */}
            <div className="grid grid-cols-4 gap-3 grow min-h-60">
                {/* Chart 1: Phase 1 - AI Inspection Time Reduction */}
                <div className="bg-white rounded-xl border-2 border-green-300 shadow-lg p-3 min-h-60 flex flex-col">
                    <h4 className="font-bold text-center text-green-800 mb-2 text-xs">Phase 1: AI Inspection Speed</h4>
                                        <div className="grow">
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={phase1Data} margin={{ top: 5, right: 5, left: -15, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `${value}h`} />
                            <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                                {phase1Data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                    <p className="text-xs text-gray-600 text-center mt-1">8-12hrs → 30-60min</p>
                </div>

                {/* Chart 2: Phase 2 - FSM Efficiency */}
                <div className="bg-white rounded-xl border-2 border-blue-300 shadow-lg p-3 min-h-60 flex flex-col">
                    <h4 className="font-bold text-center text-blue-800 mb-2 text-xs">Phase 2: FSM Impact</h4>
                                        <div className="grow">
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={phase2Data} margin={{ top: 5, right: 5, left: -15, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `${value}%`} />
                            <Legend wrapperStyle={{ fontSize: '9px' }} />
                            <Bar dataKey="before" fill="#f59e0b" name="Before" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="after" fill="#3b82f6" name="After" radius={[8, 8, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                    <p className="text-xs text-gray-600 text-center mt-1">10-15% utilization gain</p>
                </div>

                {/* Chart 3: Phase 3 - Recurring Revenue Growth */}
                <div className="bg-white rounded-xl border-2 border-purple-300 shadow-lg p-3 min-h-60 flex flex-col">
                    <h4 className="font-bold text-center text-purple-800 mb-2 text-xs">Phase 3: Revenue Growth</h4>
                                        <div className="grow">
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <LineChart data={phase3Data} margin={{ top: 5, right: 5, left: -15, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '$M', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `$${value}M`} />
                            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                    <p className="text-xs text-gray-600 text-center mt-1">$1-2M recurring revenue</p>
                </div>

                {/* Chart 4: Overall ROI */}
                <div className="bg-white rounded-xl border-2 border-orange-300 shadow-lg p-3 min-h-60 flex flex-col">
                    <h4 className="font-bold text-center text-orange-800 mb-2 text-xs">Year 1 ROI</h4>
                                        <div className="grow">
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={roiData} margin={{ top: 5, right: 5, left: -15, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '$M', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} domain={[0, 2.5]} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `$${value}M`} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {roiData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                    <p className="text-xs text-gray-600 text-center mt-1">110% ROI, 5.7mo payback</p>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-gray-700">
                {section.content.points.map((point, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 border border-gray-200">
                        <p className="leading-tight">{point}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
