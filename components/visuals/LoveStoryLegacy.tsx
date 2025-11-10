// LEEWAY
// Description: Love Story #4 Legacy visualization showing 20-year transformation vision
// Created: 2025
// Modified: 2025

import React from 'react';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const LoveStoryLegacy: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    // Chart 1: Revenue Trajectory (2025-2045)
    const revenueData = [
        { year: 2025, revenue: 37, target: 40 },
        { year: 2026, revenue: 48, target: 52 },
        { year: 2027, revenue: 58, target: 62 },
        { year: 2028, revenue: 68, target: 72 },
        { year: 2029, revenue: 78, target: 80 },
        { year: 2030, revenue: 85, target: 85 },
        { year: 2032, revenue: 105, target: 110 },
        { year: 2034, revenue: 130, target: 135 },
        { year: 2035, revenue: 150, target: 150 },
        { year: 2038, revenue: 195, target: 200 },
        { year: 2041, revenue: 245, target: 250 },
        { year: 2045, revenue: 300, target: 300 },
    ];

    // Chart 2: EBITDA & Recurring Mix (2025-2045)
    const profitabilityData = [
        { year: 2025, EBITDA: 18, Recurring: 15 },
        { year: 2027, EBITDA: 20, Recurring: 20 },
        { year: 2030, EBITDA: 24, Recurring: 28 },
        { year: 2032, EBITDA: 26, Recurring: 34 },
        { year: 2035, EBITDA: 28, Recurring: 40 },
        { year: 2038, EBITDA: 30, Recurring: 45 },
        { year: 2041, EBITDA: 32, Recurring: 48 },
        { year: 2045, EBITDA: 34, Recurring: 50 },
    ];

    // Chart 3: International & ESG Expansion (2030-2045)
    const expansionData = [
        { year: 2030, International: 2, ESGScore: 55 },
        { year: 2032, International: 5, ESGScore: 62 },
        { year: 2035, International: 10, ESGScore: 70 },
        { year: 2038, International: 14, ESGScore: 78 },
        { year: 2041, International: 17, ESGScore: 85 },
        { year: 2045, International: 20, ESGScore: 90 },
    ];

    return (
    <div className="h-full flex flex-col bg-linear-to-br from-indigo-50 to-purple-50 overflow-hidden">
            <div className="shrink-0 p-6 border-b-2 border-indigo-200">
                <h2 className="text-3xl font-bold text-indigo-900">{section.title}</h2>
                <p className="text-sm text-indigo-700 mt-2">{section.content.message}</p>
            </div>

            <div className="grow grid grid-cols-3 gap-4 p-4 overflow-hidden">
                {/* Chart 1: Revenue Growth 2025-2045 */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-indigo-800 mb-2">Phase 1: National Platform (2025-2030)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                            <YAxis label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Area type="monotone" dataKey="target" fill="#e0e7ff" stroke="none" name="Growth Corridor" />
                            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} name="Actual Revenue" dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Technology-enabled national expansion: <strong>$37M → $85M revenue</strong> (2.3x growth over 5 years). Geographic footprint expands from 6 states to 12-15 states. M&A pipeline delivers <strong>1-2 tuck-in acquisitions annually</strong> (50 targets identified). EBITDA margin improves from <strong>18% → 24%</strong>. Client retention reaches <strong>95% vs 70% industry average</strong>.
                    </p>
                </div>

                {/* Chart 2: Profitability & Recurring Revenue */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-indigo-800 mb-2">Phase 2: Intelligence Company (2030-2035)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profitabilityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                            <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Line type="monotone" dataKey="EBITDA" stroke="#10b981" strokeWidth={3} name="EBITDA Margin %" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="Recurring" stroke="#8b5cf6" strokeWidth={3} name="Recurring Revenue %" dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Predictive intelligence as core product: <strong>$85M → $150M revenue</strong> (1.8x growth). Recurring revenue reaches <strong>40% of total revenue</strong> via SaaS analytics, managed services, and multi-year inspection contracts. EBITDA margin expands to <strong>28%</strong> (software mix). Company valuation reaches <strong>10-15x EBITDA</strong> (SaaS-hybrid multiple vs 6-8x traditional services). AI platform generates <strong>$60M annual revenue</strong>.
                    </p>
                </div>

                {/* Chart 3: Climate & ESG Leadership */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-indigo-800 mb-2">Phase 3: Climate Resilience (2035-2045)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expansionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                            <YAxis yAxisId="left" label={{ value: 'International %', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'ESG Score', angle: 90, position: 'insideRight', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Bar yAxisId="left" dataKey="International" fill="#3b82f6" name="International Revenue %" />
                            <Bar yAxisId="right" dataKey="ESGScore" fill="#10b981" name="ESG Score" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Climate resilience leadership: <strong>$150M → $300M revenue</strong> (2x growth). International operations reach <strong>20% of revenue</strong> (Canada, UK, Australia partnerships). Top decile ESG performance (<strong>90+ score</strong>) attracts impact investors and green municipal bonds. Digital twin technology enables <strong>climate adaptation planning</strong> for 500+ municipalities. Company positioned as <strong>critical infrastructure resilience advisor</strong> for aging systems in extreme weather.
                    </p>
                </div>
            </div>

            <div className="shrink-0 bg-linear-to-r from-indigo-100 to-purple-100 p-3 border-t-2 border-indigo-300">
                <p className="text-sm text-center text-indigo-900 font-semibold">
                    <strong>The Covenant Lives On:</strong> Values translated into measurable KPIs embedded in compensation and culture—ensuring the covenant made underground in 1975 guides the company through 2045 and beyond.
                </p>
            </div>
        </div>
    );
};
