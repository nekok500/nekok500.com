"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header>
      <nav className="flex mx-auto items-center justify-between">
        <a
          className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
          href="/"
        >
          nekok500.com
        </a>
        <div className="flex justify-between">
          {/* <a
            className="font-semibold text-gray-900 dark:text-gray-100 mx-4"
            href="/blog"
          >
            ブログ
          </a>
          <a
            className="font-semibold text-gray-900 dark:text-gray-100 mx-4"
            href="/projects"
          >
            プロジェクト
          </a> */}
          <FaMoon
            data-hide-on-theme="light"
            onClick={() => setTheme("light")}
          />
          <FaSun data-hide-on-theme="dark" onClick={() => setTheme("dark")} />
        </div>
      </nav>
    </header>
  );
}
