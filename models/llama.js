// Minimal Llama LLM shim for builds/dev
export const llamaLLM = {
  isLoaded: true,
  async initialize() { this.isLoaded = true; },
  getStatus() { return { model: 'llama', name: 'Llama (shim)' }; },
  async chat(question, messages) {
    return { text: `Llama fallback answer for: ${String(question || '')}` };
  },
};
