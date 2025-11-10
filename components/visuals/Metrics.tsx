/* LEEWAY HEADER
TAG: UI.VISUAL.METRICS
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: bar-chart-2
ICON_SIG: CD534113
5WH: WHAT=Human Capital Analytics dashboard;
WHY=Visualize workforce KPIs with Recharts;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\Metrics.tsx;
WHEN=2025-11-08;
HOW=React + Recharts PieChart + animated progress bars
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { DeckSection } from '../../types';

export const Metrics: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'people_metrics') return null;
    const { metrics, image } = section.content;

    const parseMetricValue = (value: string): number => {
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    return (
         <div className="p-6 md:p-8 h-full flex flex-col bg-linear-to-br from-gray-50 to-white">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{section.title}</h2>
                <p className="text-base text-gray-600 max-w-4xl mx-auto">{section.narrative}</p>
            </div>

            <div className={`flex-1 flex flex-col ${image ? 'md:flex-row items-stretch' : ''} gap-8`}>                
                {image && (
                    <div className="md:w-1/2 flex items-center justify-center">
                        <div className="relative w-full h-full max-h-[520px]">
                            <img 
                                src={image} 
                                alt="Human capital operations crew" 
                                className="rounded-2xl shadow-2xl w-full h-full object-cover border border-gray-200" 
                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder-crew.svg'; }}
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 pointer-events-none"></div>
                        </div>
                    </div>
                )}

                <div className={`${image ? 'md:w-1/2' : ''} grid grid-cols-1 sm:grid-cols-2 gap-4 content-start`}>            
                {metrics.map((metric, index) => {
                    const currentVal = parseMetricValue(metric.current);
                    const targetVal = parseMetricValue(metric.target.replace(/[<>]/g, ''));
                    const percentage = Math.min((currentVal / targetVal) * 100, 100);
                    
                    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                    const color = COLORS[index % COLORS.length];
                    const colorClass = index === 0 ? 'text-green-500' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-orange-500' : 'text-red-500';
                    
                    const gaugeData = [
                        { name: 'Current', value: percentage, fill: color },
                        { name: 'Remaining', value: 100 - percentage, fill: '#e5e7eb' }
                    ];

                    return (
                        <div
                            key={index}
                            className={`metrics-card metrics-card-${index} bg-white rounded-xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 animate-fade-in-scale opacity-0 flex flex-col`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-24 h-24 shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={gaugeData}
                                                cx="50%"
                                                cy="50%"
                                                startAngle={180}
                                                endAngle={0}
                                                innerRadius="60%"
                                                outerRadius="90%"
                                                dataKey="value"
                                                animationDuration={1500}
                                                animationBegin={index * 150}
                                            >
                                                {gaugeData.map((entry, i) => (
                                                    <Cell key={`cell-${i}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="text-center -mt-6">
                                        <span className={`text-xl font-bold ${colorClass}`}>{metric.current}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">{metric.metric}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-500">Target:</span>
                                        <span className="text-sm font-bold text-green-600">{metric.target}</span>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700`}>{Math.round(percentage)}% of target</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-tight mt-auto">{metric.why}</p>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};
