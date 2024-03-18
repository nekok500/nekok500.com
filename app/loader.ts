import { ImageLoaderProps } from "next/image";

export default function discordCDNLoader(props: ImageLoaderProps): string {
  if (props.src.startsWith("https://cdn.discordapp.com/"))
    return `${props.src}?size=${props.width}`;

  return props.src;
}
