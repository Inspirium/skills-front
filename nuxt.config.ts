import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Katalog digitalnih i zelenih vještina - HZZ.hr',
    description: 'Katalog digitalnih i zelenih vještina',
  },
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: [
      'gsap',
      '@heroicons/vue',
      '@headlessui/vue',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },
  vueuse: {
    ssrHandlers: true,
  },
  publicRuntimeConfig: {
    URL: process.env.BASE_URL,
  },
})
