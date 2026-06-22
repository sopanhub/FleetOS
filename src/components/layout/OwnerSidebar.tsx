"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/authStore";
import {
  LayoutDashboard,
  Truck,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard, shortLabel: "Home" },
  { label: "Fleet & Vehicles", href: "/owner/fleet", icon: Truck, shortLabel: "Fleet" },
  { label: "Managers", href: "/owner/managers", icon: Users, shortLabel: "Managers" },
  { label: "Reports & P&L", href: "/owner/reports", icon: BarChart3, shortLabel: "Reports" },
  { label: "Settings", href: "/owner/settings", icon: Settings, shortLabel: "Settings" },
];

export function OwnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "RK";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-30 h-screen w-60 flex-col bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <Truck className="h-9 w-9 text-primary shrink-0" />
          <span className="text-2xl font-extrabold text-text-primary tracking-tight">
            Fleet<span className="text-primary">OS</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-normal transition-all duration-150",
                  isActive
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-secondary hover:bg-muted hover:text-text-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-text-muted")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border px-3 py-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.name || "Rajesh Kumar"}
              </p>
              <p className="text-xs text-text-muted">Owner</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-text-muted" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Bottom Navigation Capsule (Apple Island style) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 shadow-2xl flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200",
                isActive ? "text-primary scale-110" : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="h-5.5 w-5.5" />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
