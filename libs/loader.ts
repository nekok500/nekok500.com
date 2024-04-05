import { ImageLoaderProps } from "next/image";

export default function CDNLoader(props: ImageLoaderProps): string {
  if (props.src.startsWith("/")) return props.src;

  const url = new URL(props.src);
  const params = url.searchParams;

  if (url.hostname === "cdn.discordapp.com") {
    params.set("size", props.width.toString());
  } else if (url.hostname === "images.microcms-assets.io") {
    params.set("fit", params.get("fit") || "max");
    params.set("w", params.get("w") || props.width.toString());

    if (props.quality) {
      params.set("q", props.quality.toString());
    }
  }

  return url.href;
}
