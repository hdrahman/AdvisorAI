/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',      // Primary background
        'dark-panel': '#1e293b',    // Secondary panels
        'dark-border': '#334155',   // Borders
        'accent-blue': '#60a5fa',   // Accent color
      },
    },
  },
  plugins: [],
}
