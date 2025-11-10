/* LEEWAY HEADER
TAG: UI.VISUAL.ORGCHART
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: network
ICON_SIG: CD534113
5WH: WHAT=Organizational hierarchy visualization with leadership structure;
WHY=Showcase field-born expertise and management depth;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\components\visuals\OrgChart.tsx;
WHEN=2025-11-08;
HOW=React recursive component tree with LEEWAY compliant connector lines
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

import React, { useState } from 'react';
import { DeckSection, OrgChartMember } from '../../types';

interface OrgChartProps {
    section: DeckSection;
}

interface MemberModalProps {
    member: OrgChartMember;
    onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
                <img src={member.photoUrl} alt={member.name} className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-semibold">{member.title}</p>
                </div>
            </div>
            {member.tagline && (
                <p className="text-gray-600 italic mb-4 border-l-4 border-blue-400 pl-3 py-2 bg-blue-50 rounded">
                    "{member.tagline}"
                </p>
            )}
            <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
                Close
            </button>
        </div>
    </div>
);

const MemberCard: React.FC<{ member: OrgChartMember; isRoot?: boolean; onClick: () => void }> = ({ member, isRoot = false, onClick }) => (
    <div 
        onClick={onClick}
        className={`p-1.5 bg-white border ${isRoot ? 'border-blue-600 shadow-lg' : 'border-gray-300 shadow'} rounded text-center w-24 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-500`}
    >
        <img src={member.photoUrl} alt={member.name} className="w-8 h-8 rounded-full mb-0.5 object-cover border border-blue-300" />
        <p className="font-bold text-[9px] text-gray-900 leading-tight">{member.name || ' '}</p>
        {member.title && <p className="text-[8px] text-blue-700 font-semibold leading-tight">{member.title}</p>}
    </div>
);

const MemberNode: React.FC<{ member: OrgChartMember; onMemberClick: (member: OrgChartMember) => void }> = ({ member, onMemberClick }) => {
    const hasChildren = member.children && member.children.length > 0;
    return (
        <div className="flex flex-col items-center relative px-0.5">
            <MemberCard member={member} onClick={() => onMemberClick(member)} />
            {hasChildren && member.children && (
                <>
                    <div className="w-px h-3 bg-gray-300"></div>
                     <div className="flex justify-center relative">
                        {member.children.length > 1 && <div className="absolute top-0 h-px bg-gray-300 org-connector-line"></div> }

                        {member.children.map((child, index) => (
                             <div key={index} className="flex flex-col items-center relative px-0.5">
                                <div className="absolute bottom-full left-1/2 w-px h-3 bg-gray-300"></div>
                                <MemberNode member={child} onMemberClick={onMemberClick} />
                             </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


export const OrgChart: React.FC<OrgChartProps> = ({ section }) => {
    const [selectedMember, setSelectedMember] = useState<OrgChartMember | null>(null);
    
    if (section.content.type !== 'org_chart') return null;
    const { leadership } = section.content;

    // Flatten the structure for better display
    const executiveTeam = leadership.children?.filter(child => child.title !== 'Regional Operations') || [];
    const divisionManagers = leadership.children?.find(child => child.title === 'Regional Operations')?.children || [];

    // Distinct color schemes for executive leadership cards
    const execColorSchemes = [
        { card: 'p-1.5 bg-gradient-to-br from-indigo-600 to-indigo-700 border-2 border-indigo-800 shadow', name: 'text-white', title: 'text-indigo-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-emerald-600 to-emerald-700 border-2 border-emerald-800 shadow', name: 'text-white', title: 'text-emerald-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-rose-600 to-rose-700 border-2 border-rose-800 shadow', name: 'text-white', title: 'text-rose-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-cyan-600 to-cyan-700 border-2 border-cyan-800 shadow', name: 'text-white', title: 'text-cyan-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-fuchsia-600 to-fuchsia-700 border-2 border-fuchsia-800 shadow', name: 'text-white', title: 'text-fuchsia-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-amber-700 shadow', name: 'text-white', title: 'text-amber-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-violet-600 to-violet-700 border-2 border-violet-800 shadow', name: 'text-white', title: 'text-violet-100', img: 'border-white' },
        { card: 'p-1.5 bg-gradient-to-br from-teal-600 to-teal-700 border-2 border-teal-800 shadow', name: 'text-white', title: 'text-teal-100', img: 'border-white' }
    ];

    // Distinct (softer) color schemes for division manager cards
    const managerColorSchemes = [
        { card: 'p-1.5 bg-rose-50 border border-rose-300 shadow', name: 'text-gray-900', title: 'text-rose-600', img: 'border-rose-300' },
        { card: 'p-1.5 bg-sky-50 border border-sky-300 shadow', name: 'text-gray-900', title: 'text-sky-600', img: 'border-sky-300' },
        { card: 'p-1.5 bg-emerald-50 border border-emerald-300 shadow', name: 'text-gray-900', title: 'text-emerald-600', img: 'border-emerald-300' },
        { card: 'p-1.5 bg-violet-50 border border-violet-300 shadow', name: 'text-gray-900', title: 'text-violet-600', img: 'border-violet-300' },
        { card: 'p-1.5 bg-amber-50 border border-amber-300 shadow', name: 'text-gray-900', title: 'text-amber-600', img: 'border-amber-300' },
        { card: 'p-1.5 bg-indigo-50 border border-indigo-300 shadow', name: 'text-gray-900', title: 'text-indigo-600', img: 'border-indigo-300' },
        { card: 'p-1.5 bg-lime-50 border border-lime-300 shadow', name: 'text-gray-900', title: 'text-lime-600', img: 'border-lime-300' },
        { card: 'p-1.5 bg-fuchsia-50 border border-fuchsia-300 shadow', name: 'text-gray-900', title: 'text-fuchsia-600', img: 'border-fuchsia-300' },
        { card: 'p-1.5 bg-teal-50 border border-teal-300 shadow', name: 'text-gray-900', title: 'text-teal-600', img: 'border-teal-300' }
    ];

    return (
    <div className="p-2 h-full flex flex-col bg-linear-to-br from-blue-50 to-white overflow-y-auto">
            <div className="text-center mb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-0.5">{section.title}</h2>
                <p className="text-[10px] text-gray-600 max-w-4xl mx-auto">{section.narrative}</p>
                <p className="text-[9px] text-blue-600 font-semibold mt-0.5">💡 Click any member for details</p>
            </div>
            
            {/* CEO Section */}
            <div className="flex justify-center mb-3">
                <div 
                    onClick={() => setSelectedMember(leadership)}
                    className="p-2 bg-linear-to-br from-blue-600 to-blue-700 border-2 border-blue-800 shadow-xl rounded-lg text-center w-32 cursor-pointer hover:shadow-2xl transition-all duration-200 hover:scale-105"
                >
                    <img src={leadership.photoUrl} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/src/images/placeholder-male.png'; }} alt={leadership.name} className="w-10 h-10 rounded-full mb-1 mx-auto object-cover border-2 border-white" />
                    <p className="font-bold text-[10px] text-white leading-tight">{leadership.name}</p>
                    <p className="text-[9px] text-blue-100 font-semibold leading-tight">{leadership.title}</p>
                </div>
            </div>

            {/* Executive Team */}
            <div className="mb-2">
                <h3 className="text-[10px] font-bold text-gray-700 mb-1 text-center">Executive Leadership</h3>
                <div className="grid grid-cols-4 gap-1.5">
                    {executiveTeam.map((exec, index) => {
                        const scheme = execColorSchemes[index % execColorSchemes.length];
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedMember(exec)}
                                className={`${scheme.card} rounded text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200`}
                            >
                                <img src={exec.photoUrl} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/src/images/placeholder-male.png'; }} alt={exec.name} className={`w-8 h-8 rounded-full mb-0.5 mx-auto object-cover border ${scheme.img}`} />
                                <p className={`font-bold text-[8px] leading-tight ${scheme.name}`}>{exec.name}</p>
                                <p className={`text-[7px] font-semibold leading-tight ${scheme.title}`}>{exec.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Division Managers */}
            {divisionManagers.length > 0 && (
                <div>
                    <h3 className="text-[10px] font-bold text-gray-700 mb-1 text-center">Division Managers</h3>
                    <div className="grid grid-cols-5 gap-1.5">
                        {divisionManagers.map((manager, index) => {
                            const scheme = managerColorSchemes[index % managerColorSchemes.length];
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedMember(manager)}
                                    className={`${scheme.card} rounded text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200`}
                                >
                                    <img src={manager.photoUrl} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/src/images/placeholder-male.png'; }} alt={manager.name} className={`w-7 h-7 rounded-full mb-0.5 mx-auto object-cover border ${scheme.img}`} />
                                    <p className={`font-bold text-[8px] leading-tight ${scheme.name}`}>{manager.name}</p>
                                    <p className={`text-[7px] font-semibold leading-tight ${scheme.title}`}>{manager.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {selectedMember && (
                <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
            )}
        </div>
    );
};