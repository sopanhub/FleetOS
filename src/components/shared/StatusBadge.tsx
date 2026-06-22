"use client";

import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  // Generate dark mode overrides dynamically from light classes
  const getDarkClasses = (bg: string) => {
    const bgParts = bg.split("-");
    if (bgParts.length >= 2) {
      const color = bgParts[1];
      if (color === "gray" || color === "zinc" || color === "slate") {
        return "dark:bg-zinc-800/40 dark:text-zinc-400";
      }
      return `dark:bg-${color}-950/40 dark:text-${color}-400`;
    }
    return "dark:bg-zinc-850 dark:text-zinc-400";
  };

  const darkClasses = getDarkClasses(colors.bg);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-opacity",
        colors.bg,
        colors.text,
        darkClasses,
        className
      )}
    >
      {status}
    </span>
  );
}
