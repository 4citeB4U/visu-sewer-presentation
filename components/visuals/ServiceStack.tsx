/* LEEWAY HEADER
TAG: UI.VISUAL.SERVICESTACK
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: layers
ICON_SIG: CD534113
5WH: WHAT=Service lifecycle visualization with AI automation impact;
WHY=Demonstrate full-stack wastewater management with technology transformation;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\ServiceStack.tsx;
WHEN=2025-11-08;
HOW=React with Recharts showing before/after AI metrics
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const ServiceStack: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'service_stack') return null;
    const { image } = section.content;

    // Chart 1: Inspect - AI automation impact
    const inspectData = [
        { metric: 'Coding\nTime (hrs)', Current: 10, WithAI: 0.75 },
        { metric: 'Defect\nAccuracy %', Current: 60, WithAI: 96 },
        { metric: 'Reports/Day', Current: 2, WithAI: 8 },
        { metric: 'Cost per\nReport ($)', Current: 450, WithAI: 125 },
    ];

    // Chart 2: Maintain - Field service efficiency
    const maintainData = [
        { metric: 'Route\nOptimization', Current: 65, WithAI: 92 },
        { metric: 'Equipment\nUtilization %', Current: 70, WithAI: 88 },
        { metric: 'Admin\nTime (hrs/wk)', Current: 12, WithAI: 3 },
        { metric: 'Jobs/Day', Current: 4.5, WithAI: 6.2 },
    ];

    // Chart 3: Rehabilitate - Project management
    const rehabData = [
        { metric: 'Material\nTracking %', Current: 75, WithAI: 98 },
        { metric: 'On-Time\nDelivery %', Current: 85, WithAI: 98 },
        { metric: 'Cost\nOverruns %', Current: 15, WithAI: 4 },
        { metric: 'Quality\nScore', Current: 82, WithAI: 95 },
    ];

    return (
    <div className="p-4 h-full flex flex-col bg-linear-to-br from-blue-50 to-white overflow-hidden">
            <div className="text-center mb-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
                <p className="text-xs text-gray-600 max-w-3xl mx-auto">{section.narrative}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 grow overflow-hidden">
                {/* Truck Image - Left 50% */}
                <div className="bg-white rounded-lg border-2 border-blue-200 shadow-lg overflow-hidden flex items-center justify-center">
                    <img src={image} alt="Visu-Sewer Service Truck" className="w-full h-full object-cover"/>
                </div>

                {/* Right side - 3 charts stacked */}
                <div className="flex flex-col gap-3">
                    {/* Chart 1: Inspect */}
                    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-blue-800 mb-1">Inspect: AI CCTV Analysis</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={inspectData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-10} textAnchor="end" />
                                <YAxis tick={{ fontSize: 9 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: '9px' }} />
                                <Bar dataKey="Current" fill="#ef4444" name="Current State" />
                                <Bar dataKey="WithAI" fill="#10b981" name="With AI" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-[9px] text-gray-700 mt-1">
                            AI inspection reduces coding time from <strong>10 hours to 45 minutes</strong>, increases accuracy to <strong>96%</strong>, and enables <strong>8 reports/day vs 2</strong>. Cost per report drops <strong>72% ($450 → $125)</strong>.
                        </p>
                    </div>

                    {/* Chart 2: Maintain */}
                    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-green-800 mb-1">Maintain: FSM Optimization</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={maintainData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-10} textAnchor="end" />
                                <YAxis tick={{ fontSize: 9 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: '9px' }} />
                                <Bar dataKey="Current" fill="#ef4444" name="Current State" />
                                <Bar dataKey="WithAI" fill="#10b981" name="With AI" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-[9px] text-gray-700 mt-1">
                            ServiceTitan FSM improves route optimization to <strong>92%</strong>, equipment utilization to <strong>88%</strong>, and reduces admin time <strong>75% (12hrs → 3hrs/week)</strong>. Field crews complete <strong>6.2 jobs/day vs 4.5</strong>.
                        </p>
                    </div>

                    {/* Chart 3: Rehabilitate */}
                    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-orange-800 mb-1">Rehabilitate: Project Control</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rehabData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-10} textAnchor="end" />
                                <YAxis tick={{ fontSize: 9 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: '9px' }} />
                                <Bar dataKey="Current" fill="#ef4444" name="Current State" />
                                <Bar dataKey="WithAI" fill="#10b981" name="With AI" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-[9px] text-gray-700 mt-1">
                            Procore ERP + Info360 analytics increase material tracking to <strong>98%</strong>, on-time delivery to <strong>98%</strong>, reduce cost overruns <strong>73% (15% → 4%)</strong>, and boost quality scores to <strong>95</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};