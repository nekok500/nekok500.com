export function dateStr(date: Date | string): string {
  if (typeof date === 'string') date = new Date(date)

  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
