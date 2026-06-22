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

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary font-normal">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-text-primary mt-1">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              {trendUp !== undefined && (
                trendUp ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-danger" />
                )
              )}
              <span
                className={cn(
                  "text-xs font-medium",
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
            "flex h-12 w-12 items-center justify-center rounded-xl shrink-0",
            themeColors.bg
          )}
        >
          <Icon className={cn("h-6 w-6", themeColors.text)} />
        </div>
      </div>
      <div className="mt-3">
        <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", themeColors.badgeBg, themeColors.badgeText)}>
          {badgeText}
        </span>
      </div>
    </div>
  );
}
