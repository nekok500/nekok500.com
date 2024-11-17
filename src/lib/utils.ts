import type { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

export function yyyyMMdd(date: Date): string {
  return date.toISOString().substring(0, 10).replace(/-/g, '')
}

export function toSlug(obj: MicroCMSContentId & MicroCMSDate) {
  const jst = new Date(new Date(obj.publishedAt!).getTime() + 9 * 3600 * 1000) // +9時間
  return `${yyyyMMdd(jst)}-${obj.id}`
}

export function fromSlug(slug: string) {
  return slug.substring(9) || slug
}
