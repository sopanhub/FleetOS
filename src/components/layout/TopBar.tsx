"use client";

import { useState, useEffect } from "react";
import { Bell, ChevronDown, LogOut, User, RefreshCcw, Sun, Moon } from "lucide-react";
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
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="text-sm text-text-secondary">
        {title && <span className="text-text-primary font-medium">{title}</span>}
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

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-text-secondary" />
          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-danger text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 hover:bg-muted rounded-xl px-2 py-1.5 transition-colors">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                  {initials}
                </div>
                <span className="text-sm font-medium text-text-primary hidden sm:block">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSwitchRole} className="cursor-pointer">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Switch to {role === "owner" ? "Manager" : "Owner"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-danger">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
