/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#e2e8f0',
        accent: '#5eead4',
        accentDark: '#14b8a6',
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(circle at 20% 20%, rgba(94, 234, 212, 0.12), transparent 25%), radial-gradient(circle at 80% 0%, rgba(79, 70, 229, 0.15), transparent 30%)',
        'radial-dark': 'radial-gradient(circle at 20% 20%, rgba(94, 234, 212, 0.14), transparent 22%), radial-gradient(circle at 70% 10%, rgba(59, 130, 246, 0.12), transparent 25%)',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.25)',
      },
    },
  },
  plugins: [],
};
