// LEEWAY
// Description: Love Story #3 visualization showing AI transformation context and competitive positioning
// Created: 2025
// Modified: 2025

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeckSection } from '../../types';

export const LoveStoryFuture: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'summary') return null;

    // Chart 1: Competitor AI Adoption Timeline
    const competitorData = [
        { year: 2020, Aegion: 75, Insituform: 70, VisuSewer: 45 },
        { year: 2021, Aegion: 85, Insituform: 82, VisuSewer: 50 },
        { year: 2022, Aegion: 92, Insituform: 90, VisuSewer: 55 },
        { year: 2023, Aegion: 97, Insituform: 95, VisuSewer: 60 },
        { year: 2024, Aegion: 97, Insituform: 96, VisuSewer: 85 },
        { year: 2025, Aegion: 98, Insituform: 97, VisuSewer: 96 },
    ];

    // Chart 2: Technology Investment Comparison
    const investmentData = [
        { category: 'Pre-Partnership\n(2020-2023)', Investment: 150, ROI: 0.8 },
        { category: 'Partnership Year 1\n(2024)', Investment: 1000, ROI: 2.1 },
        { category: 'Projected Year 2\n(2025)', Investment: 750, ROI: 3.5 },
        { category: 'Projected Year 3\n(2026)', Investment: 575, ROI: 4.2 },
    ];

    // Chart 3: Competitive Positioning
    const positioningData = [
        { metric: 'Defect\nAccuracy', Before: 60, After: 96, Industry: 95 },
        { metric: 'Coding\nTime (hrs)', Before: 10, After: 0.75, Industry: 2 },
        { metric: 'Client\nDashboards', Before: 0, After: 100, Industry: 85 },
        { metric: 'Predictive\nAnalytics', Before: 0, After: 75, Industry: 60 },
    ];

    // Chart 4: Partnership Value Creation
    const partnershipValue = [
        { component: 'Tech Budget', value: 1000, percentage: 43 },
        { component: 'M&A Capital', value: 800, percentage: 34 },
        { component: 'Consulting', value: 350, percentage: 15 },
        { component: 'Network Access', value: 200, percentage: 8 },
    ];

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
            <div className="flex-shrink-0 p-6 border-b-2 border-purple-200">
                <h2 className="text-3xl font-bold text-purple-900">{section.title}</h2>
                <p className="text-sm text-purple-700 mt-2">{section.content.message}</p>
            </div>

            <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-4 p-4 overflow-hidden">
                {/* Chart 1: AI Adoption Race */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-purple-800 mb-2">AI Defect Detection: Closing the Gap</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={competitorData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                            <YAxis label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Line type="monotone" dataKey="Aegion" stroke="#ef4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="Insituform" stroke="#f97316" strokeWidth={2} />
                            <Line type="monotone" dataKey="VisuSewer" stroke="#8b5cf6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Competitors achieved <strong>95-97% accuracy</strong> by 2023. Visu-Sewer's 2024 partnership accelerated AI adoption from 60% to <strong>96% in 12 months</strong>, matching industry leaders.
                    </p>
                </div>

                {/* Chart 2: Investment & ROI Trajectory */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-purple-800 mb-2">Partnership Investment Impact</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={investmentData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" />
                            <YAxis yAxisId="left" label={{ value: 'Investment ($K)', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'ROI Multiple', angle: 90, position: 'insideRight', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Bar yAxisId="left" dataKey="Investment" fill="#8b5cf6" />
                            <Bar yAxisId="right" dataKey="ROI" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Fort Point Capital partnership unlocked <strong>$1M Year 1 budget</strong> (7x pre-partnership), delivering <strong>2.1x ROI</strong>. Projected 3-year cumulative investment of <strong>$2.3M</strong> with escalating returns.
                    </p>
                </div>

                {/* Chart 3: Competitive Positioning */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-purple-800 mb-2">Competitive Feature Parity Achieved</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={positioningData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Bar dataKey="Before" fill="#ef4444" name="Pre-2024" />
                            <Bar dataKey="After" fill="#8b5cf6" name="Post-Partnership" />
                            <Bar dataKey="Industry" fill="#94a3b8" name="Industry Avg" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        Risk eliminated: Visu-Sewer now <strong>matches or exceeds</strong> competitor capabilities across all technology dimensions. Coding time reduced <strong>13x</strong> (10hrs → 0.75hrs), maintaining premium craftsmanship with digital speed.
                    </p>
                </div>

                {/* Chart 4: Partnership Value Breakdown */}
                <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col">
                    <h3 className="text-base font-bold text-purple-800 mb-2">Fort Point Capital Value Creation</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={partnershipValue} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" label={{ value: 'Value ($K)', position: 'bottom', fontSize: 11 }} tick={{ fontSize: 11 }} />
                            <YAxis type="category" dataKey="component" tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8b5cf6">
                                {partnershipValue.map((entry, index) => (
                                    <text key={index} x="50%" y="50%" fill="white" fontSize={10} textAnchor="middle">
                                        {entry.percentage}%
                                    </text>
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-700 mt-2">
                        <strong>$2.35M total value</strong> from Fort Point partnership ($2B AUM): Technology funding (43%), M&A capital access (34%), operational consulting (15%), and industry network (8%). Culture preservation was non-negotiable condition.
                    </p>
                </div>
            </div>
        </div>
    );
};
