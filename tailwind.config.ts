import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#1e1e1e',
        panel: '#252525',
        'panel-border': '#333333',
        'panel-hover': '#2d2d2d',
        accent: '#0d99ff',
        'accent-hover': '#0b8ae0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
