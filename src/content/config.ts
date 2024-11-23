import { defineCollection, reference, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    heading: z.string().optional(),
    author: reference('authors').default('nekok500'),
    draft: z.boolean().default(false),
  }),
})

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
  }),
})

export const collections = {
  blog,
  authors,
}
