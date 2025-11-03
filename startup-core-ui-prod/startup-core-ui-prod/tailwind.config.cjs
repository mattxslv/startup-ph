/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
      },
    },
    extend: {
      boxShadow: {
        active: '0 0 12px 0 rgba(0, 0, 0, 0.1) inset',
        modal: '0 10px 24px rgba(0, 0, 0, 0.1)',
        tooltip: '0px 8px 16px rgba(0, 0, 0, 0.06)',
        dropdown: '0 4px 10px rgba(69, 76, 181, 0.15)', /* or dropdown */
        card: '0 5px 27px 0px rgba(0, 0, 0, 0.05)',
        'card-badge': '0 4px 6px 0px rgba(0, 0, 0, 0.12)'
      },
      colors: {
        description: 'rgb(var(--ds-description) / <alpha-value>)',
        placeholder: 'rgb(var(--ds-placeholder) / <alpha-value>)',
        disabled: 'rgb(var(--ds-disabled) / <alpha-value>)',
        outline: 'rgb(var(--ds-border) / <alpha-value>)',
        'outline-active': 'rgb(var(--ds-outline-active) / <alpha-value>)',
        fill: {
          light: 'rgb(var(--ds-fill-light) / <alpha-value>)',
          dark: 'rgb(var(--ds-fill-dark) / <alpha-value>)',
          disabled: 'rgb(var(--ds-fill-disabled) / <alpha-value>)',
        },
        primary: {
          base: 'rgb(var(--ds-primary-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-primary-light) / <alpha-value>)',
        },
        secondary: {
          base: 'rgb(var(--ds-secondary-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-secondary-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-secondary-light) / <alpha-value>)',
        },
        success: {
          base: 'rgb(var(--ds-success-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-success-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-success-light) / <alpha-value>)',
        },
        info: {
          base: 'rgb(var(--ds-info-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-info-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-info-light) / <alpha-value>)',
        },
        warning: {
          base: 'rgb(var(--ds-warning-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-warning-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-warning-light) / <alpha-value>)',
        },
        danger: {
          base: 'rgb(var(--ds-danger-base) / <alpha-value>)',
          dark: 'rgb(var(--ds-danger-dark) / <alpha-value>)',
          light: 'rgb(var(--ds-danger-light) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    }),
    require("@tailwindcss/typography"),
    require('@tailwindcss/line-clamp'),
  ],
}
