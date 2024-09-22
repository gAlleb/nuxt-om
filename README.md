## About
This is an omFM Radio website project. It offers 100% code customizability. No Customizer or Backend settings are available. Basic JS, Vue.js, HTML, CSS, and possibly some other skills are required for customization. There’s no drag-and-drop; only simple code. Centrifugo SSE events ready (channel suffix: "station:radio"), iTunes, Spotify coverart. 

### Available setups:
- traditional hosting (SSG/npm generate)
- node hosting (SSR/ npm run build)
- Netlify, Vercel
- Docker (Dockerimage + docker-compose.yaml included)

<img src="https://omfm.ru/assets/img/git/1.png" alt="1" width="300"/>
<img src="https://omfm.ru/assets/img/git/2.png" alt="2" width="300"/>
<img src="https://omfm.ru/assets/img/git/3.png" alt="3" width="300"/>
<img src="https://omfm.ru/assets/img/git/4.png" alt="4" width="300"/>

## Modules

### Following modules are installed:

- nuxt-headlessui - [Documentation](https://github.com/P4sca1/nuxt-headlessui)
- @nuxt/ui - [Documentation](https://ui.nuxt.com/)
- @nuxtjs/i18n - [Documentation](https://v8.i18n.nuxtjs.org/)
- @pinia/nuxt - [Documentation](https://pinia.vuejs.org/ssr/nuxt.html)
- @pinia-plugin-persistedstate/nuxt - [Documentation](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html)
- nuxt-gtag - [Documentation](hattps://github.com/johannschopplich/nuxt-gtag)
- @nuxt/content - [Documentation](https://content.nuxt.com/)
- @nuxtjs/seo - [Documentation](https://nuxtseo.com/nuxt-seo/getting-started/installation)
- @nuxt/image 
- nuxt-aos 
- nuxt-easy-lightbox
- nuxt-swiper 

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt 3.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production For SSG

```bash
# npm
npm run generate

# pnpm
pnpm run generate

# yarn
yarn generate
```

### How to deploy on traditional hosting (Plesk, cPanel, etc.)

After you run the `generate` command, you will have a `.output` folder that contains `public`, `server` and a `nitro.json`. All you need is to copy the folders and files inside the `.output/public` and paste it in your domain directory to deploy your application.

### How to deploy on modern hosting (Netlify, Vercel, etc.)

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/deployment#supported-hosting-providers) to learn more.

## Production (For Advanced Users)

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Production with docker:

```bash
docker compose up -d
```

