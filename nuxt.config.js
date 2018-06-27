module.exports = {
  build: {
    vendor: ['axios']
  },
  modules: [
    'nuxt-babel', //allows to use .babelrc
  ],
  css: [
    'reset-css',
    {
      src:'@/assets/styles/main.scss', lang: 'sass'
    },
  ],
}