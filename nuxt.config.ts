export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Katalog digitalnih i zelenih vještina - HZZ.hr',
      meta: [
        { name: 'description', content: 'Katalog digitalnih i zelenih vještina' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
  modules: [
    '@vueuse/nuxt',
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
  runtimeConfig: {
    public: {
      URL: process.env.BASE_URL,
    },
  },
  devServerHandlers: [],
})
