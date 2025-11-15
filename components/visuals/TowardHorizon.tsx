// LEEWAY
// Description: Toward Horizon visualization showing value-based competitive advantages
// Created: 2025
// Modified: 2025

import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const TowardHorizon: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    // Chart 1: Responsiveness Impact
    const responsivenessData = [
        { category: 'VisuSewer', retention: 95, revenueImpact: 15 },
        { category: 'Industry Avg', retention: 70, revenueImpact: 0 },
    ];

    // Chart 2: Integrity Premium
    const integrityData = [
        { year: 'Year 1', BaseRevenue: 30, PremiumRevenue: 33 },
        { year: 'Year 2', BaseRevenue: 40, PremiumRevenue: 45 },
        { year: 'Year 3', BaseRevenue: 50, PremiumRevenue: 57.5 },
        { year: 'Year 4', BaseRevenue: 60, PremiumRevenue: 69 },
        { year: 'Year 5', BaseRevenue: 70, PremiumRevenue: 80.5 },
    ];

    // Chart 3: Dedication Retention
    const dedicationData = [
        { metric: 'Hiring\nCosts ($K)', VisuSewer: 400, Competitor: 1200 },
        { metric: 'Training\nTime (mos)', VisuSewer: 6, Competitor: 18 },
        { metric: 'Retention\nRate %', VisuSewer: 95, Competitor: 60 },
        { metric: 'Experience\n(avg yrs)', VisuSewer: 12, Competitor: 4 },
    ];

    // Chart 4: Reputation Marketing Mix
    const reputationData = [
        { name: 'Referral Revenue', value: 50, savings: 3000 },
        { name: 'Marketing Spend', value: 50, savings: 0 },
    ];

    const COLORS = ['#10b981', '#3b82f6'];

    return (
    <div className="h-full flex flex-col bg-linear-to-br from-amber-50 to-orange-50 overflow-hidden">
            <div className="shrink-0 p-6 border-b-2 border-amber-200">
                <div className="flex items-center justify-between gap-6">
                    <div className="min-w-0 max-w-[60%]">
                        <h2 className="text-2xl font-bold text-amber-900">{section.title}</h2>
                        <p className="text-sm text-amber-700 mt-2">{section.content.message}</p>
                    </div>
                    <div className="shrink-0 rounded-lg shadow border border-amber-200 bg-white p-2">
                                    <div className="relative h-40 md:h-52 lg:h-60 w-88 md:w-120 lg:w-152">
                                        <img
                                            src={`${(import.meta as any).env.BASE_URL}images/feild-technician-first-guy.png`}
                                            alt="Field Technician"
                                            className="w-full h-full object-cover saturate-125 contrast-110 brightness-105"
                                        />
                                        <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-amber-300/40" />
                                    </div>
                                    <p className="text-[10px] md:text-xs text-amber-700 mt-2 text-center font-medium">Field Technician – Authentic operations at the edge</p>
                                </div>
                </div>
            </div>

            <div className="grow grid grid-cols-4 gap-3 p-4 overflow-hidden">
                {/* Chart 1: Responsiveness */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-sm font-bold text-blue-800 mb-2">Responsiveness: Retention Advantage</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={responsivenessData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" />
                            <YAxis yAxisId="left" label={{ value: 'Retention %', angle: -90, position: 'insideLeft', fontSize: 10 }} tick={{ fontSize: 10 }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue Impact ($M)', angle: 90, position: 'insideRight', fontSize: 10 }} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar yAxisId="left" dataKey="retention" fill="#3b82f6" name="Retention %" />
                            <Bar yAxisId="right" dataKey="revenueImpact" fill="#10b981" name="Revenue Impact" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-[9px] text-gray-700 mt-2">
                        <strong>&lt;2hr response time</strong> and 24/7 availability drive <strong>95% client retention vs 70% industry</strong>. NPS &gt;70 ("last job is next pitch"). At $150M scale, <strong>25-point retention advantage = $15M revenue</strong> vs losing 30% of clients annually.
                    </p>
                </div>

                {/* Chart 2: Integrity Premium */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-sm font-bold text-green-800 mb-2">Integrity: Premium Pricing Power</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={integrityData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" />
                            <YAxis label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', fontSize: 10 }} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="BaseRevenue" fill="#94a3b8" name="Commodity Pricing" />
                            <Bar dataKey="PremiumRevenue" fill="#10b981" name="Premium Pricing" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-[9px] text-gray-700 mt-2">
                        "Engineer's choice for critical projects" enables <strong>10-15% premium pricing</strong> vs commodity competitors. Zero change orders build trust. At $70M revenue, premium pricing delivers <strong>$5-10M annual profit uplift</strong> (15% margin on incremental revenue).
                    </p>
                </div>

                {/* Chart 3: Dedication */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-sm font-bold text-purple-800 mb-2">Dedication: Workforce Stability</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dedicationData} margin={{ top: 5, right: 10, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 9 }} angle={-10} textAnchor="end" />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="VisuSewer" fill="#8b5cf6" name="VisuSewer" />
                            <Bar dataKey="Competitor" fill="#ef4444" name="Competitor Avg" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-[9px] text-gray-700 mt-2">
                        <strong>98% on-time delivery</strong> via field-born management. <strong>95% technician retention vs 60% industry</strong> saves $800K annually in hiring/training. Average 12 years experience vs 4 years (competitors) = superior quality, <strong>$2M savings vs industry</strong>.
                    </p>
                </div>

                {/* Chart 4: Reputation */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-sm font-bold text-orange-800 mb-2">Reputation: Referral Economics</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <Pie
                                data={reputationData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry: any) => `${entry.name}: ${entry.percent ? (entry.percent * 100).toFixed(0) : entry.value}%`}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {reputationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number, name: string, props: any) => {
                                const savings = props.payload.savings;
                                return savings > 0 ? [`${value}% (saves $${savings/1000}K)`, name] : [`${value}%`, name];
                            }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="text-[9px] text-gray-700 mt-2">
                        <strong>50% revenue from referrals</strong> vs industry 20-30%. Every satisfied client becomes sales force. At $70M revenue, <strong>50% referral mix saves $3M annually</strong> in marketing/sales costs vs 8-10% sales expense (industry standard). Word-of-mouth = highest-converting lead source.
                    </p>
                </div>
            </div>

            <div className="shrink-0 bg-linear-to-r from-amber-100 to-orange-100 p-3 border-t-2 border-amber-300">
                <p className="text-xs text-center text-amber-900 font-semibold">
                    Combined Value Impact: <strong>$25-30M annual benefit</strong> from values-driven operations at $150M revenue scale. The covenant isn't poetry—it's competitive advantage.
                </p>
            </div>
        </div>
    );
};
