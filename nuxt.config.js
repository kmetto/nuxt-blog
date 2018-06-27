const env = require('./env');

module.exports = {
  env,
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/posts/'),
      });
    },
  },
  build: {
    vendor: ['axios'],
  },
  modules: [
    'nuxt-babel', // allows to use .babelrc
  ],
  css: [
    'reset-css',
    {
      src: '@/assets/styles/main.scss', lang: 'sass',
    },
  ],
};
