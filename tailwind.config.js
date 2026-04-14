/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'peace-blue': '#1e3a8a',
        'peace-light': '#3b82f6',
        'peace-sky': '#0ea5e9',
      },
    },
  },
  plugins: [],
}
