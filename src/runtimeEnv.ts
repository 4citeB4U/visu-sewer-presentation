/* Small runtime initializer that exposes selected Vite envs on window in a safe way.
   We import this from index.tsx so it's bundled by Vite and runs before the app uses
   window.OPENROUTER_API_KEY. This avoids relying on import.meta.env inside an
   inline module script in index.html which can be undefined on some hosts.
*/

declare global {
  interface Window {
    OPENROUTER_API_KEY?: string;
    OPENROUTER_MODEL?: string;
    SITE_URL?: string;
    SITE_TITLE?: string;
  }
}

// Use optional chaining to avoid errors during SSR/static analysis.
const env = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env : {};

// Only set when not already set on window. This allows CI/host to override values
// by writing a runtime config before the bundle (or using a global in GH Pages).
window.OPENROUTER_API_KEY = window.OPENROUTER_API_KEY || env.VITE_OPENROUTER_API_KEY || '';
window.OPENROUTER_MODEL = window.OPENROUTER_MODEL || env.VITE_OPENROUTER_MODEL || '';
window.SITE_URL = window.SITE_URL || env.VITE_SITE_URL || '';
window.SITE_TITLE = window.SITE_TITLE || env.VITE_SITE_TITLE || '';

// For debugging in deployed environments you can uncomment the next line.
// console.debug('runtimeEnv: OPENROUTER_MODEL=', window.OPENROUTER_MODEL);

export { };

