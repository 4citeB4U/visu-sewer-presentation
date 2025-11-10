// LEEWAY
// Description: References page showing comprehensive data sources and evidence for all claims
// Created: 2025
// Modified: 2025

import React from 'react';
import { DeckSection } from '../../types';

export const References: React.FC<{ section: DeckSection }> = ({ section }) => {
    if (section.content.type !== 'references') return null;

    const { pageReferences, generalSources, methodology } = section.content;

    return (
    <div className="h-full flex flex-col bg-linear-to-br from-slate-50 to-blue-50 overflow-hidden">
            <div className="shrink-0 p-4 border-b-2 border-slate-300">
                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                <p className="text-xs text-slate-700 mt-1">{section.narrative}</p>
            </div>

            <div className="grow overflow-y-auto p-4 space-y-3">
                {/* Page-by-Page References */}
                <div className="space-y-2">
                    <h3 className="text-base font-bold text-blue-900 sticky top-0 bg-blue-100 p-2 rounded">
                        📊 Page-by-Page Evidence
                    </h3>
                    {pageReferences.map((pageRef, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-3 border-l-4 border-blue-500">
                            <h4 className="text-sm font-bold text-blue-800 mb-1">
                                Page {pageRef.pageNumber}: {pageRef.pageTitle}
                            </h4>
                            <div className="space-y-2">
                                {pageRef.claims.map((claimData, claimIdx) => (
                                    <div key={claimIdx} className="ml-2">
                                        <p className="text-xs font-semibold text-gray-800 mb-0.5">
                                            ✓ {claimData.claim}
                                            {claimData.visibility && (
                                                <span className={`ml-2 px-2 py-0.5 text-[8px] rounded ${
                                                    claimData.visibility === 'Public' ? 'bg-green-100 text-green-700' :
                                                    claimData.visibility === 'AO-Request' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {claimData.visibility}
                                                </span>
                                            )}
                                        </p>
                                        <ul className="ml-4 space-y-0.5">
                                            {claimData.sources.map((source, sourceIdx) => (
                                                <li key={sourceIdx} className="text-[10px] text-gray-600 list-disc">
                                                    {source}
                                                    {claimData.filePaths && claimData.filePaths[sourceIdx] && (
                                                        <span className="ml-2 text-blue-600 font-mono">
                                                            📁 {claimData.filePaths[sourceIdx]}
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* General Sources */}
                <div className="space-y-2">
                    <h3 className="text-base font-bold text-green-900 sticky top-0 bg-green-100 p-2 rounded">
                        📚 General Reference Sources
                    </h3>
                       <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                           <h4 className="text-sm font-bold text-green-800 mb-1">Visu-Sewer Official Resources</h4>
                           <ul className="ml-2 space-y-0.5">
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://visu-sewer.com" target="_blank" rel="noopener noreferrer">https://visu-sewer.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://visu-sewer.com/projects" target="_blank" rel="noopener noreferrer">https://visu-sewer.com/projects</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://visu-sewer.com/overview" target="_blank" rel="noopener noreferrer">https://visu-sewer.com/overview</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://visu-sewer.com/serving-municipalities" target="_blank" rel="noopener noreferrer">https://visu-sewer.com/serving-municipalities</a></li>
                           </ul>
                       </div>
                       <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                           <h4 className="text-sm font-bold text-green-800 mb-1">Municipal & Project-Specific Reports</h4>
                           <ul className="ml-2 space-y-0.5">
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://hvmsd.org" target="_blank" rel="noopener noreferrer">https://hvmsd.org</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://hvmsd.org/interceptor-rehabilitation-project" target="_blank" rel="noopener noreferrer">https://hvmsd.org/interceptor-rehabilitation-project</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://hvmsd.org/wp-content/uploads/2023/08/HOV_Contract_Award.pdf" target="_blank" rel="noopener noreferrer">HOVMSD Contract Award PDF</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://villageoffoxpoint.com" target="_blank" rel="noopener noreferrer">https://villageoffoxpoint.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://villageoffoxpoint.com/213/Public-Works" target="_blank" rel="noopener noreferrer">https://villageoffoxpoint.com/213/Public-Works</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://villageoffoxpoint.com/DocumentCenter/View/6052/2025-Sewer-Lining-Project" target="_blank" rel="noopener noreferrer">2025 Fox Point Sewer Lining Project PDF</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://schaumburg.com" target="_blank" rel="noopener noreferrer">https://schaumburg.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://schaumburg.novusagenda.com/agendapublic/Blobs/857364.pdf" target="_blank" rel="noopener noreferrer">Schaumburg Project PDF</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://wauwatosa.net" target="_blank" rel="noopener noreferrer">https://wauwatosa.net</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://wauwatosa.net/services/public-works/sewers-stormwater" target="_blank" rel="noopener noreferrer">Wauwatosa Sewers & Stormwater</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://mtvernon.com/projects" target="_blank" rel="noopener noreferrer">https://mtvernon.com/projects</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://mtvernon.com/publicworks/sewer" target="_blank" rel="noopener noreferrer">Mt. Vernon Public Works Sewer</a></li>
                           </ul>
                       </div>
                       <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                           <h4 className="text-sm font-bold text-green-800 mb-1">Industry Sources & Technology Context</h4>
                           <ul className="ml-2 space-y-0.5">
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://trenchlesstechnology.com" target="_blank" rel="noopener noreferrer">https://trenchlesstechnology.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://nationalliner.com" target="_blank" rel="noopener noreferrer">https://nationalliner.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://pipelinerpros.com" target="_blank" rel="noopener noreferrer">https://pipelinerpros.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://patrioticplumbingandrooter.com/cured-in-place-pipe-cipp/" target="_blank" rel="noopener noreferrer">CIPP Technology Education</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://wwdmag.com" target="_blank" rel="noopener noreferrer">https://wwdmag.com</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://bluefieldresearch.com" target="_blank" rel="noopener noreferrer">https://bluefieldresearch.com</a></li>
                           </ul>
                       </div>
                       <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                           <h4 className="text-sm font-bold text-green-800 mb-1">Regulatory & Financial Reporting</h4>
                           <ul className="ml-2 space-y-0.5">
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://madsewer.org" target="_blank" rel="noopener noreferrer">https://madsewer.org</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://ci.faribault.mn.us/documentcenter/view/11990/Sanitary-Sewer-Rehabilitation-Project-2020.pdf" target="_blank" rel="noopener noreferrer">Faribault Sewer Rehab Project PDF</a></li>
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://villageofshorewood.org/CivicAlerts.aspx?AID=122" target="_blank" rel="noopener noreferrer">Shorewood Civic Alerts</a></li>
                           </ul>
                       </div>
                       <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                           <h4 className="text-sm font-bold text-green-800 mb-1">Relevant News & Announcements</h4>
                           <ul className="ml-2 space-y-0.5">
                               <li className="text-[10px] text-blue-700 list-disc ml-4"><a href="https://fox11online.com/news/local/heart-of-the-valley-awards-contract-for-sewerage-rehabilitation-project" target="_blank" rel="noopener noreferrer">Heart of the Valley Contract Award Coverage</a></li>
                           </ul>
                       </div>
                    {generalSources.map((genSource, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
                            <h4 className="text-sm font-bold text-green-800 mb-1">
                                {genSource.category}
                            </h4>
                            <ul className="ml-2 space-y-0.5">
                                {genSource.sources.map((source, sourceIdx) => (
                                    <li key={sourceIdx} className="text-[10px] text-gray-600 list-disc ml-4">
                                        {source}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Methodology */}
                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-3 border-l-4 border-amber-500">
                    <h3 className="text-base font-bold text-amber-900 mb-1">
                        🔬 Methodology & Validation
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                        {methodology}
                    </p>
                </div>

                {/* Footer Note */}
                <div className="bg-slate-100 rounded-lg p-3 border border-slate-300">
                    <p className="text-[10px] text-slate-600 text-center italic">
                        <strong>Transparency Commitment:</strong> All data sources are available for independent verification upon request. 
                        Financial projections follow conservative assumptions validated by Fort Point Capital due diligence. 
                        Third-party benchmarks are from recognized industry authorities (NASSCO, WEF, EPA, IBISWorld).
                    </p>
                </div>
            </div>
        </div>
    );
};
