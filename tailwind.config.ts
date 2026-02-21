import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',
        accent: '#1e293b',
        'accent-dark': '#0f172a',
      },
      borderRadius: {
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
