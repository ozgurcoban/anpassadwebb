import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      body: ['var(--font-open-sans)', 'ui-sans-serif', 'system-ui'],
      heading: ['var(--font-quicksand)', 'ui-sans-serif', 'system-ui'],
      quicksand: ['var(--font-quicksand)', 'ui-sans-serif', 'system-ui'],
    },
    container: {
      center: true,
      padding: '0',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: `hsl(var(--background))`,
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        link: {
          DEFAULT: 'hsl(var(--link))',
          hover: 'hsl(var(--link-hover))',
        },
        'brand-purple': {
          DEFAULT: 'hsl(var(--brand-purple))',
          foreground: 'hsl(var(--brand-purple-foreground))',
          light: 'hsl(var(--brand-purple-light))',
        },
        'brand-pink': {
          DEFAULT: 'hsl(var(--brand-pink))',
          foreground: 'hsl(var(--brand-pink-foreground))',
          light: 'hsl(var(--brand-pink-light))',
        },
        'brand-blue': {
          DEFAULT: 'hsl(var(--brand-blue))',
          foreground: 'hsl(var(--brand-blue-foreground))',
          light: 'hsl(var(--brand-blue-light))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        custom: '4px 8px 16px 0px hsl(var(--shadow))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        rainbow: 'rainbow 5s infinite linear',
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '2em',
            },
            figure: {
              marginTop: '0',
              marginBottom: '2em',
            },
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
