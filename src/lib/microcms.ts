import {
  createClient,
  type MicroCMSContentId,
  type MicroCMSDate,
} from 'microcms-js-sdk'

export type Blog = {
  title: string
  heading?: string
  content: string
  tags: string[]
} & MicroCMSContentId &
  MicroCMSDate

export type Tag = {
  id: string
  name: string
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
})
