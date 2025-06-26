import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primario: {
          100: '#E0F2FE',
          500: '#3B82F6',
          700: '#1D4ED8',
        },
        secundario: {
          100: '#FEF9C3',
          500: '#F59E0B',
          700: '#B45309',
        }
      },
    },
  },
  plugins: [],
};

export default config;
