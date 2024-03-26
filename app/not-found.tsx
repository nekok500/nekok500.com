import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function NotFoundPage() {
  return <p className="text-center font-semibold text-3xl">404 Not Found.</p>;
}
