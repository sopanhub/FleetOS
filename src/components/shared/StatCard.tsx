"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  iconBg: string;
  badgeText: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
  iconBg,
  badgeText,
  className,
}: StatCardProps) {
  // Helper to map solid background class to modern faint bg and theme text colors
  const getFaintColors = (bgClass: string) => {
    const bg = bgClass.toLowerCase();
    if (bg.includes("primary") || bg.includes("#ff6b00")) {
      return {
        bg: "bg-primary/10 dark:bg-primary/20",
        text: "text-primary",
        badgeBg: "bg-primary/10 dark:bg-primary/20",
        badgeText: "text-primary"
      };
    }
    if (bg.includes("success") || bg.includes("#16a34a") || bg.includes("green")) {
      return {
        bg: "bg-success/10 dark:bg-success/20",
        text: "text-success",
        badgeBg: "bg-success/10 dark:bg-success/20",
        badgeText: "text-success"
      };
    }
    if (bg.includes("danger") || bg.includes("#dc2626") || bg.includes("red")) {
      return {
        bg: "bg-danger/10 dark:bg-danger/20",
        text: "text-danger",
        badgeBg: "bg-danger/10 dark:bg-danger/20",
        badgeText: "text-danger"
      };
    }
    if (bg.includes("warning") || bg.includes("#d97706") || bg.includes("yellow") || bg.includes("amber")) {
      return {
        bg: "bg-warning/10 dark:bg-warning/20",
        text: "text-warning",
        badgeBg: "bg-warning/10 dark:bg-warning/20",
        badgeText: "text-warning"
      };
    }
    if (bg.includes("blue") || bg.includes("#2563eb") || bg.includes("info")) {
      return {
        bg: "bg-info/10 dark:bg-info/20",
        text: "text-info",
        badgeBg: "bg-info/10 dark:bg-info/20",
        badgeText: "text-info"
      };
    }
    return {
      bg: "bg-primary/10 dark:bg-primary/20",
      text: "text-primary",
      badgeBg: "bg-primary/10 dark:bg-primary/20",
      badgeText: "text-primary"
    };
  };

  const themeColors = getFaintColors(iconBg);
  const isLongValue = value.length > 7;
  const valueSizeClass = isLongValue
    ? "text-[15px] sm:text-2xl md:text-3xl"
    : "text-xl sm:text-2xl md:text-3xl";

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-card p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between gap-1.5">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] sm:text-sm text-text-secondary font-normal line-clamp-2 sm:line-clamp-none" title={title}>
            {title}
          </p>
          <p className={cn("font-semibold tracking-tight text-text-primary mt-0.5 sm:mt-1 truncate", valueSizeClass)} title={value}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
              {trendUp !== undefined && (
                trendUp ? (
                  <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-success shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-danger shrink-0" />
                )
              )}
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium truncate",
                  trendUp === true && "text-success",
                  trendUp === false && "text-danger",
                  trendUp === undefined && "text-text-secondary"
                )}
              >
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl shrink-0",
            themeColors.bg
          )}
        >
          <Icon className={cn("h-4 w-4 sm:h-6 sm:w-6", themeColors.text)} />
        </div>
      </div>
      <div className="mt-2.5 sm:mt-3">
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-medium truncate max-w-full", themeColors.badgeBg, themeColors.badgeText)}>
          {badgeText}
        </span>
      </div>
    </div>
  );
}
