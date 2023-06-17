/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundSize: {
      '400%': '400%',
    },
    extend: {
      animation: {
        changecolors: 'changecolors 3s linear infinite',
      },
      keyframes: {
        changecolors: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '400%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'light-gradient':
          'linear-gradient(to right, #6366f1, #7c3aed, #a855f7, #d946ef, #f472b6, #d946ef, #a855f7, #7c3aed, #6366f1)',
        'dark-gradient':
          'linear-gradient(to right, #b91c1c, #d61e1e, #ef4444, #f87171, #fca5a5, #f87171, #ef4444, #d61e1e, #b91c1c)',
      },
      colors: {
        purpleDark: '#8A4D76',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar')],
}
