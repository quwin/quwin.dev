import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'quarter-spanish-white': '#f7f1e3',
        'cashmere': '#e5c89f',
        'tan': '#d1b07b',
        'limed-oak': '#a77d52',
        'mondo': '#4a3b30'
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        lato: ['var(--font-lato)'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
