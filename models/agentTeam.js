/* LEEWAY HEADER
TAG: AI.AGENT.TEAM
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: users
ICON_SIG: CD534113
5WH: WHAT=Orchestrates Gemma, Llama, PHI-3 models in parallel;
WHY=Ensemble Q&A, context embedding, consensus logic;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:/Visu-Sewer Strategic Asset & Growth Deck/models/agentTeam.js;
WHEN=2025-11-09;
HOW=Parallel model calls, embedding, aggregation
AGENTS: GEMMA, CLAUDE, GPT4, LLAMA, PHI3
SPDX-License-Identifier: MIT
*/

import { gemmaLLM } from './gemma.js';
import { llamaLLM } from './llama.js';
import { phi3LLM } from './phi3.js';

// Simple embedding using text vectorization (can be replaced with more advanced embedding)
function embedText(text) {
    // Basic: split words, map to char codes, sum
    return text.split(' ').map(w => w.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0));
}

export class AgentTeam {
    constructor() {
        this.models = [gemmaLLM, llamaLLM, phi3LLM];
        this.isLoaded = false;
    }

    async initialize() {
        await Promise.all(this.models.map(m => m.initialize()));
        this.isLoaded = true;
    }

    async embedContext(context) {
        // Embed context for each model
        return this.models.map(model => ({
            model: model.getStatus().model,
            embedding: embedText(context)
        }));
    }

    async askAllModels(question, context = '') {
        if (!this.isLoaded) await this.initialize();
        // Embed context
        const contextEmbedding = await this.embedContext(context);
        // Retrieve relevant local data (RAG) to augment context
        const localData = await this.retrieveLocalData(question, context);
        const augmentedContext = `${context}\n\n---LOCAL_DATA_START---\n${localData}\n---LOCAL_DATA_END---`;

        // Run all models in parallel
        const results = await Promise.all([
            gemmaLLM.chat(question, [{ role: 'system', content: augmentedContext }]),
            llamaLLM.chat(question, [{ role: 'system', content: augmentedContext }]),
            phi3LLM.chat(question, [{ role: 'system', content: augmentedContext }])
        ]);
        // Aggregate responses
        return {
            responses: results,
            embeddings: contextEmbedding
        };
    }

    // Basic local retriever that fetches small data files from the built `data/` folder
    // and returns a short textual summary to include in model context. This is lightweight
    // and intended to provide grounding for RAG-style answers about charts and figures.
    async retrieveLocalData(question, context = '') {
        // Determine base URL for static assets
        let base = '/';
        try { base = import.meta.env.BASE_URL || '/'; } catch (e) { base = (window && window.BASE_URL) || '/'; }

        // Map keywords to data files we ship in dist/data
        const fileMap = {
            'cctv': 'cctv_inspection.csv',
            'inspection': 'cctv_inspection.csv',
            'project': 'project_costs.csv',
            'cost': 'project_costs.csv',
            'bid': 'bid_amounts.csv',
            'schedule': 'contractor_schedule.csv',
            'evidence': 'Evidence_Log.xlsx'
        };

        const qLower = (question || '').toLowerCase() + ' ' + (context || '').toLowerCase();
        const hits = new Set();
        for (const key of Object.keys(fileMap)) {
            if (qLower.includes(key)) hits.add(fileMap[key]);
        }
        // If no explicit hits, include a small set of core files that are likely relevant
        if (hits.size === 0) {
            hits.add('project_costs.csv');
            hits.add('cctv_inspection.csv');
        }

        const summaries = [];
        for (const fname of hits) {
            const url = `${base}data/${fname}`;
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    summaries.push(`(Could not fetch ${fname}: HTTP ${res.status})`);
                    continue;
                }
                const text = await res.text();
                // For CSV-like files, take header + first 5 rows
                const lines = text.split(/\r?\n/).filter(Boolean);
                const preview = lines.slice(0, Math.min(6, lines.length)).join('\n');
                summaries.push(`File: ${fname}\n${preview}`);
            } catch (e) {
                summaries.push(`(Error fetching ${fname}: ${String(e)})`);
            }
        }

        // Also include the list of references from constants if available via a built JSON
        try {
            const refUrl = `${base}data/references.json`;
            const r = await fetch(refUrl);
            if (r.ok) {
                const j = await r.json();
                const topRefs = (j.pageReferences || []).slice(0, 5).map(p => `${p.pageNumber}: ${p.pageTitle}`).join('; ');
                if (topRefs) summaries.push(`References (top pages): ${topRefs}`);
            }
        } catch (e) { /* optional */ }

        return summaries.join('\n\n');
    }

    async answer(question, context = '') {
        const { responses } = await this.askAllModels(question, context);
        // Simple consensus: pick the longest response (can be improved)
        const best = responses.reduce((a, b) => (a.text.length > b.text.length ? a : b));
        return {
            best,
            all: responses
        };
    }

    /**
     * Explain a chart or dataset. Accepts a short identifier or natural language
     * describing which chart to explain. The method will retrieve local data,
     * craft an analyst prompt, and return the models' best answer.
     */
    async explainChart(selector, question = '') {
        const localData = await this.retrieveLocalData(selector, question);
        const prompt = `You are a data analyst. The user requests: ${question || selector}.\n\nUse the following local data as context:\n${localData}\n\nProvide: 1) A short summary of what the chart likely shows. 2) Three actionable insights. 3) One suggested visualization improvement or follow-up analysis.`;
        return await this.answer(prompt, `Chart explanation context for selector: ${selector}`);
    }
}

export const agentTeam = new AgentTeam();
window.agentTeam = agentTeam;
