module.exports = {
  build: {
    vendor: ['axios']
  },
  modules: [
    'nuxt-babel',
  ],
  css: [
    'reset-css',
    {
      src:'@/assets/styles/main.scss', lang: 'sass'
    },
  ],
}