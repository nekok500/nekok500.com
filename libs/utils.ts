export function toDateString(date: Date) {
  const formatter = new Intl.DateTimeFormat(["ja-JP"], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
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
