export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          DEFAULT: '#111318',
          surface: '#181b22',
          panel: '#1f222b',
          gold: '#d8a74a',
          accent: '#f0c56d',
          text: '#f6f1e6',
          muted: '#8a8f98',
        },
      },
      boxShadow: {
        glass: '0 8px 30px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
