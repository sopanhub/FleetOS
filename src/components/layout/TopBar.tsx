"use client";

import { useState, useEffect } from "react";
import { Bell, ChevronDown, LogOut, User, RefreshCcw, Sun, Moon, Truck } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  const { user, logout, switchRole, role } = useAuthStore();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSwitchRole = () => {
    const newRole = role === "owner" ? "manager" : "owner";
    switchRole(newRole as "owner" | "manager");
    router.push(newRole === "owner" ? "/owner/dashboard" : "/manager/dashboard");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center justify-between px-6 z-30 m-4 lg:m-0 rounded-full lg:rounded-none border lg:border-0 lg:border-b border-border h-14 lg:h-16 bg-card/90 lg:bg-card backdrop-blur-md lg:backdrop-blur-none shadow-lg lg:shadow-none lg:sticky lg:top-0">
      <div className="flex items-center gap-2">
        {/* Desktop Title */}
        <div className="hidden lg:block">
          {title && <span className="text-text-primary font-semibold">{title}</span>}
        </div>
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <Truck className="h-6 w-6 text-primary shrink-0" />
          <span className="text-lg font-extrabold text-text-primary tracking-tight">
            Fleet<span className="text-primary">OS</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Theme Toggler */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-xl hover:bg-muted transition-colors"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-text-secondary" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 hover:bg-muted rounded-full p-1 transition-colors">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                  {initials}
                </div>
                <span className="text-sm font-medium text-text-primary hidden sm:block pr-1">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-text-muted hidden sm:block" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1.5 shadow-xl border-border bg-card">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted text-text-primary">
              <User className="h-4 w-4 text-text-secondary" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-muted text-text-primary">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-text-secondary" />
                <span>Notifications</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                3
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSwitchRole} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted text-text-primary">
              <RefreshCcw className="h-4 w-4 text-text-secondary" />
              <span>Switch to {role === "owner" ? "Manager" : "Owner"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 border-border" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted text-danger">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
