module.exports = {
  plugins: [],
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      backgroundImage: {
        navbarImage: 'conic-gradient(#da1b8d calc(var(--nav-progress) * 1%), #ababbe 0)',
        strikethrough: 'linear-gradient(transparent calc(100% - 1px), #78787c 1px)',
      },
      animation: {
        navProgress: 'navProgress 4s 1 forwards',
        containerPulse: 'containerPulse 0.5s ease-in-out 1',
        containerPulseIn: 'containerPulseIn 0.5s ease-in 1',
      },
      keyframes: {
        navProgress: {
          '0%': { '--nav-progress': 0 },
          '100%': { '--nav-progress': 'var(--nav-progress-value)' },
        },
        containerPulse: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '50%': {
            transform: 'scale3d(1.15, 1.15, 1.05)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        containerPulseIn: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '50%': {
            transform: 'scale3d(1.05, 1.05, 1.05)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
      },
      colors: {
        background: '#fbfbff',
        primary: '#202c51',
        secondary: '#ababbe',
        'secondary-dark': '#78787c',
        navbar: '#0d2360',
        cta: '#0961d2',
      },
    },
  },
};
