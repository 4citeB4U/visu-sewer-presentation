/* LEEWAY HEADER
TAG: UI.VISUAL.FOUR_PILLARS
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: columns
ICON_SIG: CD534113
5WH: WHAT=Four core values visualization with financial impact charts;
WHY=Demonstrate quantifiable value of company values with metrics;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\FourPillars.tsx;
WHEN=2025-11-08;
HOW=React + Recharts showing value-driven financial advantages
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const FourPillars: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    // Responsiveness: Retention impact
    const responsivenessData = [
        { metric: 'Industry Avg', retention: 70, revenue: 100 },
        { metric: 'VisuSewer', retention: 95, revenue: 115 }
    ];

    // Integrity: Premium pricing
    const integrityData = [
        { category: 'Standard', value: 100 },
        { category: 'Premium (10%)', value: 110 },
        { category: 'Premium (15%)', value: 115 }
    ];

    // Dedication: On-time delivery & retention
    const dedicationData = [
        { metric: 'Industry', onTime: 85, retention: 60 },
        { metric: 'VisuSewer', onTime: 98, retention: 95 }
    ];

    // Reputation: Referral-based revenue
    const reputationData = [
        { source: 'Marketing', value: 50, color: '#ef4444' },
        { source: 'Referrals', value: 50, color: '#10b981' }
    ];

    return (
        <div className="p-6 md:p-8 h-full flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">{section.title}</h2>
            <p className="text-sm text-gray-600 mb-4 max-w-4xl mx-auto text-center">{section.narrative}</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg shadow-md max-w-4xl mx-auto mb-4">
                <p className="text-base font-bold text-blue-800 italic text-center">{section.content.message}</p>
            </div>

            <div className="grid grid-cols-4 gap-3 flex-grow">
                <div className="bg-white rounded-xl border-2 border-blue-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-blue-800 mb-2 text-xs">Responsiveness Impact</h4>
                    <ResponsiveContainer width="100%" height="70%" minWidth={0} minHeight={0}>
                        <BarChart data={responsivenessData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 8 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="retention" fill="#3b82f6" name="Retention %" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 leading-tight mt-2 px-1">
                        <strong className="text-blue-600">95% retention</strong> vs 70% industry avg = <strong>$15M revenue</strong> difference. 
                        &lt;2hr response time, 24/7 availability.
                    </p>
                </div>

                <div className="bg-white rounded-xl border-2 border-green-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-green-800 mb-2 text-xs">Integrity Premium</h4>
                    <ResponsiveContainer width="100%" height="70%" minWidth={0} minHeight={0}>
                        <LineChart data={integrityData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" tick={{ fontSize: 8 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} domain={[95, 120]} label={{ value: 'Index', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} />
                            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 leading-tight mt-2 px-1">
                        <strong className="text-green-600">10-15% premium pricing</strong> = <strong>$5-10M profit</strong> uplift. 
                        0% report revisions, clients trust accuracy.
                    </p>
                </div>

                <div className="bg-white rounded-xl border-2 border-orange-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-orange-800 mb-2 text-xs">Dedication Metrics</h4>
                    <ResponsiveContainer width="100%" height="70%" minWidth={0} minHeight={0}>
                        <BarChart data={dedicationData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 8 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="onTime" fill="#f59e0b" name="On-Time %" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 leading-tight mt-2 px-1">
                        <strong className="text-orange-600">98% on-time delivery</strong>, work in blizzards. 
                        95% retention = <strong>$2M annual</strong> savings.
                    </p>
                </div>

                <div className="bg-white rounded-xl border-2 border-purple-300 shadow-lg p-3">
                    <h4 className="font-bold text-center text-purple-800 mb-2 text-xs">Reputation Power</h4>
                    <ResponsiveContainer width="100%" height="70%" minWidth={0} minHeight={0}>
                        <BarChart data={reputationData} margin={{ top: 5, right: 5, left: -20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="source" tick={{ fontSize: 8 }} angle={-15} textAnchor="end" height={40} />
                            <YAxis tick={{ fontSize: 9 }} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
                            <Tooltip contentStyle={{ fontSize: '10px' }} formatter={(value: number) => `${value}%`} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {reputationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 leading-tight mt-2 px-1">
                        <strong className="text-purple-600">50% referral-based</strong> revenue, NPS &gt;70. 
                        Last job is next pitch = <strong>$3M marketing</strong> savings.
                    </p>
                </div>
            </div>
        </div>
    );
};
