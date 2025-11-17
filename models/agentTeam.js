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

import { search as docSearch } from './docStore.js';
import { gemmaLLM } from './gemma.js';
import { llamaLLM } from './llama.js';
import { phi3LLM } from './phi3.js';

// sanitize text for model prompts: remove HTML, control chars, and truncate
function sanitizeForPrompt(s, maxLen = 800) {
    if (!s) return '';
    // remove HTML tags
    let t = String(s).replace(/<[^>]*>/g, ' ');
    // replace sequences of whitespace with single space
    t = t.replace(/\s+/g, ' ').trim();
    // strip any long base64 or JS bundle fragments (heuristic)
    t = t.replace(/data:\w+\/[\w+\-\.]+;base64,[A-Za-z0-9+/=]+/g, ' ');
    t = t.replace(/https?:\/\/[^\s]+\.(js|css)\?[^\s]*/g, ' ');
    // take the first maxLen characters, but try to keep whole words
    if (t.length <= maxLen) return t;
    const sub = t.slice(0, maxLen);
    const lastSpace = sub.lastIndexOf(' ');
    return (lastSpace > Math.floor(maxLen * 0.6) ? sub.slice(0, lastSpace) : sub) + '...';
}

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
        // 1) Try to initialize models, but never crash if they fail
        try {
            if (!this.isLoaded) {
                await this.initialize();
            }
        } catch (err) {
            console.warn('[AgentTeam] initialize failed, will continue with offline RAG only:', err);
            this.isLoaded = false;
        }

        // 2) Embed context where possible
        let contextEmbedding = [];
        try {
            contextEmbedding = await this.embedContext(context);
        } catch (err) {
            console.warn('[AgentTeam] embedContext failed:', err);
            contextEmbedding = [];
        }

        // 3) Retrieve relevant local data (RAG) to augment context
        let localData = '';
        try {
            localData = await this.retrieveLocalData(question, context);
        } catch (err) {
            console.warn('[AgentTeam] retrieveLocalData failed:', err);
            localData = '';
        }

        const augmentedContext = [
            context || '',
            localData ? `\n\n--- LOCAL DATA & EVIDENCE ---\n${localData}` : ''
        ].join('');

        // 4) Ask each model individually and collect responses; failures are isolated
        const responses = [];
        const errors = [];

        for (const model of this.models) {
            const status = (model.getStatus && model.getStatus()) || { model: 'unknown' };
            const modelName = status.model || 'unknown';

            try {
                const resp = await model.chat(question, [{ role: 'system', content: augmentedContext }]);
                if (resp && (resp.text || resp.answer || resp.content)) {
                    // Normalize text field
                    const text = resp.text || resp.answer || resp.content || '';
                    responses.push({ ...resp, text, model: resp.model || modelName });
                } else if (resp) {
                    responses.push({ ...resp, text: JSON.stringify(resp).slice(0, 200), model: resp.model || modelName });
                } else {
                    console.warn(`[AgentTeam] Model ${modelName} returned empty response.`);
                }
            } catch (err) {
                console.warn(`[AgentTeam] Model ${modelName} failed:`, err);
                errors.push({ model: modelName, error: String(err) });
            }
        }

        // 5) If at least one model answered, pick the best (heuristic: longest text)
        if (responses.length > 0) {
            // Filter out obviously unhelpful fallback responses (small boilerplate, 'fallback' markers)
            const isHelpful = (r) => {
                const txt = String(r.text || '').toLowerCase();
                if (!txt || txt.split(/\s+/).length < 8) return false;
                if (/fallback answer|fallback|not available|error|no local model|could not load/i.test(txt)) return false;
                // avoid returning raw prompts being echoed
                if (txt.trim().startsWith('you are a data analyst') || txt.trim().startsWith('user:')) return false;
                return true;
            };

            const useful = responses.filter(isHelpful);
            if (useful.length > 0) {
                const best = useful.reduce((a, b) => ((a.text || '').split(/\s+/).length > (b.text || '').split(/\s+/).length ? a : b));
                return { best, all: responses, localDataPreview: localData, errors, embeddings: contextEmbedding };
            }

            // If no useful model responses, fall through to offline RAG
            console.warn('[AgentTeam] Model responses present but judged unhelpful; using offline RAG fallback.');
        }

        // 6) No models answered — build an offline RAG answer
        const offlineText = this.buildOfflineRagAnswer(question, context, localData, errors);
        return {
            best: { text: offlineText, model: 'offline-rag', tokens: offlineText.split(/\s+/).length, hemisphere: 'browser' },
            all: [],
            localDataPreview: localData,
            errors,
            embeddings: contextEmbedding
        };
    }

    buildOfflineRagAnswer(question, context, localData, errors = []) {
        // Generate a compact, structured offline answer (Summary, 3 insights, 1 suggestion)
        const src = String(localData || '').toLowerCase();
        const hasSchedule = src.includes('mobilization') || src.includes('pipe lining') || src.includes('percent complete');
        const hasBids = src.includes('bidder name') || src.includes('bid amount');
        const hasCCTV = src.includes('defect type') || src.includes('severity');
        const hasCosts = src.includes('budgeted amount') || src.includes('actual spend') || src.includes('variance');

        const summaryParts = [];
        if (hasSchedule) summaryParts.push('A schedule/progress view showing tasks, dates, and percent-complete.');
        if (hasCCTV) summaryParts.push('Inspection/CCTV defect listings (types & severity).');
        if (hasBids) summaryParts.push('Bid comparisons showing bidder names and amounts.');
        if (hasCosts) summaryParts.push('Project cost lines with budget vs actual spend.');
        if (summaryParts.length === 0) summaryParts.push('Local data contains references to project schedules and financials.');

        const shortSummary = `Likely chart summary: ${summaryParts.join(' ')} `;

        const insights = [];
        if (hasSchedule) {
            insights.push('Critical-path focus: long-duration tasks (e.g., Pipe Lining) require prioritization to avoid downstream delays.');
            insights.push('Mobilization shows as complete — capitalize on this to accelerate mid-project tasks and staging.');
        }
        if (hasCCTV) {
            insights.push('Inspection data highlights defect concentrations (cracks, separation, infiltration) — prioritize high-severity segments for rehabilitation.');
        }
        if (hasBids) {
            insights.push('Bid position: Visu-Sewer appears competitively priced; validate margins and contingency if schedule risk grows.');
        }
        if (hasCosts && insights.length < 3) {
            insights.push('Compare budget vs actuals to identify cost overruns early and reallocate contingency.');
        }
        // ensure exactly three insights (fill generically if needed)
        while (insights.length < 3) {
            insights.push('Request a chart-specific numeric extraction (e.g., percent-complete by task or cost by year) to enable precise recommendations.');
        }

        const suggestion = hasSchedule || hasCosts
            ? 'Use a dual-panel view: Gantt/progress panel plus financials (planned vs actual) and show Earned Value metrics (PV/EV/AC, CPI, SPI).' 
            : 'Add a small comparison panel (bid table or defect frequency) and enable drill-down on rows.';

        let answer = '';
        answer += `Agent Lee (OFFLINE DATA SUMMARY)\n\n`;
        answer += `${shortSummary}\n\n`;
        answer += `Three actionable insights:\n`;
        insights.slice(0,3).forEach((ins, idx) => { answer += `${idx+1}) ${ins}\n`; });
        answer += `\nSuggested visualization improvement / follow-up analysis:\n- ${suggestion}\n\n`;
        if (errors && errors.length) {
            answer += `Note: Local model workers failed to respond: ${errors.map(e => e.model).join(', ')}. This answer was produced by heuristic offline analysis.\n`;
        }
        answer += `\nContext preview (sanitized):\n${sanitizeForPrompt(localData || 'No local data found.', 800)}\n`;

        return answer;
    }

    // Local retriever that delegates to the front-end docStore vector search.
    // Falls back to the legacy CSV-preview behavior if no docStore hits are found.
    async retrieveLocalData(question, context = '') {
        try {
            const query = `${question} ${context}`.trim();
            const hits = await docSearch(query, 6);
            if (hits && hits.length) {
                // Build a compact, sanitized preview from top hits. docStore returns { id, text, score }
                return hits.map((h, i) => `Chunk ${i + 1} (doc=${h.id || h.docId || 'unknown'}, score=${((h.score||0) || 0).toFixed(3)}):\n${sanitizeForPrompt((h.text || ''), 800)}`).join('\n\n');
            }
        } catch (e) {
            console.warn('docStore search failed, falling back to file previews', e);
        }

        // Fallback: legacy CSV preview behavior
        let base = '/';
        try { base = import.meta.env.BASE_URL || '/'; } catch (e) { base = (window && window.BASE_URL) || '/'; }

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
                // sanitize fetched file text to avoid injecting HTML or build artifacts
                const clean = sanitizeForPrompt(text, 1200);
                const lines = clean.split(/\r?\n/).filter(Boolean);
                const preview = lines.slice(0, Math.min(8, lines.length)).join('\n');
                summaries.push(`File: ${fname}\n${preview}`);
            } catch (e) {
                summaries.push(`(Error fetching ${fname}: ${String(e)})`);
            }
        }

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
        const result = await this.askAllModels(question, context);
        // `askAllModels` returns an object with { best, all, localDataPreview, errors }
        const best = result && result.best ? result.best : null;
        const all = result && (result.all || result.responses) ? (result.all || result.responses) : [];
        return { best, all, localDataPreview: result && result.localDataPreview, errors: result && result.errors };
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
if (typeof window !== 'undefined') window.agentTeam = agentTeam;
