export function toDateString(date: Date) {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月
  ${date.getDate()}日 ${date.getHours().toString().padStart(2, "0")}時${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}分`;
}

export function getSlug(slug: string): { id: string; date?: string } {
  if (slug.match(/^\d{8}-/)) {
    const parts = slug.split("-");
    return {
      id: parts.slice(1).join("-"),
      date: parts[0],
    };
  } else {
    return { id: slug };
  }
}

export function toYYYYMMDD(date: string): string {
  return date.split("T")[0].replaceAll("-", "");
}
