// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'

import react from '@astrojs/react'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), react(), sitemap()],
  site: 'https://nekok500.com',
  redirects: {
    '/blogs': '/blog',
    '/blog/20241118-new-blog/': '/blog/created-astro-blog',
  },
})
