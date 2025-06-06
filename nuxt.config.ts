// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  // nitro: { 
  //   prerender: {
  //     routes: ["/blog", "/blog/articles","/","/es/blog"],
  //     ignore: ["/dynamic"],
  //   },
  // },
  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/main.css', '~/assets/css/np_animate.css', '~/assets/css/np.css', '~/assets/css/christmas.css'],
  
  // mdc: { 
  //   highlight: {
  //     langs: ['ruby'],
  //   },
  // },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL, // change this to your site URL
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        // { rel: 'preconnect', href: 'https://rsms.me/' },
        // { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
        // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' },
      ],
      // script: [
      //   { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', tagPosition: 'bodyClose' }
      // ],
      htmlAttrs: {
        lang: 'en',
        class: 'scroll-smooth',
      },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [// remove this if you don't want to use @nuxt/content for your blog
  '@nuxt/content', '@nuxt/ui', [
    '@pinia/nuxt',
    {
      autoImports: ['defineStore'],
    },
  ], 'pinia-plugin-persistedstate/nuxt', 
    'nuxt-gtag', 
    '@nuxtjs/i18n', 
    "@nuxt/image", 
    'nuxt-aos', 
    "nuxt-easy-lightbox", 
    'nuxt-swiper', 
    '@pinia/nuxt'
    ],

  icon: {
      serverBundle: 'local',
      clientBundle: {
      // list of icons to include in the client bundle
      // icons: [
      //   // 'heroicons-solid:play',
      //   // 'heroicons-solid:stop',
      //   // ...
      // ],
      // scan all components in the project and include icons 
      scan: true,
      // include all custom collections in the client bundle
      includeCustomCollections: true, 
      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256,
    },
  },
  i18n: {
    // langDir: 'locales',
    lazy: true,
    baseUrl: process.env.SITE_URL,

    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'ru', name: 'Русский', language: 'ru-RU', file: 'ru.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' },
    ],
    debug: false,
    defaultLocale: 'en',
    // strategy: 'no_prefix',
    // strategy: 'prefix',
    // strategy: 'prefix_and_default',
    strategy: 'prefix_except_default',
    // rootRedirect: '/ja/about-ja',
    // customRoutes: 'config',

    // differentDomains: true,
    // skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: false,
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'root', // recommended
    // },
  },

  content: {
    experimental: {
      search: true
    },
    highlight: {
      // Code Theme used in all color schemes.
      theme: 'one-dark-pro',
    },
  },

  gtag: {
    id: process.env.GTAG_ID, // change this to your Google Analytics ID G-xxxxxxxxxx
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'color-mode',
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-08-05',
})