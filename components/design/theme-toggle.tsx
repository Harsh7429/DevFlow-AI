"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * On-page dark/light toggle for the /design playground.
 * Uses next-themes. Guarded against hydration mismatch: theme is only known
 * on the client, so we render a stable placeholder until mounted.
 * This same pattern powers the real toggle in the app shell later.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-text transition-colors hover:border-border-strong"
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: "var(--color-primary)" }}
      />
      {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
    </button>
  );
}
