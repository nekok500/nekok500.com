"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header>
      <nav className="flex mx-auto items-center justify-between">
        <Link
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
          href="/"
        >
          nekok500.com
        </Link>
        <div className="flex justify-between">
          <Link
            className="font-semibold text-gray-900 dark:text-gray-100 mx-6"
            href="/blogs"
          >
            ブログ
          </Link>
          {/*<a
            className="font-semibold text-gray-900 dark:text-gray-100 mx-4"
            href="/projects"
          >
            プロジェクト
          </a> */}
          <FaMoon
            className="my-1"
            data-hide-on-theme="light"
            onClick={() => setTheme("light")}
          />
          <FaSun
            className="my-1"
            data-hide-on-theme="dark"
            onClick={() => setTheme("dark")}
          />
        </div>
      </nav>
    </header>
  );
}
