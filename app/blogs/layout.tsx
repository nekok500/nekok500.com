import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  description: null,
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
