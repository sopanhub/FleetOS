"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, PackageOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0E5] mb-4">
        <Icon className="h-8 w-8 text-[#FF6B00]" />
      </div>
      <h3 className="text-lg font-semibold text-[#111111]">{title}</h3>
      <p className="text-sm text-[#666666] mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-medium text-white hover:bg-[#CC5500] active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
