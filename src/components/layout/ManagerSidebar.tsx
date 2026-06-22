"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/authStore";
import {
  LayoutDashboard,
  Route,
  FileText,
  Receipt,
  CreditCard,
  Truck,
  Bell,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
  { label: "Trips", href: "/manager/trips", icon: Route },
  { label: "Lorry Receipts", href: "/manager/lorry-receipts", icon: FileText },
  { label: "Expenses", href: "/manager/expenses", icon: Receipt },
  { label: "Billing & Invoices", href: "/manager/billing", icon: CreditCard },
  { label: "Fleet Status", href: "/manager/fleet", icon: Truck },
  { label: "Reminders", href: "/manager/reminders", icon: Bell, badge: "3" },
];

export function ManagerSidebar() {
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
    : "PS";

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Truck className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-text-primary">
          Fleet<span className="text-primary">OS</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/manager/dashboard" && pathname.startsWith(item.href));
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
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
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
              {user?.name || "Priya Sharma"}
            </p>
            <p className="text-xs text-text-muted">Manager</p>
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
  );
}
