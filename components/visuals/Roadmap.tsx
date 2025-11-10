/* LEEWAY HEADER
TAG: UI.VISUAL.ROADMAP
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: map
ICON_SIG: CD534113
5WH: WHAT=Growth thesis and financial projection visualization with comprehensive metrics;
WHY=Communicate expansion strategy, AI transformation impact, and complete business evolution;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Roadmap.tsx;
WHEN=2025-11-08;
HOW=React + Recharts multiple charts + background image overlay
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { Area, AreaChart, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const Roadmap: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'roadmap') return null;
    const { data } = section.content;

    // Revenue Growth Data (from constants)
    const revenueData = data.projection;

    // EBITDA Margin Improvement (18% → 24%)
    const ebitdaData = [
        { year: '2024', margin: 18 },
        { year: '2025', margin: 19.5 },
        { year: '2026', margin: 21.5 },
        { year: '2027', margin: 24 }
    ];

    // Customer Retention (70% → 95%)
    const retentionData = [
        { year: '2024', retention: 70, industry: 60 },
        { year: '2025', retention: 80, industry: 62 },
        { year: '2026', retention: 88, industry: 63 },
        { year: '2027', retention: 95, industry: 65 }
    ];

    // Technology ROI & Efficiency Gains
    const techData = [
        { metric: 'Inspection Time', baseline: 480, withAI: 45, label: 'Minutes' },
        { metric: 'Report Delivery', baseline: 7, withAI: 1, label: 'Days' },
        { metric: 'Crew Utilization', baseline: 72, withAI: 85, label: '%' },
        { metric: 'Safety TRIR', baseline: 1.9, withAI: 1.2, label: 'Rate' }
    ];

    // Acquisition Pipeline Value
    const acquisitionData = [
        { stage: 'Identified', count: 50, value: 250 },
        { stage: 'Due Diligence', count: 12, value: 85 },
        { stage: 'LOI Signed', count: 3, value: 25 },
        { stage: 'Closed (MOR)', count: 1, value: 12 }
    ];

    return (
        <div className="roadmap-background p-6 md:p-8 h-full flex flex-col overflow-hidden relative">
            <div className="text-center mb-4 relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{section.title}</h2>
                <p className="text-sm text-gray-600 max-w-4xl mx-auto">{section.narrative}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 grow relative z-10">
                {/* Chart 1: Revenue Growth - Main Story */}
                <div className="col-span-1 bg-white/95 backdrop-blur-sm p-3 rounded-xl border-2 border-purple-300 shadow-xl">
                    <h4 className="font-bold text-center text-purple-800 mb-2 text-xs">Revenue Growth Trajectory</h4>
                    <ResponsiveContainer width="100%" height="90%" minWidth={0} minHeight={0}>
                        <ComposedChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} label={{ value: '$M', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} formatter={(value: number) => `$${value}M`} />
                            <Bar dataKey="value" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
                            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 2: EBITDA Margin Expansion */}
                <div className="col-span-1 bg-white/95 backdrop-blur-sm p-3 rounded-xl border-2 border-green-300 shadow-xl">
                    <h4 className="font-bold text-center text-green-800 mb-2 text-xs">EBITDA Margin Expansion</h4>
                    <ResponsiveContainer width="100%" height="90%" minWidth={0} minHeight={0}>
                        <AreaChart data={ebitdaData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorEbitda" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={[15, 25]} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} formatter={(value: number) => `${value}%`} />
                            <Area type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={2} fill="url(#colorEbitda)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 3: Customer Retention vs Industry */}
                <div className="col-span-1 bg-white/95 backdrop-blur-sm p-3 rounded-xl border-2 border-blue-300 shadow-xl">
                    <h4 className="font-bold text-center text-blue-800 mb-2 text-xs">Retention: VisuSewer vs Industry</h4>
                    <ResponsiveContainer width="100%" height="90%" minWidth={0} minHeight={0}>
                        <ComposedChart data={retentionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} domain={[50, 100]} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} formatter={(value: number) => `${value}%`} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Line type="monotone" dataKey="retention" stroke="#3b82f6" strokeWidth={3} name="VisuSewer" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="industry" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" name="Industry Avg" dot={{ r: 3 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 4: Technology Impact - Before/After AI */}
                <div className="col-span-2 bg-white/95 backdrop-blur-sm p-3 rounded-xl border-2 border-orange-300 shadow-xl">
                    <h4 className="font-bold text-center text-orange-800 mb-2 text-xs">AI Transformation Impact: Key Operational Metrics</h4>
                    <ResponsiveContainer width="100%" height="90%" minWidth={0} minHeight={0}>
                        <ComposedChart data={techData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" tick={{ fontSize: 10 }} />
                            <YAxis type="category" dataKey="metric" tick={{ fontSize: 10 }} width={75} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="baseline" fill="#f59e0b" name="Before AI" radius={[0, 8, 8, 0]} />
                            <Bar dataKey="withAI" fill="#10b981" name="With AI" radius={[0, 8, 8, 0]} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 5: M&A Pipeline */}
                <div className="col-span-1 bg-white/95 backdrop-blur-sm p-3 rounded-xl border-2 border-indigo-300 shadow-xl">
                    <h4 className="font-bold text-center text-indigo-800 mb-2 text-xs">Acquisition Pipeline</h4>
                    <ResponsiveContainer width="100%" height="90%" minWidth={0} minHeight={0}>
                        <ComposedChart data={acquisitionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorAcq" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="stage" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={60} />
                            <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} label={{ value: '$M', angle: 90, position: 'insideRight', style: { fontSize: 10 } }} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                            <Bar yAxisId="left" dataKey="count" fill="url(#colorAcq)" radius={[8, 8, 0, 0]} name="# Targets" />
                            <Line yAxisId="right" type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} name="Value ($M)" dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};