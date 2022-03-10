import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Skills front',
  },
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: ['gsap'],
  },
  vueuse: {
    ssrHandlers: true,
  },
  publicRuntimeConfig: {
    URL: process.env.BASE_URL,
  },
})
