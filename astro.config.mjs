// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { client } from './src/lib/microcms'
import Blog, { blogUrls } from './src/pages/blog.astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap({
      customPages: blogUrls,
    }),
  ],
  output: 'hybrid',
  site: 'https://nekok500.com',
  redirects: {
    '/blogs': '/blog',
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml',
    },
  }),
  vite: {
    define: {
      'process.env.MICROCMS_SERVICE_DOMAIN': JSON.stringify(
        process.env.MICROCMS_SERVICE_DOMAIN,
      ),
      'process.env.MICROCMS_API_KEY': JSON.stringify(
        process.env.MICROCMS_API_KEY,
      ),
    },
  },
})
