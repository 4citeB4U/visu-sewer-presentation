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
        // Run all models in parallel
        const results = await Promise.all([
            gemmaLLM.chat(question, [{ role: 'system', content: context }]),
            llamaLLM.chat(question, [{ role: 'system', content: context }]),
            phi3LLM.chat(question, [{ role: 'system', content: context }])
        ]);
        // Aggregate responses
        return {
            responses: results,
            embeddings: contextEmbedding
        };
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
}

export const agentTeam = new AgentTeam();
window.agentTeam = agentTeam;
