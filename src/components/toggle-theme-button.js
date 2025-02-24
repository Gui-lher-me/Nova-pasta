"use client";

import { MoonIcon, SunIcon } from "@/icons";
import { useTheme } from "next-themes";

export function ToggleThemeButton() {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={
        currentTheme === "light"
          ? () => setTheme("dark")
          : () => setTheme("light")
      }
      type="button"
      className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
    >
      {currentTheme === "dark" && <SunIcon />}
      {currentTheme === "light" && <MoonIcon />}
    </button>
  );
}
