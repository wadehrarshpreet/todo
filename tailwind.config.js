module.exports = {
  plugins: [],
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      backgroundImage: {
        navbarImage: 'conic-gradient(#da1b8d calc(var(--nav-progress) * 1%), #ababbe 0)',
      },
      animation: {
        navProgress: 'navProgress 4s 1 forwards',
      },
      keyframes: {
        navProgress: {
          '0%': { '--nav-progress': 0 },
          '100%': { '--nav-progress': 'var(--nav-progress-value)' },
        },
      },
      colors: {
        background: '#fbfbff',
        primary: '#202c51',
        secondary: '#ababbe',
        navbar: '#0d2360',
      },
    },
  },
};
