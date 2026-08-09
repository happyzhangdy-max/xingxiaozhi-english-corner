"use client";

import { useSyncExternalStore } from "react";

export const THEME_STORAGE_KEY = "xingxiaozhi-theme";

type Theme = "dark" | "light";

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const subscribe = (listener: () => void) => {
  window.addEventListener("xingxiaozhi-themechange", listener);
  return () => window.removeEventListener("xingxiaozhi-themechange", listener);
};

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("xingxiaozhi-themechange"));
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`切换为${nextTheme === "light" ? "亮色" : "暗色"}主题`}
      aria-pressed={theme === "light"}
      title={`切换为${nextTheme === "light" ? "亮色" : "暗色"}主题`}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-symbol" aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
