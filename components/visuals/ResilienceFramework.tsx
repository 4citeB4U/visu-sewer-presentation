/* LEEWAY HEADER
TAG: UI.VISUAL.RESILIENCE
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: shield
ICON_SIG: CD534113
5WH: WHAT=Resilience framework visualization with risk mitigation charts;
WHY=Show four-pillar protection strategy with financial impact metrics;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\ResilienceFramework.tsx;
WHEN=2025-11-08;
HOW=React + Recharts with pillar-based risk mitigation and revenue charts
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const ResilienceFramework: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    const [ready, setReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
            setReady(true);
        }
    }, []);

    // Political & Regulatory risk avoidance
    const politicalData = [
        { metric: 'Fines Avoided', value: 750 },
        { metric: 'Bid Risk Reduced', value: 500 }
    ];

    // Supply Chain improvements
    const supplyChainData = [
        { metric: 'Before', delays: 100, costs: 400 },
        { metric: 'After', delays: 80, costs: 300 }
    ];

    // Emergency Revenue Capture
    const weatherData = [
        { year: 'Y1', revenue: 2.0 },
        { year: 'Y2', revenue: 2.8 },
        { year: 'Y3', revenue: 3.5 },
        { year: 'Y4', revenue: 4.0 }
    ];

    // Safety & Training ROI
    const safetyData = [
        { category: 'Injury Reduction', value: 30, color: '#10b981' },
        { category: 'Cost Savings', value: 175, color: '#3b82f6' }
    ];

    // Total Impact Pie
    const totalImpactData = [
        { name: 'Political ($500K-1M)', value: 750, fill: '#ef4444' },
        { name: 'Supply Chain ($300-500K)', value: 400, fill: '#f59e0b' },
        { name: 'Emergency Revenue ($2-4M)', value: 3000, fill: '#10b981' },
        { name: 'Safety ($150-200K)', value: 175, fill: '#3b82f6' }
    ];

    return (
    <div ref={containerRef} className="p-6 md:p-8 h-full flex flex-col justify-center bg-linear-to-br from-red-50 to-white overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">{section.title}</h2>
            <p className="text-sm text-gray-600 mb-4 max-w-4xl mx-auto text-center">{section.narrative}</p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg shadow-md max-w-4xl mx-auto mb-4">
                <p className="text-base font-bold text-red-800 italic text-center">{section.content.message}</p>
            </div>

            <div className="grid grid-cols-5 gap-3 grow">
                {/* Chart 1: Political & Regulatory */}
                <div className="bg-white rounded-xl border-2 border-red-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-red-800 mb-2 text-xs">Political & Regulatory</h4>
                    <ResponsiveContainer width="100%" height="75%">
                        <BarChart data={politicalData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" tick={{ fontSize: 8 }} angle={-20} textAnchor="end" height={50} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '$K', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `$${value}K`} />
                            <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">AI dashboards + engagement</p>
                </div>

                {/* Chart 2: Supply Chain */}
                <div className="bg-white rounded-xl border-2 border-orange-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-orange-800 mb-2 text-xs">Supply Chain</h4>
                    <ResponsiveContainer width="100%" height="75%">
                        <BarChart data={supplyChainData} margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '%/$K', angle: -90, position: 'insideLeft', style: { fontSize: 8 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} />
                            <Legend wrapperStyle={{ fontSize: '8px' }} />
                            <Bar dataKey="delays" fill="#f59e0b" name="Delay %" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="costs" fill="#fb923c" name="Cost $K" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">20% delay reduction</p>
                </div>

                {/* Chart 3: Weatherization Revenue */}
                <div className="bg-white rounded-xl border-2 border-green-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-green-800 mb-2 text-xs">Emergency Response</h4>
                    <ResponsiveContainer width="100%" height="75%">
                        <BarChart data={weatherData} margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '$M', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `$${value}M`} />
                            <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">$2-4M captured annually</p>
                </div>

                {/* Chart 4: Safety & Training */}
                <div className="bg-white rounded-xl border-2 border-blue-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-blue-800 mb-2 text-xs">Safety & Training</h4>
                    <ResponsiveContainer width="100%" height="75%">
                        <BarChart data={safetyData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" tick={{ fontSize: 8 }} angle={-20} textAnchor="end" height={50} />
                            <YAxis tick={{ fontSize: 9 }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {safetyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">VR/AR + wearables</p>
                </div>

                {/* Chart 5: Total Impact Distribution */}
                <div className="bg-white rounded-xl border-2 border-purple-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-purple-800 mb-2 text-xs">Total Impact</h4>
                    <ResponsiveContainer width="100%" height="75%">
                        <PieChart>
                            <Pie
                                data={totalImpactData}
                                cx="50%"
                                cy="50%"
                                outerRadius="70%"
                                dataKey="value"
                                label={false}
                            >
                                {totalImpactData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: '9px' }} formatter={(value: number) => `$${value}K`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 text-center mt-2">$3-7M protection</p>
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
