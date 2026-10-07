/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#090d16',
        abyss: '#0f172a',
        gold: {
          50: '#fbf6eb',
          100: '#f8e7c9',
          300: '#e8c39e',
          400: '#d4a574',
          500: '#c4925a',
        },
        bloom: {
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 40px rgba(168, 85, 247, 0.25)',
        gold: '0 0 32px rgba(232, 195, 158, 0.28)',
      },
      backgroundImage: {
        'luxury-radial':
          'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(217, 70, 239, 0.12), transparent 45%), radial-gradient(ellipse at 10% 70%, rgba(56, 189, 248, 0.08), transparent 40%)',
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'float-mid': 'float 6.5s ease-in-out infinite',
        'float-fast': 'float 4.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3.2s ease-in-out infinite',
        sparkle: 'sparkle 2.6s ease-in-out infinite',
        flame: 'flame 0.7s ease-in-out infinite alternate',
        drift: 'drift 22s linear infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(6deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45', filter: 'blur(28px)' },
          '50%': { opacity: '0.9', filter: 'blur(18px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.7) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(18deg)' },
        },
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1) rotate(-2deg)', opacity: '0.9' },
          '100%': { transform: 'scaleY(1.18) scaleX(0.88) rotate(3deg)', opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(8vh) rotate(0deg)', opacity: '0' },
          '12%': { opacity: '0.7' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-90vh) rotate(40deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
