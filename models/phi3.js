// Minimal PHI-3 LLM shim for builds/dev
export const phi3LLM = {
  isLoaded: true,
  async initialize() { this.isLoaded = true; },
  getStatus() { return { model: 'phi3', name: 'PHI-3 (shim)' }; },
  async chat(question, messages) {
    return { text: `PHI-3 fallback answer for: ${String(question || '')}` };
  },
};
