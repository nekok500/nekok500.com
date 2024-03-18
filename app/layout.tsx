import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./_components/provider";
import Header from "./_components/header";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nekok500.com",
  description: "ねこかわいいのポートフォリオ的ななにか",
  // twitter: {
  //   creator: "@nekok500",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="px-4 py-6 xl:max-w-4xl mx-auto flex flex-col min-h-screen">
            <div className="flex-grow">
              <Header />
              <main className="py-6">{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
