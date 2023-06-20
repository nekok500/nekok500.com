import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "(WIP) nekok500.com",
  description: "ねこかわいいのポートフォリオ的ななにか",
};

function Header() {
  return (
    <header>
      <nav className="flex mx-auto items-center justify-between">
        <a className="text-2xl text-gray-900" href="/">
          nekok500.com
        </a>
        <a className="font-semibold text-gray-900" href="/blog">
          ブログ
        </a>
        <a className="font-semibold text-gray-900" href="/projects">
          プロジェクト
        </a>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="px-4 py-6 xl:max-w-4xl mx-auto">
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  );
}
