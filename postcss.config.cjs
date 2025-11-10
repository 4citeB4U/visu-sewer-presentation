// Tailwind v4 requires the separate PostCSS plugin package
// https://tailwindcss.com/docs/installation#postcss
module.exports = {
  // Use array form to avoid any plugin auto-resolve ambiguity
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};