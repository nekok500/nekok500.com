import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./_components/provider";
import Header from "./_components/header";
import Footer from "./_components/footer";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - nekok500.com",
    default: "nekok500.com",
  },
  description: "ねこかわいいのポートフォリオ的ななにか",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <Providers>
          <div className="px-4 py-6 xl:max-w-4xl mx-auto flex flex-col min-h-screen flex-grow">
            <Header />
            <main className="py-6">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>

      <Script
        strategy="lazyOnload"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "7a3dff05c61841479c873ec3e53f10f6"}'
      />
    </html>
  );
}
