/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    extend: {
      gridTemplateColumns: {
        '35/65': '35% 65%',
      },

      fontFamily: {
        sora: ['"Sora"'],
      },
      colors: {
        disabled: '#aaa',
        fill: {
          disabled: '#fbfbfb',
          dark: 'rgb(var(--ds-fill-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-fill-light) / <alpha-value>)',
        },
        description: '#606774',
        outline: '#F2F2F2',
        highlight: '#4F46E5',
        primary: '#1E40AF',
        dark: '#2D3132',
        success: '#66CB44',
        danger: '#EF4444',
        'danger-light': '#fff8f7',
        muted: '#6C6F70',
      },
    },
  },
  plugins: [
    // require("@tailwindcss/line-clamp"),
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
