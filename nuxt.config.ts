// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/auth.js'],
  runtimeConfig: {
    public: {
      apiBase: 'https://ofl.vang.li/api' // Laravel API URL
      // apiBase: 'localhost:8000' // Laravel API URL
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})