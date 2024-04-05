"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            className="font-semibold text-gray-900 dark:text-gray-100 mx-2"
            href="/about"
          >
            私について
          </Link>
          <Link
            className="font-semibold text-gray-900 dark:text-gray-100 mx-2"
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
          {isLoaded ? (
            theme == "dark" ? (
              <FaMoon
                className="ml-4 mr-6 my-1"
                onClick={() => setTheme("light")}
              />
            ) : (
              <FaSun
                className="ml-4 mr-6 my-1"
                onClick={() => setTheme("dark")}
              />
            )
          ) : (
            <FaMoon className="ml-4 mr-6 my-1 invisible" />
          )}
        </div>
      </nav>
    </header>
  );
}
